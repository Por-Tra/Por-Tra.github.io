import { useEffect, useMemo, useRef, useState, useCallback } from 'react';
import { PROJECTS, MAN_PAGES, getEasterEgg, getHelpText, getSkillsDisplay, getProjectDetails } from './terminalData';
import { t, getLocale } from '../../i18n/text';

export const config = {
  id: 'terminal',
  name: 'Terminal',
  icon: '/icons/terminal.webp',
  defaultWidth: 640,
  defaultHeight: 420,
  showOnDesktop: false,
  showInStartMenu: true,
};

const PROMPT = 'C:/Users/lucas>';

const COPY = {
  welcome: {
    FR: 'Bienvenue sur le terminal de mon portfolio !',
    EN: 'Welcome to my portfolio terminal!',
    ES: '¡Bienvenido al terminal de mi portfolio!',
  },
  noHistory: { FR: 'Aucun historique', EN: 'No history', ES: 'Sin historial' },
  whoamiLevel: { FR: 'étudiant++', EN: 'student++', ES: 'estudiante++' },
  about: {
    FR: `Je suis Lucas, étudiant en BUT Informatique Graphique au Puy-en-Velay.
Je m'attaque à des défis de développement variés et je me concentre sur la
concrétisation d'idées, que ce soit pour résoudre des problèmes concrets ou
explorer des concepts ambitieux comme recréer un système d'exploitation entier
dans un navigateur.`,
    EN: `I'm Lucas, a Graphic Computing student in Le Puy-en-Velay.
I tackle a wide range of development challenges and focus on turning ideas
into reality, whether solving real problems or exploring ambitious concepts
like rebuilding an entire operating system in a browser.`,
    ES: `Soy Lucas, estudiante de Informática Gráfica en Le Puy-en-Velay.
Me enfrento a desafíos de desarrollo variados y me concentro en convertir
ideas en realidad, ya sea resolviendo problemas concretos o explorando
conceptos ambiciosos como recrear un sistema operativo completo en un
navegador.`,
  },
  currentDate: { FR: 'Date actuelle : ', EN: 'Current date: ', ES: 'Fecha actual: ' },
  projects: { FR: 'Projets :', EN: 'Projects:', ES: 'Proyectos:' },
  projectsHint: {
    FR: 'Utilisez "man <projet>" pour plus de détails',
    EN: 'Use "man <project>" for more details',
    ES: 'Usa "man <proyecto>" para más detalles',
  },
  opening: { FR: 'Ouverture de', EN: 'Opening', ES: 'Abriendo' },
  opened: { FR: 'ouvert !', EN: 'opened!', ES: '¡abierto!' },
  projectNotFound: { FR: 'Projet non trouvé', EN: 'Project not found', ES: 'Proyecto no encontrado' },
  availableProjects: { FR: 'Projets disponibles', EN: 'Available projects', ES: 'Proyectos disponibles' },
  noManual: { FR: 'Pas de manuel trouvé pour', EN: 'No manual entry for', ES: 'No se encontró manual para' },
  themeChanged: { FR: 'Thème changé en', EN: 'Theme changed to', ES: 'Tema cambiado a' },
  availableThemes: {
    FR: 'Thèmes disponibles : classic (défaut), dark, green, amber',
    EN: 'Available themes: classic (default), dark, green, amber',
    ES: 'Temas disponibles: classic (por defecto), dark, green, amber',
  },
  unknownCommand: { FR: 'Commande inconnue', EN: 'Unknown command', ES: 'Comando desconocido' },
  typeHelp: { FR: "Tapez 'help' pour l'aide.", EN: "Type 'help' for help.", ES: "Escribe 'help' para ver la ayuda." },
};

const getAllCommands = () => [
  'help', 'clear', 'history', 'whoami', 'about', 'date', 'pic', 
  'skills', 'projects', 'open', 'man', 'theme', 'sudo', 'coffee'
];

export const Component = ({ onOpenApp, currentLanguage }) => {
  const [entries, setEntries] = useState(() => [
    { type: 'system', text: '~/ type \'help\' for commands.' },
    { type: 'system', text: COPY.welcome },
    { type: 'blank', text: '' },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [history, setHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [theme, setTheme] = useState('classic');
  const [autocompleteSuggestions, setAutocompleteSuggestions] = useState([]);
  const inputRef = useRef(null);
  const endRef = useRef(null);

  const promptText = useMemo(() => PROMPT, []);

  // Scroll to bottom
  useEffect(() => {
    if (endRef.current) {
      endRef.current.scrollIntoView({ behavior: 'smooth', block: 'end' });
    }
  }, [entries]);

  // Autocomplétion
  const handleTabPress = useCallback(() => {
    const trimmed = inputValue.trim();
    if (!trimmed) return;

    const commands = getAllCommands();
    const matches = commands.filter(cmd => cmd.startsWith(trimmed.toLowerCase()));

    if (matches.length === 1) {
      // Complète automatiquement
      setInputValue(matches[0] + ' ');
      setAutocompleteSuggestions([]);
    } else if (matches.length > 1) {
      // Affiche les suggestions
      setAutocompleteSuggestions(matches);
    }
  }, [inputValue]);

  // Historique avec ↑/↓
  const handleKeyDown = (e) => {
    if (e.key === 'Tab') {
      e.preventDefault();
      handleTabPress();
      return;
    }

    if (e.key === 'ArrowUp') {
      e.preventDefault();
      const newIndex = historyIndex + 1;
      if (newIndex < history.length) {
        setHistoryIndex(newIndex);
        setInputValue(history[newIndex]);
      }
      return;
    }

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        setInputValue(history[newIndex]);
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setInputValue('');
      }
      return;
    }

    setAutocompleteSuggestions([]);
  };

  const executeCommand = (command) => {
    const trimmed = command.trim();
    if (!trimmed) return;

    const normalized = trimmed.toLowerCase();
    const parts = normalized.split(' ');
    const cmd = parts[0];
    const args = parts.slice(1);

    // Ajouter à l'historique
    setHistory(prev => [trimmed, ...prev]);
    setHistoryIndex(-1);

    let output = '';

    // Commandes
    if (cmd === 'help') {
      output = getHelpText(currentLanguage);
    } else if (cmd === 'clear') {
      setEntries([{ type: 'blank', text: '' }]);
      setInputValue('');
      return;
    } else if (cmd === 'history') {
      output = history.length > 0 
        ? history.slice(0, 20).map((h, i) => `${i + 1}  ${h}`).join('\n')
        : t(COPY.noHistory, currentLanguage);
    } else if (cmd === 'whoami') {
      output = `lucas
but-informatique-graphique
level: ${t(COPY.whoamiLevel, currentLanguage)}
status: curious && passionate`;
    } else if (cmd === 'about') {
      output = t(COPY.about, currentLanguage);
    } else if (cmd === 'date') {
      output = `${t(COPY.currentDate, currentLanguage)}${new Date().toLocaleString(getLocale(currentLanguage))}`;
    } else if (cmd === 'pic') {
      output = '▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▒▒▒▓▓▓▓▓\n▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▒▒▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▒▒▓▓▓▓▓▓\n▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▒▒▒▒░░░░░░░░░░▒▒▒▓▓▓▓▓▓▓▓▒▒▓▓▒▒▓▓▓▓▓\n▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▒▒▒▒▒▒░░░░░░░░░░░░░░░░▒▒▒▒▓▓▓▓▓▒▒▓▒▓▓▓\n▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▒▒░▒▒▒▒▒░░░░░░░░░░░░░░░░▒▒▒▒▒▒▒▓▓▓▒▓▓▓▓▒▒\n▓▓▓▓▓▓▓▓▓▓▓▓▓▓▒░░░░▒▒░░░░░░░░░░░░░░░░░░░░▒▒▓▓▓▒▒▒▓▒▓▒░░▒\n▓▓▓▓▓▓▓▓▓▓▓▓▓░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░▒▒▓\n▓▓▓▓▓▓▓▓▓▓▓▓░░░░░░░░░░░░░░░░░░▒▒▒░░░░░░░░░░░░░░░░░░▒▒▒▒▒\n▓▓▓▓▓▓▓▓▓▓▓▒░░░░░░░░░░░░░░░░░░░▒▒▒░░░░░░░░░░░░░░░▒▒▒▒▒▒▒\n▓▓▓▓▓▓▓▓▓▓▓▒░▒▒▒▒▒▓▒░░░░░░░░░░░░░░░░░░░░░░░░░░░░░▒▒░░░▒▒\n▓▓▓▓▓▓▓▓▓▓▓▒▓▒▒▒▓▒▒▒▒▒▒░▒░░░░░░░░░░░░░░░░░░░░░░░░░▒▒░░▒▒\n▓▓▓▓▓▓▓▓▓▓▓▓▓▒▒▓▓▒░▒▒▒▒▒▒▓▒░░░░░▒▒░░░░░░░░░░░░░░░░░░░░░▒\n▓▓▓▓▓▓▓▓▓▓▓▓▒▓▓▓▒░▒▒▒▒▓▒▒▓▒▒░░░░░▒░░░░░░░░░░░░░░░░░░░░░▒\n▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▒░▒▒▒▒▒▓▓▒▒▒▒▒▒░░▒░░░░░░░░░░░░░░░░░░░░░░░\n▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▒▒▓▓▒▒▒▒▒▒▒▒░░░▒░░░░░░░░░░░░░░░░░░░░\n▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓█▓▓▓▓▓▓▓▓▓▒▒▒▒▒▒░░░░░░░░░░░░░░░░░░░░░░\n▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▒▓█▓▒▒▒▓▓▓▒▓▓▓▒▒▒▒░░▒░░░░░░░░░░▒░▒▒░░░░░\n▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▒▓▓▒▒░▒▒▒▒▒▓▒▒░░░░░░░░░░░▒▒▒▒▒▒░░░░░░\n██▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▒▒▒▒▓▒▒░░░░░░░░░░░▒▒▒▒▒▒▒▒░░░░░░\n███████▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▒▒▒░░░▒░░░░░░░░░▒▒▒▒▒▒▒▒░░░░░░\n███████▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▒░░░▒▓▒░░░░░░░░▒▒▒▒▒▒▒▒▒▒░░░░░\n▓▓███▓▓▓▓█▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▒░░▒▒░░░░░░░░▒░▒▒▒▒░░░░░░\n▓▓▓▓██▓▓▓██▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▒▒▒░░░░░░░░░░▒▒▒░░░░░░░\n▓▓▓▓██▒▓██▓██████▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▒░░░░░░░░░░░▒▒▒░░░░░░░\n▓▓▓▓▓█▓▓▓▓▒▓███████▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓░░░░░░░░░░░░▒▒░░░░░░░░\n▓▓▓▓▓█▓▒▓▓▓▓▓▓▓▒▓▓▓█▓▓▓▓▓▓▓▓▓▓▓▓▓▒░░░░░░░░░░░░░░░░░░░░░░\n▓▓▓▓▓██▒▒▓▓▓▓▓▓█▓▒▒▓██▓▓▓▓▓▓▓▓▓▒░░░░░▒░░░░░░░░░░░░░░░░░░\n▓▓▓▓▓██▓▓█▓█▓██▓▒▒▓▓▓▓▓▓▓▓▓▓▓▓▓░░░▒░▒░░░░░░░░░░░░░░░░░░░\n▓▓▓▓▓██▓▒▒▒▒▒▒▒▓▓▓██▓▓██▓▓▓▓▓▓░░░▒▒▒▒░░░░░░░░░░░░░░░░░░░\n▓▓▓▓▓█████▓░░░░░▒▓▓▓▓▓▓███▓▓▓▓░░▒▒▒▒░░░░░░░░░░░░░░░░░░░░\n▓▓█▓▓▓▓██████▒░░░░▒▒▒▒▒██████▒░▒▒▒▒░░░░░░░░░░░░░░░░░░░░░\n███████████████▒░░░▒▒▒▒▓████▓░░▒▒▒░░░░░░░░░░░░░░░░░░░░░░\n███████████████▓░░▒▒▓▒▒▓███▓░░░▒▒▒░░░░░░░░░░░░░░░░░░░░░░\n████████████████▒▒▒▒▒▒▒▓▓██░░░░░▒░░░░░░░░░░░░░░░░░░▒▓░░░\n████████████████▓▒▒▒▒▒▒▒▒▒▒░░░░░░░░░░░░░░░░░░░░░░░░░░░░░\n \n\n\n\n\n Made with Img2txt on github https://github.com/Corentino74/Img2txt'
    } else if (cmd === 'skills') {
      output = getSkillsDisplay(currentLanguage);
    } else if (cmd === 'projects') {
      output = `${t(COPY.projects, currentLanguage)}\n\n` + PROJECTS.map(p =>
        `  • ${t(p.name, currentLanguage)}: ${t(p.description, currentLanguage)}`
      ).join('\n') + `\n\n${t(COPY.projectsHint, currentLanguage)}`;
    } else if (cmd === 'open' && args.length > 0) {
      const projectId = args[0];
      const project = PROJECTS.find(p => p.id === projectId);
      if (project) {
        if (onOpenApp) {
          onOpenApp(project.appId);
        }
        const projectName = t(project.name, currentLanguage);
        output = `${t(COPY.opening, currentLanguage)} ${projectName}...\n✓ ${projectName} ${t(COPY.opened, currentLanguage)}`;
      } else {
        output = `${t(COPY.projectNotFound, currentLanguage)}: ${projectId}. ${t(COPY.availableProjects, currentLanguage)}: ${PROJECTS.map(p => p.id).join(', ')}`;
      }
    } else if (cmd === 'man' && args.length > 0) {
      const topic = args[0];
      const projectDetails = getProjectDetails(topic, currentLanguage);
      if (projectDetails) {
        output = projectDetails;
      } else if (MAN_PAGES[topic]) {
        output = `MAN: ${topic}\n\n${t(MAN_PAGES[topic], currentLanguage)}`;
      } else {
        output = `${t(COPY.noManual, currentLanguage)}: ${topic}`;
      }
    } else if (cmd === 'theme' && args.length > 0) {
      const themeName = args[0];
      if (['classic', 'dark', 'green', 'amber'].includes(themeName)) {
        setTheme(themeName);
        output = `✓ ${t(COPY.themeChanged, currentLanguage)} "${themeName}"`;
      } else {
        output = t(COPY.availableThemes, currentLanguage);
      }
    } else if (cmd === 'sudo') {
      output = 'Permission denied. Nice try';
    } else if (cmd === 'coffee') {
      output = 'Compiling motivation...\n✓ Motivation compiled successfully!';
    } else if (getEasterEgg(trimmed, currentLanguage)) {
      output = getEasterEgg(trimmed, currentLanguage);
    } else {
      output = `${t(COPY.unknownCommand, currentLanguage)}: ${cmd}. ${t(COPY.typeHelp, currentLanguage)}`;
    }

    setEntries((prev) => [
      ...prev,
      { type: 'command', text: `${promptText} ${trimmed}` },
      { type: 'output', text: output },
      { type: 'blank', text: '' },
    ]);
    setInputValue('');
    setAutocompleteSuggestions([]);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    executeCommand(inputValue);
  };

  const handleContainerClick = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const themeClasses = {
    classic: 'bg-black text-white border-white',
    dark: 'bg-[#000] text-[#0f0] border-[#0f0]',
    green: 'bg-[#001100] text-[#00ff00] border-[#00ff00]',
    amber: 'bg-[#1a0f00] text-[#ffaa00] border-[#ffaa00]'
  };

  const themeStyle = {
    classic: { bg: '#000000', fg: '#ffffff', border: '#ffffff' },
    dark: { bg: '#777777', fg: 'rgb(0, 0, 0)', border: 'rgb(0, 0, 0)' },
    green: { bg: '#001100', fg: '#00ff00', border: '#00ff00' },
    amber: { bg: '#1a0f00', fg: '#ffaa00', border: '#ffaa00' }
  };

  const currentTheme = themeStyle[theme];

  return (
    <div 
      className="xp-terminal" 
      onClick={handleContainerClick}
      style={{
        backgroundColor: currentTheme.bg,
        color: currentTheme.fg,
        fontFamily: 'Courier New, monospace'
      }}
    >
      <div 
        className="xp-terminal-screen"
        style={{
          backgroundColor: currentTheme.bg,
          color: currentTheme.fg,
          border: `2px solid ${currentTheme.border}`
        }}
      >
        <div 
          className="xp-terminal-lines" 
          role="log" 
          aria-live="polite"
          style={{ color: currentTheme.fg }}
        >
          {entries.map((entry, index) => (
            <div
              key={`${entry.type}-${index}`}
              className={`xp-terminal-line xp-terminal-${entry.type}`}
              style={{ color: currentTheme.fg, whiteSpace: 'pre-wrap', wordWrap: 'break-word' }}
            >
              {t(entry.text, currentLanguage) || '\u00A0'}
            </div>
          ))}

          {autocompleteSuggestions.length > 0 && (
            <div style={{ color: currentTheme.fg, marginBottom: '4px' }}>
              {autocompleteSuggestions.map(s => `  • ${s}`).join('\n')}
            </div>
          )}

          <form className="xp-terminal-input-row" onSubmit={handleSubmit}>
            <span className="xp-terminal-prompt" style={{ color: currentTheme.fg }}>{promptText}</span>
            <input
              ref={inputRef}
              className="xp-terminal-input"
              type="text"
              value={inputValue}
              onChange={(event) => setInputValue(event.target.value)}
              onKeyDown={handleKeyDown}
              spellCheck="false"
              autoComplete="off"
              style={{
                backgroundColor: currentTheme.bg,
                color: currentTheme.fg,
                border: 'none',
                outline: 'none',
                fontFamily: 'inherit'
              }}
            />
          </form>
          <div ref={endRef} />
        </div>
      </div>
    </div>
  );
};
