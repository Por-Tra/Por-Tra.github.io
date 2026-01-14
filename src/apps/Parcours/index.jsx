/**
 * Application: Parcours
 * 
 * Timeline du parcours scolaire
 */

export const config = {
  id: 'parcours',
  name: 'Mon Parcours',
  icon: '/icons/note.png',
  defaultWidth: 650,
  defaultHeight: 520,
};

const parcours = [
  {
    id: 1,
    titre: "BUT Informatique Graphique",
    etablissement: "IUT Clermont Auvergne",
    lieu: "Le Puy-en-Velay",
    periode: "2024 - 2027",
    description: "Formation unique en France spécialisée dans l'informatique appliquée à l'image et le numérique responsable.",
    details: [
      "Développement de jeux vidéo et applications 3D",
      "Programmation graphique et traitement d'images",
      "Technologies : C++, C#, Java, Python, Unity, Unreal Engine",
      "Méthodologies agiles et gestion de projet",
    ],
    lien: "https://iut.uca.fr/formations/but-informatique-le-puy",
    couleur: "#4a90d9",
    enCours: true,
  },
  {
    id: 2,
    titre: "BAC Général",
    etablissement: "Lycée Marmontel",
    lieu: "Mauriac",
    adresse: "12 rue du Collège, 15200 Mauriac",
    periode: "2021 - 2024",
    description: "Baccalauréat général avec spécialités scientifiques et technologiques.",
    details: [
      "Spécialité Mathématiques",
      "Spécialité Numérique et Sciences Informatiques (NSI)",
      "Option Mathématiques Expertes",
    ],
    lien: "https://lyceepolyvalentmauriac.fr/",
    couleur: "#5cb85c",
    enCours: false,
  },
];

export const Component = () => {
  return (
    <div className="h-full bg-gradient-to-b from-[#f5f5f5] to-[#e8e8e8] overflow-y-auto">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#0a246a] to-[#3a6ea5] text-white p-4 shadow-md">
        <h1 className="text-xl font-bold flex items-center gap-2">
          <span className="text-2xl">🎓</span>
          Mon Parcours Scolaire
        </h1>
        <p className="text-sm opacity-90 mt-1">Formation et études</p>
      </div>

      {/* Timeline */}
      <div className="p-6">
        <div className="relative">
          {/* Ligne verticale */}
          <div className="absolute left-[28px] top-0 bottom-0 w-1 bg-gradient-to-b from-[#4a90d9] to-[#5cb85c] rounded-full" />

          {parcours.map((item) => (
            <div key={item.id} className="relative mb-8 last:mb-0">
              {/* Point sur la timeline */}
              <div 
                className="absolute left-[20px] w-[18px] h-[18px] rounded-full border-4 border-white shadow-md z-10"
                style={{ backgroundColor: item.couleur }}
              >
                {item.enCours && (
                  <div className="absolute inset-0 rounded-full animate-ping opacity-30" 
                       style={{ backgroundColor: item.couleur }} />
                )}
              </div>

              {/* Carte */}
              <div className="ml-16 bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow">
                {/* En-tête de la carte */}
                <div 
                  className="p-3 text-white"
                  style={{ background: `linear-gradient(135deg, ${item.couleur}, ${item.couleur}dd)` }}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h2 className="font-bold text-lg">{item.titre}</h2>
                      <p className="text-sm opacity-90">{item.etablissement}</p>
                    </div>
                    <div className="text-right">
                      <span className="bg-white/20 px-2 py-1 rounded text-sm font-medium">
                        {item.periode}
                      </span>
                      {item.enCours && (
                        <div className="mt-1 text-xs bg-yellow-400 text-yellow-900 px-2 py-0.5 rounded font-bold">
                          En cours
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Corps de la carte */}
                <div className="p-4">
                  {/* Lieu */}
                  <div className="flex items-center gap-2 text-gray-600 mb-3">
                    <span>📍</span>
                    <span className="text-sm">
                      {item.adresse || item.lieu}
                    </span>
                  </div>

                  {/* Description */}
                  <p className="text-gray-700 mb-3 text-sm leading-relaxed">
                    {item.description}
                  </p>

                  {/* Détails */}
                  <div className="bg-gray-50 rounded p-3 mb-3">
                    <h4 className="text-xs font-bold text-gray-500 uppercase mb-2">
                      Points clés
                    </h4>
                    <ul className="space-y-1">
                      {item.details.map((detail, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                          <span className="text-green-500 mt-0.5">✓</span>
                          {detail}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Lien */}
                  <a
                    href={item.lien}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm px-3 py-1.5 rounded
                             bg-gradient-to-b from-[#f5f5f5] to-[#e1e1e1] 
                             border border-gray-300 shadow-sm
                             hover:from-[#e8e8e8] hover:to-[#d5d5d5]
                             active:from-[#d5d5d5] active:to-[#c5c5c5]
                             text-gray-700 transition-all"
                  >
                    <span>🔗</span>
                    Visiter le site
                    <span className="text-xs text-gray-400">↗</span>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="mt-6 p-4 bg-white/50 rounded-lg border border-gray-200 text-center">
          <p className="text-gray-500 text-sm">
            💡 <em>Passionné par l'informatique graphique et le développement de jeux vidéo</em>
          </p>
        </div>
      </div>
    </div>
  );
};
