#!/bin/bash
# 一键启动前后端服务
# 前端: http://localhost:5173  后端 API: http://localhost:4000
set -e
cd "$(dirname "$0")"

if [ ! -d server/node_modules ]; then
  echo "安装后端依赖..."
  (cd server && npm install)
fi
if [ ! -d client/node_modules ]; then
  echo "安装前端依赖..."
  (cd client && npm install)
fi

echo "启动后端 (localhost:4000)..."
(cd server && npm run start) &
SERVER_PID=$!

echo "启动前端 (localhost:5173)..."
(cd client && npm run dev) &

trap "kill $SERVER_PID 2>/dev/null" EXIT
wait
