# Architecture

## Overview

This project is a repository-analysis and visualization system built as separate Node/npm packages: a Client Frontend web UI with its own build setup and a Server Backend with its own bundled data. The primary entry point is the root-level graphify.mjs script, which runs the Graphify Code-Analysis Tool to generate code-graph artifacts and a visualization output. Project Documentation completes the system with written descriptions of its structure, capabilities, and navigation.

## Architectural Patterns

- Client–Server / Two-Tier architecture (strict client/ vs server/
- RESTful Layered Backend (routes → middleware → data
- Component-Based SPA (page-level views composing reusable UI components)
- Context/Provider state management (auth state in AuthContext)
- Route/Middleware interception pattern (middleware/auth.js guards route handlers)
- API Client Gateway pattern (client/src/api.js centralizes all server

## Project Context

- **Project Type:** Full-Stack Web Application
- **Domain:** Web Development / Social Networking

## Tech Stack

`Node.js/TypeScript`, `React`, `Gin`, `Express`, `JWT/token-based authentication`, `REST/JSON API`

## Common Commands

## Key Entry Points

_No standard entry points detected._

## Modules

_Each module links to a per-module keyword file listing its native symbols (file/function/class names kept verbatim for exact grep), ranked by importance. The exact formula depends on the module's graph density: dense graphs use `0.30·bridge + 0.30·usage + 0.15·type + 0.15·activity + 0.10·exported`; sparse graphs (calls hidden behind runtime dispatch) use `0.20·bridge + 0.20·usage + 0.15·type + 0.15·activity + 0.15·exported + 0.15·file_hub`. See each keyword file's header for the rule that produced its scores. Agents read a module's keyword file on demand._

### Client Frontend

The web UI application — a self-contained Node/npm frontend package with its own build setup.

- Keywords: [`keywords/1.md`](keywords/1.md) — 63 scored symbol(s)

### Server Backend

The application's backend service — a separate npm package with source code and its own bundled data.

- Keywords: [`keywords/2.md`](keywords/2.md) — 5 scored symbol(s)

### Graphify Code-Analysis Tool

A standalone repository-analysis tool (root-level graphify.mjs script) that generates code-graph artifacts and a visualization output.

- Keywords: [`keywords/3.md`](keywords/3.md) — 5 scored symbol(s)

### Project Documentation

Written architectural documentation describing the system's structure, capabilities, and navigation.

