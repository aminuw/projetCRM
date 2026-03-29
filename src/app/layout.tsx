import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { getSession } from "@/app/actions/authActions";
import LogoutButton from "@/components/LogoutButton";
import Link from "next/link";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "CRM Élégant | Gestion Client",
  description: "Système de gestion client MVC avec Next.js et Supabase",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const isAuthenticated = await getSession();

  return (
    <html lang="fr" className={`${inter.variable}`}>
      <body className="bg-brand-offwhite text-brand-charcoal min-h-screen font-sans selection:bg-brand-gray/20">
        {isAuthenticated && (
          <header className="border-b border-brand-gray/10 bg-white/50 backdrop-blur-md sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
              <div className="font-bold text-lg tracking-tight flex items-center gap-2">
                <div className="w-8 h-8 bg-brand-charcoal text-white flex items-center justify-center rounded-md font-serif italic shadow-sm">
                  C
                </div>
                <Link href="/" className="hover:opacity-80 transition-opacity">
                  <span>RM<span className="text-brand-gray font-normal">.studio</span></span>
                </Link>
              </div>
              <nav className="text-sm font-medium flex items-center gap-6 text-brand-darkgray">
                <Link href="/" className="hover:text-brand-black transition-colors">Clients</Link>
                <Link href="/analytiques" className="hover:text-brand-black transition-colors">Analytiques</Link>
                <Link href="/parametres" className="hover:text-brand-black transition-colors">Paramètres</Link>
                <div className="w-px h-5 bg-brand-gray/20" />
                <LogoutButton />
              </nav>
            </div>
          </header>
        )}

        <main className="animate-in fade-in duration-500">
          {children}
        </main>
      </body>
    </html>
  );
}
