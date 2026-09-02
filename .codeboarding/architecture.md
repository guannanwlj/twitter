# Architecture

## Overview

This is a social media application split into a React client and an Express API server. The client enters through the Client App Shell & Routing, which mounts the auth-gated feature screens of Client Page Views (auth, feed, discovery, profile, post detail) built from Client Shared UI Components, with token persistence and the authenticated fetch wrapper for all /api calls handled by Client Auth State & API Client. On the server, the Server HTTP Kernel & Middleware wires CORS, JSON parsing, JWT verification, and error handling around Server API Routes backed by a data persistence layer.

## Architectural Patterns

- Client-Server separation (strict client/ vs server/ top-level split
- RESTful API (resource-oriented routes: auth, posts, users)
- SPA + API pattern (React SPA consuming a
- Component-based UI (reusable presentational components + page-level containers)
- Context-based state management (AuthContext.jsx for auth state, no
- Middleware pipeline (server-side middleware/auth.js for token/JWT validation)
- Repository-ish data layer (db.js abstracting SQLite access away

## Project Context

- **Project Type:** Full-stack web application
- **Domain:** Web development

## Tech Stack

`Node.js/TypeScript`, `React`, `Gin`, `Express`

## Common Commands

## Key Entry Points

_No standard entry points detected._

## Modules

_Each module links to a per-module keyword file listing its native symbols (file/function/class names kept verbatim for exact grep), ranked by importance. The exact formula depends on the module's graph density: dense graphs use `0.30·bridge + 0.30·usage + 0.15·type + 0.15·activity + 0.10·exported`; sparse graphs (calls hidden behind runtime dispatch) use `0.20·bridge + 0.20·usage + 0.15·type + 0.15·activity + 0.15·exported + 0.15·file_hub`. See each keyword file's header for the rule that produced its scores. Agents read a module's keyword file on demand._

### Client App Shell & Routing

React bootstrap and route table, including the Protected auth gate and 404 fallback. [evidence-linked: 10 call edges]

- Keywords: [`keywords/1.md`](keywords/1.md) — 2 scored symbol(s)

### Client Page Views

Feature-level screens of the social app (auth screens, feed, discovery, profile, post detail). [evidence-linked: 52 call edges]

- Keywords: [`keywords/2.md`](keywords/2.md) — 23 scored symbol(s)

### Client Shared UI Components

Reusable presentational widgets shared across pages. [evidence-linked: 22 call edges]

- Keywords: [`keywords/3.md`](keywords/3.md) — 6 scored symbol(s)

### Client Auth State & API Client

Token/session persistence in localStorage, the authenticated fetch wrapper for all /api calls, and the session context consumed app-wide. [evidence-linked: 36 call edges]

- Keywords: [`keywords/4.md`](keywords/4.md) — 32 scored symbol(s)

### Server HTTP Kernel & Middleware

Express application wiring: CORS, JSON body parsing, route mounting, health endpoint, 404/error handlers, and JWT auth middleware. [evidence-linked: 5 call edges]

- Keywords: [`keywords/5.md`](keywords/5.md) — 3 scored symbol(s)

### Server API Routes

All REST endpoint handlers: authentication (register/login/me) plus the social-graph and content APIs for users, follow/unfollow, feed, posts, likes, and comments. [evidence-linked: 5 call edges]

- Keywords: [`keywords/6.md`](keywords/6.md) — 2 scored symbol(s)

### Data Persistence Layer

SQLite access setup and the stored database (including WAL sidecar files).

### Documentation

Human-written architecture, capability, and navigation docs plus the repo readme.

### Analysis Tooling & Dev Harness

Generated code-graph tool and its output artifacts, plus the script that runs client and server together.

- Keywords: [`keywords/9.md`](keywords/9.md) — 5 scored symbol(s)

