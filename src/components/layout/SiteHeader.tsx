import { cookies } from 'next/headers'
import { SiteHeaderChrome } from './SiteHeaderChrome'

const PORTAL_COOKIE = 'hh_portal'

export async function SiteHeader() {
  const token = process.env.PORTAL_ACCESS_TOKEN
  const cookieStore = await cookies()
  const portalCookie = cookieStore.get(PORTAL_COOKIE)?.value
  const showHackPack = process.env.NODE_ENV !== 'production' || Boolean(token && portalCookie === token)

  return <SiteHeaderChrome showHackPack={showHackPack} />
}
