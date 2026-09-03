# Architecture

## Overview

A social media application consisting of a React single-page app frontend backed by an Express REST server. On the client, the Client App Shell & Routing bootstraps the SPA and routes between the Frontend Feature Pages (authentication, feed browsing, discovery, post detail, and user profiles), which are composed from Shared UI Components and backed by Client Services (API Client + Auth State) for the HTTP API client and app-wide authentication context. On the server, the HTTP API & Server Entry exposes auth, users, and posts endpoints protected by JWT-style auth middleware, with a Persistence Layer & Data Store providing storage underneath.

## Architectural Patterns

- Client–Server (2-tier) with RESTful API
- Component-Based UI Architecture
- Page/Route-based frontend (SPA routing)
- Provider Pattern (AuthContext for global auth state)
- Layered Backend (routes → middleware → data access
- Session/JWT auth middleware pattern

## Project Context

- **Project Type:** Full-Stack Social Media Web Application
- **Domain:** Web Development

## Tech Stack

`Node.js/TypeScript`, `React`, `Gin`, `Express`

## Common Commands

## Key Entry Points

_No standard entry points detected._

## Modules

_Each module links to a per-module keyword file listing its native symbols (file/function/class names kept verbatim for exact grep), ranked by importance. The exact formula depends on the module's graph density: dense graphs use `0.30·bridge + 0.30·usage + 0.15·type + 0.15·activity + 0.10·exported`; sparse graphs (calls hidden behind runtime dispatch) use `0.20·bridge + 0.20·usage + 0.15·type + 0.15·activity + 0.15·exported + 0.15·file_hub`. See each keyword file's header for the rule that produced its scores. Agents read a module's keyword file on demand._

### Client App Shell & Routing

Bootstraps the React SPA, mounts the root component, and wires up client-side routing between feature pages. [evidence-linked: 10 call edges]

- Keywords: [`keywords/1.md`](keywords/1.md) — 2 scored symbol(s)

### Frontend Feature Pages

Implements the user-facing screens of the social app: authentication, feed browsing, discovery, post detail, and user profiles. [evidence-linked: 52 call edges]

- Keywords: [`keywords/2.md`](keywords/2.md) — 23 scored symbol(s)

### Shared UI Components

Provides the reusable presentational building blocks (cards, avatars, follow controls, layout chrome, loading states) shared across pages. [evidence-linked: 24 call edges]

- Keywords: [`keywords/3.md`](keywords/3.md) — 8 scored symbol(s)

### Client Services (API Client + Auth State)

Owns all browser-side cross-cutting concerns: the HTTP API client to the backend and the application-wide authentication context. [evidence-linked: 32 call edges]

- Keywords: [`keywords/4.md`](keywords/4.md) — 30 scored symbol(s)

### HTTP API & Server Entry

Implements the Express application and its REST surface — auth, users, and posts endpoints, protected by JWT-style auth middleware.

- Keywords: [`keywords/5.md`](keywords/5.md) — 5 scored symbol(s)

### Persistence Layer & Data Store

Establishes and owns the SQLite database connection and the on-disk data files backing the social graph and posts.

### Code-Graph Analysis Tooling

A standalone tooling pipeline that analyzes the codebase and emits the dependency-graph artifacts and a browsable visualization used for architecture insight.

- Keywords: [`keywords/7.md`](keywords/7.md) — 5 scored symbol(s)

### Architecture Documentation

Human-readable reference docs describing the system's architecture, capability inventory, and navigation flows.

### Startup & Orchestration

Entry points that run the whole system locally and orient new contributors.

