import { getSession } from '@/app/actions/authActions';
import { getClients } from '@/app/actions/clientActions';
import LogoutButton from '@/components/LogoutButton';
import Link from 'next/link';

export const revalidate = 0;

export default async function ParametresPage() {
  const isAuthenticated = await getSession();
  const clients = await getClients();

  return (
    <div className="max-w-4xl mx-auto py-12 px-6">
      <div className="mb-10">
        <h1 className="text-4xl font-light text-brand-charcoal tracking-tight">
          <span className="font-semibold">Paramètres</span>
        </h1>
        <p className="text-brand-gray mt-2 text-sm">
          Configuration de votre environnement CRM.
        </p>
      </div>

      <div className="space-y-6">
        {/* Profil */}
        <section className="bg-white rounded-2xl shadow-sm border border-brand-gray/10 p-6">
          <h2 className="text-sm font-semibold text-brand-darkgray uppercase tracking-wider mb-5">
            Profil Utilisateur
          </h2>
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-brand-charcoal text-white flex items-center justify-center rounded-xl text-xl font-serif italic shadow-md">
              A
            </div>
            <div>
              <p className="font-semibold text-brand-charcoal">Administrateur</p>
              <p className="text-sm text-brand-gray">admin@crm.studio</p>
            </div>
            <div className="ml-auto">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-50 text-green-600 border border-green-200">
                ● Connecté
              </span>
            </div>
          </div>
        </section>

        {/* Infos Système */}
        <section className="bg-white rounded-2xl shadow-sm border border-brand-gray/10 p-6">
          <h2 className="text-sm font-semibold text-brand-darkgray uppercase tracking-wider mb-5">
            Informations Système
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InfoRow label="Application" value="CRM.studio v0.1.0" />
            <InfoRow label="Framework" value="Next.js + React" />
            <InfoRow label="Base de données" value="Supabase (PostgreSQL)" />
            <InfoRow label="Hébergement" value="Vercel-ready" />
            <InfoRow label="Total clients" value={`${clients.length} enregistrements`} />
            <InfoRow label="Authentification" value="Session cookie" />
          </div>
        </section>

        {/* Niveaux de Risque */}
        <section className="bg-white rounded-2xl shadow-sm border border-brand-gray/10 p-6">
          <h2 className="text-sm font-semibold text-brand-darkgray uppercase tracking-wider mb-5">
            Niveaux de Risque Configurés
          </h2>
          <div className="flex flex-wrap gap-3">
            <RiskBadge label="Faible" color="bg-green-50 text-green-700 border-green-200" />
            <RiskBadge label="Moyen" color="bg-orange-50 text-orange-700 border-orange-200" />
            <RiskBadge label="Élevé" color="bg-red-50 text-red-700 border-red-200" />
          </div>
          <p className="text-xs text-brand-gray mt-3">
            Ces niveaux sont définis dans la contrainte CHECK de la table <code className="bg-brand-lightgray px-1.5 py-0.5 rounded text-brand-darkgray">clients</code> sur Supabase.
          </p>
        </section>

        {/* Structure BDD */}
        <section className="bg-white rounded-2xl shadow-sm border border-brand-gray/10 p-6">
          <h2 className="text-sm font-semibold text-brand-darkgray uppercase tracking-wider mb-5">
            Schéma de la Table Clients
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-brand-gray/10">
                  <th className="text-left py-2 px-3 text-xs text-brand-darkgray font-semibold uppercase">Colonne</th>
                  <th className="text-left py-2 px-3 text-xs text-brand-darkgray font-semibold uppercase">Type</th>
                  <th className="text-left py-2 px-3 text-xs text-brand-darkgray font-semibold uppercase">Obligatoire</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-brand-gray/5">
                <SchemaRow col="id" type="BIGINT (auto)" required={true} />
                <SchemaRow col="nom" type="TEXT" required={true} />
                <SchemaRow col="prenom" type="TEXT" required={true} />
                <SchemaRow col="tel" type="TEXT" required={false} />
                <SchemaRow col="adresse" type="TEXT" required={false} />
                <SchemaRow col="codePostal" type="TEXT" required={false} />
                <SchemaRow col="ville" type="TEXT" required={false} />
                <SchemaRow col="mail" type="TEXT" required={false} />
                <SchemaRow col="risque" type="TEXT (CHECK)" required={false} />
                <SchemaRow col="commentaire" type="TEXT" required={false} />
              </tbody>
            </table>
          </div>
        </section>

        {/* Actions */}
        <section className="bg-white rounded-2xl shadow-sm border border-brand-gray/10 p-6">
          <h2 className="text-sm font-semibold text-brand-darkgray uppercase tracking-wider mb-5">
            Actions
          </h2>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/"
              className="px-5 py-2 bg-brand-lightgray text-brand-charcoal rounded-lg text-sm font-medium hover:bg-brand-gray/20 transition-colors"
            >
              ← Retour au CRM
            </Link>
            <LogoutButton />
          </div>
        </section>
      </div>
    </div>
  );
}

// --- Composants locaux ---

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between items-center py-2 px-3 rounded-lg hover:bg-brand-lightgray/50 transition-colors">
      <span className="text-sm text-brand-gray">{label}</span>
      <span className="text-sm font-medium text-brand-charcoal">{value}</span>
    </div>
  );
}

function RiskBadge({ label, color }: { label: string; color: string }) {
  return (
    <span className={`inline-flex items-center px-3 py-1.5 rounded-lg text-sm font-medium border ${color}`}>
      {label}
    </span>
  );
}

function SchemaRow({ col, type, required }: { col: string; type: string; required: boolean }) {
  return (
    <tr className="hover:bg-brand-lightgray/30 transition-colors">
      <td className="py-2 px-3 font-mono text-brand-charcoal text-xs">{col}</td>
      <td className="py-2 px-3 text-brand-darkgray">{type}</td>
      <td className="py-2 px-3">
        {required ? (
          <span className="text-green-600 text-xs font-medium">Oui</span>
        ) : (
          <span className="text-brand-gray text-xs">Non</span>
        )}
      </td>
    </tr>
  );
}
