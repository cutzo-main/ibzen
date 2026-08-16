import { ConvexReactClient } from "convex/react";

const convexUrl =
  (typeof import.meta !== "undefined" && import.meta.env ? import.meta.env.VITE_CONVEX_URL : undefined) ??
  (typeof process !== "undefined" && process.env ? process.env.CONVEX_URL : undefined) ??
  "https://kindred-rat-434.convex.cloud";

// Lazily instantiate only on the client to avoid crashing during SSR
// (ConvexReactClient opens a WebSocket, which is unavailable in Node.js)
let _convex: ConvexReactClient | null = null;
export function getConvex(): ConvexReactClient {
  if (typeof window === "undefined") {
    // Return a dummy client during SSR. Since we wrap Convex-dependent
    // routes with a client-only boundary, no Convex hooks will be called on the server.
    return {} as ConvexReactClient;
  }
  if (!_convex) {
    _convex = new ConvexReactClient(convexUrl);
  }
  return _convex;
}

// Keep a named export for direct use in root (it's fine there since root mounts client-side)
export const convex = typeof window !== "undefined" ? new ConvexReactClient(convexUrl) : null as unknown as ConvexReactClient;
