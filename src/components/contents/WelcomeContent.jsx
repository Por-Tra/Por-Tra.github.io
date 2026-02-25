import XpMenuBar from '../XpMenuBar';

const WelcomeContent = () => {
  return (
    <div className="h-full bg-white flex flex-col">
      {/* XP Explorer Toolbar */}
      <XpMenuBar
        className="bg-gradient-to-b from-[#ece9d8] to-[#d4d0c8] border-b border-[#808080] px-2 py-1 flex gap-4 text-xs"
        itemClassName="text-gray-600 hover:underline cursor-pointer"
      />

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Panel - XP Blue Sidebar */}
        <div className="w-48 bg-gradient-to-b from-[#6b88c4] to-[#4d6eb5] p-2 overflow-y-auto flex-shrink-0">
          <div className="bg-white/90 rounded-lg p-2 mb-2">
            <h3 className="text-[11px] font-bold text-[#215dc6] mb-2">Navigation</h3>
            <div className="space-y-1 text-[10px]">
              <div className="flex items-center gap-1 text-[#215dc6] hover:underline cursor-pointer">
                <img src="/icons/folder.png" alt="" className="w-4 h-4" />
                À propos
              </div>
              <div className="flex items-center gap-1 text-[#215dc6] hover:underline cursor-pointer">
                <img src="/icons/folder.png" alt="" className="w-4 h-4" />
                Mes Projets
              </div>
              <div className="flex items-center gap-1 text-[#215dc6] hover:underline cursor-pointer">
                <img src="/icons/folder.png" alt="" className="w-4 h-4" />
                Compétences
              </div>
              <div className="flex items-center gap-1 text-[#215dc6] hover:underline cursor-pointer">
                <img src="/icons/folder.png" alt="" className="w-4 h-4" />
                Contact
              </div>
            </div>
          </div>

          <div className="bg-white/90 rounded-lg p-2">
            <h3 className="text-[11px] font-bold text-[#215dc6] mb-2">Liens externes</h3>
            <div className="space-y-1 text-[10px]">
              <a href="https://github.com/Por-Tra" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-[#215dc6] hover:underline">
                <img src="/icons/git.png" alt="" className="w-4 h-4" />
                GitHub
              </a>
              <a href="https://linkedin.com/in/lucas-contreras-hodapp" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-[#215dc6] hover:underline">
                <img src="/icons/link.png" alt="" className="w-4 h-4" />
                LinkedIn
              </a>
            </div>
          </div>
        </div>

        {/* Right Panel - Main Content */}
        <div className="flex-1 overflow-y-auto">
          {/* Blue Header Banner */}
          <div className="bg-gradient-to-r from-[#0058e6] via-[#2878e8] to-[#3a8ff5] p-4">
            <div className="flex items-center gap-4">
              <img src="/icons/questionMark.png" alt="" className="w-12 h-12" />
              <div>
                <h1 className="text-xl font-bold text-white">Bienvenue sur mon Portfolio</h1>
                <p className="text-sm text-blue-100">Windows XP Edition - Lucas Contreras Hodapp</p>
              </div>
            </div>
          </div>

          <div className="p-4">
            {/* Welcome Box */}
            <div className="bg-[#ffffd5] border border-[#808080] rounded shadow-sm p-4 mb-4">
              <h2 className="text-sm font-bold text-[#003399] mb-2 flex items-center gap-2">
                <img src="/icons/questionMark.png" alt="" className="w-5 h-5" />
                Comment naviguer ?
              </h2>
              <ul className="space-y-2 text-xs text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-[#003399] font-bold">1.</span>
                  <span><strong>Double-cliquez</strong> sur les icônes du bureau pour ouvrir les applications</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#003399] font-bold">2.</span>
                  <span><strong>Glissez</strong> les icônes pour les réorganiser sur le bureau</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#003399] font-bold">3.</span>
                  <span><strong>Déplacez</strong> les fenêtres par leur barre de titre</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#003399] font-bold">4.</span>
                  <span>Utilisez le <strong>menu Démarrer</strong> pour accéder aux applications</span>
                </li>
              </ul>
            </div>

            {/* Applications Grid */}
            <div className="bg-white border border-[#808080] rounded shadow-sm">
              <div className="bg-gradient-to-r from-[#0058e6] to-[#2878e8] text-white px-3 py-1 text-xs font-bold flex items-center gap-2">
                <img src="/icons/folder.png" alt="" className="w-4 h-4" />
                Applications disponibles
              </div>
              <div className="p-3 grid grid-cols-2 gap-2">
                <div className="flex items-center gap-2 p-2 hover:bg-[#316ac5] hover:text-white rounded cursor-pointer text-xs">
                  <img src="/icons/folder.png" alt="" className="w-6 h-6" />
                  <span>À propos de moi</span>
                </div>
                <div className="flex items-center gap-2 p-2 hover:bg-[#316ac5] hover:text-white rounded cursor-pointer text-xs">
                  <img src="/icons/folder.png" alt="" className="w-6 h-6" />
                  <span>Mes Projets</span>
                </div>
                <div className="flex items-center gap-2 p-2 hover:bg-[#316ac5] hover:text-white rounded cursor-pointer text-xs">
                  <img src="/icons/folder.png" alt="" className="w-6 h-6" />
                  <span>Compétences</span>
                </div>
                <div className="flex items-center gap-2 p-2 hover:bg-[#316ac5] hover:text-white rounded cursor-pointer text-xs">
                  <img src="/icons/folder.png" alt="" className="w-6 h-6" />
                  <span>Contact</span>
                </div>
                <div className="flex items-center gap-2 p-2 hover:bg-[#316ac5] hover:text-white rounded cursor-pointer text-xs">
                  <img src="/icons/git.png" alt="" className="w-6 h-6" />
                  <span>GitHub</span>
                </div>
                <div className="flex items-center gap-2 p-2 hover:bg-[#316ac5] hover:text-white rounded cursor-pointer text-xs">
                  <img src="/icons/link.png" alt="" className="w-6 h-6" />
                  <span>LinkedIn</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Status Bar */}
      <div className="bg-[#ece9d8] border-t border-[#808080] px-2 py-1 text-[10px] text-gray-600 flex justify-between">
        <span>Portfolio de Lucas Contreras Hodapp</span>
        <span>Windows XP Edition</span>
      </div>
    </div>
  );
};

export default WelcomeContent;
