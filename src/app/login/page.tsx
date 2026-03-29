'use client';

import { login } from '@/app/actions/authActions';
import { useState, useTransition } from 'react';

export default function LoginPage() {
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const handleSubmit = async (formData: FormData) => {
    startTransition(async () => {
      const result = await login(formData);
      if (result?.error) {
        setError(result.error);
      }
    });
  };

  return (
    <div className="min-h-screen bg-brand-offwhite flex items-center justify-center px-4">
      {/* Background pattern */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-brand-charcoal/[0.02] rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-brand-charcoal/[0.03] rounded-full blur-3xl" />
      </div>

      <div className="relative w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-brand-charcoal text-white flex items-center justify-center rounded-xl font-serif italic shadow-lg text-xl">
              C
            </div>
            <span className="text-2xl font-bold tracking-tight text-brand-charcoal">
              RM<span className="text-brand-gray font-normal">.studio</span>
            </span>
          </div>
          <p className="text-brand-gray text-sm">Connectez-vous pour accéder à votre espace de gestion</p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl shadow-xl shadow-brand-charcoal/5 border border-brand-gray/10 p-8">
          <form action={handleSubmit} className="space-y-5">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl text-sm flex items-center gap-2 animate-in fade-in slide-in-from-top-1 duration-300">
                <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {error}
              </div>
            )}

            <div>
              <label htmlFor="email" className="block text-xs font-semibold text-brand-darkgray uppercase tracking-wider mb-1.5">
                Adresse email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                autoComplete="email"
                autoFocus
                placeholder="admin@crm.studio"
                className="w-full px-4 py-2.5 border border-brand-gray/30 rounded-xl focus:border-brand-charcoal focus:ring-2 focus:ring-brand-charcoal/10 transition-all outline-none placeholder:text-brand-gray/40 text-sm"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-xs font-semibold text-brand-darkgray uppercase tracking-wider mb-1.5">
                Mot de passe
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                autoComplete="current-password"
                placeholder="••••••••"
                className="w-full px-4 py-2.5 border border-brand-gray/30 rounded-xl focus:border-brand-charcoal focus:ring-2 focus:ring-brand-charcoal/10 transition-all outline-none placeholder:text-brand-gray/40 text-sm"
              />
            </div>

            <button
              type="submit"
              disabled={isPending}
              className="w-full bg-brand-charcoal hover:bg-brand-black text-white py-2.5 rounded-xl font-medium transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:shadow-lg text-sm cursor-pointer"
            >
              {isPending ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Connexion en cours...
                </span>
              ) : (
                'Se connecter'
              )}
            </button>
          </form>
        </div>

        {/* Footer hint */}
        <p className="text-center text-brand-gray/60 text-xs mt-6">
          Projet CRM — Next.js & Supabase
        </p>
      </div>
    </div>
  );
}
