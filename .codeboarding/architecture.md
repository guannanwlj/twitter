# Architecture

## Overview

This is a social-media web application pairing a single-page client with a server-side API. The Client App Shell & Shared UI is the SPA's entry point, providing routing, layout scaffolding, and shared UI utilities that host the feature surfaces for Authentication & Session, Posts & Feed, and Users & Social Graph. On the server, the Server Runtime & Persistence module bootstraps the API (auth, posts, and users routes guarded by token middleware) on top of a SQLite-backed database access layer.

## Architectural Patterns

- Client–Server (SPA + REST API)
- Layered Backend (Routes → Middleware → Data)
- Component-Based UI
- Monorepo (client/ + server/ colocated, independently package-managed)
- Repository / Data Access Layer (server/src/db.js centralizes database
- Context Provider (global auth state via React Context)
- Shared Composition Root (Layout.jsx as shell for page

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

### Client App Shell & Shared UI

The SPA's entry point, routing/layout scaffolding, and shared UI utilities. [evidence-linked: 55 call edges]

- Keywords: [`keywords/1.md`](keywords/1.md) — 29 scored symbol(s)

### Authentication & Session Feature

Login/registration UI plus the client-side auth state and the server-side auth endpoint and token middleware. [evidence-linked: 25 call edges]

- Keywords: [`keywords/2.md`](keywords/2.md) — 16 scored symbol(s)

### Posts & Feed Feature

Content browsing surfaces (feed, explore, post detail) and their UI card component, backed by the posts API route. [evidence-linked: 32 call edges]

- Keywords: [`keywords/3.md`](keywords/3.md) — 13 scored symbol(s)

### Users & Social Graph Feature

Profile viewing and follow/unfollow interactions, backed by the users API route. [evidence-linked: 24 call edges]

- Keywords: [`keywords/4.md`](keywords/4.md) — 10 scored symbol(s)

### Server Runtime & Persistence

The API server bootstrap and its database access layer over the SQLite store.

### Documentation

Human-written architecture and navigation/capability reference docs describing the system.

### Analysis Tooling & Generated Artifacts

The repo-graph generator script, its cached/serialized output, and the orchestration/entry-point scripts.

- Keywords: [`keywords/7.md`](keywords/7.md) — 5 scored symbol(s)

