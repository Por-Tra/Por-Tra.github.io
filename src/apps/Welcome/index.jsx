/**
 * Application: Welcome
 * 
 * Page d'accueil avec instructions de navigation - Style Windows XP
 */
import profilePic from '../../assets/PP.jpg';
import XpMenuBar from '../../components/XpMenuBar';

export const config = {
  id: 'welcome',
  name: 'Bienvenue',
  icon: '/icons/questionMark.png',
  defaultWidth: 700,
  defaultHeight: 500,
};

export const Component = () => {
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
              <img src="/icons/folder.png" alt="" className="w-4 h-4" />
              Navigation
            </div>
            <div className="xp-sidebar-content">
              <a href="#" className="xp-sidebar-link">
                <img src="/icons/user.png" alt="" className="w-3 h-3" />
                À propos
              </a>
              <a href="#" className="xp-sidebar-link">
                <img src="/icons/folder.png" alt="" className="w-3 h-3" />
                Mes Projets
              </a>
              <a href="#" className="xp-sidebar-link">
                <img src="/icons/note.png" alt="" className="w-3 h-3" />
                Compétences
              </a>
              <a href="#" className="xp-sidebar-link">
                <img src="/icons/message.ico" alt="" className="w-3 h-3" />
                Contact
              </a>
            </div>
          </div>

          <div className="xp-sidebar-box">
            <div className="xp-sidebar-header">
              <img src="/icons/web.png" alt="" className="w-4 h-4" />
              Liens externes
            </div>
            <div className="xp-sidebar-content">
              <a href="https://github.com/Por-Tra" target="_blank" rel="noopener noreferrer" className="xp-sidebar-link">
                <img src="/icons/git.png" alt="" className="w-3 h-3" />
                GitHub
              </a>
              <a href="https://linkedin.com/in/lucas-contreras-hodapp" target="_blank" rel="noopener noreferrer" className="xp-sidebar-link">
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
            <img src={profilePic} alt="Lucas Contreras Hodapp" className="xp-profile-pic" />
            <div>
              <h1 className="text-xl font-bold text-white">Bienvenue sur mon Portfolio</h1>
              <p className="text-sm text-blue-100">Windows XP Edition - Lucas Contreras Hodapp</p>
            </div>
          </div>

          {/* Welcome Box */}
          <div className="xp-tipbox">
            <img src="/icons/questionMark.png" alt="" className="w-5 h-5 flex-shrink-0" />
            <div>
              <strong>Comment naviguer ?</strong>
              <ul className="mt-2 space-y-1 text-xs">
                <li><strong>1.</strong> Double-cliquez sur les icônes du bureau pour ouvrir les applications</li>
                <li><strong>2.</strong> Glissez les icônes pour les réorganiser sur le bureau</li>
                <li><strong>3.</strong> Déplacez les fenêtres par leur barre de titre</li>
                <li><strong>4.</strong> Utilisez le menu Démarrer pour accéder aux applications</li>
              </ul>
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
                <div className="xp-app-item">
                  <img src="/icons/user.png" alt="" className="w-6 h-6" />
                  <span>À propos de moi</span>
                </div>
                <div className="xp-app-item">
                  <img src="/icons/folder.png" alt="" className="w-6 h-6" />
                  <span>Mes Projets</span>
                </div>
                <div className="xp-app-item">
                  <img src="/icons/note.png" alt="" className="w-6 h-6" />
                  <span>Compétences</span>
                </div>
                <div className="xp-app-item">
                  <img src="/icons/signal.png" alt="" className="w-6 h-6" />
                  <span>Contact</span>
                </div>
                <div className="xp-app-item">
                  <img src="/icons/git.png" alt="" className="w-6 h-6" />
                  <span>GitHub</span>
                </div>
                <div className="xp-app-item">
                  <img src="/icons/link.png" alt="" className="w-6 h-6" />
                  <span>LinkedIn</span>
                </div>
              </div>
            </div>
          </div>

          {/* Info Box */}
          <div className="xp-box">
            <div className="xp-box-header">
              <img src="/icons/info.png" alt="" className="w-4 h-4" />
              À propos de ce portfolio
            </div>
            <div className="xp-box-content">
              <p className="text-xs">Ce portfolio est une simulation de Windows XP créé avec React et TailwindCSS. Naviguez comme vous le feriez sur un vrai système d'exploitation !
                Il a été inspiré grandement du site <a href="https://xque.dev/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">xque portfolio</a>.</p>
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
