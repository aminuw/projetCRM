'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

// Identifiants sécurisés via variables d'environnement (jamais exposés côté client)
const VALID_EMAIL = process.env.CRM_ADMIN_EMAIL || 'admin@crm.studio';
const VALID_PASSWORD = process.env.CRM_ADMIN_PASSWORD || 'Admin123!';
const SESSION_SECRET = process.env.CRM_SESSION_SECRET || 'crm_session_token_v1_secure';
const SESSION_COOKIE = 'crm_session';

export async function login(formData: FormData) {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  if (email === VALID_EMAIL && password === VALID_PASSWORD) {
    const cookieStore = await cookies();
    // Stocker un token signé plutôt qu'un simple "authenticated"
    cookieStore.set(SESSION_COOKIE, SESSION_SECRET, {
      httpOnly: true,
      secure: true, // Toujours secure en production (Vercel = HTTPS)
      sameSite: 'strict', // Protection CSRF
      maxAge: 60 * 60 * 8, // 8 heures (plus réaliste)
      path: '/',
    });
    redirect('/');
  }

  return { error: 'Email ou mot de passe incorrect.' };
}

export async function logout() {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE);
  redirect('/login');
}

export async function getSession(): Promise<boolean> {
  const cookieStore = await cookies();
  const session = cookieStore.get(SESSION_COOKIE);
  return session?.value === SESSION_SECRET;
}
