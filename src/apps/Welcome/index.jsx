/**
 * Application: Welcome
 *
 * Page d'accueil avec instructions de navigation - Style Windows XP
 */
import profilePic from "../../assets/PP.jpg";
import XpMenuBar from "../../components/XpMenuBar";

export const config = {
  id: "welcome",
  name: "Bienvenue",
  icon: "/icons/questionMark.png",
  defaultWidth: 700,
  defaultHeight: 500,
};

export const Component = ({ onOpenApp }) => {
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
      <XpMenuBar className="xp-menubar" itemClassName="" />

      {/* Toolbar */}
      <div className="xp-toolbar">
        <button className="xp-toolbar-btn">
          <img src="/icons/back.png" alt="" className="w-4 h-4" />
          Précédent
        </button>
        <div className="xp-toolbar-separator"></div>
        <button className="xp-toolbar-btn">
          <img src="/icons/folder.png" alt="" className="w-4 h-4" />
          Dossiers
        </button>
      </div>

      {/* Address Bar */}
      <div className="xp-addressbar">
        <span className="xp-addressbar-label">Adresse</span>
        <div className="xp-addressbar-input">
          <img src="/icons/folder.png" alt="" className="w-4 h-4" />
          <span>C:\Utilisateurs\Lucas\Bienvenue</span>
        </div>
      </div>

      {/* Main Content */}
      <div className="xp-content">
        {/* Sidebar */}
        <div className="xp-sidebar">

          <div className="xp-sidebar-box">
            <div className="xp-sidebar-header">
              <img src="/icons/web.png" alt="" className="w-4 h-4" />
              Liens externes
            </div>
            <div className="xp-sidebar-content">
              <a
                href="https://github.com/Por-Tra"
                target="_blank"
                rel="noopener noreferrer"
                className="xp-sidebar-link"
              >
                <img src="/icons/git.png" alt="" className="w-3 h-3" />
                GitHub
              </a>
              <a
                href="https://linkedin.com/in/lucas-contreras-hodapp"
                target="_blank"
                rel="noopener noreferrer"
                className="xp-sidebar-link"
              >
                <img src="/icons/link.png" alt="" className="w-3 h-3" />
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
                Bienvenue sur mon Portfolio
              </h1>
              <p className="text-sm text-blue-100">
                Windows XP Edition - Lucas Contreras Hodapp
              </p>
            </div>
          </div>

          {/* Welcome Box */}
          <div className="xp-tipbox">
            <img
              src="/icons/questionMark.png"
              alt=""
              className="w-5 h-5 flex-shrink-0"
            />
            <div>
              <strong>Comment utilsier mon portfolio ?</strong>
              <h1>Tu sais utiliser un ordinateur ?</h1>
              <p>
                Alors tu sais utiliser mon portfolio. Il fonctionne comme un
                vrai système d'exploitation, tu peux naviguer dans l'explorateur
                de fichier, ouvrir des dossier et applications, modifier des
                paramètres et bien plus encore.
              </p>
            </div>
          </div>

          {/* Applications Grid */}
          <div className="xp-box xp-box-blue">
            <div className="xp-box-header">
              <img src="/icons/folder.png" alt="" className="w-4 h-4" />
              Applications disponibles
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
                  <img src="/icons/note.png" alt="" className="w-6 h-6" />
                  <span>À propos de moi</span>
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
                  <img src="/icons/folder.png" alt="" className="w-6 h-6" />
                  <span>Mes Projets</span>
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
                  <img src="/icons/note.png" alt="" className="w-6 h-6" />
                  <span>Compétences</span>
                </div>
                <div
                  className="xp-app-item"
                  role="button"
                  tabIndex={0}
                  onClick={() => openWelcomeItem("contact")}
                  onKeyDown={(event) => handleItemKeyDown(event, "contact")}
                >
                  <img src="/icons/message.ico" alt="" className="w-6 h-6" />
                  <span>Contact</span>
                </div>
                <div
                  className="xp-app-item"
                  role="button"
                  tabIndex={0}
                  onClick={() => openWelcomeItem("github")}
                  onKeyDown={(event) => handleItemKeyDown(event, "github")}
                >
                  <img src="/icons/git.png" alt="" className="w-6 h-6" />
                  <span>GitHub</span>
                </div>
                <div
                  className="xp-app-item"
                  role="button"
                  tabIndex={0}
                  onClick={() => openWelcomeItem("linkedin")}
                  onKeyDown={(event) => handleItemKeyDown(event, "linkedin")}
                >
                  <img src="/icons/link.png" alt="" className="w-6 h-6" />
                  <span>LinkedIn</span>
                </div>
              </div>
            </div>
          </div>

          {/* Info Box */}
          <div className="xp-box">
            <div className="xp-box-header">
              <img src="/icons/questionMark.png" alt="" className="w-4 h-4" />À propos
              de ce portfolio
            </div>
            <div className="xp-box-content">
              <p className="text-xs">
                Ce portfolio est une simulation de Windows XP créé avec React et
                TailwindCSS. Naviguez comme vous le feriez sur un vrai système
                d'exploitation ! Il a été inspiré grandement du site{" "}
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
                src="/icons/ecoConcep.png"
                alt="logo-eco"
                className="w-4 h-4"
              />
              Et l'éco-conception dans tout ça ?
            </div>
            <div className="xp-box-content">
              <p className="xp-tipbox-text">
                Ce portfolio a été conçu avec une approche d'éco-conception
                numérique. J'ai optimisé les images pour réduire leur poids,
                utilisé des polices système pour éviter les chargements
                externes, et minimisé le code pour améliorer les performances.
                L'objectif est de créer une expérience utilisateur fluide tout
                en réduisant l'empreinte carbone du site.
              </p>
              <p className="xp-tipbox-text xp-eco-source">
                Les stats d'après{" "}
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
                  <span>Une page lourde de 0.329 Mo</span>
                </li>
                <li className="xp-list-item">
                  <span className="xp-list-bullet xp-list-bullet-green"></span>
                  <span>Une page simple de 28 éléments</span>
                </li>
                <li className="xp-list-item">
                  <span className="xp-list-bullet xp-list-bullet-green"></span>
                  <span>Très peu de requêtes : 6 requêtes</span>
                </li>
                <li className="xp-list-item">
                  <span className="xp-list-bullet xp-list-bullet-green"></span>
                  <span>
                    Pour 1000 visite c'est{" "}
                    <strong>16.8 L de consommation d'eau bleue</strong>
                  </span>
                </li>
                <li className="xp-list-item">
                  <span className="xp-list-bullet xp-list-bullet-green"></span>
                  <span>
                    Pour 1000 visites c'est aussi{" "}
                    <strong>
                      1.12 kgCO2e d'émission de gaz à effet de serre
                    </strong>
                  </span>
                </li>
              </ul>

              <div className="xp-tipbox xp-eco-quote">
                <img src="/icons/info.png" alt="info" className="w-4 h-4" />
                <p className="xp-tipbox-text">
                  D'après ecoindex : "Le top. On se rapproche dangereusement de
                  la perfection."
                </p>
              </div>

              {/* Section images */}
              <div className="xp-eco-gallery">
                <img
                  src="/ecoindex/1.png"
                  alt="Résultat EcoIndex 1"
                  className="xp-eco-image"
                />
                <img
                  src="/ecoindex/2.png"
                  alt="Résultat EcoIndex 2"
                  className="xp-eco-image"
                />
                <img
                  src="/ecoindex/3.png"
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
        <span>Portfolio de Lucas Contreras Hodapp</span>
        <span>Windows XP Edition</span>
      </div>
    </div>
  );
};
