import { useEffect, useMemo, useRef, useState, useCallback } from 'react';
import { SKILLS, PROJECTS, MAN_PAGES, EASTER_EGGS, getSkillsDisplay, getProjectDetails } from './terminalData';

export const config = {
  id: 'terminal',
  name: 'Terminal',
  icon: '/icons/terminal.png',
  defaultWidth: 640,
  defaultHeight: 420,
  showOnDesktop: false,
  showInStartMenu: true,
};

const PROMPT = 'C:/Users/lucas>';

const HELP_TEXT = `┌──────────────────────────────────────────────────┐
│ LISTA DES COMMANDES                            │
├──────────────────────┬──────────────────────────┤
│ BASIQUES             │                          │
│ help                 │ Affiche cette aide       │
│ clear                │ Efface l'écran           │
│ history              │ Historique des commandes │
├──────────────────────┼──────────────────────────┤
│ INFORMATIONS         │                          │
│ whoami               │ Infos sur Lucas          │
│ about                │ À propos                 │
│ date                 │ Date et heure            │
│ pic                  │ Portrait ASCII art       │
├──────────────────────┼──────────────────────────┤
│ COMPÉTENCES & PROJETS│                          │
│ skills               │ Affiche les skills       │
│ projects             │ Liste les projets        │
│ open <projet>        │ Ouvre un projet          │
│ man <commande>       │ Détails d'une commande   │
├──────────────────────┼──────────────────────────┤
│ PERSONNALISATION     │                          │
│ theme <name>         │ Thème (classic/dark...)  │
└──────────────────────┴──────────────────────────┘

Astuce: Tab pour autocomplétion, ↑/↓ pour historique`;

const getAllCommands = () => [
  'help', 'clear', 'history', 'whoami', 'about', 'date', 'pic', 
  'skills', 'projects', 'open', 'man', 'theme', 'sudo', 'coffee'
];

export const Component = ({ onOpenApp }) => {
  const [entries, setEntries] = useState(() => [
    { type: 'system', text: '~/ type \'help\' for commands.' },
    { type: 'system', text: 'Bienvenue sur le terminal de mon portfolio !' },
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
      output = HELP_TEXT;
    } else if (cmd === 'clear') {
      setEntries([{ type: 'blank', text: '' }]);
      setInputValue('');
      return;
    } else if (cmd === 'history') {
      output = history.length > 0 
        ? history.slice(0, 20).map((h, i) => `${i + 1}  ${h}`).join('\n')
        : 'Aucun historique';
    } else if (cmd === 'whoami') {
      output = `lucas
but-informatique-graphique
level: étudiant++
status: curious && passionate`;
    } else if (cmd === 'about') {
      output = `Je suis Lucas, étudiant en BUT Informatique Graphique au Puy-en-Velay. 
Je m'attaque à des défis de développement variés et je me concentre sur la 
concrétisation d'idées, que ce soit pour résoudre des problèmes concrets ou 
explorer des concepts ambitieux comme recréer un système d'exploitation entier 
dans un navigateur.`;
    } else if (cmd === 'date') {
      output = `Date actuelle : ${new Date().toLocaleString()}`;
    } else if (cmd === 'pic') {
      output = '▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▒▒▒▓▓▓▓▓\n▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▒▒▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▒▒▓▓▓▓▓▓\n▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▒▒▒▒░░░░░░░░░░▒▒▒▓▓▓▓▓▓▓▓▒▒▓▓▒▒▓▓▓▓▓\n▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▒▒▒▒▒▒░░░░░░░░░░░░░░░░▒▒▒▒▓▓▓▓▓▒▒▓▒▓▓▓\n▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▒▒░▒▒▒▒▒░░░░░░░░░░░░░░░░▒▒▒▒▒▒▒▓▓▓▒▓▓▓▓▒▒\n▓▓▓▓▓▓▓▓▓▓▓▓▓▓▒░░░░▒▒░░░░░░░░░░░░░░░░░░░░▒▒▓▓▓▒▒▒▓▒▓▒░░▒\n▓▓▓▓▓▓▓▓▓▓▓▓▓░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░▒▒▓\n▓▓▓▓▓▓▓▓▓▓▓▓░░░░░░░░░░░░░░░░░░▒▒▒░░░░░░░░░░░░░░░░░░▒▒▒▒▒\n▓▓▓▓▓▓▓▓▓▓▓▒░░░░░░░░░░░░░░░░░░░▒▒▒░░░░░░░░░░░░░░░▒▒▒▒▒▒▒\n▓▓▓▓▓▓▓▓▓▓▓▒░▒▒▒▒▒▓▒░░░░░░░░░░░░░░░░░░░░░░░░░░░░░▒▒░░░▒▒\n▓▓▓▓▓▓▓▓▓▓▓▒▓▒▒▒▓▒▒▒▒▒▒░▒░░░░░░░░░░░░░░░░░░░░░░░░░▒▒░░▒▒\n▓▓▓▓▓▓▓▓▓▓▓▓▓▒▒▓▓▒░▒▒▒▒▒▒▓▒░░░░░▒▒░░░░░░░░░░░░░░░░░░░░░▒\n▓▓▓▓▓▓▓▓▓▓▓▓▒▓▓▓▒░▒▒▒▒▓▒▒▓▒▒░░░░░▒░░░░░░░░░░░░░░░░░░░░░▒\n▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▒░▒▒▒▒▒▓▓▒▒▒▒▒▒░░▒░░░░░░░░░░░░░░░░░░░░░░░\n▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▒▒▓▓▒▒▒▒▒▒▒▒░░░▒░░░░░░░░░░░░░░░░░░░░\n▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓█▓▓▓▓▓▓▓▓▓▒▒▒▒▒▒░░░░░░░░░░░░░░░░░░░░░░\n▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▒▓█▓▒▒▒▓▓▓▒▓▓▓▒▒▒▒░░▒░░░░░░░░░░▒░▒▒░░░░░\n▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▒▓▓▒▒░▒▒▒▒▒▓▒▒░░░░░░░░░░░▒▒▒▒▒▒░░░░░░\n██▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▒▒▒▒▓▒▒░░░░░░░░░░░▒▒▒▒▒▒▒▒░░░░░░\n███████▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▒▒▒░░░▒░░░░░░░░░▒▒▒▒▒▒▒▒░░░░░░\n███████▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▒░░░▒▓▒░░░░░░░░▒▒▒▒▒▒▒▒▒▒░░░░░\n▓▓███▓▓▓▓█▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▒░░▒▒░░░░░░░░▒░▒▒▒▒░░░░░░\n▓▓▓▓██▓▓▓██▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▒▒▒░░░░░░░░░░▒▒▒░░░░░░░\n▓▓▓▓██▒▓██▓██████▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▒░░░░░░░░░░░▒▒▒░░░░░░░\n▓▓▓▓▓█▓▓▓▓▒▓███████▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓░░░░░░░░░░░░▒▒░░░░░░░░\n▓▓▓▓▓█▓▒▓▓▓▓▓▓▓▒▓▓▓█▓▓▓▓▓▓▓▓▓▓▓▓▓▒░░░░░░░░░░░░░░░░░░░░░░\n▓▓▓▓▓██▒▒▓▓▓▓▓▓█▓▒▒▓██▓▓▓▓▓▓▓▓▓▒░░░░░▒░░░░░░░░░░░░░░░░░░\n▓▓▓▓▓██▓▓█▓█▓██▓▒▒▓▓▓▓▓▓▓▓▓▓▓▓▓░░░▒░▒░░░░░░░░░░░░░░░░░░░\n▓▓▓▓▓██▓▒▒▒▒▒▒▒▓▓▓██▓▓██▓▓▓▓▓▓░░░▒▒▒▒░░░░░░░░░░░░░░░░░░░\n▓▓▓▓▓█████▓░░░░░▒▓▓▓▓▓▓███▓▓▓▓░░▒▒▒▒░░░░░░░░░░░░░░░░░░░░\n▓▓█▓▓▓▓██████▒░░░░▒▒▒▒▒██████▒░▒▒▒▒░░░░░░░░░░░░░░░░░░░░░\n███████████████▒░░░▒▒▒▒▓████▓░░▒▒▒░░░░░░░░░░░░░░░░░░░░░░\n███████████████▓░░▒▒▓▒▒▓███▓░░░▒▒▒░░░░░░░░░░░░░░░░░░░░░░\n████████████████▒▒▒▒▒▒▒▓▓██░░░░░▒░░░░░░░░░░░░░░░░░░▒▓░░░\n████████████████▓▒▒▒▒▒▒▒▒▒▒░░░░░░░░░░░░░░░░░░░░░░░░░░░░░\n \n\n\n\n\n Made with Img2txt on github https://github.com/Corentino74/Img2txt'
    } else if (cmd === 'skills') {
      output = getSkillsDisplay();
    } else if (cmd === 'projects') {
      output = 'Projets:\n\n' + PROJECTS.map(p => 
        `  • ${p.name}: ${p.description}`
      ).join('\n') + '\n\nUtilisez "man <projet>" pour plus de détails';
    } else if (cmd === 'open' && args.length > 0) {
      const projectId = args[0];
      const project = PROJECTS.find(p => p.id === projectId);
      if (project) {
        if (onOpenApp) {
          onOpenApp(project.appId);
        }
        output = `Ouverture de ${project.name}...\n✓ ${project.name} ouvert!`;
      } else {
        output = `Projet non trouvé: ${projectId}. Projets disponibles: ${PROJECTS.map(p => p.id).join(', ')}`;
      }
    } else if (cmd === 'man' && args.length > 0) {
      const topic = args[0];
      const projectDetails = getProjectDetails(topic);
      if (projectDetails) {
        output = projectDetails;
      } else if (MAN_PAGES[topic]) {
        output = `MAN: ${topic}\n\n${MAN_PAGES[topic]}`;
      } else {
        output = `Pas de manuel trouvé pour: ${topic}`;
      }
    } else if (cmd === 'theme' && args.length > 0) {
      const themeName = args[0];
      if (['classic', 'dark', 'green', 'amber'].includes(themeName)) {
        setTheme(themeName);
        output = `✓ Thème changé en "${themeName}"`;
      } else {
        output = 'Thèmes disponibles: classic (défaut), dark, green, amber';
      }
    } else if (cmd === 'sudo') {
      output = 'Permission denied. Nice try';
    } else if (cmd === 'coffee') {
      output = 'Compiling motivation...\n✓ Motivation compiled successfully!';
    } else if (EASTER_EGGS[trimmed]) {
      output = EASTER_EGGS[trimmed];
    } else {
      output = `Commande inconnue: ${cmd}. Type 'help' pour l'aide.`;
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
              {entry.text || '\u00A0'}
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
