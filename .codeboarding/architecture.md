# Architecture

## Overview

This project is a social networking application consisting of a single-page Web Client for authentication, social feeds, profiles, and post interactions, backed by the HTTP API Server's token-protected REST endpoints for auth, the follow graph, and posts. At runtime the server relies on the Persistence Layer, which owns the database connection, schema, and on-disk SQLite store. Development-side support comes from the Graph Analysis Tooling script that generates dependency-graph artifacts in graphify-out/, plus the Architecture Documentation describing the system's structure.

## Architectural Patterns

- Client-Server / SPA + REST API
- Layered Backend (routes → middleware → db)
- Component-Based Frontend
- Page-based Routing
- Shared-state via Context (AuthContext for cross-cutting auth state)
- Data Access Layer (db.js abstracting persistence)

## Project Context

- **Project Type:** Full-Stack Web Application
- **Domain:** Web Development

## Tech Stack

`Node.js/TypeScript`, `React`, `Gin`, `Express`, `React Context API`, `Node.js`

## Common Commands

## Key Entry Points

_No standard entry points detected._

## Modules

_Each module links to a per-module keyword file listing its native symbols (file/function/class names kept verbatim for exact grep), ranked by importance. The exact formula depends on the module's graph density: dense graphs use `0.30·bridge + 0.30·usage + 0.15·type + 0.15·activity + 0.10·exported`; sparse graphs (calls hidden behind runtime dispatch) use `0.20·bridge + 0.20·usage + 0.15·type + 0.15·activity + 0.15·exported + 0.15·file_hub`. See each keyword file's header for the rule that produced its scores. Agents read a module's keyword file on demand._

### Web Client

The user-facing single-page application providing authentication, social feed, profile, and post-interaction UI over the server's REST API.

- Keywords: [`keywords/1.md`](keywords/1.md) — 61 scored symbol(s)

### HTTP API Server

The backend service exposing REST endpoints for authentication, users/follow graph, and posts (feed, likes, comments) behind token auth.

- Keywords: [`keywords/2.md`](keywords/2.md) — 5 scored symbol(s)

### Persistence Layer

The data-access module that owns the database connection/schema and the on-disk SQLite store backing the API.

### Graph Analysis Tooling

A standalone repo-analysis script that generates dependency-graph artifacts and a visualization site whose output is checked into graphify-out/.

- Keywords: [`keywords/4.md`](keywords/4.md) — 5 scored symbol(s)

### Architecture Documentation

Written docs describing the system's architecture, capability map, and navigation structure.

