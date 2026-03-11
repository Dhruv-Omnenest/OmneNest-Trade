import type { RawTickFrame, MarketTick } from "./types";

export function parseRawFrame(data: string): unknown | null {
  try {
    return JSON.parse(data);
  } catch {
    console.warn("[WsParser] Malformed JSON, skipping frame:", data.slice(0, 120));
    return null;
  }
}
 
export function isPong(frame: unknown): boolean {
  if (!frame || typeof frame !== "object") return false;
  const f = frame as Record<string, unknown>;
  return f["action"] === "PONG" || f["type"] === "PONG";
}
 
export function isErrorFrame(frame: unknown): frame is { error: string; code?: number } {
  if (!frame || typeof frame !== "object") return false;
  return "error" in (frame as object);
}

export function extractTicks(frame: unknown): RawTickFrame[] {
  if (!frame || typeof frame !== "object") return [];
 
  const f = frame as Record<string, unknown>;
  if (Array.isArray(f["data"])) {
    return f["data"] as RawTickFrame[];
  }
 
  if (Array.isArray(frame)) {
    return frame as RawTickFrame[];
  }

  if (typeof f["token"] === "string" || typeof f["ltp"] === "number") {
    return [f as unknown as RawTickFrame];
  }
 
  return [];
}
 
export function normaliseTick(raw: RawTickFrame): MarketTick {
  const ltp    = raw.ltp ?? raw.indexValue ?? 0;
  const close  = raw.close ?? ltp;
  const change = raw.change ?? ltp - close;
  const changePct = raw.changePercent ?? raw.indexChangePercent
    ?? (close !== 0 ? (change / close) * 100 : 0);
 
  return {
    token:         raw.token       ?? "UNKNOWN",
    exchange:      raw.exchange    ?? "NSE_CM",
    ltp,
    volume:        raw.volume      ?? 0,
    bid:           raw.bid         ?? ltp,
    ask:           raw.ask         ?? ltp,
    open:          raw.open        ?? ltp,
    high:          raw.high        ?? ltp,
    low:           raw.low         ?? ltp,
    close,
    change:        parseFloat(change.toFixed(2)),
    changePercent: parseFloat(changePct.toFixed(2)),
    timestamp:     raw.timestamp   ?? Date.now(),
  };
}


export function parseMessage(data: string): MarketTick[] {
  const frame = parseRawFrame(data);
  
  if (!frame || isPong(frame) || isErrorFrame(frame)) {
    return [];
  }

  const rawTicks = extractTicks(frame);
  return rawTicks.map(normaliseTick);
}
 
