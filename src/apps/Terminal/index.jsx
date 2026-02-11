import { useEffect, useMemo, useRef, useState } from 'react';

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
const COMMANDS = [
  { name: 'help', output: 'Liste des commandes :\n -about: page à propos\n -projects: liste de mes projets\n -date: affiche la date\n -pic: affiche un acsii art' },
  {name: 'about', output: 'Je suis Lucas, étudiant en BUT Informatique Graphique au Puy-en-Velay. Je m\'attaque à des défis de développement variés et je me concentre sur la concrétisation d\'idées, que ce soit pour résoudre des problèmes concrets ou explorer des concepts ambitieux comme recréer un système d\'exploitation entier dans un navigateur. Ma formation a commencé au lycée Marmontel, où les études et l\'informatique m\'ont appris la discipline et le travail d\'équipe. \n\n\n Après m\'être engagé dans le développement, j\'ai intégré le BUT Informatique Graphique et commencé à travailler sur des projets allant des jeux vidéo aux logiciels pratique. \n\n\n J\'ai d\'abord découvert la rigueur, la discipline et l\'envie de toujours repousser  mes limites à travers les études et la programmation. Je suis obsédé par les détails, le processus et le fait de toujours relever la barre à chaque projet. Mon objectif est de créer un travail qui a un impact durable.' },
  { name: 'clear', output: '' },
  {name: 'date', output: `Date actuelle : ${new Date().toLocaleString()}` },
  {name: 'projects', output: '- Mycoria : Jeu vidéo réaliser sur UnrealEngine.\n-RSL : Réseau Social Local, il s\'agit d\'une messagerie qui fonctionne en réseau local.\n-The Elder Scrolls 2D : Il s\'agit d\'un RPG en 2D réaliser sur python.\n-Gestionnaire de note et d\'élève : c\'est un projet universitaire qui est un logieciel web dont le but est de pouvoir gérer les notes d\'élèves, les élèves et leurs remonter de notes.\n-Vapeur : Projet web qui fonctionne avec prisma et handlebars, en gros c\'est une réplique de l\'application steam.' },

  {name: 'pic', output: '▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▒▒▒▓▓▓▓▓\n▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▒▒▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▒▒▓▓▓▓▓▓\n▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▒▒▒▒░░░░░░░░░░▒▒▒▓▓▓▓▓▓▓▓▒▒▓▓▒▒▓▓▓▓▓\n▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▒▒▒▒▒▒░░░░░░░░░░░░░░░░▒▒▒▒▓▓▓▓▓▒▒▓▒▓▓▓\n▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▒▒░▒▒▒▒▒░░░░░░░░░░░░░░░░▒▒▒▒▒▒▒▓▓▓▒▓▓▓▓▒▒\n▓▓▓▓▓▓▓▓▓▓▓▓▓▓▒░░░░▒▒░░░░░░░░░░░░░░░░░░░░▒▒▓▓▓▒▒▒▓▒▓▒░░▒\n▓▓▓▓▓▓▓▓▓▓▓▓▓░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░▒▒▓\n▓▓▓▓▓▓▓▓▓▓▓▓░░░░░░░░░░░░░░░░░░▒▒▒░░░░░░░░░░░░░░░░░░▒▒▒▒▒\n▓▓▓▓▓▓▓▓▓▓▓▒░░░░░░░░░░░░░░░░░░░▒▒▒░░░░░░░░░░░░░░░▒▒▒▒▒▒▒\n▓▓▓▓▓▓▓▓▓▓▓▒░▒▒▒▒▒▓▒░░░░░░░░░░░░░░░░░░░░░░░░░░░░░▒▒░░░▒▒\n▓▓▓▓▓▓▓▓▓▓▓▒▓▒▒▒▓▒▒▒▒▒▒░▒░░░░░░░░░░░░░░░░░░░░░░░░░▒▒░░▒▒\n▓▓▓▓▓▓▓▓▓▓▓▓▓▒▒▓▓▒░▒▒▒▒▒▒▓▒░░░░░▒▒░░░░░░░░░░░░░░░░░░░░░▒\n▓▓▓▓▓▓▓▓▓▓▓▓▒▓▓▓▒░▒▒▒▒▓▒▒▓▒▒░░░░░▒░░░░░░░░░░░░░░░░░░░░░▒\n▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▒░▒▒▒▒▒▓▓▒▒▒▒▒▒░░▒░░░░░░░░░░░░░░░░░░░░░░░\n▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▒▒▓▓▒▒▒▒▒▒▒▒░░░▒░░░░░░░░░░░░░░░░░░░░\n▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓█▓▓▓▓▓▓▓▓▓▒▒▒▒▒▒░░░░░░░░░░░░░░░░░░░░░░\n▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▒▓█▓▒▒▒▓▓▓▒▓▓▓▒▒▒▒░░▒░░░░░░░░░░▒░▒▒░░░░░\n▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▒▓▓▒▒░▒▒▒▒▒▓▒▒░░░░░░░░░░░▒▒▒▒▒▒░░░░░░\n██▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▒▒▒▒▓▒▒░░░░░░░░░░░▒▒▒▒▒▒▒▒░░░░░░\n███████▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▒▒▒░░░▒░░░░░░░░░▒▒▒▒▒▒▒▒░░░░░░\n███████▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▒░░░▒▓▒░░░░░░░░▒▒▒▒▒▒▒▒▒▒░░░░░\n▓▓███▓▓▓▓█▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▒░░▒▒░░░░░░░░▒░▒▒▒▒░░░░░░\n▓▓▓▓██▓▓▓██▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▒▒▒░░░░░░░░░░▒▒▒░░░░░░░\n▓▓▓▓██▒▓██▓██████▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▒░░░░░░░░░░░▒▒▒░░░░░░░\n▓▓▓▓▓█▓▓▓▓▒▓███████▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓░░░░░░░░░░░░▒▒░░░░░░░░\n▓▓▓▓▓█▓▒▓▓▓▓▓▓▓▒▓▓▓█▓▓▓▓▓▓▓▓▓▓▓▓▓▒░░░░░░░░░░░░░░░░░░░░░░\n▓▓▓▓▓██▒▒▓▓▓▓▓▓█▓▒▒▓██▓▓▓▓▓▓▓▓▓▒░░░░░▒░░░░░░░░░░░░░░░░░░\n▓▓▓▓▓██▓▓█▓█▓██▓▒▒▓▓▓▓▓▓▓▓▓▓▓▓▓░░░▒░▒░░░░░░░░░░░░░░░░░░░\n▓▓▓▓▓██▓▒▒▒▒▒▒▒▓▓▓██▓▓██▓▓▓▓▓▓░░░▒▒▒▒░░░░░░░░░░░░░░░░░░░\n▓▓▓▓▓█████▓░░░░░▒▓▓▓▓▓▓███▓▓▓▓░░▒▒▒▒░░░░░░░░░░░░░░░░░░░░\n▓▓█▓▓▓▓██████▒░░░░▒▒▒▒▒██████▒░▒▒▒▒░░░░░░░░░░░░░░░░░░░░░\n███████████████▒░░░▒▒▒▒▓████▓░░▒▒▒░░░░░░░░░░░░░░░░░░░░░░\n███████████████▓░░▒▒▓▒▒▓███▓░░░▒▒▒░░░░░░░░░░░░░░░░░░░░░░\n████████████████▒▒▒▒▒▒▒▓▓██░░░░░▒░░░░░░░░░░░░░░░░░░▒▓░░░\n████████████████▓▒▒▒▒▒▒▒▒▒▒░░░░░░░░░░░░░░░░░░░░░░░░░░░░░\n \n\n\n\n\n Made with Img2txt on github https://github.com/Corentino74/Img2txt' },];

export const Component = () => {
  const [entries, setEntries] = useState(() => [
    { type: 'system', text: '~/ type \'help\' for commands.' },
    { type: 'system', text: 'Bienvenue sur le terminal de mon portfolio !' },
    { type: 'blank', text: '' },
  ]);
  const [inputValue, setInputValue] = useState('');
  const inputRef = useRef(null);
  const endRef = useRef(null);

  const promptText = useMemo(() => PROMPT, []);

  useEffect(() => {
    if (endRef.current) {
      endRef.current.scrollIntoView({ behavior: 'smooth', block: 'end' });
    }
  }, [entries]);

  const handleSubmit = (event) => {
    event.preventDefault();

    const trimmed = inputValue.trim();
    if (!trimmed) return;

    const normalized = trimmed.toLowerCase();
    const command = COMMANDS.find((entry) => entry.name === normalized);
    const output = command
      ? command.output
      : `Commande inconnue : ${trimmed}`;

    setEntries((prev) => [
      ...prev,
      { type: 'command', text: `${promptText} ${trimmed}` },
      { type: 'output', text: output },
      { type: 'blank', text: '' },
    ]);
    setInputValue('');
  };

  const handleContainerClick = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  return (
    <div className="xp-terminal" onClick={handleContainerClick}>
      <div className="xp-terminal-screen">
        <div className="xp-terminal-lines" role="log" aria-live="polite">
          {entries.map((entry, index) => (
            <div
              key={`${entry.type}-${index}`}
              className={`xp-terminal-line xp-terminal-${entry.type}`}
            >
              {entry.text || '\u00A0'}
            </div>
          ))}
          <form className="xp-terminal-input-row" onSubmit={handleSubmit}>
            <span className="xp-terminal-prompt">{promptText}</span>
            <input
              ref={inputRef}
              className="xp-terminal-input"
              type="text"
              value={inputValue}
              onChange={(event) => setInputValue(event.target.value)}
              spellCheck="false"
              autoComplete="off"
            />
          </form>
          <div ref={endRef} />
        </div>
      </div>
    </div>
  );
};
