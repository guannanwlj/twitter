# Architecture

## Overview

This system is a consumer-facing microblogging social network built as a client-server monolith where every social interaction (posting, liking, commenting, following) crosses a strict HTTP boundary as a stateless /api/* JSON call. The Application Shell is the frontend entry point, mounting routing and gating Content Pages behind protected routes using sessions from Auth Session Management, while the Express-based Server REST API is the backend entry, fanning requests into Identity Routes and Posts Routes behind shared JWT middleware with both terminating in the centralized Persistence Layer over SQLite. The result is a hub-and-spoke topology on both tiers, with Dev Tooling & Code-Graph Generation kept as isolated developer tooling outside the product flow.

## Architectural Patterns

- Client-Server Separation (client/ SPA ↔ HTTP /api/* ↔
- Layered Backend (Route → Middleware → Data: routes/
- RESTful Resource API (resource-oriented endpoints: /api/users, /api/posts, /api/auth)
- Stateless Token Auth (JWT Bearer tokens, no server-side
- Component-Based UI with Context Pattern (React pages +
- Page/Routing Architecture (protected routes with Login/Register as gatekeepers)
- Repository/DAO-lite (db.js centralizes schema + queries; routes own
- Relational Data Model (5 tables with FK graph:

## Project Context

- **Project Type:** Full-Stack Web Application
- **Domain:** Web Development / Social Networking

## Tech Stack

`Node.js/TypeScript`, `React`, `Gin`, `Express`, `Node.js`, `RESTful JSON API`, `CORS middleware`

## Common Commands

## Key Entry Points

_No standard entry points detected._

## Modules

_Each module links to a per-module keyword file listing its native symbols (file/function/class names kept verbatim for exact grep), ranked by importance. The exact formula depends on the module's graph density: dense graphs use `0.30·bridge + 0.30·usage + 0.15·type + 0.15·activity + 0.10·exported`; sparse graphs (calls hidden behind runtime dispatch) use `0.20·bridge + 0.20·usage + 0.15·type + 0.15·activity + 0.15·exported + 0.15·file_hub`. See each keyword file's header for the rule that produced its scores. Agents read a module's keyword file on demand._

### Client App Shell & Routing

React SPA bootstrap, routing, global layout chrome, and the shared API client that fronts all backend calls from the browser.

### Auth & Session (client-side)

Login/registration screens and the app-wide authentication context.

### Feed & Posts UI

Browse/PostDetail experience: feeds, post cards, exploration, and display helpers.

### Profiles & Social Graph UI

User profiles, avatars, and follow/unfollow interactions.

### Server REST API

Express HTTP server exposing auth/users/posts routes plus token-auth middleware.

### Persistence Layer

SQLite database access and the stored social data (with WAL side files).

### Documentation

Architecture, capability, and navigation maps describing the system.

### Dev Tooling & Code-Graph Generation

Scripts that start the stack and generate the packaged code-graph artifacts.

### Application Shell

The React single-page-app entry and navigation hub that wires client-side routing with protected route gating, the shared page layout, and the reusable presentational widgets (post card, avatar, follow button, loading indicator) used across all content views. [evidence-linked: 29 call edges]

### Content Pages

The route-level container views that own their own data fetching for the home timeline, single-post detail with comment thread, and user profile with follower/following lists, driving all social read and write actions (publish, like, delete, follow, comment) through the API client. [evidence-linked: 29 call edges]

### Auth Session Management

The shared session-state layer that wraps the browser's fetch calls into an authenticated JSON request core (Bearer token attach, token storage, error type) and exposes the auth context provider that refreshes the current user and performs logout on the client. [evidence-linked: 32 call edges]

### Identity Routes

The backend REST endpoints for the identity domain — registration, login, user directory, and user profile lookup — supported by JWT token signing and verification middleware and a public-user shaping helper (secondary concern: cross-cutting auth guard shared by other route modules).

### Posts Routes

The backend REST endpoints for the social-content domain — creating posts, serving the followed-users timeline feed, and post detail with comments and likes — including a response-shaping helper and database query execution (secondary concern: an offline dependency-graph generator script used as developer tooling).

