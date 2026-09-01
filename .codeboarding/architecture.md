# Architecture

## Overview

This system is a social application with a component-based UI, a Node backend, and SQLite persistence. The frontend entry point sets up routing, global auth state, and the single HTTP client the UI uses to talk to the backend, powering the social screens (feed, explore, post detail, profile, login/register) built from reusable presentational components. The Node server entry point wires up the app and applies cross-cutting authentication middleware to protected endpoints, delegating to feature-oriented handlers for authentication, posts, and users, which access the live SQLite database files including their -wal/-shm sidecars.

## Architectural Patterns

- Client–Server (Two-Tier Separation): client/ and server/ fully decoupled
- MVC-like (Backend): Routes (controllers) → db.js (model layer)
- Component-Based SPA (Frontend): Pages + reusable components +
- Layered Middleware Pipeline: Request → auth.js middleware →
- API Gateway Pattern (simplified): api.js centralizes all frontend→backend

## Project Context

- **Project Type:** Full-Stack Web Application
- **Domain:** Web Development / Social Networking

## Tech Stack

`Node.js/TypeScript`, `React`, `Gin`, `Express`, `Session/JWT auth middleware`

## Common Commands

## Key Entry Points

_No standard entry points detected._

## Module Layer (Top-Level Components)

### Client App Shell & API/State Layer `1`
Entry point, routing, global auth state, and the single HTTP client the UI uses to talk to the backend.

### Client Feature UI (Pages & Shared Components) `2`
The social-app screens (feed, explore, post detail, profile, login/register) built from reusable presentational components.

### Server Bootstrap & Auth Middleware `3`
Node server entry point that wires up the app and provides cross-cutting authentication middleware for protected endpoints.

### REST API Routes `4`
Feature-oriented endpoint handlers covering the three resource areas of the app: authentication, posts, and users.

### Persistence Layer `5`
SQLite database access plus the live database files it operates on, including the -wal/-shm sidecar files.

### Documentation `6`
Written architecture and capability/navigation maps describing the system's design.

### Repo Tooling & Graph Artifacts `7`
The graphify.mjs script that analyzes the codebase, its generated output, and the root startup script.

