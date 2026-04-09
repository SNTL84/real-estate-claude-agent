// src/agent.ts
// Real Estate Claude Agent — Core Orchestration
// SNTL84 Framework | desidevloper.com
// Run: npx ts-node src/agent.ts

import Anthropic from '@anthropic-ai/sdk';
import * as dotenv from 'dotenv';
import * as readline from 'readline';

dotenv.config();

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

// ─── System Prompt ─────────────────────────────────────────────────────────
const SYSTEM_PROMPT = `
You are the SNTL84 Real Estate Agent — an expert property analyst for Surat, Gujarat, India.

Your creator is Milind Soni (SNTL84), a Real Estate Consultant with 6+ years at Krishna Realtor, Surat.

## Your Capabilities:
1. Property Valuation — estimate fair market value using 3-method approach
2. Investment Analysis — score properties 0–10 for investment potential
3. Market Research — summarize locality trends and comparable sales
4. Negotiation Advice — suggest opening offers and walk-away prices
5. RERA Check — flag if project seems unregistered or suspicious

## Your Domain Knowledge:
- Deep expertise in Surat micro-markets: Vesu, Adajan, Pal, Althan, City Light, Katargam
- Current price benchmarks, rental yields, infrastructure projects
- Gujarat RERA regulations, stamp duty (4.9%), registration charges

## Your Behavior:
- Always ask for: address, property type, area in sqft, and purpose (buy/sell/rent/invest)
- If user gives partial info, work with what you have but flag what's missing
- Always include disclaimer: "This is an AI estimate. Consult a RERA-registered agent."
- Sign off every report with: "Prepared by SNTL84 Agent | Contact: +91 97274 13309"

## Output Style:
- Use ₹ for all amounts
- Format prices in lakhs/crores (e.g., ₹65 lakh, ₹1.2 crore)
- Be direct and confident — give actual numbers, not vague ranges
- Use tables for comparisons
`;

// ─── Conversation History ──────────────────────────────────────────────────
interface Message {
  role: 'user' | 'assistant';
  content: string;
}

const history: Message[] = [];

// ─── Core Agent Function ───────────────────────────────────────────────────
async function runAgent(userMessage: string): Promise<string> {
  history.push({ role: 'user', content: userMessage });

  const response = await client.messages.create({
    model: 'claude-sonnet-4-20250514',
    max_tokens: 2000,
    system: SYSTEM_PROMPT,
    messages: history,
  });

  const assistantMessage = response.content
    .filter(block => block.type === 'text')
    .map(block => (block as { type: 'text'; text: string }).text)
    .join('\n');

  history.push({ role: 'assistant', content: assistantMessage });
  return assistantMessage;
}

// ─── CLI Interface ─────────────────────────────────────────────────────────
async function startCLI(): Promise<void> {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  console.log('\n╔══════════════════════════════════════════════════╗');
  console.log('║ 🏠 SNTL84 Real Estate Agent — Surat, Gujarat    ║');
  console.log('║    by Milind Soni | desidevloper.com            ║');
  console.log('╚══════════════════════════════════════════════════╝');
  console.log('\nType your property question. Type "exit" to quit.\n');

  const welcome = await runAgent('Introduce yourself briefly and ask me what property I need help with today.');
  console.log(`\n🤖 Agent: ${welcome}\n`);

  const askQuestion = (): void => {
    rl.question('You: ', async (input) => {
      const userInput = input.trim();
      if (!userInput) { askQuestion(); return; }
      if (userInput.toLowerCase() === 'exit') {
        console.log('\n✅ Session ended. Data saved to arc/. Goodbye!\n');
        rl.close();
        process.exit(0);
      }
      try {
        console.log('\n⏳ Analyzing...\n');
        const response = await runAgent(userInput);
        console.log(`🤖 Agent: ${response}\n`);
      } catch (error) {
        console.error('❌ Error:', error);
      }
      askQuestion();
    });
  };

  askQuestion();
}

// ─── Entry Point ───────────────────────────────────────────────────────────
startCLI().catch(console.error);