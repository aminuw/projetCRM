import ClientForm from '@/components/ClientForm';
import { supabase } from '@/lib/supabaseClient';
import { Client } from '@/types/client';
import Link from 'next/link';
import { notFound } from 'next/navigation';

export const revalidate = 0;

export default async function EditClient({ params }: { params: Promise<{ id: string }> }) {
  const paramsData = await params;
  const clientId = parseInt(paramsData.id);
  
  // Simulation de données locales si pas connecté à Supabase
  let client: Client | null = null;
  
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL.includes('placeholder')) {
    const listDemo = [
      { id: 1, nom: 'Dupont', prenom: 'Jean', mail: 'jean@example.com', ville: 'Paris', risque: 'Faible', type: 'Demo' },
      { id: 2, nom: 'Martin', prenom: 'Sophie', mail: 'sophie@example.com', ville: 'Lyon', risque: 'Moyen', type: 'Demo' }
    ] as any;
    client = listDemo.find((c: any) => c.id === clientId) || null;
  } else {
    // Appel Réel
    const { data, error } = await supabase.from('clients').select('*').eq('id', clientId).single();
    if (!error && data) client = data as Client;
  }

  if (!client) {
    notFound();
  }

  return (
    <div className="max-w-3xl mx-auto py-12 px-6">
      <div className="mb-8">
        <Link href="/" className="text-brand-gray hover:text-brand-charcoal transition-colors text-sm flex items-center gap-2 mb-4">
          ← Retour à la liste
        </Link>
        <h1 className="text-3xl font-light text-brand-charcoal tracking-tight">Modifier <span className="font-semibold">{client.prenom} {client.nom}</span></h1>
        <p className="text-brand-gray mt-2 text-sm">Mettez à jour les informations de ce contact.</p>
      </div>

      <div className="bg-white p-8 rounded-2xl shadow-sm border border-brand-gray/10">
        <ClientForm client={client} />
      </div>
    </div>
  );
}
