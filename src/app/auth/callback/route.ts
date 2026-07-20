import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@supabase/ssr'

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const code = searchParams.get('code')
  const next = searchParams.get('next') ?? '/onboarding'

  const url = req.nextUrl.clone()
  url.pathname = next
  url.search = ''

  let response = NextResponse.redirect(url)

  if (code) {
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      (process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY)!,
      {
        cookies: {
          getAll() {
            return req.cookies.getAll()
          },
          setAll(cookiesToSet) {
            cookiesToSet.forEach(({ name, value, options }) => {
              req.cookies.set(name, value)
              response.cookies.set(name, value, options)
            })
          },
        },
      }
    )

    const { error } = await supabase.auth.exchangeCodeForSession(code)
    if (error) {
      console.error('Exchange code error:', error.message)
      const loginUrl = req.nextUrl.clone()
      loginUrl.pathname = '/auth/login'
      loginUrl.searchParams.set('error', error.message)
      return NextResponse.redirect(loginUrl)
    }

    // Check if user already has an org
    const { data: { user } } = await supabase.auth.getUser()
    if (user) {
      const { data: profile } = await supabase
        .from('profiles')
        .select('org_id')
        .eq('id', user.id)
        .maybeSingle()

      if (profile?.org_id) {
        const homeUrl = req.nextUrl.clone()
        homeUrl.pathname = '/'
        homeUrl.search = ''
        response = NextResponse.redirect(homeUrl)
      }
    }
  }

  return response
}
