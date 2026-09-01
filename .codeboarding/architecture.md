# Architecture

## Overview

This project is a social platform web application: a React single-page frontend provides the feed, post details, profiles, and auth screens as the user-facing entry point, backed by a Node HTTP API exposing authentication, post, and user endpoints behind token-protected middleware. The API persists its data in SQLite database files maintained through db.js. Supporting tooling includes a standalone graphify script that builds and serves code and dependency graphs of the codebase, along with written architecture and navigation references.

## Architectural Patterns

- Client-Server / Two-Tier Monolith (separated client/ and server/
- RESTful API (resource-oriented routes: auth, posts, users)
- Layered Backend (routes/ -> middleware/ -> db.js ->
- SPA with Page-based Routing (pages/ as feature entry
- Context-based State Management (AuthContext for global auth state)
- Centralized API Client (api.js as single network boundary)
- Middleware/Interceptor Pattern (server auth guard on protected routes)

## Project Context

- **Project Type:** Full-Stack Web Application
- **Domain:** Web development

## Tech Stack

`Node.js/TypeScript`, `React`, `Gin`, `Express`, `CSS`, `Node.js`, `CommonJS/ESM modules`

## Common Commands

## Key Entry Points

_No standard entry points detected._

## Module Layer (Top-Level Components)

### Client Web App `1`
The React SPA browser frontend for the social platform, providing the feed, post details, profiles, and auth screens.

### Server API `2`
The Node HTTP backend exposing authentication, post, and user endpoints with token-protected middleware.

### Server Data Store `3`
The SQLite database files backing the API (main db plus WAL/SHM sidecars), maintained via db.js.

### Repo Graph Analysis Tool `4`
A standalone graphify script that builds code/dependency graphs of the codebase and serves its output.

### Documentation & Architecture Guides `5`
Written architecture, capability, and navigation references describing the system.

### App Launcher & Build Config `6`
Dev orchestration and package manifests for running both halves of the app.

