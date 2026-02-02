/**
 * Application: Parcours
 * 
 * Timeline du parcours scolaire - Style Windows XP
 */
import { MenuBar, useZoom, getZoomStyle } from '../../components/ProjectLayout';

export const config = {
  id: 'parcours',
  name: 'Mon Parcours',
  icon: '/icons/note.png',
  defaultWidth: 700,
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
    enCours: false,
  },
];

export const Component = () => {
  const { zoom, zoomIn, zoomOut, resetZoom } = useZoom();

  return (
    <div className="xp-app">
      {/* Menu Bar avec Zoom */}
      <MenuBar 
        zoom={zoom} 
        onZoomIn={zoomIn} 
        onZoomOut={zoomOut} 
        onReset={resetZoom}
      />

      {/* Toolbar */}
      <div className="xp-toolbar">
        <button className="xp-toolbar-btn">
          <img src="/icons/arrow_left.png" alt="" className="w-4 h-4" />
          Précédent
        </button>
        <button className="xp-toolbar-btn">
          <img src="/icons/arrow_right.png" alt="" className="w-4 h-4" />
          Suivant
        </button>
        <div className="xp-toolbar-separator" />
        <button className="xp-toolbar-btn">
          <img src="/icons/folder.png" alt="" className="w-4 h-4" />
          Mes Projets
        </button>
        <button className="xp-toolbar-btn">
          <img src="/icons/note.png" alt="" className="w-4 h-4" />
          Mon CV
        </button>
      </div>

      {/* Address Bar */}
      <div className="xp-addressbar">
        <span className="xp-addressbar-label">Adresse</span>
        <div className="xp-addressbar-input">
          <img src="/icons/note.png" alt="" className="w-4 h-4" />
          <span>Mon Parcours Scolaire</span>
        </div>
        <button className="xp-addressbar-go">OK</button>
      </div>

      {/* Main Content */}
      <div className="xp-content xp-content-zoomable" style={getZoomStyle(zoom)}>
        {/* Sidebar */}
        <div className="xp-sidebar">
          <div className="xp-sidebar-box">
            <div className="xp-sidebar-title">
              <img src="/icons/folder.png" alt="" />
              Navigation
            </div>
            <div className="xp-sidebar-link">
              <img src="/icons/folder.png" alt="" />
              Formation actuelle
            </div>
            <div className="xp-sidebar-link">
              <img src="/icons/folder.png" alt="" />
              Diplômes obtenus
            </div>
            <div className="xp-sidebar-link">
              <img src="/icons/explorer.png" alt="" />
              Certifications
            </div>
          </div>

          <div className="xp-sidebar-box">
            <div className="xp-sidebar-title">
              <img src="/icons/questionMark.png" alt="" />
              Informations
            </div>
            <div className="xp-sidebar-text">
              <p><strong>Total:</strong> 2 formations</p>
              <p><strong>En cours:</strong> BUT Info</p>
              <p><strong>Lieu:</strong> Le Puy-en-Velay</p>
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="xp-content-main">
          {/* Page Header */}
          <div className="xp-page-header">
            <img src="/icons/note.png" alt="" className="xp-page-header-icon" />
            <div>
              <h1 className="xp-page-title">Mon Parcours Scolaire</h1>
              <p className="xp-page-subtitle">Formation et études</p>
            </div>
          </div>

          {/* Timeline */}
          {parcours.map((item) => (
            <div key={item.id} className="xp-box xp-mb-3">
              <div className={`xp-box-header ${item.enCours ? '' : 'xp-box-header-green'}`}>
                <img src="/icons/folder.png" alt="" />
                {item.titre}
                {item.enCours && (
                  <span className="xp-tag-yellow" style={{ marginLeft: 'auto' }}>En cours</span>
                )}
              </div>
              <div className="xp-box-content">
                <div className="xp-flex xp-gap-2 xp-mb-2">
                  <img src="/icons/explorer.png" alt="" className="w-4 h-4" />
                  <span className="xp-text-bold">{item.etablissement}</span>
                  <span className="xp-text-gray">•</span>
                  <span className="xp-text-gray">{item.periode}</span>
                </div>

                <div className="xp-flex xp-gap-2 xp-mb-2">
                  <img src="/icons/signal.png" alt="" className="w-4 h-4" />
                  <span className="xp-text-gray">{item.adresse || item.lieu}</span>
                </div>

                <p className="xp-text-gray xp-mb-2" style={{ lineHeight: '1.5' }}>
                  {item.description}
                </p>

                <div className="xp-tipbox">
                  <img src="/icons/questionMark.png" alt="" />
                  <div>
                    <strong>Points clés:</strong>
                    <ul className="xp-list xp-mt-1">
                      {item.details.map((detail, i) => (
                        <li key={i} className="xp-list-item">
                          <img src="/icons/folder.png" alt="" />
                          {detail}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <a
                  href={item.lien}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="xp-btn xp-mt-2"
                >
                  <img src="/icons/explorer.png" alt="" />
                  Visiter le site
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Status Bar */}
      <div className="xp-statusbar">
        <span>{parcours.length} formations</span>
        <span>Passionné par l'informatique graphique</span>
      </div>
    </div>
  );
};
