/**
 * Application: Welcome
 *
 * Page d'accueil avec instructions de navigation - Style Windows XP
 */
import profilePic from "../../assets/PP.webp";
import XpMenuBar from "../../components/XpMenuBar";
import { t, getAppLabel } from "../../i18n/text";

export const config = {
  id: "welcome",
  name: "Bienvenue",
  icon: "/icons/questionMark.webp",
  defaultWidth: 700,
  defaultHeight: 500,
};

const COPY = {
  toolbarBack: { FR: "Précédent", EN: "Back", ES: "Atras" },
  toolbarFolders: { FR: "Dossiers", EN: "Folders", ES: "Carpetas" },
  address: { FR: "Adresse", EN: "Address", ES: "Dirección" },
  addressPath: { FR: "C:\\Utilisateurs\\Lucas\\Bienvenue", EN: "C:\\Users\\Lucas\\Welcome", ES: "C:\\Usuarios\\Lucas\\Bienvenido" },
  externalLinks: { FR: "Liens externes", EN: "External links", ES: "Enlaces externos" },
  headerTitle: { FR: "Bienvenue sur mon Portfolio", EN: "Welcome to my Portfolio", ES: "Bienvenido a mi Portfolio" },
  headerSubtitle: { FR: "Windows XP Edition - Lucas Contreras Hodapp", EN: "Windows XP Edition - Lucas Contreras Hodapp", ES: "Edición Windows XP - Lucas Contreras Hodapp" },
  tipTitle: { FR: "Comment utiliser mon portfolio ?", EN: "How to use my portfolio?", ES: "¿Cómo usar mi portfolio?" },
  tipSubtitle: { FR: "Tu sais utiliser un ordinateur ?", EN: "Do you know how to use a computer?", ES: "¿Sabes cómo usar una computadora?" },
  tipBody: {
    FR: "Alors tu sais utiliser mon portfolio. Il fonctionne comme un vrai système d'exploitation, tu peux naviguer dans l'explorateur de fichier, ouvrir des dossier et applications, modifier des paramètres et bien plus encore.",
    EN: "Then you know how to use my portfolio. It works like a real operating system: browse the file explorer, open folders and apps, tweak settings, and much more.",
    ES: "Entonces sabes cómo usar mi portfolio. Funciona como un sistema operativo real: navega en el explorador de archivos, abre carpetas y aplicaciones, ajusta la configuración y mucho más.",
  },
  appsAvailable: { FR: "Applications disponibles", EN: "Available applications", ES: "Aplicaciones disponibles" },
  aboutPortfolio: { FR: "À propos de ce portfolio", EN: "About this portfolio", ES: "Sobre este portfolio" },
  aboutBody: {
    FR: "Ce portfolio est une simulation de Windows XP créé avec React et TailwindCSS. Naviguez comme vous le feriez sur un vrai système d'exploitation ! Il a été inspiré grandement du site ",
    EN: "This portfolio is a Windows XP simulation built with React and TailwindCSS. Navigate just like on a real operating system! It was heavily inspired by the site ",
    ES: "Este portfolio es una simulación de Windows XP creada con React y TailwindCSS. Navega como lo harías en un sistema operativo real! Fue fuertemente inspirado por el sitio ",
  },
  ecoTitle: { FR: "Et l'éco-conception dans tout ça ?", EN: "What about eco-design?" },
  ecoBody: {
    FR: "Ce portfolio a été conçu avec une approche d'éco-conception numérique. J'ai optimisé les images pour réduire leur poids, utilisé des polices système pour éviter les chargements externes, et minimisé le code pour améliorer les performances. L'objectif est de créer une expérience utilisateur fluide tout en réduisant l'empreinte carbone du site.",
    EN: "This portfolio was built with a digital eco-design approach. I optimized images to reduce weight, used system fonts to avoid external loads, and minimized code to improve performance. The goal is a smooth experience with a smaller carbon footprint.",
    ES: "Este portfolio fue construido con un enfoque de eco-diseño digital. Optimicé las imágenes para reducir su peso, utilicé fuentes del sistema para evitar cargas externas y minimicé el código para mejorar el rendimiento. El objetivo es una experiencia fluida con una menor huella de carbono.",
  },
  ecoSourcePrefix: { FR: "Les stats d'après", EN: "Stats from", ES: "Estadísticas de" },
  ecoItem1: { FR: "Une page lourde de 0.329 Mo", EN: "A page weight of 0.329 MB", ES: "Una página pesada de 0.329 MB" },
  ecoItem2: { FR: "Une page simple de 28 éléments", EN: "A simple page with 28 elements", ES: "Una página simple con 28 elementos" },
  ecoItem3: { FR: "Très peu de requêtes : 6 requêtes", EN: "Very few requests: 6 requests", ES: "Muy pocas solicitudes: 6 solicitudes" },
  ecoItem4Prefix: { FR: "Pour 1000 visite c'est", EN: "For 1,000 visits that's", ES: "Para 1,000 visitas eso es" },
  ecoItem4Strong: { FR: "16.8 L de consommation d'eau bleue", EN: "16.8 L of blue water consumption", ES: "16.8 L de consumo de agua azul" },
  ecoItem5Prefix: { FR: "Pour 1000 visites c'est aussi", EN: "For 1,000 visits that's also", ES: "Para 1,000 visitas eso también es" },
  ecoItem5Strong: { FR: "1.12 kgCO2e d'émission de gaz à effet de serre", EN: "1.12 kgCO2e of greenhouse gas emissions", ES: "1.12 kgCO2e de emisiones de gases de efecto invernadero" },
  ecoQuote: { FR: "D'après ecoindex : \"Le top. On se rapproche dangereusement de la perfection.\"", EN: "According to ecoindex: \"Top. We're getting dangerously close to perfection.\"" },
  statusLeft: { FR: "Portfolio de Lucas Contreras Hodapp", EN: "Portfolio of Lucas Contreras Hodapp", ES: "Portfolio de Lucas Contreras Hodapp" },
  statusRight: { FR: "Windows XP Edition", EN: "Windows XP Edition", ES: "Edición Windows XP" },
};

export const Component = ({ onOpenApp, currentLanguage }) => {
  const openWelcomeItem = (target) => {
    if (target === "github") {
      window.open(
        "https://github.com/Por-Tra",
        "_blank",
        "noopener,noreferrer",
      );
      return;
    }

    if (target === "linkedin") {
      window.open(
        "https://linkedin.com/in/lucas-contreras-hodapp",
        "_blank",
        "noopener,noreferrer",
      );
      return;
    }

    if (onOpenApp) {
      onOpenApp(target);
    }
  };

  const handleItemKeyDown = (event, target) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      openWelcomeItem(target);
    }
  };

  return (
    <div className="xp-app">
      {/* Menu Bar */}
      <XpMenuBar className="xp-menubar" itemClassName="" currentLanguage={currentLanguage} />

      {/* Toolbar */}
      <div className="xp-toolbar">
        <button className="xp-toolbar-btn">
          <img src="/icons/back.webp" alt="" className="w-4 h-4" />
          {t(COPY.toolbarBack, currentLanguage)}
        </button>
        <div className="xp-toolbar-separator"></div>
        <button className="xp-toolbar-btn">
          <img src="/icons/folder.webp" alt="" className="w-4 h-4" />
          {t(COPY.toolbarFolders, currentLanguage)}
        </button>
      </div>

      {/* Address Bar */}
      <div className="xp-addressbar">
        <span className="xp-addressbar-label">{t(COPY.address, currentLanguage)}</span>
        <div className="xp-addressbar-input">
          <img src="/icons/folder.webp" alt="" className="w-4 h-4" />
          <span>{t(COPY.addressPath, currentLanguage)}</span>
        </div>
      </div>

      {/* Main Content */}
      <div className="xp-content">
        {/* Sidebar */}
        <div className="xp-sidebar">

          <div className="xp-sidebar-box">
            <div className="xp-sidebar-header">
              <img src="/icons/web.png" alt="" className="w-4 h-4" />
              {t(COPY.externalLinks, currentLanguage)}
            </div>
            <div className="xp-sidebar-content">
              <a
                href="https://github.com/Por-Tra"
                target="_blank"
                rel="noopener noreferrer"
                className="xp-sidebar-link"
              >
                <img src="/icons/git.webp" alt="" className="w-3 h-3" />
                GitHub
              </a>
              <a
                href="https://linkedin.com/in/lucas-contreras-hodapp"
                target="_blank"
                rel="noopener noreferrer"
                className="xp-sidebar-link"
              >
                <img src="/icons/link.webp" alt="" className="w-3 h-3" />
                LinkedIn
              </a>
            </div>
          </div>
        </div>

        {/* Main Panel */}
        <div className="xp-content-main">
          {/* Header Banner */}
          <div className="xp-header-banner">
            <img
              src={profilePic}
              alt="Lucas Contreras Hodapp"
              className="xp-profile-pic"
            />
            <div>
              <h1 className="text-xl font-bold text-white">
                {t(COPY.headerTitle, currentLanguage)}
              </h1>
              <p className="text-sm text-blue-100">
                {t(COPY.headerSubtitle, currentLanguage)}
              </p>
            </div>
          </div>

          {/* Welcome Box */}
          <div className="xp-tipbox">
            <img
              src="/icons/questionMark.webp"
              alt=""
              className="w-5 h-5 flex-shrink-0"
            />
            <div>
              <strong>{t(COPY.tipTitle, currentLanguage)}</strong>
              <h1>{t(COPY.tipSubtitle, currentLanguage)}</h1>
              <p>
                {t(COPY.tipBody, currentLanguage)}
              </p>
            </div>
          </div>

          {/* Applications Grid */}
          <div className="xp-box xp-box-blue">
            <div className="xp-box-header">
              <img src="/icons/folder.webp" alt="" className="w-4 h-4" />
              {t(COPY.appsAvailable, currentLanguage)}
            </div>
            <div className="xp-box-content">
              <div className="grid grid-cols-2 gap-2">
                <div
                  className="xp-app-item"
                  role="button"
                  tabIndex={0}
                  onClick={() => openWelcomeItem("about")}
                  onKeyDown={(event) => handleItemKeyDown(event, "about")}
                >
                  <img src="/icons/note.webp" alt="" className="w-6 h-6" />
                  <span>{getAppLabel("about", "À propos", currentLanguage)}</span>
                </div>
                <div
                  className="xp-app-item"
                  role="button"
                  tabIndex={0}
                  onClick={() => openWelcomeItem("projects-folder-shortcut")}
                  onKeyDown={(event) =>
                    handleItemKeyDown(event, "projects-folder-shortcut")
                  }
                >
                  <img src="/icons/folder.webp" alt="" className="w-6 h-6" />
                  <span>{getAppLabel("projects-folder-shortcut", "Mes Projets", currentLanguage)}</span>
                </div>
                <div
                  className="xp-app-item"
                  role="button"
                  tabIndex={0}
                  onClick={() => openWelcomeItem("skills")}
                  onKeyDown={(event) =>
                    handleItemKeyDown(event, "skills")
                  }
                >
                  <img src="/icons/note.webp" alt="" className="w-6 h-6" />
                  <span>{getAppLabel("skills", "Compétences", currentLanguage)}</span>
                </div>
                <div
                  className="xp-app-item"
                  role="button"
                  tabIndex={0}
                  onClick={() => openWelcomeItem("contact")}
                  onKeyDown={(event) => handleItemKeyDown(event, "contact")}
                >
                  <img src="/icons/message.ico" alt="" className="w-6 h-6" />
                  <span>{getAppLabel("contact", "Contact", currentLanguage)}</span>
                </div>
                <div
                  className="xp-app-item"
                  role="button"
                  tabIndex={0}
                  onClick={() => openWelcomeItem("github")}
                  onKeyDown={(event) => handleItemKeyDown(event, "github")}
                >
                  <img src="/icons/git.webp" alt="" className="w-6 h-6" />
                  <span>GitHub</span>
                </div>
                <div
                  className="xp-app-item"
                  role="button"
                  tabIndex={0}
                  onClick={() => openWelcomeItem("linkedin")}
                  onKeyDown={(event) => handleItemKeyDown(event, "linkedin")}
                >
                  <img src="/icons/link.webp" alt="" className="w-6 h-6" />
                  <span>LinkedIn</span>
                </div>
              </div>
            </div>
          </div>

          {/* Info Box */}
          <div className="xp-box">
            <div className="xp-box-header">
              <img src="/icons/questionMark.webp" alt="" className="w-4 h-4" />
              {t(COPY.aboutPortfolio, currentLanguage)}
            </div>
            <div className="xp-box-content">
              <p className="text-xs">
                {t(COPY.aboutBody, currentLanguage)}
                <a
                  href="https://xque.dev/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  xque portfolio
                </a>
                .
              </p>
            </div>
          </div>

          <div className="xp-box xp-box-blue">
            <div className="xp-box-header">
              <img
                src="/icons/ecoConcep.webp"
                alt="logo-eco"
                className="w-4 h-4"
              />
              {t(COPY.ecoTitle, currentLanguage)}
            </div>
            <div className="xp-box-content">
              <p className="xp-tipbox-text">
                {t(COPY.ecoBody, currentLanguage)}
              </p>
              <p className="xp-tipbox-text xp-eco-source">
                {t(COPY.ecoSourcePrefix, currentLanguage)}{" "}
                <a
                  href="https://www.ecoindex.fr/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="xp-link"
                >
                  ecoindex
                </a>
              </p>
              <ul className="xp-list xp-eco-list">
                <li className="xp-list-item">
                  <span className="xp-list-bullet xp-list-bullet-green"></span>
                  <span>{t(COPY.ecoItem1, currentLanguage)}</span>
                </li>
                <li className="xp-list-item">
                  <span className="xp-list-bullet xp-list-bullet-green"></span>
                  <span>{t(COPY.ecoItem2, currentLanguage)}</span>
                </li>
                <li className="xp-list-item">
                  <span className="xp-list-bullet xp-list-bullet-green"></span>
                  <span>{t(COPY.ecoItem3, currentLanguage)}</span>
                </li>
                <li className="xp-list-item">
                  <span className="xp-list-bullet xp-list-bullet-green"></span>
                  <span>
                    {t(COPY.ecoItem4Prefix, currentLanguage)}{" "}
                    <strong>{t(COPY.ecoItem4Strong, currentLanguage)}</strong>
                  </span>
                </li>
                <li className="xp-list-item">
                  <span className="xp-list-bullet xp-list-bullet-green"></span>
                  <span>
                    {t(COPY.ecoItem5Prefix, currentLanguage)}{" "}
                    <strong>{t(COPY.ecoItem5Strong, currentLanguage)}</strong>
                  </span>
                </li>
              </ul>

              <div className="xp-tipbox xp-eco-quote">
                <img src="/icons/info.png" alt="info" className="w-4 h-4" />
                <p className="xp-tipbox-text">
                  {t(COPY.ecoQuote, currentLanguage)}
                </p>
              </div>

              {/* Section images */}
              <div className="xp-eco-gallery">
                <img
                  src="/ecoindex/1.webp"
                  alt="Résultat EcoIndex 1"
                  className="xp-eco-image"
                />
                <img
                  src="/ecoindex/2.webp"
                  alt="Résultat EcoIndex 2"
                  className="xp-eco-image"
                />
                <img
                  src="/ecoindex/3.webp"
                  alt="Résultat EcoIndex 3"
                  className="xp-eco-image"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Status Bar */}
      <div className="xp-statusbar">
        <span>{t(COPY.statusLeft, currentLanguage)}</span>
        <span>{t(COPY.statusRight, currentLanguage)}</span>
      </div>
    </div>
  );
};
