import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "CRM Élégant | Gestion Client",
  description: "Système de gestion client MVC avec Next.js et Supabase",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={`${inter.variable}`}>
      <body className="bg-brand-offwhite text-brand-charcoal min-h-screen font-sans selection:bg-brand-gray/20">
        {/* Navigation minimaliste */}
        <header className="border-b border-brand-gray/10 bg-white/50 backdrop-blur-md sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
            <div className="font-bold text-lg tracking-tight flex items-center gap-2">
              <div className="w-8 h-8 bg-brand-charcoal text-white flex items-center justify-center rounded-md font-serif italic shadow-sm">
                C
              </div>
              <span>RM<span className="text-brand-gray font-normal">.studio</span></span>
            </div>
            <nav className="text-sm font-medium space-x-6 text-brand-darkgray">
              <a href="/" className="hover:text-brand-black transition-colors">Clients</a>
              <a href="#" className="hover:text-brand-black transition-colors">Analytiques</a>
              <a href="#" className="hover:text-brand-black transition-colors">Paramètres</a>
            </nav>
          </div>
        </header>

        <main className="animate-in fade-in duration-500">
          {children}
        </main>
      </body>
    </html>
  );
}
