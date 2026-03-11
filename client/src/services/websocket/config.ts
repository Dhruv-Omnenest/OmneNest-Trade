export const WS_BASE_URL = "wss://preprodapisix.omnenest.com/v1/ws";
export const PING_INTERVAL_MS = 25_000;
export const PONG_TIMEOUT_MS = 7_000;
export const RECONNECT_BASE_DELAY_MS = 1_000;   
export const RECONNECT_MAX_DELAY_MS  = 30_000;  
export const RECONNECT_MAX_ATTEMPTS  = 10;      
export const RECONNECT_JITTER_MS     = 500;     
export function getReconnectDelay(attempt: number): number {
  const base   = Math.pow(2, attempt) * RECONNECT_BASE_DELAY_MS;
  const jitter = Math.random() * RECONNECT_JITTER_MS;
  return Math.min(base + jitter, RECONNECT_MAX_DELAY_MS);
}
export const DEFAULT_SUBSCRIPTIONS = [
  {
    exchange: "NSE_CM" as const,
    tokens: ["11377"],
  },
];
export const PING_PAYLOAD = JSON.stringify({ action: "PING" });
 

