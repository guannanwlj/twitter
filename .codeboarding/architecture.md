# Architecture

## Overview

This is a social posting application in which a React single-page app for feeds, posts, profiles, and follows is backed by a server-side HTTP API over SQLite. The client's entry point is the Client App Shell & Routing, which bootstraps the app and supplies the root component plus the shared API client that all feature modules — authentication/session state, feed and post browsing, and profile/social-graph UI, supported by shared UI utilities — call into. At runtime the Server HTTP API serves requests against the Server Data Layer (SQLite), while Repository Tooling, Docs & Graph Output supports development outside the runtime path.

## Architectural Patterns

- Client-Server / SPA + REST API
- Layered backend
- MVC-variant
- Stateless token auth
- Context-based state management
- Page/Component hierarchy

## Project Context

- **Project Type:** Full-stack web application
- **Domain:** Web development / Social Networking

## Tech Stack

`Node.js/TypeScript`, `React`, `Gin`, `Express`, `React Context API`, `Node.js`, `JWT authentication`, `CORS middleware`

## Common Commands

## Key Entry Points

_No standard entry points detected._

## Modules

_Each module links to a per-module keyword file listing its native symbols (file/function/class names kept verbatim for exact grep), ranked by importance. The exact formula depends on the module's graph density: dense graphs use `0.30·bridge + 0.30·usage + 0.15·type + 0.15·activity + 0.10·exported`; sparse graphs (calls hidden behind runtime dispatch) use `0.20·bridge + 0.20·usage + 0.15·type + 0.15·activity + 0.15·exported + 0.15·file_hub`. See each keyword file's header for the rule that produced its scores. Agents read a module's keyword file on demand._

### Client App Shell & Routing

Entry point and shared plumbing of the frontend single-page app: app bootstrap, root component, and the API client used by all pages. [evidence-linked: 46 call edges]

- Keywords: [`keywords/1.md`](keywords/1.md) — 25 scored symbol(s)

### Client Authentication UI & Session State

Login/registration screens plus the React context that holds the authenticated user and supplies it to the rest of the UI. [evidence-linked: 24 call edges]

- Keywords: [`keywords/2.md`](keywords/2.md) — 13 scored symbol(s)

### Client Feed & Post Browsing

The content-consuming surface: home feed, exploration of posts, single-post detail view, and the reusable post card. [evidence-linked: 32 call edges]

- Keywords: [`keywords/3.md`](keywords/3.md) — 12 scored symbol(s)

### Client Profile & Social-Graph UI

User-facing identity and relationship features: profile pages, follow/unfollow control, and avatar rendering. [evidence-linked: 23 call edges]

- Keywords: [`keywords/4.md`](keywords/4.md) — 9 scored symbol(s)

### Client Shared UI & Utilities

Cross-cutting presentation concerns shared by the above features: page layout, loading indicators, time formatting, and global styles. [evidence-linked: 13 call edges]

- Keywords: [`keywords/5.md`](keywords/5.md) — 4 scored symbol(s)

### Server HTTP API

The Express application core: entry point, the three REST route groups (auth, posts, users), and the token-verification middleware that guards authenticated routes.

- Keywords: [`keywords/6.md`](keywords/6.md) — 5 scored symbol(s)

### Server Data Layer (SQLite)

Database connection/initialization and the persisted social graph data.

### Repository Tooling, Docs & Graph Output

Project-level orchestration and documentation: the startup script, the code-graph generator and its generated artifacts, and the architecture docs.

- Keywords: [`keywords/8.md`](keywords/8.md) — 5 scored symbol(s)

