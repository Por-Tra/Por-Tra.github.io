/**
 * Clippy - le compagnon Office, version portfolio
 *
 * Inspiré de react-xp (https://github.com/Cyanoxide/react-xp).
 * Spritemap et données d'animation : clippy.js (https://github.com/clippyjs/clippy.js),
 * licence MIT, Copyright (c) 2012 Fireplace, Inc.
 */
import { useCallback, useEffect, useRef, useState } from 'react';
import agentData from './clippyAgent.json';
import { t } from '../i18n/text';
import { isReducedMotion } from '../core/accessibility';
import {
  useClippySettings, CLIPPY_SIZES, CLIPPY_RESET_POSITION_EVENT, CLIPPY_PLAY_EVENT,
} from '../core/clippySettings';

const SPRITE_URL = '/clippy/clippy__spritemap.png';
const [FRAME_WIDTH, FRAME_HEIGHT] = agentData.framesize;
// Dimensions de clippy__spritemap.png, pour redimensionner le sprite
const SPRITE_WIDTH = 3348;
const SPRITE_HEIGHT = 3162;
const { animations } = agentData;

const TASKBAR_HEIGHT = 30;
const SCREEN_MARGIN = 40;
const APPEAR_DELAY = 2500;
const IDLE_DELAY_MIN = 6000;
const IDLE_DELAY_MAX = 15000;
const DRAG_THRESHOLD = 5;
// Garde-fou : une animation à embranchements ne doit pas boucler indéfiniment
const MAX_ANIMATION_STEPS = 200;
const BALLOON_WIDTH = 250;
// Hauteur approximative de la bulle : en dessous, elle s'ouvre sous Clippy
const BALLOON_SPACE = 250;

// Animations calmes jouées de temps en temps quand Clippy attend
const IDLE_ANIMATIONS = [
  'IdleAtom', 'IdleEyeBrowRaise', 'IdleFingerTap', 'IdleHeadScratch', 'IdleRopePile',
  'IdleSideToSide', 'IdleSnooze', 'Idle1_1', 'LookUp', 'LookDown', 'LookLeft', 'LookRight',
  'GetTechy', 'GetArtsy', 'GetWizardy', 'Writing', 'Print',
];
const THINKING_ANIMATIONS = ['Thinking', 'Processing', 'CheckingSomething', 'Searching'];

const COPY = {
  greeting: {
    FR: 'Il semble que vous visitiez le portfolio de Lucas. Que voulez-vous faire ?',
    EN: "It looks like you're visiting Lucas's portfolio. What would you like to do?",
    ES: 'Parece que estás visitando el portfolio de Lucas. ¿Qué quieres hacer?',
  },
  projects: { FR: 'Voir ses projets', EN: 'See his projects', ES: 'Ver sus proyectos' },
  about: { FR: 'En savoir plus sur Lucas', EN: 'Learn more about Lucas', ES: 'Saber más sobre Lucas' },
  contact: { FR: 'Le contacter', EN: 'Get in touch', ES: 'Contactarle' },
  ask: { FR: 'Poser une question', EN: 'Ask a question', ES: 'Hacer una pregunta' },
  hide: { FR: 'Masquer Clippy', EN: 'Hide Clippy', ES: 'Ocultar a Clippy' },
  askPrompt: {
    FR: 'Que voulez-vous savoir ?',
    EN: 'What would you like to know?',
    ES: '¿Qué quieres saber?',
  },
  placeholder: { FR: 'Tapez votre question ici', EN: 'Type your question here', ES: 'Escribe tu pregunta aquí' },
  search: { FR: 'Rechercher', EN: 'Search', ES: 'Buscar' },
  back: { FR: 'Options', EN: 'Options', ES: 'Opciones' },
  close: { FR: 'Fermer', EN: 'Close', ES: 'Cerrar' },
};

const RESPONSES = {
  FR: [
    "Il semble que vous posiez une question. Je n'ai pas la réponse : je ne suis qu'un trombone.",
    "Avez-vous essayé d'éteindre et de rallumer ?",
    "Excellente question ! Malheureusement, mon apogée remonte à 2001.",
    'Erreur 404 : réponse utile introuvable.',
    'Mon domaine d’expertise se limite à tenir des feuilles ensemble.',
    "Je vous aiderais bien, mais légalement je ne suis qu'une fourniture de bureau.",
    "La réponse est en vous. Elle n'est clairement pas en moi.",
    'Le mieux, c’est encore de demander directement à Lucas via la page Contact.',
    "Il semble que vous écriviez une lettre. Non ? Alors je ne peux rien pour vous.",
  ],
  EN: [
    "It looks like you're asking a question. I don't know the answer. I'm just a paperclip.",
    'Have you tried turning it off and on again?',
    'Great question! Unfortunately I peaked in 2001.',
    '404: helpful answer not found.',
    'My expertise is limited to holding paper together.',
    "I'd love to help, but I'm legally just an office supply.",
    "The answer is within you. It certainly isn't within me.",
    'Your best bet is to ask Lucas directly through the Contact page.',
    "It looks like you're writing a letter. No? Then I can't help.",
  ],
  ES: [
    'Parece que haces una pregunta. No sé la respuesta: solo soy un clip.',
    '¿Has probado a apagarlo y volverlo a encender?',
    '¡Buena pregunta! Por desgracia, mi mejor época fue en 2001.',
    'Error 404: respuesta útil no encontrada.',
    'Mi especialidad se limita a sujetar papeles.',
    'Me encantaría ayudar, pero legalmente solo soy material de oficina.',
    'La respuesta está en ti. Desde luego, no está en mí.',
    'Lo mejor es preguntarle directamente a Lucas desde la página de Contacto.',
    'Parece que estás escribiendo una carta. ¿No? Entonces no puedo ayudarte.',
  ],
};

// Choix de la bulle : ouvrir une app (avec l'animation associée), poser une question ou masquer Clippy
const MENU_OPTIONS = [
  { key: 'projects', label: COPY.projects, appId: 'projects', animation: 'GestureLeft' },
  { key: 'about', label: COPY.about, appId: 'about', animation: 'Explain' },
  { key: 'contact', label: COPY.contact, appId: 'contact', animation: 'SendMail' },
  { key: 'ask', label: COPY.ask },
  { key: 'hide', label: COPY.hide },
];

const randomFrom = (pool) => pool[Math.floor(Math.random() * pool.length)];

// La position mémorise le coin bas-droit de Clippy : changer sa taille le laisse ancré au même endroit
const getDefaultAnchor = () => ({
  x: globalThis.innerWidth - SCREEN_MARGIN,
  y: globalThis.innerHeight - TASKBAR_HEIGHT - SCREEN_MARGIN,
});

const clampAnchor = ({ x, y }, scale) => ({
  x: Math.min(Math.max(FRAME_WIDTH * scale, x), globalThis.innerWidth),
  y: Math.min(Math.max(FRAME_HEIGHT * scale, y), globalThis.innerHeight - TASKBAR_HEIGHT),
});

const Clippy = ({ currentLanguage = 'FR', onOpenApp, onHide }) => {
  const [settings] = useClippySettings();
  const scale = CLIPPY_SIZES[settings.size] ?? 1;
  const [isVisible, setIsVisible] = useState(false);
  const [anchor, setAnchor] = useState(getDefaultAnchor);
  const [, setViewportVersion] = useState(0);
  const [frame, setFrame] = useState([0, 0]);
  const [balloon, setBalloon] = useState(null); // null | 'menu' | 'ask'
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [isThinking, setIsThinking] = useState(false);

  const rootRef = useRef(null);
  const animationTimer = useRef();
  const idleTimer = useRef();
  const thinkingTimer = useRef();
  const wasDragged = useRef(false);
  const lastAnswer = useRef('');
  const onAnimationEnd = useRef(null);

  const scheduleIdleRef = useRef(() => {});
  const settingsRef = useRef(settings);

  useEffect(() => {
    settingsRef.current = settings;
  }, [settings]);

  // Joue une animation image par image avec le minutage et les embranchements d'origine
  const playAnimation = useCallback((name, onEnd = null) => {
    const animation = animations[name];
    if (!animation) return;

    clearTimeout(animationTimer.current);
    clearTimeout(idleTimer.current);
    onAnimationEnd.current = onEnd;

    let frameIndex = 0;
    let steps = 0;

    const finish = () => {
      const callback = onAnimationEnd.current;
      onAnimationEnd.current = null;
      if (callback) {
        callback();
        return;
      }
      setFrame([0, 0]);
      scheduleIdleRef.current();
    };

    const playFrame = () => {
      const current = animation.frames[frameIndex];
      if (!current) return finish();
      // Une frame sans image est vide (ex. : fin de « GoodBye », début de « Show »)
      setFrame(current.images ? current.images[0] : null);

      animationTimer.current = setTimeout(() => {
        steps += 1;
        let next = frameIndex + 1;

        if (current.branching && steps < MAX_ANIMATION_STEPS) {
          let roll = Math.random() * 100;
          for (const branch of current.branching.branches) {
            if (roll < branch.weight) {
              next = branch.frameIndex;
              break;
            }
            roll -= branch.weight;
          }
        }

        if (next >= animation.frames.length || steps >= MAX_ANIMATION_STEPS) {
          finish();
          return;
        }

        frameIndex = next;
        playFrame();
      }, current.duration);
    };

    playFrame();
  }, []);

  // Petite animation aléatoire de temps en temps (désactivée si l'utilisateur limite les animations)
  useEffect(() => {
    scheduleIdleRef.current = () => {
      clearTimeout(idleTimer.current);
      if (isReducedMotion() || !settingsRef.current.idleAnimations) return;
      const delay = IDLE_DELAY_MIN + Math.random() * (IDLE_DELAY_MAX - IDLE_DELAY_MIN);
      idleTimer.current = setTimeout(() => playAnimation(randomFrom(IDLE_ANIMATIONS)), delay);
    };
  }, [playAnimation]);

  // Apparition différée : le sprite n'est chargé qu'une fois le bureau affiché
  useEffect(() => {
    const appearTimer = setTimeout(() => {
      setIsVisible(true);
      playAnimation('Show', () => playAnimation('Greeting'));
      if (settingsRef.current.openOnArrival) setBalloon('menu');
    }, APPEAR_DELAY);

    return () => {
      clearTimeout(appearTimer);
      clearTimeout(animationTimer.current);
      clearTimeout(idleTimer.current);
      clearTimeout(thinkingTimer.current);
    };
  }, [playAnimation]);

  // Reste à l'écran quand la fenêtre du navigateur est redimensionnée (la position est bornée au rendu)
  useEffect(() => {
    const handleResize = () => setViewportVersion((version) => version + 1);
    globalThis.addEventListener('resize', handleResize);
    return () => globalThis.removeEventListener('resize', handleResize);
  }, []);

  // Actions du Panneau de configuration : replacer Clippy, jouer une animation
  useEffect(() => {
    const handleReset = () => setAnchor(getDefaultAnchor());
    const handlePlay = (event) => playAnimation(event.detail?.name);
    globalThis.addEventListener(CLIPPY_RESET_POSITION_EVENT, handleReset);
    globalThis.addEventListener(CLIPPY_PLAY_EVENT, handlePlay);
    return () => {
      globalThis.removeEventListener(CLIPPY_RESET_POSITION_EVENT, handleReset);
      globalThis.removeEventListener(CLIPPY_PLAY_EVENT, handlePlay);
    };
  }, [playAnimation]);

  // Un clic ailleurs referme la bulle
  useEffect(() => {
    if (!balloon) return undefined;
    const handleOutside = (event) => {
      if (rootRef.current?.contains(event.target)) return;
      setBalloon(null);
    };
    globalThis.addEventListener('pointerdown', handleOutside);
    return () => globalThis.removeEventListener('pointerdown', handleOutside);
  }, [balloon]);

  const handlePointerDown = (event) => {
    if (event.button !== 0) return;
    const startX = event.clientX;
    const startY = event.clientY;
    const startAnchor = clampAnchor(anchor, scale);
    const offsetX = startX - startAnchor.x;
    const offsetY = startY - startAnchor.y;
    wasDragged.current = false;

    const handleMove = (moveEvent) => {
      const distance = Math.abs(moveEvent.clientX - startX) + Math.abs(moveEvent.clientY - startY);
      if (!wasDragged.current && distance < DRAG_THRESHOLD) return;
      wasDragged.current = true;
      setAnchor(clampAnchor({ x: moveEvent.clientX - offsetX, y: moveEvent.clientY - offsetY }, scale));
    };

    const handleUp = () => {
      globalThis.removeEventListener('pointermove', handleMove);
      globalThis.removeEventListener('pointerup', handleUp);
      document.body.style.userSelect = '';
    };

    document.body.style.userSelect = 'none';
    globalThis.addEventListener('pointermove', handleMove);
    globalThis.addEventListener('pointerup', handleUp);
  };

  const handleClick = () => {
    if (wasDragged.current) return;
    if (balloon) {
      setBalloon(null);
      return;
    }
    setBalloon('menu');
    playAnimation('GetAttention');
  };

  const openApp = (appId, animation) => {
    setBalloon(null);
    playAnimation(animation);
    onOpenApp?.(appId);
  };

  const handleAsk = () => {
    setAnswer(t(COPY.askPrompt, currentLanguage));
    setBalloon('ask');
    playAnimation('Writing');
  };

  const handleHide = () => {
    setBalloon(null);
    clearTimeout(thinkingTimer.current);
    playAnimation('GoodBye', () => {
      setIsVisible(false);
      onHide?.();
    });
  };

  const handleQuestionSubmit = (event) => {
    event.preventDefault();
    if (!question.trim() || isThinking) return;

    setQuestion('');
    setIsThinking(true);
    playAnimation(randomFrom(THINKING_ANIMATIONS));

    thinkingTimer.current = setTimeout(() => {
      const pool = RESPONSES[currentLanguage] ?? RESPONSES.FR;
      let reply = randomFrom(pool);
      while (reply === lastAnswer.current && pool.length > 1) {
        reply = randomFrom(pool);
      }
      lastAnswer.current = reply;
      setAnswer(reply);
      setIsThinking(false);
      playAnimation('Explain');
    }, 1200 + Math.random() * 1200);
  };

  if (!isVisible) return null;

  const handleOption = (key) => {
    if (key === 'ask') handleAsk();
    else if (key === 'hide') handleHide();
    else {
      const option = MENU_OPTIONS.find((item) => item.key === key);
      openApp(option.appId, option.animation);
    }
  };

  // La bulle s'ouvre du côté où il y a de la place
  const width = FRAME_WIDTH * scale;
  const height = FRAME_HEIGHT * scale;
  const { x: right, y: bottom } = clampAnchor(anchor, scale);
  const position = { x: right - width, y: bottom - height };
  const alignBalloonLeft = right < BALLOON_WIDTH;
  const openBalloonBelow = position.y < BALLOON_SPACE;

  return (
    <div
      ref={rootRef}
      className={`xp-clippy ${balloon ? 'is-elevated' : ''}`}
      style={{ left: position.x, top: position.y }}
      onPointerDown={handlePointerDown}
      onClick={handleClick}
      onContextMenu={(event) => event.preventDefault()}
    >
      {balloon && (
        <div
          className={`xp-clippy-balloon ${alignBalloonLeft ? 'is-left' : ''} ${openBalloonBelow ? 'is-below' : ''}`}
          style={{ width: BALLOON_WIDTH }}
          onClick={(event) => event.stopPropagation()}
          onPointerDown={(event) => event.stopPropagation()}
        >
          <button
            type="button"
            className="xp-clippy-balloon-close"
            title={t(COPY.close, currentLanguage)}
            aria-label={t(COPY.close, currentLanguage)}
            onClick={() => setBalloon(null)}
          />

          {balloon === 'menu' && (
            <>
              <p className="xp-clippy-balloon-text">{t(COPY.greeting, currentLanguage)}</p>
              <ul className="xp-clippy-options">
                {MENU_OPTIONS.map((option) => (
                  <li key={option.key}>
                    <button type="button" className="xp-clippy-option" onClick={() => handleOption(option.key)}>
                      <span className="xp-clippy-bullet" />
                      {t(option.label, currentLanguage)}
                    </button>
                  </li>
                ))}
              </ul>
            </>
          )}

          {balloon === 'ask' && (
            <>
              <p className="xp-clippy-balloon-text">{isThinking ? '...' : answer}</p>
              <form className="xp-clippy-form" onSubmit={handleQuestionSubmit}>
                <input
                  type="text"
                  value={question}
                  placeholder={t(COPY.placeholder, currentLanguage)}
                  onChange={(event) => setQuestion(event.target.value)}
                  autoFocus
                />
                <button type="submit" className="xp-button px-2" disabled={isThinking}>
                  {t(COPY.search, currentLanguage)}
                </button>
              </form>
              <button type="button" className="xp-clippy-option mt-1" onClick={() => setBalloon('menu')}>
                <span className="xp-clippy-bullet" />
                {t(COPY.back, currentLanguage)}
              </button>
            </>
          )}
        </div>
      )}

      <div
        className="xp-clippy-sprite"
        style={{
          width,
          height,
          backgroundImage: frame ? `url("${SPRITE_URL}")` : 'none',
          backgroundSize: `${SPRITE_WIDTH * scale}px ${SPRITE_HEIGHT * scale}px`,
          backgroundPosition: frame ? `-${frame[0] * scale}px -${frame[1] * scale}px` : undefined,
        }}
      />
    </div>
  );
};

export default Clippy;
