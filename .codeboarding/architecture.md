# Architecture

## Overview

This project is a full-stack social media application pairing a React single-page application (covering feed/post browsing and profile/follow interactions) with a Node/Express REST backend. The client's main entry point is the Client App Shell & Routing module, which composes all pages and depends on Client API Client & Auth for the shared HTTP client and the session context established through login/registration. The Server API (server/src/index.js, built on express, cors, bcryptjs, and jsonwebtoken) exposes the auth, posts, profiles, and follows endpoints and persists its state under server/data/.

## Architectural Patterns

- Client-Server / REST API boundary (client/src/api.js as the
- Layered backend (Routes → Middleware/auth guard → Data
- Component-based SPA (route-level Pages + shared/reusable components +
- Feature-aligned modularity (backend routes split by domain: auth,
- Token-based authentication as a cross-cutting concern (AuthContext on
- Docs-as-pipeline (graphify.mjs generates graph.json/pkggraph.json architecture documentation artifacts)

## Project Context

- **Project Type:** Full-stack social media web application
- **Domain:** Web development

## Tech Stack

`Node.js/TypeScript`, `React`, `Gin`, `Express`, `Vite-style SPA build setup`

## Common Commands

## Key Entry Points

_No standard entry points detected._

## Modules

_Each module links to a per-module keyword file listing its native symbols (file/function/class names kept verbatim for exact grep), ranked by importance. The exact formula depends on the module's graph density: dense graphs use `0.30·bridge + 0.30·usage + 0.15·type + 0.15·activity + 0.10·exported`; sparse graphs (calls hidden behind runtime dispatch) use `0.20·bridge + 0.20·usage + 0.15·type + 0.15·activity + 0.15·exported + 0.15·file_hub`. See each keyword file's header for the rule that produced its scores. Agents read a module's keyword file on demand._

### Client App Shell & Routing

The client entry point and top-level layout/routing that composes all pages into the single-page application. [evidence-linked: 15 call edges]

- Keywords: [`keywords/1.md`](keywords/1.md) — 4 scored symbol(s)

### Client API Client & Auth

The shared HTTP client (client/src/api.js), session/auth context, and login/registration pages that establish the user's identity for all other features. [evidence-linked: 32 call edges]

- Keywords: [`keywords/2.md`](keywords/2.md) — 36 scored symbol(s)

### Feed & Posts UI

The content-consumption feature: feed/explore/post-detail pages and the shared post rendering component with its time-formatting utility. [evidence-linked: 30 call edges]

- Keywords: [`keywords/3.md`](keywords/3.md) — 14 scored symbol(s)

### Profiles & Social Graph UI

User-identity presentation and relationship actions: the profile page plus the avatar and follow-button components that surface social-graph state. [evidence-linked: 23 call edges]

- Keywords: [`keywords/4.md`](keywords/4.md) — 9 scored symbol(s)

### Server API

The Node/Express backend (social-server, entry server/src/index.js, using express, cors, bcryptjs, and jsonwebtoken) exposing endpoints for auth, posts, profiles, and follows, backed by its persisted state in server/data/.

- Keywords: [`keywords/5.md`](keywords/5.md) — 5 scored symbol(s)

### Project Documentation

Written architecture and navigation/capability documentation describing the system's design.

### Repo Analysis Tooling & Artifacts

A code-graph generation tool (graphify.mjs), its emitted output (JSON graphs, an HTML viewer, and a cache), and the start.sh launcher that orchestrates the app.

- Keywords: [`keywords/7.md`](keywords/7.md) — 5 scored symbol(s)

