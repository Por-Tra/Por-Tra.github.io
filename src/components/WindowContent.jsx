import AboutContent from './contents/AboutContent';
import ProjectsContent from './contents/ProjectsContent';
import SkillsContent from './contents/SkillsContent';
import ContactContent from './contents/ContactContent';
import WelcomeContent from './contents/WelcomeContent';
import BlankContent from './contents/BlankContent';
import ProjectRPGContent from './contents/ProjectRPGContent';
import ProjectSoutenanceContent from './contents/ProjectSoutenanceContent';
import ProjectReseauContent from './contents/ProjectReseauContent';
import ChessContent from './contents/ChessContent';
import ExplorerContent from './contents/ExplorerContent';
import ParcoursContent from './contents/ParcoursContent';

const WindowContent = ({ window }) => {
  // If there's a URL, show iframe
  if (window.url) {
    return (
      <iframe
        src={window.url}
        className="w-full h-full border-0"
        title={window.title}
        sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
      />
    );
  }

  // Otherwise, show custom content
  switch (window.content) {
    case 'about':
      return <AboutContent />;
    case 'parcours':
      return <ParcoursContent />;
    case 'projects':
      return <ProjectsContent />;
    case 'skills':
      return <SkillsContent />;
    case 'contact':
      return <ContactContent />;
    case 'welcome':
      return <WelcomeContent />;
    case 'blank':
      return <BlankContent title={window.title} />;
    case 'project-rpg':
      return <ProjectRPGContent />;
    case 'project-soutenance':
      return <ProjectSoutenanceContent />;
    case 'project-reseau':
      return <ProjectReseauContent />;
    case 'chess':
      return <ChessContent />;
    case 'explorer':
      return <ExplorerContent />;
    default:
      return (
        <div className="p-4 text-gray-800">
          <p>Contenu non disponible</p>
        </div>
      );
  }
};

export default WindowContent;
