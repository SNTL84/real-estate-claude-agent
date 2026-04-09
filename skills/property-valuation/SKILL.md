# SKILL.md — property-valuation
> Auto-invoked by Claude Code when task involves: valuation, price estimate,
> property worth, market value, appraisal, investment analysis.
> Part of SNTL84 Framework | real-estate-claude-agent

---

## 🎯 Purpose

Generate a structured property valuation for any residential or commercial
property in Surat / Gujarat using 3-method approach with confidence scoring.

---

## 🔍 Trigger Phrases

- "value this property"
- "what is this flat worth"
- "estimate price for"
- "investment potential"
- "should I buy / sell at X price"
- "rental yield for"
- "compare this listing"

---

## 📊 Valuation Algorithm

### Step 1 — Collect Property Data

```typescript
interface PropertyInput {
  address: string;
  propertyType: 'residential' | 'commercial' | 'industrial' | 'plot';
  configuration?: string;
  builtUpArea: number;
  carpetArea?: number;
  floorNumber?: number;
  totalFloors?: number;
  ageYears?: number;
  amenities?: string[];
  askingPrice?: number;
  purpose: 'buy' | 'sell' | 'rent' | 'investment-analysis';
}
```

### Step 2 — Run 3-Method Valuation

#### Method A: Comparable Sales (60%)
#### Method B: Income Capitalization (25%)
#### Method C: Cost Approach (15%)

### Step 3 — Investment Score (0–10)

```
8–10: Strong Buy | 6–7: Buy with negotiation
4–5: Hold/Neutral | 2–3: Avoid | 0–1: Walk away
```

---

## ⚠️ Disclaimer

All valuations are AI estimates. Always consult RERA-registered agent.
Contact: Milind Soni | +91 97274 13309 | sonymilind@yahoo.co.in