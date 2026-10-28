# TheNextStep AI: Server

Express + MongoDB API.

## Setup
    cp .env.example .env        (Windows: copy .env.example .env) then fill in MONGODB_URI
    npm install
    npm run seed                (degrees + scholarships; safe to re-run)
    npm run dev
    npm test

## Endpoints
| Path | Notes |
|---|---|
| GET /api/health | Health check |
| GET /api/categories | Fields (domains) with degree counts, from the database |
| GET /api/degrees | `stream` (PCM, PCB, Commerce, Arts, Graduate), `category`, `q`, `page`, `limit` |
| GET /api/degrees/:slug | One degree |
| GET /api/scholarships | `section`, `category` (SC/ST, OBC, Minority, General), `level`, `field`, `q`, `page` |
| GET /api/scholarships/summary | Counts per section |
| GET /api/countries, GET /api/universities | Study abroad (Hipolabs, cached in MongoDB) |
| POST /api/reports | "Report outdated info" |

## How the degree catalog works
`src/data/degreeCatalog.js` holds a list of bachelor's degree names and ONE rule set per degree family
(stream, duration, eligibility, entrance route, career paths, official source). `npm run seed:degrees`
combines them and writes the degrees to MongoDB with status `unverified`. A verified degree is never overwritten.
To verify a degree: check its official source, then update the document in MongoDB (status `verified`, lastVerified date).

## Scholarship sections
karnataka-abroad, karnataka-india, all-india, international. Data is in `src/seed/data/scholarships.json`.
There is no public API for Karnataka department schemes, so these are curated records with an official link.
Amounts and deadlines are left empty ("check the official page") until confirmed.
