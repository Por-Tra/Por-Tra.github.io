/**
 * Application: About
 * 
 * Page "À propos" avec les informations personnelles - Style Windows XP
 */
import { MenuBar, useZoom, getZoomStyle } from '../../components/ProjectLayout';
import profilePic from '../../assets/PP.webp';
import { t } from '../../i18n/text';

export const config = {
  id: 'about',
  name: 'À propos',
  icon: '/icons/note.webp',
  defaultWidth: 700,
  defaultHeight: 520,
};

const COPY = {
  toolbarBack: { FR: 'Précédent', EN: 'Back', ES: 'Atras' },
  toolbarNext: { FR: 'Suivant', EN: 'Next', ES: 'Siguiente' },
  toolbarProjects: { FR: 'Mes Projets', EN: 'My Projects', ES: 'Mis Proyectos' },
  toolbarCv: { FR: 'Mon CV', EN: 'My CV', ES: 'Mi CV' },
  address: { FR: 'Adresse', EN: 'Address', ES: 'Dirección' },
  addressPath: { FR: 'À propos de moi', EN: 'About me', ES: 'Sobre mí' },
  addressOk: { FR: 'OK', EN: 'OK', ES: 'OK' },
  sidebarSocial: { FR: 'Réseaux', EN: 'Social links', ES: 'Enlaces sociales' },
  sidebarSkills: { FR: 'Compétences', EN: 'Skills', ES: 'Habilidades' },
  sidebarSoftware: { FR: 'Logiciels', EN: 'Software', ES: 'Software' },
  skillWeb: { FR: 'Développement Web', EN: 'Web development', ES: 'Desarrollo Web' },
  skillSoftware: { FR: 'Développement logiciels', EN: 'Software development', ES: 'Desarrollo de software' },
  skillPerfectionist: { FR: 'Perfectionniste', EN: 'Perfectionist', ES: 'Perfeccionista' },
  skillCreative: { FR: 'Créativité', EN: 'Creativity', ES: 'Creatividad' },
  skillProblemSolving: { FR: 'Résolution de problèmes', EN: 'Problem solving', ES: 'Resolución de problemas' },
  headerTitle: { FR: 'À propos de moi', EN: 'About Me', ES: 'Sobre Mí' },
  aboutP1: {
    FR: "Je suis Lucas, étudiant en BUT Informatique Graphique au Puy-en-Velay. Je m'attaque à des défis de développement variés et je me concentre sur la concrétisation d'idées, que ce soit pour résoudre des problèmes concrets ou explorer des concepts ambitieux comme recréer un système d'exploitation entier dans un navigateur. Ma formation a commencé au lycée Marmontel, où les études et l'informatique m'ont appris la discipline et le travail d'équipe.",
    EN: "I'm Lucas, a student in Graphic Computing at Le Puy-en-Velay. I tackle a wide range of development challenges and focus on turning ideas into reality, whether solving real problems or exploring ambitious concepts like rebuilding an operating system in a browser. My journey started at Lycée Marmontel, where studies and computer science taught me discipline and teamwork.",
    ES: "Soy Lucas, un estudiante de Informática Gráfica en Le Puy-en-Velay. Me enfrento a des desafíos de desarrollo variados y me concentro en convertir ideas en realidad, ya sea resolviendo problemas concretos o explorando conceptos ambiciosos como reconstruir un sistema operativo completo en un navegador. Mi formación comenzó en el liceo Marmontel, donde los estudios y la informática me enseñaron disciplina y trabajo en equipo."
  },
  aboutP2: {
    FR: "Après m'être engagé dans le développement, j'ai intégré le BUT Informatique Graphique et commencé à travailler sur des projets allant des jeux vidéo aux logiciels pratique.",
    EN: "After committing to development, I joined the Graphic Computing program and started working on projects ranging from video games to practical software.",
    ES: "Después de comprometerme con el desarrollo, me uní al programa de Informática Gráfica y comencé a trabajar en proyectos que van desde videojuegos hasta software práctico."
  },
  aboutP3: {
    FR: "J'ai d'abord découvert la rigueur, la discipline et l'envie de toujours repousser mes limites à travers les études et la programmation. Je suis obsédé par les détails, le processus et le fait de toujours relever la barre à chaque projet. Mon objectif est de créer un travail qui a un impact durable.",
    EN: "Through studies and programming, I discovered rigor, discipline, and the drive to push my limits. I'm obsessed with detail, process, and raising the bar on every project. My goal is to create work with lasting impact.",
    ES: "A través de los estudios y la programación, descubrí el rigor, la disciplina y el impulso de superar mis límites. Estoy obsesionado con los detalles, el proceso y elevar el listón en cada proyecto. Mi objetivo es crear un trabajo con un impacto duradero."
  },
  footer: { FR: 'En savoir plus sur Lucas', EN: 'Learn more about Lucas', ES: 'Aprende más sobre Lucas' },
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
          {/* Social Links */}
          <div className="xp-sidebar-box">
            <div className="xp-sidebar-title">
              <img src="/icons/link.webp" alt="" />
              {t(COPY.sidebarSocial, currentLanguage)}
            </div>
            <a href="https://www.instagram.com/lucas_contreras_hodapp_/" target="_blank" rel="noopener noreferrer" className="xp-sidebar-link">
              <img src="/icons/explorer.webp" alt="" />
              Instagram
            </a>
            <a href="https://github.com/Por-Tra" target="_blank" rel="noopener noreferrer" className="xp-sidebar-link">
              <img src="/icons/git.webp" alt="" />
              Github
            </a>
            <a href="https://linkedin.com/in/lucas-contreras-hodapp" target="_blank" rel="noopener noreferrer" className="xp-sidebar-link">
              <img src="/icons/link.webp" alt="" />
              LinkedIn
            </a>
          </div>

          {/* Skills */}
          <div className="xp-sidebar-box">
            <div className="xp-sidebar-title">
              <img src="/icons/setting.webp" alt="" />
              {t(COPY.sidebarSkills, currentLanguage)}
            </div>
            <div className="xp-sidebar-link">
              <img src="/icons/folder.webp" alt="" />
              {t(COPY.skillWeb, currentLanguage)}
            </div>
            <div className="xp-sidebar-link">
              <img src="/icons/folder.webp" alt="" />
              {t(COPY.skillSoftware, currentLanguage)}
            </div>
            <div className="xp-sidebar-link">
              <img src="/icons/setting.webp" alt="" />
              {t(COPY.skillPerfectionist, currentLanguage)}
            </div>
            <div className="xp-sidebar-link">
              <img src="/icons/questionMark.webp" alt="" />
              {t(COPY.skillCreative, currentLanguage)}
            </div>

            <div className="xp-sidebar-link">
              <img src="/icons/setting.webp" alt="" />
              {t(COPY.skillProblemSolving, currentLanguage)}
            </div>
          </div>

          {/* Software */}
          <div className="xp-sidebar-box">
            <div className="xp-sidebar-title">
              <img src="/icons/folder.webp" alt="" />
              {t(COPY.sidebarSoftware, currentLanguage)}
            </div>
            <div className="xp-sidebar-link">
              <img src="/icons/folder.webp" alt="" />
              VS Code
            </div>
            <div className="xp-sidebar-link">
              <img src="/icons/folder.webp" alt="" />
              VS 2022
            </div>
            <div className="xp-sidebar-link">
              <img src="/icons/git.webp" alt="" />
              Git/GitHub 
            </div>
            <div className="xp-sidebar-link">
              <img src="/icons/folder.webp" alt="" />
              Docker
            </div>

          </div>
        </div>

        {/* Main Content Area */}
        <div className="xp-content-main">
          {/* Header */}
          <h1 className="text-2xl font-bold xp-text-blue xp-mb-3">{t(COPY.headerTitle, currentLanguage)}</h1>

          {/* About Section 1 */}
          <div className="xp-flex xp-gap-3 xp-mb-3">
            <img src={profilePic} alt="Lucas Contreras Hodapp" className="xp-profile-pic" />
            <p className="xp-text-gray" style={{ lineHeight: '1.6' }}>
              {t(COPY.aboutP1, currentLanguage)}
            </p>
          </div>

          {/* About Section 3 */}
          <div className="xp-flex xp-gap-3 xp-mb-3">
            <p className="xp-text-gray" style={{ lineHeight: '1.6' }}>
              {t(COPY.aboutP2, currentLanguage)}
            </p>
          </div>

          {/* About Section 4 */}
          <div className="xp-flex xp-gap-3 xp-mb-3">
            <p className="xp-text-gray" style={{ lineHeight: '1.6' }}>
              {t(COPY.aboutP3, currentLanguage)}
            </p>
          </div>

          {/* Footer */}
          <div className="xp-statusbar" style={{ position: 'static', marginTop: '12px' }}>
            <span>{t(COPY.footer, currentLanguage)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
