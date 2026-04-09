# 🏠 real-estate-agent

> **AI-powered property valuation & investment analysis for Surat, Gujarat**
> Built with Claude Code 4-Layer Architecture | SNTL84 Framework

[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue)](https://typescriptlang.org)
[![Claude](https://img.shields.io/badge/Claude-Sonnet-orange)](https://anthropic.com)
[![RERA](https://img.shields.io/badge/Gujarat-RERA%20Aware-green)](https://gujrera.gujarat.gov.in)
[![SNTL84](https://img.shields.io/badge/SNTL84-Framework-purple)](https://desidevloper.com)

---

## What This Does

Give it a property address → get a full investment report in seconds.

```bash
$ npm run agent

You: 2BHK flat in Vesu, Surat. Asking ₹72 lakhs. Good deal?

🤖 Agent:
## Property Analysis — Vesu 2BHK

Fair Market Value: ₹68–74 lakh ✅ (within range)
Investment Score: 7.5/10 — GOOD BUY
Recommended offer: ₹65 lakh
Rental potential: ₹20,000/month (3.1% yield)
5-year appreciation outlook: +35–45%
```

---

## Architecture (Claude Code 4-Layer)

```
L1 — CLAUDE.md          Persistent project memory + domain knowledge
L2 — Skills             Auto-invoked valuation + research packs
L3 — Hooks              Address validation, PII protection, API logging
L4 — Agents             Specialized subagents for complex analysis
```

---

## Skills Included

| Skill | Trigger | Description |
|-------|---------|-------------|
| `property-valuation` | "value this", "worth", "estimate" | 3-method valuation with confidence scoring |
| `market-research` | "market in X", "comparable sales" | Live data via Perplexity API |
| `report-generator` | "generate report", "PDF" | Formatted investment report output |

---

## Setup

```bash
# 1. Clone
git clone https://github.com/SNTL84/real-estate-claude-agent
cd real-estate-claude-agent

# 2. Install (requires Node.js 18+)
npm install

# 3. Configure API keys
cp .env.example .env
# Add: ANTHROPIC_API_KEY, PERPLEXITY_API_KEY

# 4. Run the agent
npm run agent

# 5. Or use with Claude Code
claude
```

---

## Domain Coverage

🗺️ **Surat Micro-markets:** Vesu · Adajan · Pal · Althan · City Light · Katargam · Dumas Road

📊 **Analysis Methods:**
- Comparable Sales (60% weight)
- Income Capitalization (25% weight)
- Cost Approach (15% weight)

⚖️ **Regulatory:** Gujarat RERA aware · Stamp duty @ 4.9% · GST considerations

---

## Project Structure

```
real-estate-claude-agent/
├── CLAUDE.md                    # L1: Project memory (read this first)
├── .claude/
│   ├── skills/
│   │   ├── property-valuation/SKILL.md
│   │   ├── market-research/SKILL.md
│   │   └── report-generator/SKILL.md
│   └── settings.json            # Hooks + permissions config
├── hooks/
│   ├── pre-tool-use.sh          # Address validation + safety
│   └── post-tool-use.sh         # Logging + cost tracking
├── src/
│   ├── agent.ts                 # Core orchestration
│   └── tools/                   # TypeScript tool functions
└── arc/                         # Session archives
```

---

## Built By

**Milind Soni (SNTL84)**
Strategic AI Workflow & Automation Professional
6+ years Real Estate Consulting, Krishna Realtor, Surat

🌐 [desidevloper.com](https://desidevloper.com)
📧 sonymilind@yahoo.co.in
📱 +91 97274 13309
💼 [LinkedIn](https://linkedin.com/in/SNTL2784/)

---

## Why This Exists

> *"Started in FMCG operations. Learned to code to fix what spreadsheets couldn't.
> Now I build AI-powered tools for founders and agencies who need results, not just features."*

After 6 years of manually researching Surat property markets, I automated the process
using Claude Code's 4-layer architecture. This agent encodes everything I know about
Gujarat real estate into a reusable, extensible AI system.

---

## License

MIT — Fork it, build on it, deploy it.
Credit appreciated: `Built on SNTL84 Framework by github.com/SNTL84`
