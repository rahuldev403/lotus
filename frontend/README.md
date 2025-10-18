# Lotus Chat – Frontend

This is the React + Vite frontend for Lotus Chat.

Backend API: https://lotus-api-nrwd.onrender.com

## Configuration

Environment variables (Vite):

- `VITE_API_URL` – Base URL for Axios REST requests. Include `/api` suffix. Example:
  - Development: `http://localhost:3000/api`
  - Production: `https://lotus-api-nrwd.onrender.com/api`
- `VITE_SOCKET_URL` – Base URL for Socket.IO connection. No `/api` suffix. Example:
  - Development: `http://localhost:3000`
  - Production: `https://lotus-api-nrwd.onrender.com`

See `.env.example` for a quick start. A `.env.production` is included and wired for the hosted backend.

## Scripts

- `npm run dev` – Start dev server
- `npm run build` – Build production assets
- `npm run preview` – Preview production build locally

## Local development

1. Copy env template:
   - Windows PowerShell:
     ```powershell
     Copy-Item .env.example .env.local
     ```
2. Edit `.env.local` as needed (e.g., point to your local API).
3. Install and run:
   ```powershell
   npm install
   npm run dev
   ```

## Deploying to Vercel

This project includes a `vercel.json` configured for a Vite SPA, rewriting all routes to `index.html`.

Steps:

1. Push this repo to GitHub/GitLab/Bitbucket.
2. Import the project in Vercel and choose the `frontend` folder (if using a monorepo) or the repo root if this folder is the repo root.
3. Set the following Environment Variables in Vercel (Project Settings → Environment Variables):
   - `VITE_API_URL` = `https://lotus-api-nrwd.onrender.com/api`
   - `VITE_SOCKET_URL` = `https://lotus-api-nrwd.onrender.com`
4. Build & deploy. The default build command is `npm run build`, and output is `dist/` (Vite default). `vercel.json` already handles SPA routing.

Notes:

- Axios instance is configured in `src/lib/axios.js`.
- Socket.IO client connects in `src/store/useAuthStore.js`.
- Both default to the hosted backend in production if env vars are not provided.
