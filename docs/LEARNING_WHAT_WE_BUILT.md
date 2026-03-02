# What We Built – Macro & Micro (with diagrams)

Short, diagram-first overview of the platform: what we use, why, and alternatives.

---

## 1. Macro: System overview

```
┌─────────────────────────────────────────────────────────────────────────┐
│                           USER (browser)                                  │
└────────────────────────────────┬────────────────────────────────────────┘
                                  │
                                  ▼
┌─────────────────────────────────────────────────────────────────────────┐
│  VERCEL (hosting)                                                        │
│  ┌───────────────────────────────────────────────────────────────────┐  │
│  │  NEXT.JS APP (React + API routes)                                  │  │
│  │  • Pages (Subject pick → Category pick → Quiz → Progress)           │  │
│  │  • API routes: /api/quiz/session, /api/quiz/categories,             │  │
│  │               /api/progress, /api/admin/*                           │  │
│  └───────────────────────────────────────────────────────────────────┘  │
└────────────────────────────────┬────────────────────────────────────────┘
                                  │
          ┌───────────────────────┼───────────────────────┐
          ▼                       ▼                       ▼
┌─────────────────┐    ┌─────────────────────┐    ┌─────────────────┐
│  GIT (GitHub)   │    │  SUPABASE           │    │  Local / Env    │
│  • Code repo    │    │  • questions table  │    │  • .env.local   │
│  • Version      │    │  • quiz_progress    │    │  • API keys     │
│    control      │    │  • Auth (optional)  │    │                 │
└─────────────────┘    └─────────────────────┘    └─────────────────┘
```

---

## 2. What we used → Why → Alternatives

| We used | What it is | Why we used it | Other options |
|--------|------------|----------------|----------------|
| **Vercel** | Hosting + serverless for the web app | Deploy Next.js easily, free tier, auto deploy from Git | Netlify, Railway, AWS Amplify, self-host (VPS) |
| **Git** | Version control for code | Track changes, collaborate, rollback, deploy from a branch | None for “version control” (Git is standard); hosting: GitHub, GitLab, Bitbucket |
| **Supabase** | Backend-as-a-Service (DB + APIs) | PostgreSQL DB in the cloud, REST/API, free tier, no server to manage | Firebase, PlanetScale, Neon, Aiven, self-hosted PostgreSQL |
| **Next.js** | React framework (pages + API) | One repo for UI and API, good DX, works great on Vercel | Remix, Nuxt (Vue), SvelteKit, plain React + Express |
| **TypeScript** | Typed JavaScript | Fewer bugs, better editor help | JavaScript only |
| **Tailwind CSS** | Utility CSS framework | Fast styling, no separate CSS files | Plain CSS, styled-components, Chakra, MUI |
| **React** | UI library | Components, state, big ecosystem | Vue, Svelte, Angular |

---

## 3. Macro: Data flow (one picture)

```mermaid
flowchart LR
    subgraph User
        A[Browser]
    end
    subgraph Vercel["Vercel (Next.js)"]
        B[Pages]
        C[API routes]
    end
    subgraph Data
        D[(Supabase DB)]
    end
    A --> B
    A --> C
    C --> D
    B --> C
```

**In words:** Browser talks to Next.js (on Vercel). Next.js pages render UI; API routes read/write Supabase. No direct browser → DB.

---

## 4. Why this combo?

| Goal | How we did it |
|------|----------------|
| Put the app on the internet | Vercel runs the app and gives a URL |
| Save questions & progress | Supabase stores them in a DB |
| Update app without losing history | Git keeps history; Vercel deploys from Git |
| One codebase for UI + backend | Next.js = React + API routes in one project |

---

## 5. Micro: Tech roles (diagram)

```mermaid
flowchart TB
    subgraph "Your machine"
        G[Git] --> | push | R[GitHub etc.]
        N[npm install / build] --> | run | APP[Next.js app]
    end
    subgraph "Cloud"
        R --> | deploy | V[Vercel]
        V --> APP2[Next.js on Vercel]
        APP2 --> | read/write | S[(Supabase)]
    end
```

- **Git**: code lives in a repo; you push to GitHub (or similar).
- **Vercel**: pulls from the repo and runs the Next.js app in the cloud.
- **Supabase**: the app (on Vercel) connects to Supabase to load questions and save progress.

---

## 6. Micro: Quiz flow (what happens when you “Start quiz”)

```mermaid
sequenceDiagram
    participant U as User
    participant P as Page (React)
    participant API as /api/quiz/session
    participant DB as Supabase

    U->>P: Select subject + categories, Start quiz
    P->>API: GET /api/quiz/session?subject=Math&categories=Addition
    API->>API: Pick templates or DB questions
    API->>DB: (if needed) fetch questions
    DB-->>API: rows
    API-->>P: JSON: 10 questions
    P->>U: Show Q1, options, timer
```

Same idea for **Progress**: page calls `/api/progress` → API reads/writes Supabase → returns data to the page.

---

## 7. Alternatives at a glance

| Layer | We use | Alternatives (short) |
|-------|--------|----------------------|
| Hosting | Vercel | Netlify, Railway, Fly.io, AWS, VPS |
| Database | Supabase | Firebase, PlanetScale, Neon, MongoDB Atlas, PostgreSQL on a server |
| Version control | Git (+ GitHub) | GitLab, Bitbucket (all use Git) |
| Front-end | React (Next.js) | Vue (Nuxt), Svelte (SvelteKit), Angular |
| Styling | Tailwind | Plain CSS, Bootstrap, Chakra, MUI |

---

## 8. One-page “stack” diagram

```mermaid
flowchart TB
    subgraph Frontend
        React[React components]
        Tailwind[Tailwind CSS]
    end
    subgraph Backend
        NextAPI[Next.js API routes]
    end
    subgraph Services
        Vercel[Vercel]
        Supabase[(Supabase)]
    end
    subgraph Dev
        Git[Git]
        TS[TypeScript]
    end

    React --> NextAPI
    NextAPI --> Supabase
    NextAPI --> Vercel
    React --> Vercel
    Git --> Vercel
    TS --> React
    TS --> NextAPI
    Tailwind --> React
```

---

## 9. Load testing: how we test parallel usage

We simulate many users hitting the app at once with a script so you can see how it behaves under load on your machine (or against a deployed URL).

### What the script does

- The script **`scripts/load-test-parallel.mjs`** runs in Node.js. For each "user" it sends two requests in order:
  1. **GET** `/api/quiz/categories?subject=Mathematics` → fetch list of categories
  2. **GET** `/api/quiz/session?categories=Addition,Subtraction&subject=Mathematics` → fetch 10 questions for a quiz
- **One "user"** = one complete run of that sequence.
- **N parallel users** = N such sequences started at the same time (`Promise.all`), so the server receives N concurrent flows.

### How success is defined

| Result | Meaning |
|--------|--------|
| **Success** | Categories returned HTTP 200 **and** session returned 200 with a non-empty `questions` array (or 200 with no questions still counts as success). |
| **Failed** | Categories non-200 (e.g. 404, 500), or session non-200, or no questions when expected, or any network/error. |

**Success rate** = (number of successful users) ÷ (number of parallel users).

- Example: `Success (categories + session ok): 8/10` → success rate = **80%**.
- Example: `Success: 10/10` → success rate = **100%**.

### What the script prints

| Output | What it means |
|--------|----------------|
| `Success (categories + session ok): X/N` | X of N simulated users got both requests successful. |
| `Failed: M` | M users had at least one failure; up to 5 examples are shown (e.g. `categories 404` or `session 500`). |
| `Throughput: R requests/s` | (N users × 2 requests) ÷ time in seconds; rough API calls per second. |

Before the full run, the script does a **pre-check**: one GET to the categories URL. If that returns non-200, the script exits and tells you to ensure the app is running and the base URL is correct.

### How to run it

1. Start the app (e.g. `npm run dev`) and leave it running.
2. In another terminal, from the project root:
   - `node scripts/load-test-parallel.mjs` → 10 parallel users, default `http://localhost:3000`
   - `node scripts/load-test-parallel.mjs 20` → 20 parallel users
   - `node scripts/load-test-parallel.mjs 50 http://localhost:3001` → 50 users, custom base URL

Success rate = **(Success count printed) ÷ (number of parallel users you passed)**.

### Why this is "parallel usage" testing

- Many requests are in flight at once, similar to many people using the app at the same time.
- If you increase the number and the success rate drops or more failures appear, you are near the capacity of your setup (Node, Supabase, or machine).

---

## 10. Summary

- **Macro:** Browser → Vercel (Next.js) → Supabase. Git holds code; Vercel deploys from Git.
- **Micro:** Next.js = React (UI) + API routes (server). API routes talk to Supabase. TypeScript + Tailwind for code and styling.
- **Why each:** Vercel = easy deploy; Supabase = DB without managing a server; Git = history and safe deploys; Next.js = one app for UI and API.
- **Load testing:** `scripts/load-test-parallel.mjs` simulates N users each doing categories + session in parallel; success rate = (successful users) / N; throughput = total requests / time.
- **Alternatives:** Different hosts (Netlify, Railway), different DBs (Firebase, PlanetScale), same idea: app in cloud, DB in cloud, code in Git.

If you want to go deeper on one part (e.g. only Supabase, or only “from Git to Vercel”), say which and we can do a single-page “micro” doc for that.
