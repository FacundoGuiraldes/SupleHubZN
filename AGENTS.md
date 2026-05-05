# AGENTS.md

## Cursor Cloud specific instructions

### Overview

SupleHubZN is a MERN-stack e-commerce application for fitness supplements. It consists of two services:

| Service | Directory | Port | Command |
|---------|-----------|------|---------|
| Backend (Express + MongoDB) | `server/` | 5000 | `npm run dev` |
| Frontend (Vite + React/HTML) | `client/` | 5173 | `npm run dev -- --host 0.0.0.0` |

### Prerequisites

- **Node.js 20** via nvm (`nvm use 20`)
- **MongoDB 7.0** — must be running locally before starting the backend

### Starting services

1. **MongoDB**: `mongod --dbpath /data/db --fork --logpath /var/log/mongod.log`
2. **Backend**: Create `server/.env` with `MONGO_URI=mongodb://localhost:27017/suplehubzn` and `PORT=5000`, then `cd server && npm run dev`
3. **Frontend**: `cd client && VITE_API_URL=http://localhost:5000/api npm run dev -- --host 0.0.0.0`

### Gotchas

- The `server/.env` file is gitignored and must be created manually. Without `MONGO_URI`, the backend calls `process.exit(1)`.
- The frontend's `client/public/script.js` uses `import.meta.env.VITE_API_URL` with a fallback to the production Render URL. For local development, pass `VITE_API_URL=http://localhost:5000/api` when starting the Vite dev server, or create a `client/.env` file with that variable.
- Lint: `cd client && npm run lint` (ESLint). The server has no lint script.
- Build: `cd client && npm run build` (Vite production build).
- There are no automated tests in this codebase yet.
