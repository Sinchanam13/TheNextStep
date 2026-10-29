# TheNextStep: Educational and Career Discovery Platform

**Explore your options. Discover your future. Take your next step with confidence.**

TheNextStep helps students after Class 12 explore bachelor's degrees, find scholarships made for Karnataka students, and discover universities abroad, with every item linking to an official source.

🔗 **Live Website:** https://client-zeta-eight-40.vercel.app/  
💻 **GitHub Repository:** https://github.com/Sinchanam13/TheNextStep

> The backend runs on a free Render instance, so the first request after a period of inactivity can take up to a minute while the server wakes up. After that it responds normally.

![Home page](docs/screenshots/home.png)

---

## 📌 About the Project

Choosing a degree, finding financial support and exploring education abroad can be confusing, because the information is spread across many websites and students often don't know which sources to trust.

TheNextStep brings these together in one place, shows where each piece of information comes from, and is honest about what has and hasn't been verified.

### ✨ Key Features

**Degree Explorer**
- 141 bachelor's degrees across 20 fields, including engineering, computer and IT, medical and AYUSH, nursing and allied health, law, commerce, management, design, media, sports, hospitality, aviation and maritime
- Filter by Class 12 stream: Science (PCM), Science (PCB), Commerce, Arts, or after graduation
- Each degree shows stream, duration, eligibility, entrance exam or admission route, and career paths
- Official source link and a verified or unverified badge on every degree
- Search, field filter, pagination, and related scholarships on each degree page

**Scholarship Explorer**
- 19 scholarships in four sections: Karnataka (study abroad), Karnataka (study in India), All India, International
- Filter by category (SC/ST, OBC, Minority, General), level, field and search
- Who can apply, benefit, deadline and a link to the official page
- "Check the official page" is shown wherever an amount or deadline has not been confirmed

**Study Abroad Explorer**
- 44 countries, with universities and official websites from the Hipolabs Universities API
- Results cached in MongoDB, with saved results served if the external API is down

**Across the site**
- Shortlist saved in the browser, with no login needed
- "Report outdated or wrong info" form stored in the database
- Responsive layout, dark mode, loading skeletons, error states with retry, and animations that respect "reduce motion"

> Scholarship details, eligibility requirements and deadlines change. Always verify the latest information on official websites.

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React, Vite, React Router |
| Backend | Node.js, Express.js |
| Database | MongoDB Atlas, Mongoose |
| Validation and security | Zod, helmet, CORS allowlist, express-rate-limit |
| External API | Hipolabs Universities API |
| Testing | Vitest, Supertest |
| Hosting | Vercel (frontend), Render (backend) |
| Version control | Git and GitHub |

There is no login or user account system. All features are public.

---

## 🏗️ Architecture

```text
React + Vite (Vercel)
        |
        |  REST requests
        v
Node.js + Express API (Render)
        |
        +--> MongoDB Atlas (degrees, scholarships, university cache, reports)
        |
        +--> Hipolabs Universities API (called only from the server, cached)
```

The frontend only talks to this project's own API. The backend validates input, reads and writes the database, calls the external API and caches its results.

---

## 📊 How the Data Works

- **Degrees:** no public API gives eligibility and duration for every degree, so the catalog is built from a list of degree names plus one rule set per degree family (for example engineering, medical via NEET, commerce). `server/src/data/degreeCatalog.js` combines them and `npm run seed` writes them to MongoDB.
- **Scholarships:** Karnataka department schemes are published on department websites with no common API, so they are curated records with an official link. Amounts and deadlines stay empty until confirmed.
- **Universities:** fetched from the Hipolabs API on demand and cached per country. If the API fails, saved results are shown with a notice.
- **Verification:** everything is imported as `unverified`. After a record is checked against its official source, its status is set to `verified` with a `lastVerified` date. Re-running the seed never overwrites a verified record.

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18 or newer and npm
- Git
- A MongoDB Atlas cluster (the free tier works), with your IP allowed under Network Access

### 1. Clone the repository

```bash
git clone https://github.com/Sinchanam13/TheNextStep.git
cd TheNextStep
```

### 2. Set up the backend

```bash
cd server
npm install
```

Create `server/.env` (see `server/.env.example`):

```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
CLIENT_ORIGIN=http://localhost:5173
```

Optional settings:

| Variable | Description |
|---|---|
| `HIPOLABS_BASE_URL` | Hipolabs API base URL (has a default) |
| `CACHE_TTL_HOURS` | How long cached university lists stay fresh (default 168) |
| `DNS_SERVERS` | For networks that block MongoDB SRV lookups, for example `8.8.8.8,1.1.1.1` |

Load the data, then start the server:

```bash
npm run seed
npm run dev
```

`npm run seed` fills the database with the degrees and scholarships. Without it, the app opens but shows no data. It is safe to run again.

### 3. Set up the frontend

Open a second terminal:

```bash
cd client
npm install
npm run dev
```

Open http://localhost:5173. In development, Vite forwards `/api` requests to `http://localhost:5000`, so no frontend `.env` is needed locally.

### 4. Run the tests

```bash
cd server
npm test
```

---

## 🌐 Deployment

| Component | Platform |
|---|---|
| Frontend | Vercel |
| Backend | Render |
| Database | MongoDB Atlas |

**Vercel (frontend)**

```env
VITE_API_URL=https://thenextstep.onrender.com/api
```

**Render (backend)**

```env
CLIENT_ORIGIN=https://client-zeta-eight-40.vercel.app
MONGODB_URI=your_private_mongodb_connection_string
```

Set the real connection string privately in Render's environment settings and never commit it to GitHub.

**Notes**
- Atlas Network Access must allow the hosting platform. Free Render instances don't have a fixed outbound IP, so an allow-all entry (`0.0.0.0/0`) is a common setup, with the database username and password as the protection. Use a restricted list where your host provides fixed IPs.
- For deep links such as `/careers` to work after a refresh, the frontend needs a single-page-app rewrite. Add `client/vercel.json` with `{ "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }] }`.

**Automatic deployment:** pushing to the `main` branch rebuilds Vercel and Render when automatic deploys are enabled. After each deploy, open the live site and check a degree, a scholarship section and a country.

---

## 📂 Project Structure

```text
TheNextStep/
├── client/                 React + Vite frontend
│   └── src/
│       ├── pages/          Home, Careers, DegreeDetail, Scholarships, Abroad, Shortlist, About
│       ├── components/     shared UI (cards, chips, pagination, report form)
│       ├── context/        shortlist state (localStorage)
│       └── hooks/          data fetching, debouncing, page titles
├── server/                 Node.js + Express backend
│   ├── src/
│   │   ├── config/         environment validation, database connection
│   │   ├── controllers/    request handling
│   │   ├── services/       external API and caching logic
│   │   ├── models/         Mongoose schemas
│   │   ├── routes/         API routes
│   │   ├── middleware/     validation and error handling
│   │   ├── data/           degree catalog (names and rules per degree family)
│   │   └── seed/           seed scripts and scholarship data
│   └── tests/              API and data tests
└── README.md
```

---

## 🔌 API

| Endpoint | Description |
|---|---|
| `GET /api/health` | Health check |
| `GET /api/categories` | Fields of study with degree counts |
| `GET /api/degrees` | Query: `stream`, `category`, `q`, `page`, `limit` |
| `GET /api/degrees/:slug` | One degree |
| `GET /api/scholarships` | Query: `section`, `category`, `level`, `field`, `q`, `page`, `limit` |
| `GET /api/scholarships/summary` | Scholarship counts per section |
| `GET /api/countries` | Countries for the selector |
| `GET /api/universities` | Query: `country` (required), `q`, `page`, `limit` |
| `POST /api/reports` | Submit an outdated or wrong information report |

---

## 🔒 Security and Reliability

- Secrets live in environment variables and `.env` files are never committed
- helmet, a CORS allowlist, request body limits, and rate limiting (stricter on the report endpoint)
- Every query and request body is validated, and search patterns are escaped
- The external university API is called only from the server
- Cached data is served if the external API is down
- The server refuses to start if required configuration is missing

---

## ⚠️ Limitations

- Degrees and scholarships are mostly **unverified**. Confirm eligibility, dates and fees on the official site before applying.
- Degree rules are written per degree family, so individual colleges and universities may differ.
- Karnataka scholarship amounts and deadlines are not stored yet.
- The Hipolabs dataset does not include every university, and some website links may be outdated.

## 🗺️ Roadmap

- Verify the most-viewed degrees and the Karnataka scholarships against official pages
- Admin page to edit and verify records without touching the database directly
- Scheduled link checker for official source URLs
- Import scholarships from the myScheme API (needs API Setu access)
- Colleges in Karnataka for each degree, using AISHE directory data
- More automated tests, including the frontend and database

---

## 👩‍💻 Developer

**Sinchana M**

MCA Student | Full-Stack Development

- GitHub: https://github.com/Sinchanam13

---

## 📄 Disclaimer

TheNextStep is an educational discovery platform. Information on the website is for general guidance and may not reflect the latest admission rules, scholarship eligibility, fees or deadlines. Please verify important details through official sources before making decisions.
