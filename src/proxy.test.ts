describe('portal proxy config', () => {
  beforeAll(() => {
    Object.assign(globalThis, {
      Request: globalThis.Request ?? class Request {},
      Response: globalThis.Response ?? class Response {},
      Headers: globalThis.Headers ?? class Headers {},
    })
  })

  it('scopes the portal cookie to the whole site so the header can see it', async () => {
    const { PORTAL_COOKIE_PATH } = await import('./proxy')

    expect(PORTAL_COOKIE_PATH).toBe('/')
  })
})
