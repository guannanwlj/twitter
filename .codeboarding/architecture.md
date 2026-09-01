# Architecture

## Overview

This system is a social-feed SPA — posting, likes, comments, and follower relationships — built on a React client backed by a REST API server. The entry point is Client App Shell & Routing, which mounts React Router with an auth-guarded route table, while Client Session & API Client serves as the gateway to the backend, handling token persistence in localStorage, Bearer-authenticated fetches with 401 handling, and the login/register screens. At runtime, the feature layers (Client Feed & Posts Feature and Client Users & Follows Feature) sit on top, drawing on Client Shared UI Components for avatars, loading states, and time formatting.

## Architectural Patterns

- Client-Server / Two-Tier Monolith
- RESTful API Layering (routes → middleware → db.js
- SPA with Page-Based Routing (pages/ for routed views,
- Cross-Cutting JWT/Token-Based Authentication spanning both tiers
- Repository/Data-Access Pattern (central db.js abstraction)

## Project Context

- **Project Type:** Full-Stack Web Application
- **Domain:** Web Development / Social Networking

## Tech Stack

`Node.js/TypeScript`, `React`, `Gin`, `Express`, `React Context API`, `Node.js`

## Common Commands

## Key Entry Points

_No standard entry points detected._

## Modules

_Each module links to a per-module keyword file listing its native symbols (file/function/class names kept verbatim for exact grep), ranked by importance. The exact formula depends on the module's graph density: dense graphs use `0.30·bridge + 0.30·usage + 0.15·type + 0.15·activity + 0.10·exported`; sparse graphs (calls hidden behind runtime dispatch) use `0.20·bridge + 0.20·usage + 0.15·type + 0.15·activity + 0.15·exported + 0.15·file_hub`. See each keyword file's header for the rule that produced its scores. Agents read a module's keyword file on demand._

### Client App Shell & Routing

Bootstrap of the SPA that mounts React Router, defines the auth-guarded route table and global styles. [evidence-linked: 10 call edges]

- Keywords: [`keywords/1.md`](keywords/1.md) — 2 scored symbol(s)

### Client Shared UI Components

Cross-cutting presentational widgets reused by pages and each other, including shell chrome, avatars, loading states, and time formatting. [evidence-linked: 19 call edges]

- Keywords: [`keywords/2.md`](keywords/2.md) — 6 scored symbol(s)

### Client Session & API Client

The client's gateway to the backend, handling token persistence in localStorage, a fetch wrapper with Bearer auth and 401 handling, the auth state context, and login/register screens. [evidence-linked: 32 call edges]

- Keywords: [`keywords/3.md`](keywords/3.md) — 36 scored symbol(s)

### Client Feed & Posts Feature

Post composition, the following-feed, post detail with likes/comments, and the post card component. [evidence-linked: 25 call edges]

- Keywords: [`keywords/4.md`](keywords/4.md) — 10 scored symbol(s)

### Client Users & Follows Feature

User discovery, profiles with follower/following relationships, and the follow toggle. [evidence-linked: 24 call edges]

- Keywords: [`keywords/5.md`](keywords/5.md) — 9 scored symbol(s)

### Server REST API

The Express application providing app wiring, CORS/JSON middleware, health endpoint, 404/500 handling, JWT auth middleware, and the auth, users/follows, and posts/likes/comments route groups.

- Keywords: [`keywords/6.md`](keywords/6.md) — 5 scored symbol(s)

### Server Persistence Layer

SQLite database handle, schema DDL and indexes for users, posts, follows, likes, and comments, plus the on-disk WAL-mode database files.

### Dependency-Graph Tooling (graphify)

A standalone static-analysis script that parses imports from the source trees and emits module/package dependency graphs as JSON plus a Mermaid-based HTML viewer, with its generated output artifacts.

- Keywords: [`keywords/8.md`](keywords/8.md) — 5 scored symbol(s)

### Documentation & Launch Ops

Architecture/capability/navigation docs, the project README, and the one-command script that installs and starts both the front end (5173) and back end (4000).

