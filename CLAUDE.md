# Agent.md — real-estate-agent
> Persistent memory for every Agent Code session in this project.
> Author: SNTL84 | Milind Soni | desidevloper.com

---

## 🏠 Project: Real Estate Claude Agent

**Purpose:** Autonomous AI agent that takes a property address (Surat / Gujarat focus)
and generates a complete valuation + investment report using Skills, Hooks, and subagents.

**Stack:** TypeScript · Node.js · Vite · Claude API · Perplexity API

**Live URL:** desidevloper.com/re-agent _(deploy target)_

---

## 📁 Architecture

```
real-estate-claude-agent/
├── CLAUDE.md                  ← You are here (L1: persistent context)
├── .claude/
│   ├── settings.json          ← Permissions & hooks config
│   └── settings.local.json    ← Local API keys (never commit)
├── skills/                    ← L2: Auto-invoked knowledge packs
│   ├── property-valuation/
│   │   └── SKILL.md
│   ├── market-research/
│   │   └── SKILL.md
│   └── report-generator/
│       └── SKILL.md
├── hooks/                     ← L3: Safety gates & validators
│   ├── pre-tool-use.sh        ← Validates address format before API call
│   └── post-tool-use.sh       ← Logs every API call with timestamp
├── agents/                    ← L4: Subagents
│   └── valuation-agent.md
├── src/
│   ├── index.ts               ← Entry point
│   ├── agent.ts               ← Core orchestration logic
│   ├── tools/
│   │   ├── fetchMarketData.ts
│   │   ├── runValuation.ts
│   │   └── generateReport.ts
│   └── types/
│       └── property.ts
├── commands/
│   └── deploy.md
├── arc/                       ← Archived sessions / old prompts
└── .gitignore
```

---

## ⚙️ Tech Stack

- **Runtime:** Node.js 18+ (required for Claude Code)
- **Language:** TypeScript (strict mode)
- **Build:** Vite
- **AI:** Claude Sonnet via Anthropic API
- **Research:** Perplexity API for live market data
- **Testing:** Jest with AAA pattern (Arrange · Act · Assert)

---

## 🚀 Commands

```bash
npm run dev          # Start dev server
npm run build        # Production build
npm run test         # Run Jest test suite
npm run lint         # ESLint check
npm run agent        # Run the RE agent CLI: node dist/agent.js
```

---

## 🧠 Domain Context (CRITICAL — Read Every Session)

Milind has **6+ years** as Real Estate Consultant at Krishna Realtor, Surat.

### Key Surat Market Knowledge:
- **Micro-markets:** Vesu, Adajan, Pal, Althan, Dumas Road, City Light, Katargam
- **Property types:** 1BHK/2BHK residential, commercial shops, industrial plots (GIDC)
- **Price range benchmarks (2025):**
  - Vesu / Adajan premium: ₹65–90 lakh (2BHK)
  - Katargam affordable: ₹25–45 lakh (2BHK)
  - Commercial (Majura Gate area): ₹1.5–4 cr
- **Key regulations:** RERA Gujarat, GERA Act, stamp duty @ 4.9%
- **Rental yield:** Typically 2.5–4% annually in Surat

### Valuation Methodology:
1. Comparable Sales Method (primary)
2. Income Capitalization (for rentals)
3. Cost Approach (for new construction)

---

## 🛡️ Gotchas (Never Infer These)

- NEVER hardcode API keys — always read from `.env`
- NEVER store client PII in logs or arc/ folder
- Address validation MUST run before any external API call (Hook enforces this)
- All valuations are **estimates** — always add disclaimer in output
- Gujarat stamp duty rates change — always fetch live, never assume

---

## 🔗 Reference Docs

- `@skills/property-valuation/SKILL.md` — valuation logic
- `@skills/market-research/SKILL.md` — Perplexity integration
- `@skills/report-generator/SKILL.md` — PDF report output
- `@agents/valuation-agent.md` — subagent instructions
- Gujarat RERA: https://gujrera.gujarat.gov.in

---

## 📋 Workflow (Follow Every Session)

1. `cd real-estate-claude-agent && claude`
2. `Shift+Tab` → Plan Mode → describe what you're building
3. `/init` if fresh session
4. Reference skills with `@skills/<name>/SKILL.md`
5. `/compact` after every major feature
6. Commit after each working feature — never leave broken state on main
7. Start new Claude session per feature branch

---

## ✅ Definition of Done (per feature)

- [ ] TypeScript compiles with zero errors
- [ ] Jest tests pass (AAA pattern, min 1 test per function)
- [ ] Hook validation tested with bad input
- [ ] CLAUDE.md updated if new domain knowledge added
- [ ] Committed with conventional commit message: `feat: add property-type classifier`
