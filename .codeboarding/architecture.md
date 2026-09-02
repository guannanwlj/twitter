# Architecture

## Overview

This is a full-stack social media application in which users publish posts, browse a feed timeline, and manage follow relationships. The browser client is anchored by the Client App Shell & Routing (React entry point with login-protected route wiring and the top-bar layout), with Client Session & API Gateway owning authentication state and the single Bearer-token fetch transport used by all feature screens, including Feed & Post Content UI and Social Graph UI. On the backend, the Express Server Runtime & Security Middleware serves as the application entry, handling CORS, route mounting, and JWT verification, while Domain API Services & SQLite Persistence backs the endpoints.

## Architectural Patterns

- Client-Server / REST API boundary (client/src/api.js ↔ server/src/routes/)
- Layered backend: routes (controllers) → middleware (cross-cutting auth)
- Component-based SPA with pages and reusable presentational components
- Context-based state management (AuthContext for session/user state)
- Feature-oriented route modularization (auth, posts, users domains mirrored

## Project Context

- **Project Type:** Full-Stack Web Application
- **Domain:** Web Development / Social Networking

## Tech Stack

`Node.js/TypeScript`, `React`, `Gin`, `Express`, `React Context API`, `Node.js`

## Common Commands

## Key Entry Points

_No standard entry points detected._

## Modules

_Each module links to a per-module keyword file listing its native symbols (file/function/class names kept verbatim for exact grep), ranked by importance. The exact formula depends on the module's graph density: dense graphs use `0.30·bridge + 0.30·usage + 0.15·type + 0.15·activity + 0.10·exported`; sparse graphs (calls hidden behind runtime dispatch) use `0.20·bridge + 0.20·usage + 0.15·type + 0.15·activity + 0.15·exported + 0.15·file_hub`. See each keyword file's header for the rule that produced its scores. Agents read a module's keyword file on demand._

### Client App Shell & Routing

React entry point, router, login-protected route wiring, and the top-bar layout that hosts all pages. [evidence-linked: 10 call edges]

- Keywords: [`keywords/1.md`](keywords/1.md) — 3 scored symbol(s)

### Client Session & API Gateway

Owns authentication state (login/register forms, auth context) and the single HTTP transport (api.js, Bearer-token fetch wrapper) through which the whole client talks to the backend. [evidence-linked: 32 call edges]

- Keywords: [`keywords/2.md`](keywords/2.md) — 36 scored symbol(s)

### Feed & Post Content UI

The post-centric screens: feed timeline, post detail, and the reusable post card with relative-time formatting. [evidence-linked: 21 call edges]

- Keywords: [`keywords/3.md`](keywords/3.md) — 12 scored symbol(s)

### Social Graph UI

User-discovery and relationship screens: explore users, profile pages, follow/unfollow, and the shared avatar component. [evidence-linked: 23 call edges]

- Keywords: [`keywords/4.md`](keywords/4.md) — 11 scored symbol(s)

### Server Runtime & Security Middleware

Express application entry (CORS, JSON parsing, route mounting) plus the JWT sign/verify middleware guarding protected endpoints. [evidence-linked: 5 call edges]

- Keywords: [`keywords/5.md`](keywords/5.md) — 3 scored symbol(s)

### Domain API Services & SQLite Persistence

The REST feature layer over node:sqlite: auth (register/login/me), users & follow graph, and posts/likes/comments/feed, backed by schema setup in db.js and the database files in server/data/. [evidence-linked: 5 call edges]

- Keywords: [`keywords/6.md`](keywords/6.md) — 2 scored symbol(s)

### Repository Tooling & Documentation

Cross-cutting assets: architecture/capability/navigation docs, the code-graph generator and its output, the combined launcher, and the README.

- Keywords: [`keywords/7.md`](keywords/7.md) — 5 scored symbol(s)

