import { getClients } from '@/app/actions/clientActions';
import { Client } from '@/types/client';
import Link from 'next/link';

export const revalidate = 0; // Dynamic rendering

export default async function Home() {
  const clients = await getClients();

  const displayClients: Client[] = clients.length > 0 ? clients : [
    { id: 1, nom: 'Dupont', prenom: 'Jean', mail: 'jean@example.com', ville: 'Paris', risque: 'Faible', type: 'Demo' } as any,
    { id: 2, nom: 'Martin', prenom: 'Sophie', mail: 'sophie@example.com', ville: 'Lyon', risque: 'Moyen', type: 'Demo' } as any
  ];

  return (
    <div className="max-w-7xl mx-auto py-12 px-6">
      <div className="flex justify-between items-end mb-10">
        <div>
          <h1 className="text-4xl font-light text-brand-charcoal tracking-tight">Liste des <span className="font-semibold">Clients</span></h1>
          <p className="text-brand-gray mt-2 text-sm">Gérez l'ensemble de vos contacts et leur niveau de risque en toute simplicité.</p>
        </div>
        <Link 
          href="/nouveau" 
          className="bg-brand-charcoal hover:bg-brand-black text-white px-5 py-2.5 rounded-full text-sm font-medium transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5"
        >
          + Ajouter un client
        </Link>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-brand-gray/10 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-brand-lightgray/50 border-b border-brand-gray/10">
              <th className="py-4 px-6 text-xs font-semibold text-brand-darkgray uppercase tracking-wider w-1/4">Nom / Prénom</th>
              <th className="py-4 px-6 text-xs font-semibold text-brand-darkgray uppercase tracking-wider w-1/4">Contact</th>
              <th className="py-4 px-6 text-xs font-semibold text-brand-darkgray uppercase tracking-wider w-1/4">Localisation</th>
              <th className="py-4 px-6 text-xs font-semibold text-brand-darkgray uppercase tracking-wider">Risque</th>
              <th className="py-4 px-6 text-xs font-semibold text-brand-darkgray uppercase tracking-wider text-right w-24">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-brand-gray/10">
            {displayClients.map((client) => (
              <tr key={client.id} className="hover:bg-brand-lightgray/30 transition-colors group">
                <td className="py-4 px-6">
                  <div className="font-medium text-brand-charcoal">{client.nom} {client.prenom}</div>
                  {client.id <= 2 && (client as any).type === 'Demo' && <span className="text-[10px] bg-brand-lightgray text-brand-darkgray px-2 py-0.5 rounded-full mt-1 inline-block">Mode Démo</span>}
                </td>
                <td className="py-4 px-6">
                  <div className="text-sm text-brand-charcoal">{client.mail || <span className="text-brand-gray italic">Non renseigné</span>}</div>
                  <div className="text-xs text-brand-gray">{client.tel}</div>
                </td>
                <td className="py-4 px-6 text-sm text-brand-darkgray">
                  {client.ville ? `${client.ville} ${client.codePostal ? '('+client.codePostal+')' : ''}` : <span className="text-brand-gray italic">N/A</span>}
                </td>
                <td className="py-4 px-6">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border
                    ${client.risque === 'Faible' ? 'bg-green-50 text-green-700 border-green-200' : 
                      client.risque === 'Moyen' ? 'bg-orange-50 text-orange-700 border-orange-200' : 
                      client.risque === 'Élevé' ? 'bg-red-50 text-red-700 border-red-200' : 
                      'bg-gray-50 text-gray-700 border-gray-200'}
                  `}>
                    {client.risque || 'Inconnu'}
                  </span>
                </td>
                <td className="py-4 px-6 text-right">
                  <Link href={`/edit/${client.id}`} className="text-brand-gray hover:text-brand-charcoal text-sm font-medium transition-colors">
                    Modifier
                  </Link>
                </td>
              </tr>
            ))}
            
            {displayClients.length === 0 && (
              <tr>
                <td colSpan={5} className="py-12 text-center text-brand-gray">
                  Aucun client trouvé. Commencez par en ajouter un !
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
