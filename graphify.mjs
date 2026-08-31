#!/usr/bin/env node
// graphify - 生成项目模块依赖图
// 用法: node graphify.mjs [源目录] [-o 输出目录]
import fs from 'node:fs';
import path from 'node:path';

const args = process.argv.slice(2);
const root = path.resolve(args.find((a) => !a.startsWith('-')) || '.');
const outDir = path.resolve(
  args[args.indexOf('-o') + 1] || path.join(root, 'graphify-out'),
);

const IGNORE_MODULES = new Set([
  'react', 'react-dom', 'react-router-dom', 'node:sqlite', 'node:path',
  'node:url', 'node:fs', 'node:events', 'node:util', 'node:os', 'node:stream',
  'express', 'jsonwebtoken', 'cors', 'bcryptjs', 'react/jsx-runtime',
]);

const EXTS = ['.js', '.jsx', '.mjs', '.cjs', '.ts', '.tsx', '.mts', '.cts'];
const SRC_DIRS = ['src', 'client/src', 'server/src', 'lib', 'packages'];
const IMPORT_RESOLVE_EXTS = ['', '.js', '.jsx', '.mjs', '.cjs', '.ts', '.tsx', '.mts', '.cts', '/index.js', '/index.jsx', '/index.ts', '/index.tsx', '/index.mjs'];

function walk(dir, out = []) {
  if (!fs.existsSync(dir)) return out;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.name === 'node_modules' || entry.name.startsWith('.')) continue;
    if (entry.isDirectory()) walk(full, out);
    else if (EXTS.includes(path.extname(entry.name))) out.push(full);
  }
  return out;
}

function findSourceDirs(root) {
  const candidates = [];
  const push = (d) => {
    if (fs.existsSync(path.join(root, d))) candidates.push(path.join(root, d));
  };
  for (const d of SRC_DIRS) push(d);
  const packagesDir = path.join(root, 'packages');
  if (fs.existsSync(packagesDir)) {
    for (const pkg of fs.readdirSync(packagesDir)) {
      push(path.join('packages', pkg));
      push(path.join('packages', pkg, 'src'));
      push(path.join('packages', pkg, 'lib'));
    }
  }
  return candidates;
}

const srcDirs = findSourceDirs(root);
if (srcDirs.length === 0) {
  console.error(`graphify: 未在 ${root} 找到源码目录 (src/ 或 packages/*)`);
  process.exit(1);
}

function groupOf(rel) {
  const first = rel.split('/')[0];
  if (first === 'packages') return rel.split('/')[1] || first;
  return first;
}

const importRe = /(?:import\s+(?:[\s\S]*?\s+from\s+)?|import\s*\(\s*|from\s+|require\s*\(\s*)['"]([^'"]+)['"]/g;

// 解析 workspace 包名 → 包目录 (monorepo 跨包导入按包名解析)
const pkgNameToDir = new Map();
const pkgDirToName = new Map();
{
  const pkgRoot = path.join(root, 'packages');
  if (fs.existsSync(pkgRoot)) {
    for (const sub of fs.readdirSync(pkgRoot)) {
      for (const dir of [path.join(pkgRoot, sub), path.join(pkgRoot, sub, 'src')]) {
        const pkgJson = path.join(dir, 'package.json');
        if (fs.existsSync(pkgJson)) {
          try {
            const name = JSON.parse(fs.readFileSync(pkgJson, 'utf8')).name;
            if (name) {
              pkgNameToDir.set(name, sub);
              pkgDirToName.set(sub, name);
            }
          } catch {
            /* ignore */
          }
        }
      }
    }
  }
}

const nodes = new Map();
const edges = [];
const seen = new Set();
const pkgGraph = { nodes: new Map(), edges: new Map() };const pkgAddEdge = (a, b) => {
  if (a === b) return;
  pkgGraph.nodes.set(a, { id: a, label: a });
  pkgGraph.nodes.set(b, { id: b, label: b });
  const k = `${a}|${b}`;
  pkgGraph.edges.set(k, { from: a, to: b, count: (pkgGraph.edges.get(k)?.count || 0) + 1 });
};

for (const dir of srcDirs) {
  for (const f of walk(dir)) {
    const rel = path.relative(root, f).replace(/\\/g, '/');
    nodes.set(rel, {
      id: rel,
      label: rel.replace(/\.(js|jsx|mjs|cjs|ts|tsx|mts|cts)$/, ''),
      group: groupOf(rel),
    });

    let src;
    try {
      src = fs.readFileSync(f, 'utf8');
    } catch {
      continue;
    }
    const myGroup = groupOf(rel);
    for (const m of src.matchAll(importRe)) {
      const spec = m[1];
      const key = `${rel}->${spec}`;
      if (seen.has(key)) continue;
      seen.add(key);

      // 解析 workspace 包名导入 (monorepo 跨包)
      const nameMatch = [...pkgNameToDir.keys()].find((n) => spec === n || spec.startsWith(n + '/'));
      if (nameMatch) {
        const pkgDir = pkgNameToDir.get(nameMatch);
        pkgAddEdge(myGroup, pkgDir);
        const marker = `pkg:${pkgDir}`;
        edges.push({ from: rel, to: marker });
        if (!nodes.has(marker)) {
          nodes.set(marker, { id: marker, label: `@${pkgDir} (package)`, group: pkgDir });
        }
        continue;
      }

      if (!spec.startsWith('.') || spec.startsWith('/')) continue;
      let target = path.resolve(path.dirname(f), spec);
      let targetRel = null;
      for (const ext of IMPORT_RESOLVE_EXTS) {
        const cand = target + ext;
        if (fs.existsSync(cand) && !fs.statSync(cand).isDirectory()) {
          targetRel = path.relative(root, cand).replace(/\\/g, '/');
          break;
        }
      }
      if (targetRel) {
        edges.push({ from: rel, to: targetRel });
        pkgAddEdge(myGroup, groupOf(targetRel));
        if (!nodes.has(targetRel)) {
          nodes.set(targetRel, {
            id: targetRel,
            label: targetRel.replace(/\.(js|jsx|mjs|cjs|ts|tsx|mts|cts)$/, ''),
            group: groupOf(targetRel),
          });
        }
      }
    }
  }
}

const nodeList = [...nodes.values()];const groups = [...new Set(nodeList.map((n) => n.group))];

// 生成 模块级 mermaid
const nodeKey = (id) => 'n' + id.replace(/[^\w-]/g, '_');
const lines = ['flowchart TD', '  direction TB'];
for (const g of groups) {
  lines.push(`  subgraph ${nodeKey(g)}["${g}"]`);
  for (const n of nodeList.filter((x) => x.group === g)) {
    const label = n.label.split('/').pop();
    lines.push(`    ${nodeKey(n.id)}["${label}"]`);
  }
  lines.push('  end');
}
for (const e of edges) {
  lines.push(`  ${nodeKey(e.from)} --> ${nodeKey(e.to)}`);
}
const mermaid = lines.join('\n');

// 生成 包级 mermaid (聚合)
const pkgNodeList = [...pkgGraph.nodes.values()];
const pkgEdges = [...pkgGraph.edges.values()];
const pk = (id) => 'p' + id.replace(/[^\w-]/g, '_');
const plines = ['flowchart LR', '  direction LR'];
const pkIn = {};
for (const e of pkgEdges) pkIn[e.to] = (pkIn[e.to] || 0) + e.count;
for (const n of pkgNodeList) {
  const dep = pkIn[n.id] || 0;
  plines.push(`  ${pk(n.id)}["${n.label} (被 ${dep} 次依赖)"]`);
}
for (const e of pkgEdges) {
  plines.push(`  ${pk(e.from)} -->|"×${e.count}"| ${pk(e.to)}`);
}
const pkgMermaid = plines.join('\n');

fs.mkdirSync(outDir, { recursive: true });
fs.writeFileSync(
  path.join(outDir, 'graph.json'),
  JSON.stringify({ root, generated_at: new Date().toISOString(), nodes: nodeList, edges, mermaid }, null, 2),
);
fs.writeFileSync(
  path.join(outDir, 'pkggraph.json'),
  JSON.stringify(
    { root, generated_at: new Date().toISOString(), nodes: pkgNodeList, edges: pkgEdges, mermaid: pkgMermaid },
    null,
    2,
  ),
);

const html = `<!doctype html>
<html lang="zh-CN">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>项目依赖图 · graphify</title>
<script type="module">
  import mermaid from 'https://cdn.jsdelivr.net/npm/mermaid@11/dist/mermaid.esm.min.mjs';
  mermaid.initialize({ startOnLoad: true, theme: 'neutral', flowchart: { curve: 'basis' } });
</script>
<style>
  body { margin: 0; font-family: system-ui, 'PingFang SC', sans-serif; background: #f6f8fa; }
  .bar { display: flex; align-items: center; gap: 16px; padding: 12px 20px; background: #fff;
         border-bottom: 1px solid #d0d7de; position: sticky; top: 0; }
  .bar h1 { font-size: 16px; margin: 0; }
  .bar .meta { color: #57606a; font-size: 13px; }
  .wrap { max-width: 1200px; margin: 20px auto; padding: 0 16px; }
  .card { background: #fff; border: 1px solid #d0d7de; border-radius: 10px; padding: 20px; overflow-x: auto; }
  .mermaid { display: flex; justify-content: center; }
  .stats { display: flex; gap: 24px; margin: 16px 0; color: #57606a; font-size: 13px; }
  .stats b { color: #1f2328; }
  .tabs { display: flex; gap: 8px; margin-bottom: 12px; }
  .tab { border: 1px solid #d0d7de; background: #fff; padding: 6px 14px; border-radius: 8px;
         cursor: pointer; font-size: 13px; font-weight: 600; color: #57606a; }
  .tab.active { background: #2563eb; color: #fff; border-color: #2563eb; }
</style>
</head>
<body>
  <div class="bar">
    <h1>项目依赖图 · graphify</h1>
    <span class="meta">${nodeList.length} 节点 · ${edges.length} 模块边 · ${pkgNodeList.length} 个包 · ${pkgEdges.length} 条包依赖</span>
  </div>
  <div class="wrap">
    <div class="stats">
      <span>模块 <b>${nodeList.length}</b></span>
      <span>模块依赖边 <b>${edges.length}</b></span>
      <span>包 <b>${pkgNodeList.length}</b></span>
      <span>包依赖边 <b>${pkgEdges.length}</b></span>
      <span>生成时间 <b>${new Date().toISOString().slice(0, 19)}</b></span>
    </div>
    <div class="tabs">
      <button class="tab active" onclick="show('pkg')">包级依赖图</button>
      <button class="tab" onclick="show('module')">模块级依赖图</button>
    </div>
    <div class="card">
      <pre class="mermaid" id="pkg-view">
${pkgMermaid}
      </pre>
      <pre class="mermaid" id="module-view" style="display:none">
${mermaid}
      </pre>
    </div>
  </div>
  <script>
    function show(which) {
      document.querySelectorAll('.tab').forEach((t) => t.classList.remove('active'));
      event.target.classList.add('active');
      document.getElementById('pkg-view').style.display = which === 'pkg' ? 'flex' : 'none';
      document.getElementById('module-view').style.display = which === 'module' ? 'flex' : 'none';
    }
  </script>
</body>
</html>`;
fs.writeFileSync(path.join(outDir, 'index.html'), html);

console.log(`graphify: ${nodeList.length} nodes, ${edges.length} edges, groups: ${groups.join(', ')}`);
console.log(`输出目录: ${outDir}`);
console.log(`  图数据   → graph.json`);
console.log(`  可视化   → index.html`);
