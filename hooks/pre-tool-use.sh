#!/bin/bash
# hooks/pre-tool-use.sh
# L3: Safety gate — runs BEFORE every external API call
# Part of SNTL84 Framework | real-estate-claude-agent
# Exit 0 = allow | Exit 2 = block

TOOL_NAME="$1"
INPUT_JSON="$2"

LOG_FILE="arc/hook-log.txt"
mkdir -p arc
echo "[$(date -u +%Y-%m-%dT%H:%M:%SZ)] PRE-HOOK | Tool: $TOOL_NAME" >> "$LOG_FILE"

# ── Guard 1: Block if no .env file ─────────────────────────────────────────
if [ ! -f ".env" ]; then
  echo "❌ BLOCKED: .env file missing. API keys not configured." >&2
  echo " Run: cp .env.example .env && add your keys" >&2
  exit 2
fi

# ── Guard 2: Address validation before API calls ───────────────────────────
if echo "$TOOL_NAME" | grep -qi "fetchMarketData\|runValuation"; then

  ADDRESS=$(echo "$INPUT_JSON" | grep -o '"address":"[^"]*"' | cut -d'"' -f4)

  if [ -z "$ADDRESS" ]; then
    echo "❌ BLOCKED: address field is empty. Cannot call external API without a valid property address." >&2
    exit 2
  fi

  GUJARAT_CITIES="Surat|Ahmedabad|Vadodara|Rajkot|Gandhinagar|Anand|Bharuch"
  if ! echo "$ADDRESS" | grep -qiE "$GUJARAT_CITIES"; then
    echo "⚠️ WARNING: Address doesn't appear to be in Gujarat: '$ADDRESS'" >&2
    echo " This agent is optimised for Gujarat properties." >&2
    echo " Proceeding anyway — verify market data manually." >&2
  fi

  echo "[$(date -u +%Y-%m-%dT%H:%M:%SZ)] Address validated: $ADDRESS" >> "$LOG_FILE"
fi

# ── Guard 3: Prevent PII in logs ───────────────────────────────────────────
SANITIZED=$(echo "$INPUT_JSON" | sed 's/[0-9]\{10\}/[REDACTED]/g')
echo "[$(date -u +%Y-%m-%dT%H:%M:%SZ)] Input (sanitized): $SANITIZED" >> "$LOG_FILE"

# ── Guard 4: Block destructive file operations ─────────────────────────────
if echo "$TOOL_NAME" | grep -qi "write\|delete\|rm\|overwrite"; then
  if echo "$INPUT_JSON" | grep -qi "CLAUDE\.md\|settings\.json\|\.env"; then
    echo "❌ BLOCKED: Attempt to modify protected config files." >&2
    exit 2
  fi
fi

# ── Allow ──────────────────────────────────────────────────────────────────
echo "[$(date -u +%Y-%m-%dT%H:%M:%SZ)] PRE-HOOK PASSED | Tool: $TOOL_NAME" >> "$LOG_FILE"
exit 0