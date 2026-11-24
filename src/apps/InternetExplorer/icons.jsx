/**
 * Icônes de la barre d'outils d'Internet Explorer 6, en SVG (style Luna).
 */

const GreenDisc = ({ id }) => (
  <>
    <defs>
      <radialGradient id={id} cx="35%" cy="30%" r="75%">
        <stop offset="0" stopColor="#c9f7b8" />
        <stop offset="0.45" stopColor="#3cb83c" />
        <stop offset="1" stopColor="#11701a" />
      </radialGradient>
    </defs>
    <circle cx="12" cy="12" r="10.5" fill={`url(#${id})`} stroke="#0f5e16" />
  </>
);

export const BackIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <GreenDisc id="ieBackDisc" />
    <path d="M17 10.5h-6V7l-5.5 5 5.5 5v-3.5h6z" fill="#fff" />
  </svg>
);

export const ForwardIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <GreenDisc id="ieForwardDisc" />
    <path d="M7 10.5h6V7l5.5 5-5.5 5v-3.5H7z" fill="#fff" />
  </svg>
);

const Page = () => (
  <path d="M5 2.5h9.5l4.5 4.5v14.5H5z" fill="#fff" stroke="#7a8696" />
);

export const StopIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <Page />
    <circle cx="14.5" cy="15.5" r="6" fill="#e0301e" stroke="#9b1b10" />
    <path d="M12 13l5 5M17 13l-5 5" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" />
  </svg>
);

export const RefreshIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <Page />
    <path d="M9.5 15.5a5 5 0 0 1 8.4-3.6" fill="none" stroke="#2f9a2f" strokeWidth="2" />
    <path d="M19.4 9.2l-.2 4.4-4-1.6z" fill="#2f9a2f" />
    <path d="M19.5 16a5 5 0 0 1-8.4 3.6" fill="none" stroke="#2f9a2f" strokeWidth="2" />
    <path d="M9.6 22.3l.2-4.4 4 1.6z" fill="#2f9a2f" />
  </svg>
);

export const HomeIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path d="M12 3L2.5 11.5h2.8V21h13.4v-9.5h2.8z" fill="#f4e7c6" stroke="#8a6a2a" strokeLinejoin="round" />
    <path d="M12 3L2.5 11.5H5L12 5.3l7 6.2h2.5z" fill="#d23d2a" />
    <rect x="10" y="14.5" width="4" height="6.5" fill="#7b4a1d" />
  </svg>
);

export const SearchIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path d="M14 14l6.5 6.5" stroke="#c96a0a" strokeWidth="3.4" strokeLinecap="round" />
    <circle cx="9.5" cy="9.5" r="6.3" fill="#d8ebff" stroke="#1b4fae" strokeWidth="1.8" />
  </svg>
);

export const FavoritesIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path
      d="M12 2.5l2.9 6 6.6.8-4.9 4.5 1.3 6.5L12 17.1l-5.9 3.2 1.3-6.5L2.5 9.3l6.6-.8z"
      fill="#ffd23c"
      stroke="#b07a00"
      strokeLinejoin="round"
    />
  </svg>
);

export const GlobeIcon = () => (
  <svg viewBox="0 0 16 16" aria-hidden="true">
    <circle cx="8" cy="8" r="6.8" fill="#4d9be6" stroke="#1b4fae" />
    <path d="M4 5.5c1.5-.5 2.5.5 3 1.8.3 1-.8 1.5-.5 2.8.3 1.2-1 1.8-2 1.3M9.5 3c.8 1 2.2 1 2.8 2.2.6 1.2-.5 2-1.5 2.6-1 .6-.6 2 .5 2.7" fill="none" stroke="#3db33d" strokeWidth="1.6" />
  </svg>
);

export const PageIcon = () => (
  <svg viewBox="0 0 16 16" aria-hidden="true">
    <path d="M3 1.5h7l3 3v10H3z" fill="#fff" stroke="#7a8696" />
    <circle cx="8" cy="9.5" r="3.3" fill="#4d9be6" />
  </svg>
);
