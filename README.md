# AAJ Property LLC — Frontend

A modern dark-themed real estate webapp for **AAJ Property LLC**, a Dubai-based real estate company.

Built with **Next.js** (App Router), TypeScript, Tailwind CSS, and Framer Motion.

## Features

- **Landing page** — Hero search, featured off-plan carousel, latest projects, company highlights
- **Search page** — Filter by area, type, status, developer, price, bedrooms, and sort
- **Project details** — Image gallery, unit pricing table, amenities, payment plan, handover timeline, mortgage calculator
- **About page** — Company story, values, team, and contact info
- **Dummy API routes** — Ready to swap for a NestJS backend later
- **Mobile responsive** — Optimized UX across all screen sizes

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## API Routes (Dummy)

| Endpoint | Description |
|---|---|
| `GET /api/projects` | List/search projects (supports query params) |
| `GET /api/projects/[slug]` | Single project by slug |
| `GET /api/company` | Company info |

## Project Structure

```
src/
├── app/                  # Pages & API routes
├── components/           # UI components
├── data/                 # Dummy data (replace with API later)
└── lib/                  # Types, API client, utilities
```

## Backend Integration

Update `NEXT_PUBLIC_API_URL` in `.env.local` to point to your NestJS backend when ready. The API client in `src/lib/api.ts` will use that base URL instead of local routes.
