# Architecture

## Overview

Bootstrap and top-level composition of the React SPA.; Route-level feature screens of the social app (feed, auth, profile, post detail, explore).; Reusable presentational widgets shared across pages.; Outbound HTTP client plus global authentication/session state and small utilities.; Express entry point, request-level auth guard middleware, and the REST resource endpoints (auth, posts, users).

## Architectural Patterns

- Client-Server Separated Monolith
- Component-Based SPA with pages/components/context/utils layering
- Layered Backend (Route → Middleware → Data)
- Token-Based Statelessness (JWT bearer auth)
- Relational Data Model with FK Graph (5 tables

## Project Context

- **Project Type:** Full-Stack Social Media Web Application
- **Domain:** Social Media / Web Development

## Tech Stack

`Node.js/TypeScript`, `React`, `Gin`, `Express`, `Node.js`, `CORS middleware`

## Common Commands

## Key Entry Points

_No standard entry points detected._

## Modules

_Each module links to a per-module keyword file listing its native symbols (file/function/class names kept verbatim for exact grep), ranked by importance. The exact formula depends on the module's graph density: dense graphs use `0.30·bridge + 0.30·usage + 0.15·type + 0.15·activity + 0.10·exported`; sparse graphs (calls hidden behind runtime dispatch) use `0.20·bridge + 0.20·usage + 0.15·type + 0.15·activity + 0.15·exported + 0.15·file_hub`. See each keyword file's header for the rule that produced its scores. Agents read a module's keyword file on demand._

### Client App Shell

Entry point, routing, and global styling for the React SPA.

- Keywords: [`keywords/m1.md`](keywords/m1.md) — 2 scored symbol(s)

### Client Feature Pages (Views)

The user-facing screens of the app: feed, discovery, post detail, profiles, and login/register.

- Keywords: [`keywords/m2.md`](keywords/m2.md) — 23 scored symbol(s)

### Client Shared UI Components

Reusable presentational widgets (post cards, avatars, follow control, layout chrome, loading state) plus small formatting helpers.

- Keywords: [`keywords/m3.md`](keywords/m3.md) — 8 scored symbol(s)

### Client Auth & API Layer

Client-side session/auth state and the HTTP client that talks to the backend.

- Keywords: [`keywords/m4.md`](keywords/m4.md) — 30 scored symbol(s)

### Server HTTP Core

Express application bootstrap: server setup, route/middleware wiring, and its package manifest.

### Authentication Subsystem

Server-side auth concerns: login/register endpoints and the token/session guard middleware.

- Keywords: [`keywords/m6.md`](keywords/m6.md) — 5 scored symbol(s)

### Social API Resources

REST endpoints for the app's core domain: posts (feed/explore/detail) and users (profiles, follows).

- Keywords: [`keywords/m7.md`](keywords/m7.md) — 2 scored symbol(s)

### Database Layer

SQLite persistence: connection/schema management and the database files themselves (including WAL sidecar files).

### Code Graph Tooling (graphify)

A standalone analysis tool that generates package/code dependency graphs and their visualization output.

- Keywords: [`keywords/m9.md`](keywords/m9.md) — 5 scored symbol(s)

### Documentation

Architecture, capability, and navigation reference docs describing the system.

### Dev Orchestration

Repo-level launcher and top-level readme that coordinate running the client and server together.

- Keywords: [`keywords/m11.md`](keywords/m11.md) — 68 scored symbol(s)

### Client App Shell & Entry Point

Bootstrap and top-level composition of the React SPA. [evidence-linked: 10 call edges]

- Keywords: [`keywords/m12.md`](keywords/m12.md) — 2 scored symbol(s)

### Client Page Views

Route-level feature screens of the social app (feed, auth, profile, post detail, explore). [evidence-linked: 52 call edges]

- Keywords: [`keywords/m13.md`](keywords/m13.md) — 23 scored symbol(s)

### Client Shared UI Components

Reusable presentational widgets shared across pages. [evidence-linked: 22 call edges]

- Keywords: [`keywords/m14.md`](keywords/m14.md) — 8 scored symbol(s)

### Client API & Auth State Layer

Outbound HTTP client plus global authentication/session state and small utilities. [evidence-linked: 36 call edges]

- Keywords: [`keywords/m15.md`](keywords/m15.md) — 32 scored symbol(s)

### Server HTTP Core & REST API Routes

Express entry point, request-level auth guard middleware, and the REST resource endpoints (auth, posts, users).

- Keywords: [`keywords/m16.md`](keywords/m16.md) — 5 scored symbol(s)

### Server Persistence Layer

Database connection/handler and the SQLite datastore (with WAL side files).

### Documentation & Architecture Maps

Written architecture, capability, and navigation references for the codebase.

### Code-Graph Tooling (graphify)

A standalone Node script that analyzes the repo and its generated graph output/viewer.

- Keywords: [`keywords/m19.md`](keywords/m19.md) — 5 scored symbol(s)

### Dev Bootstrap & Orchestration

Convenience scripts to build/run the whole stack locally.

