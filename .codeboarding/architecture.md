# Architecture

## Overview

This is a full-stack social networking application consisting of a React single-page app backed by an Express REST API with a SQLite database. Client-side, the Client App Shell & Routing mounts the SPA and gates protected views behind authentication, with feature screens like the feed, post detail, profiles, and explore in Client Pages (Feature Screens) reusing the HTTP API client, auth/session context, and shared UI widgets from Client Shared Components & Services. On the server, Server API & Route Handlers bootstraps Express with middleware, a health endpoint, and error handlers, exposing the authentication, users, and posts routers behind the authRequired JWT guard, while Server Data Layer provides the SQLite connection and persisted database.

## Architectural Patterns

- Client–Server (Two-Tier Monorepo)
- Layered Backend (routes → middleware → data access
- Component-Based Frontend (Page/Container–Presentational split)
- RESTful Resource Routing
- Global Auth State via React Context Provider
- Repository/DAO pattern (central db.js data-access module)

## Project Context

- **Project Type:** Full-Stack Web Application
- **Domain:** Web Development

## Tech Stack

`Node.js/TypeScript`, `React`, `Gin`, `Express`, `Vite`, `React Router`, `React Context API`, `Node.js`

## Common Commands

## Key Entry Points

_No standard entry points detected._

## Modules

_Each module links to a per-module keyword file listing its native symbols (file/function/class names kept verbatim for exact grep), ranked by importance. The exact formula depends on the module's graph density: dense graphs use `0.30·bridge + 0.30·usage + 0.15·type + 0.15·activity + 0.10·exported`; sparse graphs (calls hidden behind runtime dispatch) use `0.20·bridge + 0.20·usage + 0.15·type + 0.15·activity + 0.15·exported + 0.15·file_hub`. See each keyword file's header for the rule that produced its scores. Agents read a module's keyword file on demand._

### Client App Shell & Routing

Mounts the React SPA, defines routes, and gates protected views behind authentication. [evidence-linked: 10 call edges]

- Keywords: [`keywords/1.md`](keywords/1.md) — 2 scored symbol(s)

### Client Pages (Feature Screens)

The page-level features of the social app: feed, post detail, profile, explore, login/register. [evidence-linked: 52 call edges]

- Keywords: [`keywords/2.md`](keywords/2.md) — 23 scored symbol(s)

### Client Shared Components & Services

The cross-cutting client code all pages reuse: the browser-side HTTP API client, the app-wide auth/session context, and the reusable presentational widgets (post card, avatar, follow button, layout chrome, loading state, time helper). [evidence-linked: 50 call edges]

- Keywords: [`keywords/3.md`](keywords/3.md) — 38 scored symbol(s)

### Server API & Route Handlers

Express app bootstrap (CORS/JSON middleware, `/api/health`, route mounting, 404/500 handlers) together with the three REST resource routers — authentication, users (profile/follows), and posts (feed, likes, comments) — and the `authRequired` JWT guard that hydrates `req.user`.

- Keywords: [`keywords/4.md`](keywords/4.md) — 5 scored symbol(s)

### Server Data Layer

SQLite connection setup plus the persisted database with its WAL sidecar files.

### Documentation

Hand-written architecture and navigation docs describing the system.

### Repo Tooling & Generated Artifacts

One-command startup of both services and the dependency-graph generator with its output.

- Keywords: [`keywords/7.md`](keywords/7.md) — 5 scored symbol(s)

