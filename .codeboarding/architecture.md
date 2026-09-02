# Architecture

## Overview

This is a full-stack social/blogging application built as a React single-page app served against an Express backend. The client-side runtime starts at the Client App Shell, which routes between the Client Feature Pages (browsing, posting, profiles, login/signup) built from the Client Shared UI Components, while the Client Auth & API Layer holds authenticated user state and centralizes all HTTP communication with the server. On the server, Server Bootstrap & Data Access is the Express entrypoint wiring middleware and routes for the Server Auth & Social REST API, which persists data through SQLite Persistence.

## Architectural Patterns

- Client-Server separation via HTTP/REST contract (independent frontend and
- Layered backend (Route → Middleware → Data): Express
- Component-based SPA: pages as route targets, reusable presentational
- Relational data model: 5 tables with FK relationships
- Token-based stateless authentication: JWT issued at login, validated

## Project Context

- **Project Type:** Full-stack social media / microblogging web application
- **Domain:** Web development

## Tech Stack

`Node.js/TypeScript`, `React`, `Gin`, `Express`, `Node.js`, `JWT authentication`, `CORS + JSON middleware`

## Common Commands

## Key Entry Points

_No standard entry points detected._

## Modules

_Each module links to a per-module keyword file listing its native symbols (file/function/class names kept verbatim for exact grep), ranked by importance. The exact formula depends on the module's graph density: dense graphs use `0.30·bridge + 0.30·usage + 0.15·type + 0.15·activity + 0.10·exported`; sparse graphs (calls hidden behind runtime dispatch) use `0.20·bridge + 0.20·usage + 0.15·type + 0.15·activity + 0.15·exported + 0.15·file_hub`. See each keyword file's header for the rule that produced its scores. Agents read a module's keyword file on demand._

### Client App Shell

Bootstrap and routing shell for the React SPA. [evidence-linked: 10 call edges]

- Keywords: [`keywords/1.md`](keywords/1.md) — 2 scored symbol(s)

### Client Feature Pages

Screen-level views composing the app's features: browsing, posting, profiles, and account creation/login. [evidence-linked: 52 call edges]

- Keywords: [`keywords/2.md`](keywords/2.md) — 23 scored symbol(s)

### Client Shared UI Components

Reusable presentation components shared across pages. [evidence-linked: 22 call edges]

- Keywords: [`keywords/3.md`](keywords/3.md) — 6 scored symbol(s)

### Client Auth & API Layer

Holds authenticated user state and centralizes all HTTP communication with the server, plus small client utilities. [evidence-linked: 36 call edges]

- Keywords: [`keywords/4.md`](keywords/4.md) — 32 scored symbol(s)

### Server Bootstrap & Data Access

Express entrypoint that wires middleware and routes, and the database connection/setup module.

### Server Auth & Social REST API

The server's REST surface: login/registration endpoints plus the token-validation middleware, and the domain endpoints for posts and users (feeds, profiles, follow relationships).

- Keywords: [`keywords/6.md`](keywords/6.md) — 5 scored symbol(s)

### SQLite Persistence

The on-disk store backing the server (SQLite with WAL journaling).

### Project Docs & Runbook

Repository-level documentation and the startup/launcher scripts.

### Code-Graph Analysis Tooling

A self-analysis tool that maps the codebase into package/call graphs and serves a viewer for them.

- Keywords: [`keywords/9.md`](keywords/9.md) — 5 scored symbol(s)

