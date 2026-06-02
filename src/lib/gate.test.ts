import { gateDecision } from './gate'

describe('gateDecision', () => {
  const token = 'secret-token'

  it('allows everything outside production (local dev)', () => {
    expect(gateDecision({ token: undefined, provided: null, cookie: undefined, isProd: false }))
      .toEqual({ type: 'allow' })
  })

  it('denies (fails closed) in production when token is not configured', () => {
    expect(gateDecision({ token: undefined, provided: 'x', cookie: 'x', isProd: true }))
      .toEqual({ type: 'deny' })
  })

  it('unlocks when the ?k token matches', () => {
    expect(gateDecision({ token, provided: token, cookie: undefined, isProd: true }))
      .toEqual({ type: 'unlock' })
  })

  it('allows when a valid cookie is present', () => {
    expect(gateDecision({ token, provided: null, cookie: token, isProd: true }))
      .toEqual({ type: 'allow' })
  })

  it('denies when neither token nor cookie matches', () => {
    expect(gateDecision({ token, provided: 'wrong', cookie: 'wrong', isProd: true }))
      .toEqual({ type: 'deny' })
  })

  it('prefers unlock over an already-valid cookie', () => {
    expect(gateDecision({ token, provided: token, cookie: token, isProd: true }))
      .toEqual({ type: 'unlock' })
  })
})
