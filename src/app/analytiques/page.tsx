import { getClients } from '@/app/actions/clientActions';
import Link from 'next/link';

export const revalidate = 0;

export default async function AnalytiquesPage() {
  const clients = await getClients();
  const total = clients.length;

  // Répartition par risque
  const risqueCount = {
    Faible: clients.filter(c => c.risque === 'Faible').length,
    Moyen: clients.filter(c => c.risque === 'Moyen').length,
    'Élevé': clients.filter(c => c.risque === 'Élevé').length,
    Inconnu: clients.filter(c => !c.risque).length,
  };

  // Top villes
  const villeMap: Record<string, number> = {};
  clients.forEach(c => {
    if (c.ville) {
      villeMap[c.ville] = (villeMap[c.ville] || 0) + 1;
    }
  });
  const topVilles = Object.entries(villeMap)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 5);

  // Taux de remplissage
  const tauxEmail = total > 0 ? Math.round((clients.filter(c => c.mail).length / total) * 100) : 0;
  const tauxTel = total > 0 ? Math.round((clients.filter(c => c.tel).length / total) * 100) : 0;
  const tauxAdresse = total > 0 ? Math.round((clients.filter(c => c.adresse).length / total) * 100) : 0;

  const maxRisque = Math.max(risqueCount.Faible, risqueCount.Moyen, risqueCount['Élevé'], risqueCount.Inconnu, 1);

  return (
    <div className="max-w-7xl mx-auto py-12 px-6">
      <div className="mb-10">
        <h1 className="text-4xl font-light text-brand-charcoal tracking-tight">
          <span className="font-semibold">Analytiques</span>
        </h1>
        <p className="text-brand-gray mt-2 text-sm">
          Vue d&apos;ensemble de votre portefeuille client.
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-5 mb-10">
        <KpiCard label="Total Clients" value={total.toString()} icon="👥" accent="bg-blue-50 text-blue-600 border-blue-100" />
        <KpiCard label="Risque Faible" value={risqueCount.Faible.toString()} icon="🟢" accent="bg-green-50 text-green-600 border-green-100" />
        <KpiCard label="Risque Moyen" value={risqueCount.Moyen.toString()} icon="🟡" accent="bg-orange-50 text-orange-600 border-orange-100" />
        <KpiCard label="Risque Élevé" value={risqueCount['Élevé'].toString()} icon="🔴" accent="bg-red-50 text-red-600 border-red-100" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Répartition des Risques */}
        <div className="bg-white rounded-2xl shadow-sm border border-brand-gray/10 p-6">
          <h2 className="text-sm font-semibold text-brand-darkgray uppercase tracking-wider mb-6">
            Répartition des Risques
          </h2>
          <div className="space-y-4">
            <RiskBar label="Faible" count={risqueCount.Faible} max={maxRisque} color="bg-green-400" />
            <RiskBar label="Moyen" count={risqueCount.Moyen} max={maxRisque} color="bg-orange-400" />
            <RiskBar label="Élevé" count={risqueCount['Élevé']} max={maxRisque} color="bg-red-400" />
            <RiskBar label="Non défini" count={risqueCount.Inconnu} max={maxRisque} color="bg-gray-300" />
          </div>
        </div>

        {/* Top Villes */}
        <div className="bg-white rounded-2xl shadow-sm border border-brand-gray/10 p-6">
          <h2 className="text-sm font-semibold text-brand-darkgray uppercase tracking-wider mb-6">
            Top Villes
          </h2>
          {topVilles.length > 0 ? (
            <div className="space-y-3">
              {topVilles.map(([ville, count], index) => (
                <div key={ville} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded-full bg-brand-charcoal/5 text-brand-charcoal flex items-center justify-center text-xs font-semibold">
                      {index + 1}
                    </span>
                    <span className="text-sm text-brand-charcoal font-medium">{ville}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-20 bg-brand-lightgray rounded-full h-2">
                      <div
                        className="h-2 rounded-full bg-brand-charcoal transition-all"
                        style={{ width: `${(count / (topVilles[0]?.[1] || 1)) * 100}%` }}
                      />
                    </div>
                    <span className="text-xs text-brand-gray font-medium w-8 text-right">
                      {count}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-brand-gray text-sm italic">Aucune ville renseignée.</p>
          )}
        </div>

        {/* Taux de remplissage */}
        <div className="bg-white rounded-2xl shadow-sm border border-brand-gray/10 p-6 lg:col-span-2">
          <h2 className="text-sm font-semibold text-brand-darkgray uppercase tracking-wider mb-6">
            Qualité des Données
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <CompletionGauge label="Email renseigné" percent={tauxEmail} />
            <CompletionGauge label="Téléphone renseigné" percent={tauxTel} />
            <CompletionGauge label="Adresse renseignée" percent={tauxAdresse} />
          </div>
        </div>
      </div>

      {/* Lien retour */}
      <div className="mt-8 text-center">
        <Link href="/" className="text-brand-gray hover:text-brand-charcoal text-sm transition-colors">
          ← Retour à la liste des clients
        </Link>
      </div>
    </div>
  );
}

// --- Composants locaux ---

function KpiCard({ label, value, icon, accent }: { label: string; value: string; icon: string; accent: string }) {
  return (
    <div className={`rounded-2xl border p-5 ${accent} transition-all hover:scale-[1.02] hover:shadow-sm`}>
      <div className="flex items-center justify-between mb-3">
        <span className="text-2xl">{icon}</span>
      </div>
      <div className="text-3xl font-bold tracking-tight">{value}</div>
      <div className="text-xs font-medium mt-1 opacity-70">{label}</div>
    </div>
  );
}

function RiskBar({ label, count, max, color }: { label: string; count: number; max: number; color: string }) {
  const pct = max > 0 ? (count / max) * 100 : 0;
  return (
    <div className="flex items-center gap-4">
      <span className="text-sm text-brand-darkgray w-20 shrink-0">{label}</span>
      <div className="flex-1 bg-brand-lightgray rounded-full h-3 overflow-hidden">
        <div
          className={`h-3 rounded-full ${color} transition-all duration-700`}
          style={{ width: `${pct}%` }}
        />
      </div>
      <span className="text-sm font-semibold text-brand-charcoal w-8 text-right">{count}</span>
    </div>
  );
}

function CompletionGauge({ label, percent }: { label: string; percent: number }) {
  const radius = 40;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percent / 100) * circumference;
  const gaugeColor = percent >= 75 ? '#22c55e' : percent >= 40 ? '#f59e0b' : '#ef4444';

  return (
    <div className="flex flex-col items-center gap-3">
      <div className="relative w-24 h-24">
        <svg className="w-24 h-24 -rotate-90" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r={radius} fill="none" stroke="#f3f4f6" strokeWidth="8" />
          <circle
            cx="50" cy="50" r={radius} fill="none"
            stroke={gaugeColor}
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            className="transition-all duration-1000"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-lg font-bold text-brand-charcoal">{percent}%</span>
        </div>
      </div>
      <span className="text-xs text-brand-darkgray font-medium text-center">{label}</span>
    </div>
  );
}
