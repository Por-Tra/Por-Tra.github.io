/**
 * Icônes de la barre d'outils de la visionneuse, dessinées en SVG dans le style Luna
 * (pas de requête réseau supplémentaire).
 */

const BlueDisc = ({ id }) => (
  <>
    <defs>
      <radialGradient id={id} cx="35%" cy="30%" r="75%">
        <stop offset="0" stopColor="#bfe0ff" />
        <stop offset="0.45" stopColor="#3a86f0" />
        <stop offset="1" stopColor="#0b3fa8" />
      </radialGradient>
    </defs>
    <circle cx="10" cy="10" r="8.5" fill={`url(#${id})`} stroke="#0a3a96" strokeWidth="1" />
  </>
);

export const PrevIcon = () => (
  <svg viewBox="0 0 20 20" aria-hidden="true">
    <BlueDisc id="ivPrevDisc" />
    <rect x="5.5" y="6" width="2" height="8" fill="#fff" />
    <path d="M14.5 6v8L8.5 10z" fill="#fff" />
  </svg>
);

export const NextIcon = () => (
  <svg viewBox="0 0 20 20" aria-hidden="true">
    <BlueDisc id="ivNextDisc" />
    <rect x="12.5" y="6" width="2" height="8" fill="#fff" />
    <path d="M5.5 6v8l6-4z" fill="#fff" />
  </svg>
);

export const BestFitIcon = () => (
  <svg viewBox="0 0 20 20" aria-hidden="true">
    <rect x="5" y="5" width="10" height="10" fill="#fff" stroke="#6d7b8d" />
    <path d="M2 2l4 4M18 2l-4 4M2 18l4-4M18 18l-4-4" stroke="#3a6fc4" strokeWidth="1.6" />
    <path d="M2 2h3M2 2v3M18 2h-3M18 2v3M2 18h3M2 18v-3M18 18h-3M18 18v-3" stroke="#3a6fc4" strokeWidth="1.6" />
  </svg>
);

export const ActualSizeIcon = () => (
  <svg viewBox="0 0 20 20" aria-hidden="true">
    <rect x="2.5" y="3.5" width="15" height="13" rx="1" fill="#e8f1ff" stroke="#3a6fc4" />
    <text x="10" y="13.5" textAnchor="middle" fontSize="7.5" fontWeight="bold" fontFamily="Tahoma, sans-serif" fill="#1b4fae">1:1</text>
  </svg>
);

export const SlideshowIcon = () => (
  <svg viewBox="0 0 20 20" aria-hidden="true">
    <rect x="3" y="2.5" width="14" height="10" fill="#fff" stroke="#6d7b8d" />
    <path d="M5 10l3-3 2 2 2-3 3 4z" fill="#4caf3a" />
    <path d="M10 12.5v3M10 15.5l-4 3M10 15.5l4 3" stroke="#6d7b8d" strokeWidth="1.3" />
  </svg>
);

const Magnifier = ({ id, sign }) => (
  <>
    <defs>
      <radialGradient id={id} cx="40%" cy="35%" r="70%">
        <stop offset="0" stopColor="#ffffff" />
        <stop offset="1" stopColor="#9cc6f5" />
      </radialGradient>
    </defs>
    <path d="M11.5 11.5l5.5 5.5" stroke="#c96a0a" strokeWidth="3.2" strokeLinecap="round" />
    <circle cx="8" cy="8" r="5.8" fill={`url(#${id})`} stroke="#1b4fae" strokeWidth="1.6" />
    <path d="M5.3 8h5.4" stroke="#1b4fae" strokeWidth="1.8" />
    {sign === '+' && <path d="M8 5.3v5.4" stroke="#1b4fae" strokeWidth="1.8" />}
  </>
);

export const ZoomInIcon = () => (
  <svg viewBox="0 0 20 20" aria-hidden="true">
    <Magnifier id="ivZoomIn" sign="+" />
  </svg>
);

export const ZoomOutIcon = () => (
  <svg viewBox="0 0 20 20" aria-hidden="true">
    <Magnifier id="ivZoomOut" sign="-" />
  </svg>
);

const Landscape = () => (
  <>
    <rect x="2" y="8" width="16" height="10" fill="#d9ecff" stroke="#6d7b8d" />
    <path d="M2.5 17.5l5-6 3 3.5 2-2 5 4.5z" fill="#3e9a2e" />
  </>
);

export const RotateClockwiseIcon = () => (
  <svg viewBox="0 0 20 20" aria-hidden="true">
    <Landscape />
    <path d="M4 7a6 6 0 0 1 11-1.5" fill="none" stroke="#1b4fae" strokeWidth="1.8" />
    <path d="M16.8 2.5l-.4 4.6-4.3-1.7z" fill="#1b4fae" />
  </svg>
);

export const RotateCounterClockwiseIcon = () => (
  <svg viewBox="0 0 20 20" aria-hidden="true">
    <Landscape />
    <path d="M16 7A6 6 0 0 0 5 5.5" fill="none" stroke="#1b4fae" strokeWidth="1.8" />
    <path d="M3.2 2.5l.4 4.6 4.3-1.7z" fill="#1b4fae" />
  </svg>
);

export const DeleteIcon = () => (
  <svg viewBox="0 0 20 20" aria-hidden="true">
    <path d="M4 4l12 12M16 4L4 16" stroke="#d8261c" strokeWidth="3" strokeLinecap="round" />
  </svg>
);

export const PrintIcon = () => (
  <svg viewBox="0 0 20 20" aria-hidden="true">
    <rect x="5.5" y="2" width="9" height="6" fill="#fff" stroke="#7a7a7a" />
    <rect x="2" y="7.5" width="16" height="7" rx="1.5" fill="#cfd3d8" stroke="#6b6f75" />
    <rect x="5.5" y="12" width="9" height="6" fill="#fff" stroke="#7a7a7a" />
    <path d="M7 14h6M7 16h6" stroke="#9aa0a6" />
    <circle cx="15.5" cy="10" r="0.9" fill="#3cb043" />
  </svg>
);

export const CopyToIcon = () => (
  <svg viewBox="0 0 20 20" aria-hidden="true">
    <path d="M2.5 2.5h13l2 2v13h-15z" fill="#2c5bc7" stroke="#163a8a" />
    <rect x="5" y="2.5" width="9" height="5.5" fill="#e9eef7" />
    <rect x="11" y="3.3" width="1.8" height="3.8" fill="#2c5bc7" />
    <rect x="4.5" y="10.5" width="11" height="7" fill="#fff" />
    <path d="M6 12.5h8M6 14.5h8" stroke="#9aa0a6" />
  </svg>
);

export const EditIcon = () => (
  <svg viewBox="0 0 20 20" aria-hidden="true">
    <rect x="1.5" y="3.5" width="13" height="11" fill="#d9ecff" stroke="#6d7b8d" />
    <path d="M2 14l4-5 3 3 2-2 3.5 4z" fill="#3e9a2e" />
    <circle cx="11" cy="6.5" r="1.5" fill="#f6c443" />
    <path d="M11 18l1-3 6-6 2 2-6 6z" fill="#f6b73c" stroke="#9a5a0a" strokeWidth="0.8" />
  </svg>
);

export const HelpIcon = () => (
  <svg viewBox="0 0 20 20" aria-hidden="true">
    <BlueDisc id="ivHelpDisc" />
    <text x="10" y="14.3" textAnchor="middle" fontSize="12" fontWeight="bold" fontFamily="Tahoma, sans-serif" fill="#fff">?</text>
  </svg>
);

export const CloseIcon = () => (
  <svg viewBox="0 0 20 20" aria-hidden="true">
    <path d="M5 5l10 10M15 5L5 15" stroke="#fff" strokeWidth="2.4" strokeLinecap="round" />
  </svg>
);

export const PauseIcon = () => (
  <svg viewBox="0 0 20 20" aria-hidden="true">
    <BlueDisc id="ivPauseDisc" />
    <rect x="6.5" y="6" width="2.3" height="8" fill="#fff" />
    <rect x="11.2" y="6" width="2.3" height="8" fill="#fff" />
  </svg>
);

export const PlayIcon = () => (
  <svg viewBox="0 0 20 20" aria-hidden="true">
    <BlueDisc id="ivPlayDisc" />
    <path d="M7.5 5.8v8.4l6.5-4.2z" fill="#fff" />
  </svg>
);
