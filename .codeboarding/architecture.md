# Architecture

## Overview

This system is a full-stack social posting application: a React SPA entered through Client App Shell & Entry, which composes routes and shared layout for the Client Feed & Posts UI, Client Profile & Social-Graph UI, and Client Auth & Session feature pages, all calling the backend through the shared HTTP client in Client Auth State & API Client (api.js). At runtime, the Server REST API is an Express application exposing authentication, posts, and users endpoints behind token-verification middleware, backed by the Persistence Layer for data access. Documentation, Build & Run Orchestration, and Code-Graph Tooling wrap the client and server halves with supporting material.

## Architectural Patterns

- Client-Server (two-tier) architecture with RESTful HTTP API as
- Layered backend: routes (controller layer) -> middleware (cross-cutting
- Single-Page Application (SPA) with page/route decomposition: route-level pages
- Context-based global state management (AuthContext for auth token/user
- Centralized API client (client/src/api.js as the single network
- Monorepo organization with independent package.json per subsystem plus

## Project Context

- **Project Type:** Full-Stack Web Application
- **Domain:** Web Development / Social Networking

## Tech Stack

`Node.js/TypeScript`, `React`, `Gin`, `Express`, `Node.js`

## Common Commands

## Key Entry Points

_No standard entry points detected._

## Modules

_Each module links to a per-module keyword file listing its native symbols (file/function/class names kept verbatim for exact grep), ranked by importance. The exact formula depends on the module's graph density: dense graphs use `0.30·bridge + 0.30·usage + 0.15·type + 0.15·activity + 0.10·exported`; sparse graphs (calls hidden behind runtime dispatch) use `0.20·bridge + 0.20·usage + 0.15·type + 0.15·activity + 0.15·exported + 0.15·file_hub`. See each keyword file's header for the rule that produced its scores. Agents read a module's keyword file on demand._

### Client App Shell & Entry

The bootstrap and routing layer that mounts the React single-page application.

- Keywords: [`keywords/m1.md`](keywords/m1.md) — 2 scored symbol(s)

### Client Feature Pages

The route-level views of the social app (auth screens, feed, post detail, profile, explore).

- Keywords: [`keywords/m2.md`](keywords/m2.md) — 23 scored symbol(s)

### Client UI Components

Reusable presentation components shared across pages (layout, post cards, avatars, follow button, loading state).

- Keywords: [`keywords/m3.md`](keywords/m3.md) — 6 scored symbol(s)

### Client Auth State & API Client

The cross-cutting frontend layer: session/auth context, the HTTP client to the backend, and shared utilities.

- Keywords: [`keywords/m4.md`](keywords/m4.md) — 32 scored symbol(s)

### Server REST API

The Node server's HTTP surface: entry point, route handlers for auth/posts/users, and the auth middleware guarding protected routes.

- Keywords: [`keywords/m5.md`](keywords/m5.md) — 5 scored symbol(s)

### Server Data Layer

Database access and the persisted social-graph data (SQLite with WAL files present).

### Documentation

Human-written architectural and capability documentation describing the system.

### Dev Tooling & Orchestration

The repo's developer tooling: the launch script that starts client and server together, the README tying the two together, and the standalone graphify.mjs tool that generates and caches code-graph artifacts plus an HTML viewer.

- Keywords: [`keywords/m8.md`](keywords/m8.md) — 5 scored symbol(s)

### Client App Foundation

React SPA entry point, route composition, shared layout chrome, and the HTTP API client (api.js) used by every page. [evidence-linked: 55 call edges]

- Keywords: [`keywords/m9.md`](keywords/m9.md) — 29 scored symbol(s)

### Client Auth & Session

Login/registration UI and the global authenticated-user context (current user, token). [evidence-linked: 24 call edges]

- Keywords: [`keywords/m10.md`](keywords/m10.md) — 13 scored symbol(s)

### Client Feed & Posts UI

Post-browsing surfaces — home feed, explore view, post detail, and the reusable post card. [evidence-linked: 32 call edges]

- Keywords: [`keywords/m11.md`](keywords/m11.md) — 12 scored symbol(s)

### Client Profile & Social-Graph UI

User profile pages and follow/unfollow social-graph interactions. [evidence-linked: 23 call edges]

- Keywords: [`keywords/m12.md`](keywords/m12.md) — 9 scored symbol(s)

### Server REST API

Express application exposing authentication, posts, and users endpoints behind token-verification middleware.

- Keywords: [`keywords/m13.md`](keywords/m13.md) — 5 scored symbol(s)

### Persistence Layer

SQLite data access for the social graph (users, posts, follows) backed by the live social.db database.

### Code-Graph Tooling

The graphify.mjs generator and its output — dependency/capability graphs and a visualization page for analyzing this codebase.

- Keywords: [`keywords/m15.md`](keywords/m15.md) — 5 scored symbol(s)

### Documentation

Written architecture, capability, and navigation maps describing the system.

### Build & Run Orchestration

Startup script and npm manifests that install dependencies and launch the client and server together.

