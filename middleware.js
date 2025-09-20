import { NextResponse } from 'next/server'
import { rootDomain } from '@/lib/configs/utils'

function extractSubdomain(request) {
  const host = request.headers.get('host') || ''
  const hostname = host.split(':')[0]

  if (hostname.endsWith(".localhost")) {
     return hostname.replace(".localhost") // happyshop.shop.localhost -> "happyshop"
  }

  // Production: handle rootDomain subdomains
  const rootDomainFormatted = rootDomain.split(':')[0]
  if (
    hostname !== rootDomainFormatted &&
    hostname !== `www.${rootDomainFormatted}` &&
    hostname.endsWith(`.${rootDomainFormatted}`)
  ) {
    return hostname.replace(`.${rootDomainFormatted}`, '')
  }

  return null
}

export async function middleware(request) {
  const { pathname } = request.nextUrl
  const subdomain = extractSubdomain(request)

  if (subdomain) {
    // Block access to admin pages from subdomains
    if (pathname.startsWith('/admin')) {
      return NextResponse.redirect(new URL('/', request.url))
    }

    // Rewrite subdomain root "/" to your existing shop page
    if (pathname === '/') {
      return NextResponse.rewrite(new URL(`/shop/${subdomain}`, request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!api|_next|[\\w-]+\\.\\w+).*)'],
}




