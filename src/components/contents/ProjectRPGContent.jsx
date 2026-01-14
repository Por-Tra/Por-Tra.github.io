const ProjectRPGContent = () => {
  const projectData = {
    title: "RPG 2D",
    description: "Ce projet est un projet étudiant qui a été réalisé pendant mes années de lycée. Il s'agit d'un jeu vidéo en 2D de type RPG dans un style Pokemon. Le but du jeu est de parcourir 3 niveaux afin d'éliminer le boss de fin.",
    languages: ["Python"],
    team: "Travaillé en équipe de 2",
    date: "2022-2023",
    features: [
      "Déplacements",
      "Changement de niveau",
      "Animation",
      "Dialogues avec NPC",
      "Combat",
      "Changement de personnage"
    ],
    role: "Développeur",
    skills: [
      "Python",
      "Utilisation d'un IDE (PyCharm)",
      "Gestion de bibliothèque",
      "Utilisation d'outil de conception de niveau"
    ],
    images: [] // Placeholder for future images
  };

  return (
    <div className="h-full bg-white flex flex-col">
      {/* XP Explorer Toolbar */}
      <div className="bg-gradient-to-b from-[#ece9d8] to-[#d4d0c8] border-b border-[#808080] px-2 py-1 flex gap-4 text-xs">
        <span className="text-gray-600 hover:underline cursor-pointer">Fichier</span>
        <span className="text-gray-600 hover:underline cursor-pointer">Édition</span>
        <span className="text-gray-600 hover:underline cursor-pointer">Affichage</span>
        <span className="text-gray-600 hover:underline cursor-pointer">?</span>
      </div>

      {/* Address Bar */}
      <div className="bg-[#ece9d8] border-b border-[#808080] px-2 py-1 flex items-center gap-2">
        <span className="text-xs text-gray-600">Adresse</span>
        <div className="flex-1 bg-white border border-[#7f9db9] px-2 py-0.5 text-xs flex items-center gap-1">
          <img src="/icons/folder.png" alt="" className="w-4 h-4" />
          <span>C:\Projets\{projectData.title}</span>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Panel - Folder Tasks */}
        <div className="w-48 bg-gradient-to-b from-[#6b88c4] to-[#4d6eb5] p-2 overflow-y-auto flex-shrink-0">
          <div className="bg-white/90 rounded-lg p-2 mb-2">
            <h3 className="text-[11px] font-bold text-[#215dc6] mb-2 flex items-center gap-1">
              <span className="text-xs">📁</span> Gestion du projet
            </h3>
            <div className="space-y-1 text-[10px]">
              <div className="flex items-center gap-1 text-[#215dc6] hover:underline cursor-pointer">
                <span>→</span> Ouvrir le dossier
              </div>
              <div className="flex items-center gap-1 text-[#215dc6] hover:underline cursor-pointer">
                <span>→</span> Voir sur GitHub
              </div>
            </div>
          </div>

          <div className="bg-white/90 rounded-lg p-2">
            <h3 className="text-[11px] font-bold text-[#215dc6] mb-2 flex items-center gap-1">
              <span className="text-xs">ℹ️</span> Détails
            </h3>
            <div className="text-[10px] text-gray-700 space-y-1">
              <p><strong>Date:</strong> {projectData.date}</p>
              <p><strong>Équipe:</strong> {projectData.team}</p>
              <p><strong>Rôle:</strong> {projectData.role}</p>
            </div>
          </div>
        </div>

        {/* Right Panel - Content */}
        <div className="flex-1 bg-white overflow-y-auto p-4">
          {/* Header */}
          <div className="flex items-start gap-4 mb-4 pb-4 border-b border-[#ece9d8]">
            <img src="/icons/folder.png" alt="" className="w-12 h-12" />
            <div>
              <h1 className="text-lg font-bold text-[#003399]">{projectData.title}</h1>
              <p className="text-xs text-gray-500">Projet de jeu vidéo</p>
            </div>
          </div>

          {/* Description */}
          <div className="mb-4">
            <h2 className="text-sm font-bold text-[#003399] mb-2 flex items-center gap-2">
              <img src="/icons/questionMark.png" alt="" className="w-4 h-4" />
              Description
            </h2>
            <p className="text-xs text-gray-700 leading-relaxed bg-[#f5f5f5] p-3 rounded border border-[#ddd]">
              {projectData.description}
            </p>
          </div>

          {/* Languages */}
          <div className="mb-4">
            <h2 className="text-sm font-bold text-[#003399] mb-2">Langages utilisés</h2>
            <div className="flex gap-2">
              {projectData.languages.map((lang, i) => (
                <span key={i} className="bg-[#0058e6] text-white px-2 py-1 rounded text-xs">
                  {lang}
                </span>
              ))}
            </div>
          </div>

          {/* Features */}
          <div className="mb-4">
            <h2 className="text-sm font-bold text-[#003399] mb-2">Fonctionnalités</h2>
            <div className="grid grid-cols-2 gap-1">
              {projectData.features.map((feature, i) => (
                <div key={i} className="flex items-center gap-2 text-xs text-gray-700">
                  <span className="w-1.5 h-1.5 bg-[#0058e6] rounded-full"></span>
                  {feature}
                </div>
              ))}
            </div>
          </div>

          {/* Skills */}
          <div className="mb-4">
            <h2 className="text-sm font-bold text-[#003399] mb-2">Compétences développées</h2>
            <div className="flex flex-wrap gap-2">
              {projectData.skills.map((skill, i) => (
                <span key={i} className="bg-[#ece9d8] border border-[#808080] px-2 py-1 rounded text-xs">
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Images Section (placeholder) */}
          {projectData.images.length > 0 ? (
            <div className="mb-4">
              <h2 className="text-sm font-bold text-[#003399] mb-2">Captures d'écran</h2>
              <div className="grid grid-cols-3 gap-2">
                {projectData.images.map((img, i) => (
                  <img key={i} src={img} alt={`Screenshot ${i + 1}`} className="rounded border border-[#808080]" />
                ))}
              </div>
            </div>
          ) : (
            <div className="mb-4">
              <h2 className="text-sm font-bold text-[#003399] mb-2">Captures d'écran</h2>
              <div className="bg-[#f5f5f5] border-2 border-dashed border-[#ccc] rounded p-4 text-center">
                <p className="text-xs text-gray-400">Aucune capture d'écran disponible</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Status Bar */}
      <div className="bg-[#ece9d8] border-t border-[#808080] px-2 py-1 text-[10px] text-gray-600 flex justify-between">
        <span>Projet: {projectData.title}</span>
        <span>{projectData.features.length} fonctionnalités</span>
      </div>
    </div>
  );
};

export default ProjectRPGContent;
