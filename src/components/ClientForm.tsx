'use client';

import { useState } from 'react';
import { createClient, updateClient } from '@/app/actions/clientActions';
import { Client, ClientFormData } from '@/types/client';

export default function ClientForm({ client, onSuccess }: { client?: Client, onSuccess?: () => void }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const data: ClientFormData = {
      nom: formData.get('nom') as string,
      prenom: formData.get('prenom') as string,
      tel: formData.get('tel') as string || undefined,
      adresse: formData.get('adresse') as string || undefined,
      codePostal: formData.get('codePostal') as string || undefined,
      ville: formData.get('ville') as string || undefined,
      mail: formData.get('mail') as string || undefined,
      risque: (formData.get('risque') as any) || 'Faible',
      commentaire: formData.get('commentaire') as string || undefined,
    };

    try {
      if (client?.id) {
        await updateClient(client.id, data);
      } else {
        await createClient(data);
      }
      if (onSuccess) onSuccess();
    } catch (err: any) {
      setError("Une erreur est survenue lors de l'enregistrement.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 text-brand-charcoal text-sm">
      {error && <div className="text-red-500 bg-red-50 p-3 rounded-lg border border-red-200">{error}</div>}
      
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold mb-1 text-brand-darkgray uppercase tracking-wider">Nom *</label>
          <input required defaultValue={client?.nom} name="nom" className="w-full px-3 py-2 border rounded-md border-brand-gray/30 focus:border-brand-charcoal focus:ring-1 focus:ring-brand-charcoal transition-all placeholder:text-gray-300" placeholder="Ex: Dupont" />
        </div>
        <div>
          <label className="block text-xs font-semibold mb-1 text-brand-darkgray uppercase tracking-wider">Prénom *</label>
          <input required defaultValue={client?.prenom} name="prenom" className="w-full px-3 py-2 border rounded-md border-brand-gray/30 focus:border-brand-charcoal focus:ring-1 focus:ring-brand-charcoal transition-all placeholder:text-gray-300" placeholder="Ex: Jean" />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold mb-1 text-brand-darkgray uppercase tracking-wider">Email</label>
          <input type="email" defaultValue={client?.mail} name="mail" className="w-full px-3 py-2 border rounded-md border-brand-gray/30 focus:border-brand-charcoal focus:ring-1 focus:ring-brand-charcoal transition-all placeholder:text-gray-300" placeholder="jean.dupont@mail.com" />
        </div>
        <div>
          <label className="block text-xs font-semibold mb-1 text-brand-darkgray uppercase tracking-wider">Téléphone</label>
          <input type="tel" defaultValue={client?.tel} name="tel" className="w-full px-3 py-2 border rounded-md border-brand-gray/30 focus:border-brand-charcoal focus:ring-1 focus:ring-brand-charcoal transition-all placeholder:text-gray-300" placeholder="06 12 34 56 78" />
        </div>
      </div>

      <div>
        <label className="block text-xs font-semibold mb-1 text-brand-darkgray uppercase tracking-wider">Adresse complète</label>
        <div className="flex space-x-2">
            <input defaultValue={client?.adresse} name="adresse" className="w-full px-3 py-2 border rounded-md border-brand-gray/30 focus:border-brand-charcoal focus:ring-1 focus:ring-brand-charcoal transition-all" placeholder="123 rue de la République" />
            <input defaultValue={client?.codePostal} name="codePostal" className="w-24 px-3 py-2 border rounded-md border-brand-gray/30 focus:border-brand-charcoal focus:ring-1 focus:ring-brand-charcoal transition-all" placeholder="CP" />
            <input defaultValue={client?.ville} name="ville" className="w-1/3 px-3 py-2 border rounded-md border-brand-gray/30 focus:border-brand-charcoal focus:ring-1 focus:ring-brand-charcoal transition-all" placeholder="Ville" />
        </div>
      </div>

      <div>
        <label className="block text-xs font-semibold mb-1 text-brand-darkgray uppercase tracking-wider">Niveau de Risque</label>
        <select defaultValue={client?.risque || 'Faible'} name="risque" className="w-full px-3 py-2 border rounded-md border-brand-gray/30 bg-white focus:border-brand-charcoal focus:ring-1 outline-none transition-all">
          <option value="Faible">Faible</option>
          <option value="Moyen">Moyen</option>
          <option value="Élevé">Élevé</option>
        </select>
      </div>

      <div>
        <label className="block text-xs font-semibold mb-1 text-brand-darkgray uppercase tracking-wider">Commentaire</label>
        <textarea defaultValue={client?.commentaire} name="commentaire" rows={3} className="w-full px-3 py-2 border rounded-md border-brand-gray/30 focus:border-brand-charcoal focus:ring-1 focus:ring-brand-charcoal transition-all resize-none" placeholder="Notes additionnelles sur ce client..." />
      </div>

      <div className="pt-4 flex justify-end">
        <button type="submit" disabled={loading} className="px-6 py-2 bg-brand-charcoal text-white rounded-md font-medium hover:bg-brand-black transition-all shadow-md disabled:opacity-50">
          {loading ? 'Enregistrement...' : (client ? 'Sauvegarder les modifications' : 'Ajouter le client')}
        </button>
      </div>
    </form>
  );
}
