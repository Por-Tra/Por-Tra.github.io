import XpMenuBar from '../XpMenuBar';

const skills = [
  { name: 'JavaScript', level: 85, category: 'Langages' },
  { name: 'Python', level: 80, category: 'Langages' },
  { name: 'C++/C#/C', level: 75, category: 'Langages' },
  { name: 'PHP', level: 70, category: 'Langages' },
  { name: 'SQL', level: 75, category: 'Langages' },
  { name: 'HTML/CSS', level: 85, category: 'Web' },
  { name: 'React', level: 70, category: 'Web' },
  { name: 'Blender', level: 65, category: 'Outils' },
  { name: 'VS Code', level: 90, category: 'Outils' },
  { name: 'Visual Studio', level: 80, category: 'Outils' },
  { name: 'Git', level: 85, category: 'Outils' },
  { name: 'Qt', level: 60, category: 'Outils' },
];

const SkillsContent = () => {
  return (
    <div className="h-full bg-white flex flex-col">
      {/* XP Explorer Toolbar */}
      <XpMenuBar
        className="bg-gradient-to-b from-[#ece9d8] to-[#d4d0c8] border-b border-[#808080] px-2 py-1 flex gap-4 text-xs"
        itemClassName="text-gray-600 hover:underline cursor-pointer"
      />

      {/* Address Bar */}
      <div className="bg-[#ece9d8] border-b border-[#808080] px-2 py-1 flex items-center gap-2">
        <span className="text-xs text-gray-600">Adresse</span>
        <div className="flex-1 bg-white border border-[#7f9db9] px-2 py-0.5 text-xs flex items-center gap-1">
          <img src="/icons/folder.png" alt="" className="w-4 h-4" />
          <span>C:\Utilisateurs\Lucas\Compétences</span>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Panel */}
        <div className="w-48 bg-gradient-to-b from-[#6b88c4] to-[#4d6eb5] p-2 overflow-y-auto flex-shrink-0">
          <div className="bg-white/90 rounded-lg p-2 mb-2">
            <h3 className="text-[11px] font-bold text-[#215dc6] mb-2">Catégories</h3>
            <div className="space-y-1 text-[10px]">
              <div className="flex items-center gap-1 text-[#215dc6] hover:underline cursor-pointer">
                <span>→</span> Langages
              </div>
              <div className="flex items-center gap-1 text-[#215dc6] hover:underline cursor-pointer">
                <span>→</span> Web
              </div>
              <div className="flex items-center gap-1 text-[#215dc6] hover:underline cursor-pointer">
                <span>→</span> Outils
              </div>
            </div>
          </div>

          <div className="bg-white/90 rounded-lg p-2">
            <h3 className="text-[11px] font-bold text-[#215dc6] mb-2">Détails</h3>
            <div className="text-[10px] text-gray-700 space-y-1">
              <p><strong>Total:</strong> {skills.length} compétences</p>
              <p><strong>Formation:</strong> BUT Informatique</p>
            </div>
          </div>
        </div>

        {/* Right Panel - Content */}
        <div className="flex-1 bg-white overflow-y-auto p-4">
          {/* Header */}
          <div className="flex items-start gap-4 mb-4 pb-4 border-b border-[#ece9d8]">
            <img src="/icons/setting.png" alt="" className="w-12 h-12" />
            <div>
              <h1 className="text-lg font-bold text-[#003399]">Mes Compétences</h1>
              <p className="text-xs text-gray-500">Langages de programmation et outils maîtrisés</p>
            </div>
          </div>

          {/* Skills by Category */}
          {['Langages', 'Web', 'Outils'].map((category) => (
            <div key={category} className="mb-4">
              <h2 className="text-sm font-bold text-[#003399] mb-2 flex items-center gap-2">
                <img src="/icons/folder.png" alt="" className="w-4 h-4" />
                {category}
              </h2>
              <div className="bg-[#f5f5f5] border border-[#ddd] rounded p-3 space-y-2">
                {skills
                  .filter((s) => s.category === category)
                  .map((skill) => (
                    <div key={skill.name} className="flex items-center gap-2">
                      <span className="w-24 text-xs font-medium">{skill.name}</span>
                      <div className="flex-1 bg-[#d4d0c8] border border-[#808080] h-4 overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-b from-[#00aa00] to-[#006600] flex items-center justify-end pr-1"
                          style={{ width: `${skill.level}%` }}
                        >
                          <span className="text-[9px] text-white font-bold">{skill.level}%</span>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          ))}

          {/* Learning Section */}
          <div className="bg-[#ffffd5] border border-[#808080] rounded p-3">
            <h2 className="text-sm font-bold text-[#003399] mb-2 flex items-center gap-2">
              <img src="/icons/questionMark.png" alt="" className="w-4 h-4" />
              En cours d'apprentissage
            </h2>
            <div className="flex flex-wrap gap-2">
              {['TypeScript', 'Docker', 'Node.js', 'MongoDB'].map((tech) => (
                <span
                  key={tech}
                  className="bg-white border border-[#808080] px-2 py-1 text-xs rounded"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Status Bar */}
      <div className="bg-[#ece9d8] border-t border-[#808080] px-2 py-1 text-[10px] text-gray-600 flex justify-between">
        <span>{skills.length} compétences</span>
        <span>BUT Informatique - Le Puy-en-Velay</span>
      </div>
    </div>
  );
};

export default SkillsContent;
