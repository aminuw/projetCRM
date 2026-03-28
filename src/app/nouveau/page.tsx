import ClientForm from '@/components/ClientForm';
import Link from 'next/link';

export default function NouveauClient() {
  return (
    <div className="max-w-3xl mx-auto py-12 px-6">
      <div className="mb-8">
        <Link href="/" className="text-brand-gray hover:text-brand-charcoal transition-colors text-sm flex items-center gap-2 mb-4">
          ← Retour à la liste
        </Link>
        <h1 className="text-3xl font-light text-brand-charcoal tracking-tight">Nouveau <span className="font-semibold">Client</span></h1>
        <p className="text-brand-gray mt-2 text-sm">Remplissez les informations ci-dessous pour ajouter un contact au CRM.</p>
      </div>

      <div className="bg-white p-8 rounded-2xl shadow-sm border border-brand-gray/10">
        <ClientForm />
      </div>
    </div>
  );
}
