import { createClient } from '@supabase/supabase-js';

// Variables serveur uniquement — pas de NEXT_PUBLIC_ = jamais exposées au navigateur
const supabaseUrl = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

if (!supabaseUrl || !supabaseServiceKey) {
  throw new Error('Missing Supabase environment variables. Check SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY.');
}

// Client serveur uniquement — utilisé dans les Server Actions et composants serveur
export const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    persistSession: false, // Pas de persistence côté serveur
    autoRefreshToken: false,
  },
});
