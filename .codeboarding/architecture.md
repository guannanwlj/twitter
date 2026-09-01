# Architecture

## Overview

This is a full-stack social media application: a React single-page app booted by the Client App Shell & Routing module (global routes plus the shared page chrome/navigation) that talks to the standalone API Server (Express + SQLite), which mounts /api/auth, /api/users, and /api/posts behind JWT middleware over a node:sqlite data layer. At runtime the Client API & Auth Layer owns all backend communication, token persistence, and the auth context and login/register screens, backing the Client Social UI's feed, discovery, profiles, and post detail with like/comment/follow interactions.

## Architectural Patterns

- Client-Server / Two-Tier separation (strict client/ vs server/
- Component-Based UI (React): presentational components + page components
- MVC-variant on server: Routes (Controller) → db.js (Model)
- Middleware chain pattern: auth interception before route handlers
- Context/Provider pattern: global auth state on client
- API Layer abstraction: client/src/api.js decouples UI from transport

## Project Context

- **Project Type:** Full-stack web application
- **Domain:** Web Development / Social Networking

## Tech Stack

`Node.js/TypeScript`, `React`, `Gin`, `Express`, `React Context API`, `Node.js`

## Common Commands

## Key Entry Points

_No standard entry points detected._

## Modules

_Each module links to a per-module keyword file listing its native symbols (file/function/class names kept verbatim for exact grep), ranked by importance. The exact formula depends on the module's graph density: dense graphs use `0.30·bridge + 0.30·usage + 0.15·type + 0.15·activity + 0.10·exported`; sparse graphs (calls hidden behind runtime dispatch) use `0.20·bridge + 0.20·usage + 0.15·type + 0.15·activity + 0.15·exported + 0.15·file_hub`. See each keyword file's header for the rule that produced its scores. Agents read a module's keyword file on demand._

### Client App Shell & Routing

Boots the React SPA, wires global routes, and provides the shared page chrome/navigation around all feature pages. [evidence-linked: 10 call edges]

- Keywords: [`keywords/1.md`](keywords/1.md) — 3 scored symbol(s)

### Client API & Auth Layer

Owns all backend communication, token persistence, fetch wrapper with Bearer auth, and the auth state/context plus login/register screens. [evidence-linked: 32 call edges]

- Keywords: [`keywords/2.md`](keywords/2.md) — 36 scored symbol(s)

### Client Social UI

The core user-facing feature surfaces: followed-users feed, discovery, profiles, and post detail with like/comment/follow interactions. [evidence-linked: 32 call edges]

- Keywords: [`keywords/3.md`](keywords/3.md) — 23 scored symbol(s)

### API Server (Express + SQLite)

The standalone backend: Express app entry mounting /api/auth, /api/users, /api/posts routes with JWT middleware and a node:sqlite data layer.

- Keywords: [`keywords/4.md`](keywords/4.md) — 5 scored symbol(s)

### Graphify Code-Graph Tooling

A dependency-free Node script that statically scans source dirs, resolves imports, and emits module/package dependency graphs with an interactive Mermaid HTML viewer.

- Keywords: [`keywords/5.md`](keywords/5.md) — 5 scored symbol(s)

### Architecture Documentation

Written design docs describing system architecture, capability mapping, and navigation structure for the codebase.

### Dev Orchestration & Packaging

One-command startup of both services plus the per-package manifests that define each deployable.

