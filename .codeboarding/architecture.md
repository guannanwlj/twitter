# Architecture

## Overview

This is a social-media-style web application pairing a React SPA with an Express backend API. The browser entry point is the Client App Shell & Routing, which mounts React, wires global providers, and routes between the Client Feature Pages (authentication, feed, discovery, profiles, post detail) composed from Client Shared UI Components. At runtime, Client Services manage localStorage token/user persistence and a typed HTTP client with automatic 401 logout against the Server API Layer's JWT-guarded auth, users, and posts routes, backed by the Server Persistence Layer.

## Architectural Patterns

- Client-Server / Layered Architecture (frontend/backend/database separation)
- SPA + REST API (React SPA consuming Express
- Route-based Backend Organization (Router Pattern with routes mounted
- Middleware Chain / Interceptor Pattern (JWT auth middleware
- Context/Provider Pattern for Frontend State (AuthContext for global
- Page-Component Hierarchy (Presentational Container: pages composing reusable components)
- Relational Data Model with FK Constraints (5 tables:
- Repository/Data-Access Layer (centralized db.js for schema and index

## Project Context

- **Project Type:** Full-Stack Social Media Web Application
- **Domain:** Web Development / Social Networking

## Tech Stack

`Node.js/TypeScript`, `React`, `Gin`, `Express`, `React Context API`, `Node.js`

## Common Commands

## Key Entry Points

_No standard entry points detected._

## Modules

_Each module links to a per-module keyword file listing its native symbols (file/function/class names kept verbatim for exact grep), ranked by importance. The exact formula depends on the module's graph density: dense graphs use `0.30·bridge + 0.30·usage + 0.15·type + 0.15·activity + 0.10·exported`; sparse graphs (calls hidden behind runtime dispatch) use `0.20·bridge + 0.20·usage + 0.15·type + 0.15·activity + 0.15·exported + 0.15·file_hub`. See each keyword file's header for the rule that produced its scores. Agents read a module's keyword file on demand._

### Client App Shell & Routing

Bootstrap and routing scaffold for the SPA that mounts React, wires global providers and routes, and defines the browser entry point. [evidence-linked: 10 call edges]

- Keywords: [`keywords/1.md`](keywords/1.md) — 2 scored symbol(s)

### Client Feature Pages

The user-facing feature areas of the app: authentication, feed, exploration/discovery, profiles, and post detail views. [evidence-linked: 52 call edges]

- Keywords: [`keywords/2.md`](keywords/2.md) — 23 scored symbol(s)

### Client Shared UI Components

Reusable presentational building blocks (avatar, post card, follow button, layout chrome, loading indicator) composed by the pages. [evidence-linked: 22 call edges]

- Keywords: [`keywords/3.md`](keywords/3.md) — 6 scored symbol(s)

### Client Services

The browser-side service layer: token/user persistence in localStorage, a typed HTTP client against the /api backend with automatic 401 logout, the app-wide auth context, and shared helpers. [evidence-linked: 36 call edges]

- Keywords: [`keywords/4.md`](keywords/4.md) — 32 scored symbol(s)

### Server API Layer

The HTTP surface of the backend: Express bootstrap with CORS/JSON/error handling, a health endpoint, and auth/users/posts route modules guarded by JWT auth middleware.

- Keywords: [`keywords/5.md`](keywords/5.md) — 5 scored symbol(s)

### Server Persistence Layer

Database access and storage: a SQLite database (with WAL sidecar files) backing users, posts, follows, likes, and comments.

### Code-Graph Tooling

A repo-wide analysis pipeline: the graphify generator script, its generated dependency-graph data and interactive viewer output, plus the orchestration script that starts the stack.

- Keywords: [`keywords/7.md`](keywords/7.md) — 5 scored symbol(s)

### Documentation

Human-facing architecture and usage documentation describing the system's structure, capabilities, and navigation.

