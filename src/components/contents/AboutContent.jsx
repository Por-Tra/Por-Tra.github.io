// const AboutContent = () => {
//   return (
//     <div className="h-full bg-gradient-to-b from-[#f0f4f8] to-[#e4e8ec] overflow-auto">
//       {/* Header avec gradient XP */}
//       <div className="bg-gradient-to-r from-[#0a246a] to-[#3a6ea5] text-white p-4 shadow-md">
//         <div className="flex items-center gap-4">
//           {/* Avatar stylisé */}
//           <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#4a90d9] to-[#2060a0] 
//                           flex items-center justify-center shadow-lg border-3 border-white/30">
//             <span className="text-4xl">👨‍💻</span>
//           </div>
//           <div>
//             <h1 className="text-2xl font-bold">Lucas Contreras Hodapp</h1>
//             <p className="text-blue-200 text-sm">Étudiant en Informatique Graphique</p>
//             <div className="flex items-center gap-2 mt-1 text-xs text-blue-100">
//               <span>📍 Le Puy-en-Velay, France</span>
//               <span>•</span>
//               <span>🎂 20 ans</span>
//             </div>
//           </div>
//         </div>
//       </div>

//       <div className="p-4 space-y-4">
//         {/* Introduction */}
//         <div className="bg-white border border-[#808080] rounded-lg shadow-sm overflow-hidden">
//           <div className="bg-gradient-to-r from-[#6b88c4] to-[#4a6eb4] text-white px-4 py-2 text-sm font-bold flex items-center gap-2">
//             <span>📝</span>
//             Qui suis-je ?
//           </div>
//           <div className="p-4">
//             <p className="text-gray-700 leading-relaxed text-sm">
//               Passionné par l'informatique depuis mon plus jeune âge, je suis actuellement 
//               étudiant en <strong>BUT Informatique Graphique</strong> à l'IUT Clermont Auvergne 
//               (Le Puy-en-Velay). Cette formation unique en France me permet de combiner ma passion 
//               pour la <strong>programmation</strong> et le <strong>développement de jeux vidéo</strong>.
//             </p>
//             <p className="text-gray-700 leading-relaxed text-sm mt-3">
//               Mon objectif est de devenir développeur de jeux vidéo et de contribuer à la création 
//               d'expériences interactives immersives. Je m'intéresse particulièrement à la 
//               programmation graphique, aux moteurs de jeu et au développement d'applications 3D.
//             </p>
//           </div>
//         </div>

//         {/* Infos personnelles en grille */}
//         <div className="grid grid-cols-2 gap-4">
//           {/* Formation actuelle */}
//           <div className="bg-white border border-[#808080] rounded-lg shadow-sm overflow-hidden">
//             <div className="bg-gradient-to-r from-[#5cb85c] to-[#449d44] text-white px-3 py-2 text-sm font-bold flex items-center gap-2">
//               <span>🎓</span>
//               Formation
//             </div>
//             <div className="p-3 space-y-2 text-xs">
//               <div className="flex items-start gap-2">
//                 <div className="w-2 h-2 rounded-full bg-green-500 mt-1.5 shrink-0" />
//                 <div>
//                   <p className="font-bold text-gray-800">BUT Informatique Graphique</p>
//                   <p className="text-gray-500">IUT Le Puy-en-Velay • 2024-2027</p>
//                 </div>
//               </div>
//               <div className="flex items-start gap-2">
//                 <div className="w-2 h-2 rounded-full bg-gray-400 mt-1.5 shrink-0" />
//                 <div>
//                   <p className="font-medium text-gray-700">BAC Général (NSI + Maths)</p>
//                   <p className="text-gray-500">Lycée Marmontel • 2021-2024</p>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Contact */}
//           <div className="bg-white border border-[#808080] rounded-lg shadow-sm overflow-hidden">
//             <div className="bg-gradient-to-r from-[#f0ad4e] to-[#ec971f] text-white px-3 py-2 text-sm font-bold flex items-center gap-2">
//               <span>📧</span>
//               Contact
//             </div>
//             <div className="p-3 space-y-2 text-xs">
//               <div className="flex items-center gap-2">
//                 <span>✉️</span>
//                 <a href="mailto:lucascontrerashodapp@gmail.com" className="text-blue-600 hover:underline break-all">
//                   lucascontrerashodapp@gmail.com
//                 </a>
//               </div>
//               <div className="flex items-center gap-2">
//                 <span>💼</span>
//                 <a href="https://linkedin.com/in/lucas-contreras-hodapp" target="_blank" rel="noopener noreferrer" 
//                    className="text-blue-600 hover:underline">LinkedIn</a>
//               </div>
//               <div className="flex items-center gap-2">
//                 <span>🐙</span>
//                 <a href="https://github.com/Por-Tra" target="_blank" rel="noopener noreferrer" 
//                    className="text-blue-600 hover:underline">GitHub</a>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Langues et compétences clés */}
//         <div className="bg-white border border-[#808080] rounded-lg shadow-sm overflow-hidden">
//           <div className="bg-gradient-to-r from-[#5bc0de] to-[#31b0d5] text-white px-4 py-2 text-sm font-bold flex items-center gap-2">
//             <span>🌍</span>
//             Langues & Compétences clés
//           </div>
//           <div className="p-4 grid grid-cols-2 gap-4">
//             {/* Langues */}
//             <div>
//               <h4 className="text-xs font-bold text-gray-500 uppercase mb-2">Langues parlées</h4>
//               <div className="space-y-2">
//                 <div className="flex items-center gap-2">
//                   <span>🇫🇷</span>
//                   <span className="text-sm">Français</span>
//                   <span className="text-xs text-green-600 font-medium">(Natif)</span>
//                 </div>
//                 <div className="flex items-center gap-2">
//                   <span>🇬🇧</span>
//                   <span className="text-sm">Anglais</span>
//                   <span className="text-xs text-blue-600 font-medium">(B2)</span>
//                 </div>
//                 <div className="flex items-center gap-2">
//                   <span>🇪🇸</span>
//                   <span className="text-sm">Espagnol</span>
//                   <span className="text-xs text-orange-600 font-medium">(B2)</span>
//                 </div>
//               </div>
//             </div>
            
//             {/* Technologies principales */}
//             <div>
//               <h4 className="text-xs font-bold text-gray-500 uppercase mb-2">Technologies principales</h4>
//               <div className="flex flex-wrap gap-1.5">
//                 {['C++', 'C#', 'JavaScript', 'Python', 'Unity', 'Unreal', 'Blender'].map((tech) => (
//                   <span key={tech} 
//                         className="bg-gradient-to-b from-[#f5f5f5] to-[#e1e1e1] border border-[#a0a0a0] 
//                                    px-2 py-0.5 rounded text-xs shadow-sm">
//                     {tech}
//                   </span>
//                 ))}
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Centres d'intérêt */}
//         <div className="bg-white border border-[#808080] rounded-lg shadow-sm overflow-hidden">
//           <div className="bg-gradient-to-r from-[#d9534f] to-[#c9302c] text-white px-4 py-2 text-sm font-bold flex items-center gap-2">
//             <span>💡</span>
//             Centres d'intérêt
//           </div>
//           <div className="p-4 flex flex-wrap gap-2">
//             {[
//               { icon: '🎮', label: 'Jeux Vidéo' },
//               { icon: '💻', label: 'Programmation' },
//               { icon: '📖', label: 'Lecture Roman d aventure' },
//               { icon: '♟️', label: 'Échecs' },
//               { icon: '🗡️', label: 'Chevalerie' },
//             ].map(({ icon, label }) => (
//               <span key={label} 
//                     className="bg-[#ece9d8] border border-[#a0a0a0] px-3 py-1.5 rounded-full text-sm 
//                                flex items-center gap-1.5 shadow-sm hover:bg-[#e0ddd1] transition-colors">
//                 <span>{icon}</span>
//                 {label}
//               </span>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AboutContent;
