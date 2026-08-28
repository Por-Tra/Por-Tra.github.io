/**
 * Application: Parcours
 * 
 * Timeline du parcours scolaire - Style Windows XP
 */
import { MenuBar, useZoom, getZoomStyle } from '../../components/ProjectLayout';
import { t } from '../../i18n/text';

export const config = {
  id: 'parcours',
  name: 'Mon Parcours',
  icon: '/icons/note.webp',
  defaultWidth: 700,
  defaultHeight: 520,
};

const parcours = [
  {
    id: 1,
    titre: { FR: 'BUT Informatique Graphique', EN: 'Graphic Computing (BUT)', ES: 'Informática Gráfica (BUT)' },
    etablissement: "IUT Clermont Auvergne",
    lieu: "Le Puy-en-Velay",
    periode: "2024 - 2027",
    description: {
      FR: "Formation unique en France spécialisée dans l'informatique appliquée à l'image et le numérique responsable.",
      EN: 'A unique French program focused on computing for imaging and responsible digital practices.',
      ES: 'Un programa único en Francia enfocado en computación para imágenes y prácticas digitales responsables.',
    },
    details: [
      { FR: 'Développement de jeux vidéo et applications 3D', EN: 'Video game development and 3D applications', ES: 'Desarrollo de videojuegos y aplicaciones 3D' },
      { FR: "Programmation graphique et traitement d'images", EN: 'Graphics programming and image processing', ES: 'Programación gráfica y procesamiento de imágenes' },
      { FR: 'Technologies : C++, C#, Java, Python, Unity, Unreal Engine', EN: 'Technologies: C++, C#, Java, Python, Unity, Unreal Engine', ES: 'Tecnologías: C++, C#, Java, Python, Unity, Unreal Engine' },
      { FR: 'Méthodologies agiles et gestion de projet', EN: 'Agile methods and project management', ES: 'Métodos ágiles y gestión de proyectos' },
    ],
    lien: 'https://iut.uca.fr/formations/but-informatique-le-puy',
    enCours: true,
  },
  {
    id: 2,
    titre: { FR: 'BAC Général', EN: 'General Baccalaureate', ES: 'Bachillerato General' },
    etablissement: 'Lycée Marmontel',
    lieu: 'Mauriac',
    adresse: '12 rue du Collège, 15200 Mauriac',
    periode: '2021 - 2024',
    description: {
      FR: 'Baccalauréat général avec spécialités scientifiques et technologiques.',
      EN: 'General baccalaureate with scientific and technological specializations.',
      ES: 'Bachillerato general con especializaciones científicas y tecnológicas.',
    },
    details: [
      { FR: 'Spécialité Mathématiques', EN: 'Mathematics specialization', ES: 'Especialización en Matemáticas' },
      { FR: 'Spécialité Numérique et Sciences Informatiques (NSI)', EN: 'Digital & Computer Science specialization (NSI)', ES: 'Especialización en Digital y Ciencias de la Computación (NSI)' },
      { FR: 'Option Mathématiques Expertes', EN: 'Advanced Mathematics option', ES: 'Opción de Matemáticas Avanzadas' },
    ],
    lien: 'https://lyceepolyvalentmauriac.fr/',
    enCours: false,
  },
];

const COPY = {
  toolbarBack: { FR: 'Précédent', EN: 'Back', ES: 'Anterior' },
  toolbarNext: { FR: 'Suivant', EN: 'Next', ES: 'Siguiente' },
  toolbarProjects: { FR: 'Mes Projets', EN: 'My Projects', ES: 'Mis Proyectos' },
  toolbarCv: { FR: 'Mon CV', EN: 'My CV', ES: 'Mi CV' },
  address: { FR: 'Adresse', EN: 'Address', ES: 'Dirección' },
  addressPath: { FR: 'Mon Parcours Scolaire', EN: 'My Academic Journey', ES: 'Mi Viaje Académico' },
  addressOk: { FR: 'OK', EN: 'OK', ES: 'OK' },
  nav: { FR: 'Navigation', EN: 'Navigation', ES: 'Navegación' },
  navCurrent: { FR: 'Formation actuelle', EN: 'Current program', ES: 'Programa actual' },
  navDiplomas: { FR: 'Diplômes obtenus', EN: 'Diplomas earned', ES: 'Diplomas obtenidos' },
  navCerts: { FR: 'Certifications', EN: 'Certifications', ES: 'Certificaciones' },
  info: { FR: 'Informations', EN: 'Information', ES: 'Información' },
  total: { FR: 'Total', EN: 'Total', ES: 'Total' },
  inProgress: { FR: 'En cours', EN: 'In progress', ES: 'En progreso' },
  location: { FR: 'Lieu', EN: 'Location', ES: 'Ubicación' },
  pageTitle: { FR: 'Mon Parcours Scolaire', EN: 'My Academic Journey', ES: 'Mi Viaje Académico' },
  pageSubtitle: { FR: 'Formation et études', EN: 'Education and studies', ES: 'Educación y estudios' },
  points: { FR: 'Points clés', EN: 'Key points', ES: 'Puntos clave' },
  visitSite: { FR: 'Visiter le site', EN: 'Visit website', ES: 'Visitar el sitio' },
  statusCount: { FR: 'formations', EN: 'programs', ES: 'programas' },
  statusNote: { FR: "Passionné par l'informatique graphique", EN: 'Passionate about graphic computing', ES: 'Apasionado por la computación gráfica' },
  
  
  // Stage -----------
  stage: { FR: 'Stage', EN: 'Internship', ES: 'Práctica' },
};

export const Component = ({ currentLanguage }) => {
  const { zoom, zoomIn, zoomOut, resetZoom } = useZoom();

  return (
    <div className="xp-app">
      {/* Menu Bar avec Zoom */}
      <MenuBar 
        zoom={zoom} 
        onZoomIn={zoomIn} 
        onZoomOut={zoomOut} 
        onReset={resetZoom}
        currentLanguage={currentLanguage}
      />

      {/* Toolbar */}
      <div className="xp-toolbar">
        <button className="xp-toolbar-btn">
          <img src="/icons/arrow_left.png" alt="" className="w-4 h-4" />
          {t(COPY.toolbarBack, currentLanguage)}
        </button>
        <button className="xp-toolbar-btn">
          <img src="/icons/arrow_right.png" alt="" className="w-4 h-4" />
          {t(COPY.toolbarNext, currentLanguage)}
        </button>
        <div className="xp-toolbar-separator" />
        <button className="xp-toolbar-btn">
          <img src="/icons/folder.webp" alt="" className="w-4 h-4" />
          {t(COPY.toolbarProjects, currentLanguage)}
        </button>
        <button className="xp-toolbar-btn">
          <img src="/icons/note.webp" alt="" className="w-4 h-4" />
          {t(COPY.toolbarCv, currentLanguage)}
        </button>
      </div>

      {/* Address Bar */}
      <div className="xp-addressbar">
        <span className="xp-addressbar-label">{t(COPY.address, currentLanguage)}</span>
        <div className="xp-addressbar-input">
          <img src="/icons/note.webp" alt="" className="w-4 h-4" />
          <span>{t(COPY.addressPath, currentLanguage)}</span>
        </div>
        <button className="xp-addressbar-go">{t(COPY.addressOk, currentLanguage)}</button>
      </div>

      {/* Main Content */}
      <div className="xp-content xp-content-zoomable" style={getZoomStyle(zoom)}>
        {/* Sidebar */}
        <div className="xp-sidebar">
          <div className="xp-sidebar-box">
            <div className="xp-sidebar-title">
              <img src="/icons/folder.webp" alt="" />
              {t(COPY.nav, currentLanguage)}
            </div>
            <div className="xp-sidebar-link">
              <img src="/icons/folder.webp" alt="" />
              {t(COPY.navCurrent, currentLanguage)}
            </div>
            <div className="xp-sidebar-link">
              <img src="/icons/folder.webp" alt="" />
              {t(COPY.navDiplomas, currentLanguage)}
            </div>
            <div className="xp-sidebar-link">
              <img src="/icons/file.png" alt="" />
              {t(COPY.navCerts, currentLanguage)}
            </div>
          </div>

          <div className="xp-sidebar-box">
            <div className="xp-sidebar-title">
              <img src="/icons/questionMark.webp" alt="" />
              {t(COPY.info, currentLanguage)}
            </div>
            <div className="xp-sidebar-text">
              <p><strong>{t(COPY.total, currentLanguage)}:</strong> 2 {t(COPY.statusCount, currentLanguage)}</p>
              <p><strong>{t(COPY.inProgress, currentLanguage)}:</strong> BUT Info</p>
              <p><strong>{t(COPY.location, currentLanguage)}:</strong> Le Puy-en-Velay</p>
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="xp-content-main">
          {/* Page Header */}
          <div className="xp-page-header">
            <img src="/icons/note.webp" alt="" className="xp-page-header-icon" />
            <div>
              <h1 className="xp-page-title">{t(COPY.pageTitle, currentLanguage)}</h1>
              <p className="xp-page-subtitle">{t(COPY.pageSubtitle, currentLanguage)}</p>
            </div>
          </div>

          {/* Timeline */}
          {parcours.map((item) => (
            <div key={item.id} className="xp-box xp-mb-3">
              <div className={`xp-box-header ${item.enCours ? '' : 'xp-box-header-green'}`}>
                <img src="/icons/folder.webp" alt="" />
                {t(item.titre, currentLanguage)}
                {item.enCours && (
                  <span className="xp-tag-yellow" style={{ marginLeft: 'auto' }}>{t(COPY.inProgress, currentLanguage)}</span>
                )}
              </div>
              <div className="xp-box-content">
                <div className="xp-flex xp-gap-2 xp-mb-2">
                  <img src="#" alt="" className="w-4 h-4" /> {/* IMAGE TITRE */}
                  <span className="xp-text-bold">{item.etablissement}</span>
                  <span className="xp-text-gray">-</span>
                  <span className="xp-text-gray">{item.periode}</span>
                </div>

                <div className="xp-flex xp-gap-2 xp-mb-2">
                  <img src="/icons/location.ico" alt="" className="w-4 h-4" />
                  <span className="xp-text-gray">{item.adresse || item.lieu}</span>
                </div>

                <p className="xp-text-gray xp-mb-2" style={{ lineHeight: '1.5' }}>
                  {t(item.description, currentLanguage)}
                </p>

                <div className="xp-tipbox">
                  <img src="/icons/questionMark.webp" alt="" />
                  <div>
                    <strong>{t(COPY.points, currentLanguage)}:</strong>
                    <ul className="xp-list xp-mt-1">
                      {item.details.map((detail, i) => (
                        <li key={i} className="xp-list-item">
                          <img src="/icons/folder.webp" alt="" />
                          {t(detail, currentLanguage)}
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
                  <img src="/icons/explorer.webp" alt="" />
                  {t(COPY.visitSite, currentLanguage)}
                </a>
              </div>
            </div>

            
          ))}

           {/* Ajouter ici la partie pour le stage POLENO */}
          
        </div>
      </div>

      {/* Status Bar */}
      <div className="xp-statusbar">
        <span>{parcours.length} {t(COPY.statusCount, currentLanguage)}</span>
        <span>{t(COPY.statusNote, currentLanguage)}</span>
      </div>
    </div>
  );
};
