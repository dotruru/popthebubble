/** What the middleware should do with a request to a gated route. */
export type GateDecision =
  | { type: 'allow' } // pass through
  | { type: 'unlock' } // token matched: set cookie + redirect to clean URL
  | { type: 'deny' } // show the "not available" page

export interface GateInput {
  /** The configured shared token (PORTAL_ACCESS_TOKEN), or undefined if unset. */
  token: string | undefined
  /** The `?k=` query value on this request, if any. */
  provided: string | null
  /** The hh_portal cookie value on this request, if any. */
  cookie: string | undefined
  /** Whether we're running in production. The gate is only enforced in prod. */
  isProd: boolean
}

export function gateDecision({ token, provided, cookie, isProd }: GateInput): GateDecision {
  if (!isProd) return { type: 'allow' } // frictionless local dev
  if (!token) return { type: 'deny' } // misconfigured prod → fail closed
  if (provided && provided === token) return { type: 'unlock' }
  if (cookie && cookie === token) return { type: 'allow' }
  return { type: 'deny' }
}
