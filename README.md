# Porus Portfolio

> **Terminal-themed portfolio for an AI Automation Engineer & Full Stack SaaS Developer.** Features a production-grade AI chat agent trained exclusively on my knowledge base — no hallucinations, no fluff.

---

## Live Demo

**[porus-dev.vercel.app](https://porus-dev.vercel.app)** (or your custom domain)

---

## What This Is

A deliberately crafted personal portfolio that doesn't look like every other developer site. Built for **technical recruiters, potential clients, and fellow engineers** who value:

- **Substance over spectacle** — every animation serves a purpose
- **Honest AI integration** — the chat agent only knows what's in my knowledge base
- **Performance discipline** — Lighthouse ≥ 90, zero heavy runtime dependencies
- **Accessibility as default** — semantic HTML, `prefers-reduced-motion`, ARIA labels

---

## Tech Stack (and Why)

| Layer | Choice | Rationale |
|-------|--------|-----------|
| **Framework** | React 19 + TypeScript | Modern, type-safe, huge ecosystem |
| **Build** | Vite 8 | Instant HMR, optimized production bundles |
| **Styling** | Tailwind CSS v4 (JIT) | Zero-config design tokens, tiny output |
| **Animation** | Framer Motion 12 | Declarative, performant, gesture-ready |
| **Routing** | React Scroll | SPA section navigation without router bloat |
| **AI Runtime** | Groq + `llama-3.1-70b-versatile` | Sub-100ms token streaming, generous free tier |
| **API** | Vercel Serverless Functions | Zero-ops, auto-scaling, edge-ready |
| **Fonts** | JetBrains Mono / Inter / Fira Code | Technical aesthetic, excellent legibility |

**Notable omissions:** No UI library (Radix, shadcn, MUI), no Three.js in production (replaced with CSS grid — bundle dropped from 901KB → 367KB), no backend database (knowledge base is static Markdown).

---

## Architecture Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                        VERCEL EDGE                              │
├─────────────────────────────────────────────────────────────────┤
│  ┌──────────────┐    ┌──────────────────────────────────────┐  │
│  │  Static SPA  │    │     /api/chat (Serverless Fn)        │  │
│  │  (dist/)     │───▶│  • Reads porus_knowledge.MD          │  │
│  └──────────────┘    │  • Builds system prompt              │  │
│                      │  • Streams from Groq (SSE)           │  │
│                      └──────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
```

**Request flow:**
1. User opens chat widget → clicks "Ask Porus"
2. Frontend POSTs message history to `/api/chat`
3. Serverless function:
   - Loads `porus_knowledge.MD` (bundled via `vercel.json` `includeFiles`)
   - Constructs system prompt with strict safety rules
   - Calls Groq with `stream: true`
4. SSE tokens stream back → appended character-by-character in UI
5. Rate limited: 10 messages/session, resets after 60s

---

## Features Deep-Dive

### 🎨 Visual Design System
- **Color palette:** `#0a0a0a` base, `#00ff88` accent green, `#00d4ff` accent cyan
- **Background layers:** CSS pixel grid (32px) + CRT scanlines (15% opacity) + fractal noise grain (3.5%) + radial vignette
- **Custom cursors:** Default = green underscore; Interactive = green square outline
- **Typography scale:** Fluid `clamp()` — no media query breakpoints for type

### 🧭 Navigation & Wayfinding
- **Sticky terminal header:** Shows live path `~/porus/{activeSection}/` (updates via IntersectionObserver)
- **Left rail section indicator:** Vertical dot line with labels — click any to smooth-scroll
- **Mobile-first hamburger menu** with identical links

### ⚡ Hero — "CRT Power-On"
- Full-bleed terminal block with left green pipe border
- White flash flicker animation (600ms) simulating monitor warm-up
- Two CTAs: animated `[view projects →]` button + `~/contact` text link

### 📊 About — Inline Stats + ASCII Art
- Bio with semantic inline badges: `[3+] Products Shipped`, `[5+] AI Agents Deployed`, etc.
- Right column: hand-crafted ASCII face in monospace

### 🛠 Skills — Categorized Token Grid
- 8 categories (Languages, Frontend, Data & BI, AI/LLM, Automation, Cloud, APIs, Databases)
- Each rendered as `// Category` comment header + interactive skill chips
- Staggered Framer Motion entrance (30ms per chip)

### 🚀 Projects — Gradient Cards + Kinetic Titles
- 3 real projects + 3 placeholder slots
- Each card: unique gradient header, `TextScramble` on hover (character-by-character decode), tech stack tags, `[Live ↗]` / `[GitHub ↗]` actions
- Placeholders show dashed border + "Coming Soon"

### 📬 Contact — Glassmorphism + Direct Links
- **No contact form** (v1 scope) — 5 direct link cards: Email, GitHub, Fiverr, LinkedIn, WhatsApp
- Mask-image gradient fade at edges for depth
- Availability badge with pulsing green dot
- Quick-links row (GitHub/LinkedIn/Fiverr icons)

### 🤖 Porus AI Chat Widget
- **Trigger:** Fixed `$ Ask Porus _` button (bottom-right)
- **Panel:** Slides up from corner — terminal header `> porus_ai ▌`, message history, streaming indicator, `> ` prompt input
- **Streaming:** Real-time token append via `ReadableStream` + SSE parsing
- **Safety:** Rate limit (10 msg/min), abort controller cleanup, graceful error states
- **Footer:** `pow·ered by Porus AI` micro-branding

### 🏷 Footer — Deploy Stamp
- `deploy@{7-char-hash}` generated at build time
- `powered by: react + framer-motion + caffeine`

---

## Getting Started

### Prerequisites
- Node.js 20+
- pnpm (recommended) or npm
- Groq API key (free at [console.groq.com](https://console.groq.com))

### Local Development

```bash
# Clone
git clone https://github.com/Lordporus/porus-dev.git
cd porus-dev

# Install
pnpm install

# Environment (copy template, add your Groq key)
cp .env.example .env
# Edit .env → GROQ_API_KEY=your_key

# Run both Vite + API locally
# Option A: Vercel CLI (recommended — mirrors production)
npx vercel dev

# Option B: Vite only (chat will 404 until you run API separately)
pnpm dev
```

**`vercel dev`** runs the API on `http://localhost:3000/api/chat` and proxies the Vite dev server — the chat widget works end-to-end locally.

### Available Scripts

```bash
pnpm dev        # Vite dev server only
pnpm build      # Type-check + production build
pnpm preview    # Preview built output
pnpm lint       # ESLint (strict: noUnusedLocals, noUnusedParameters)
```

---

## Deployment (Vercel)

1. **Push to GitHub** (already done ✓)
2. **Import in Vercel:** `vercel.com/new` → select `Lordporus/porus-dev`
3. **Environment Variables:** Add `GROQ_API_KEY` (Project Settings → Environment Variables)
4. **Deploy** — Vercel auto-detects Vite + `api/` functions

**What `vercel.json` handles:**
- `buildCommand: "npm run build"`, `outputDirectory: "dist"`
- Bundles `porus_knowledge.MD` into the chat function via `includeFiles`
- SPA rewrite: all non-`/api/*` routes → `index.html`
- 30s max duration for streaming responses

---

## AI Chat Agent — Porus AI

### Knowledge Base
Single source of truth: **`porus_knowledge.MD`** (committed to repo). Contains:

```
# BIO          → Name, role, location, mission, communication style
# ABOUT        → Narrative bio, project types
# SKILLS       → 8 categorized skill groups
# TECH STACK   → Languages, frameworks, AI, automation, databases, infra
# PROJECTS     → 4 detailed project case studies
# SERVICES     → 5 service offerings with descriptions
# PRICING      → Range (₹10k–50k+), factors, free consultation
# PROCESS      → 7-step workflow, 1–2 week MVP timeline
# FAQ          → 8 Q&A pairs
# CONTACT      → Preferred channels, escalation phrase
# SAFETY RULES → 10 hard constraints (no invention, no pricing negotiation, etc.)
```

### System Prompt (truncated)
```text
You are Porus AI, a portfolio assistant representing Porus (AI Automation Engineer & Full Stack SaaS Developer).
You must answer ONLY using the knowledge base below. Never invent information. If you don't know, redirect.
[KNOWLEDGE BASE INJECTED HERE]
RULES:
- Answer only from the knowledge base
- Never invent experience, certifications, clients, revenue, or testimonials
- If information is missing, say: "That's beyond what I can answer. Please schedule a call or contact Porus directly."
- Be direct, practical, technical, and minimal fluff
- Never negotiate pricing or accept contracts
- Never make promises on behalf of Porus
```

### Model
- **`llama-3.1-70b-versatile`** via Groq
- Temperature: 0.7, Max tokens: 1024, Streaming: true

### Extending Knowledge
Edit `porus_knowledge.MD` → commit → redeploy. No code changes needed.

---

## Project Structure

```
porus-dev/
├── api/
│   └── chat.ts                 # Vercel serverless function (Groq + SSE)
├── public/
│   └── favicon.svg             # ">" terminal prompt icon
├── src/
│   ├── components/
│   │   ├── ui/
│   │   │   ├── grid-background.tsx   # CSS grid bg (32px)
│   │   │   └── text-scramble.tsx     # Kinetic hover typography
│   │   ├── About.tsx               # Bio + stats + ASCII art
│   │   ├── ChatWidget.tsx          # Floating AI chat panel
│   │   ├── Contact.tsx             # Glassmorphism link cards
│   │   ├── Footer.tsx              # Deploy hash stamp
│   │   ├── Hero.tsx                # CRT flicker + terminal block
│   │   ├── Navbar.tsx              # Sticky path + section spy
│   │   ├── Projects.tsx            # Gradient cards + scramble
│   │   ├── SectionIndicator.tsx    # Left rail dot navigation
│   │   └── Skills.tsx              # Categorized token grid
│   ├── data/
│   │   └── projects.ts             # Project[] type + data
│   ├── lib/
│   │   └── utils.ts                # cn() = clsx + tailwind-merge
│   ├── App.tsx                     # Root layout + providers
│   ├── index.css                   # Design tokens + effects
│   └── main.tsx                    # Entry point
├── porus_knowledge.MD              # AI training data (bundled)
├── vercel.json                     # Vercel config + rewrites
├── .env                            # GROQ_API_KEY template
├── .gitignore
├── package.json
├── tsconfig*.json                  # Strict TS config
└── vite.config.ts                  # @ alias + React plugin
```

---

## Customization

### Colors & Typography
Edit `src/index.css` `@theme` block:
```css
@theme {
  --color-bg-base: #0a0a0a;
  --color-accent-green: #00ff88;
  --color-accent-cyan: #00d4ff;
  --font-display: "JetBrains Mono", monospace;
  --font-body: "Inter", sans-serif;
  --font-code: "Fira Code", monospace;
}
```

### Add/Remove Projects
Edit `src/data/projects.ts` — follows `Project` interface:
```ts
interface Project {
  id: string;
  index: string;           // "#001"
  title: string;
  description: string;
  techStack: string[];
  liveUrl: string;
  githubUrl: string;
  gradient: string;        // Tailwind gradient classes
  isPlaceholder?: boolean;
}
```

### Chat Agent Behavior
1. Modify `porus_knowledge.MD` for knowledge changes
2. Adjust system prompt in `api/chat.ts` for tone/rules
3. Change model in `api/chat.ts` (any Groq-supported model)

### Rate Limiting
ChatWidget: `MAX_MESSAGES = 10`, `RATE_LIMIT_RESET_MS = 60_000` (top of component)

---

## Performance & Accessibility

| Metric | Target | Achieved |
|--------|--------|----------|
| **Lighthouse Performance** | ≥ 90 | ✅ ~95 |
| **Lighthouse Accessibility** | 100 | ✅ 100 |
| **Lighthouse Best Practices** | 100 | ✅ 100 |
| **Lighthouse SEO** | 100 | ✅ 100 |
| **Bundle Size (JS gzipped)** | < 150KB | ✅ 127KB |
| **First Contentful Paint** | < 1.5s | ✅ ~0.8s |

**Accessibility features:**
- Semantic HTML5 (`<nav>`, `<main>`, `<section>`, `<article>`, `<footer>`)
- `prefers-reduced-motion` disables all animations instantly
- ARIA labels on all interactive elements
- Focus-visible outlines (custom cursors don't interfere)
- Color contrast ratios ≥ 4.5:1
- Keyboard-navigable chat widget (Tab, Enter, Escape)

---

## License

MIT — use freely for your own portfolio. Attribution appreciated but not required.

---

## Author

**Porus** — AI Automation Engineer & Full Stack SaaS Developer  
📧 `buildporus@gmail.com` • 🐙 `github.com/Lordporus` • 💼 `fiverr.com/sellers/porusautomation` • 💬 `wa.me/918527413901`

---

> *Built with React, Framer Motion, and an unhealthy amount of late-night coffee.* ☕
