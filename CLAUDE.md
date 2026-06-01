# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Quizzem is a real-time quiz game platform — a pnpm monorepo with a Kotlin/Spring Boot backend (`packages/backend`), React frontend (`packages/frontend`), and a shared type library (`packages/common`).

## Commands

### Infrastructure
```bash
pnpm docker:database   # Start PostgreSQL (5432) + Redis (6379) via docker-compose
```

### Backend (`packages/backend2`)
```bash
pnpm dev               # Watch mode with auto-reload
pnpm build             # Compile TypeScript (nest build)
pnpm start:prod        # Run compiled output
pnpm lint              # ESLint with auto-fix
pnpm format            # Prettier
```

### Frontend (`packages/frontend`)
```bash
pnpm dev               # Vite dev server on :5173
pnpm build             # TypeScript check + Vite build
pnpm lint              # ESLint
```

### Common (`packages/common`)
```bash
pnpm build             # Compile shared types to dist/
pnpm generate          # Regenerate classes from template + format
```

## Architecture

### Monorepo layout
- `packages/backend` — Kotlin/Spring Boot backend (REST + WebSockets)
- `packages/frontend` — React 19 SPA
- `packages/common` — shared TypeScript types consumed by both sides

### Backend (`packages/backend/src/`)
Spring Boot with Kotlin against PostgreSQL. Feature modules live under `src/features/`:

- **game** — CRUD for games; `GameController` exposes `GET/POST/PUT /games`
- **question** — `QuestionGateway` handles WebSocket events (`next-question`)
- **answer** — answer entity and DTO
- **host** — `HostGateway` skeleton for game state machine

All entities extend `QuizzemModel` (`src/core/domain/quizzem.model.ts`) which provides a UUID primary key and timestamps.

`GameModel` drives a state machine through these states (documented in `game-flow.md`):
`DRAFT → LOBBY → COUNTDOWN → QUESTION → ANSWER_REVEAL → SCOREBOARD → NEXT_QUESTION → FINAL_RESULTS → ENDED`

### Frontend (`packages/frontend/src/`)
React Router routes: `/` (home), `/host` (host management), `/games/:id` (game view), `/player` (player interface).

Server state is managed with TanStack Query. Forms use React Hook Form. The HTTP client lives in `src/api/http.ts` — note it currently has a hardcoded `localhost:8080` base URL (TODO).

## Development Style
- Apply idiomatic Kotlin/Spring Boot patterns on the backend and idiomatic React/TypeScript on the frontend.
- Assume familiarity with Spring Boot conventions (dependency injection, JPA, REST, Kotlin idioms) and React patterns (hooks, TanStack Query, React Hook Form, TypeScript generics). No need to explain basics.
- When suggesting solutions, prefer ecosystem-standard approaches over hand-rolled ones.
- Keep responses concise — skip explanatory padding for well-known concepts.

### Environment
`.env.development` at the repo root holds `VITE_BACKEND_URL`, `BACKEND_PORT`, and PASETO auth keys. The backend reads `DB_*` / `REDIS_*` vars; default credentials for local Docker are `quizzem/quizzem` on `localhost:5432`.
