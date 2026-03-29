import { getClients } from '@/app/actions/clientActions';
import Link from 'next/link';

export const revalidate = 0;

export default async function Home() {
  const clients = await getClients();

  return (
    <div className="max-w-7xl mx-auto py-12 px-6">
      <div className="flex justify-between items-end mb-10">
        <div>
          <h1 className="text-4xl font-light text-brand-charcoal tracking-tight">Liste des <span className="font-semibold">Clients</span></h1>
          <p className="text-brand-gray mt-2 text-sm">Gérez l&apos;ensemble de vos contacts et leur niveau de risque en toute simplicité.</p>
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
            {clients.map((client) => (
              <tr key={client.id} className="hover:bg-brand-lightgray/30 transition-colors group">
                <td className="py-4 px-6">
                  <div className="font-medium text-brand-charcoal">{client.nom} {client.prenom}</div>
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
            
            {clients.length === 0 && (
              <tr>
                <td colSpan={5} className="py-16 text-center">
                  <div className="text-brand-gray">
                    <svg className="w-12 h-12 mx-auto mb-4 opacity-30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <p className="font-medium text-brand-darkgray mb-1">Aucun client enregistré</p>
                    <p className="text-sm">Commencez par ajouter votre premier contact.</p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
