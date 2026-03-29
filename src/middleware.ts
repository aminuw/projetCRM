import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const SESSION_COOKIE = 'crm_session';

export function middleware(request: NextRequest) {
  const session = request.cookies.get(SESSION_COOKIE);
  const isLoginPage = request.nextUrl.pathname === '/login';

  // Vérifier que le cookie existe ET a une valeur non vide
  const isAuthenticated = session && session.value && session.value.length > 10;

  // Si pas authentifié et pas sur la page login → rediriger vers login
  if (!isAuthenticated && !isLoginPage) {
    const loginUrl = new URL('/login', request.url);
    const response = NextResponse.redirect(loginUrl);
    // Nettoyer tout cookie invalide
    if (session) {
      response.cookies.delete(SESSION_COOKIE);
    }
    return response;
  }

  // Si authentifié et sur la page login → rediriger vers accueil
  if (isAuthenticated && isLoginPage) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  // Ajouter des en-têtes de sécurité sur chaque réponse
  const response = NextResponse.next();
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  response.headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');

  return response;
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
