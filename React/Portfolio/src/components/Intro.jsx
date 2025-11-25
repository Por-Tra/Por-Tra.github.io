import { useState, useEffect, useRef } from 'react';
import { useTranslation } from '../i18n';
import './Intro.css';

function Intro({ onComplete }) {
  const { t, lang, setLang } = useTranslation();
  const [animating, setAnimating] = useState(false);
  const [time, setTime] = useState('--:--:--');
  const [recordSpeed, setRecordSpeed] = useState('SLP 0:00:00');
  const startTsRef = useRef(Date.now());
  const playBtnRef = useRef(null);

  // Update time display
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hh = String(now.getHours()).padStart(2, '0');
      const mm = String(now.getMinutes()).padStart(2, '0');
      const ss = String(now.getSeconds()).padStart(2, '0');
      setTime(`${hh}:${mm}:${ss}`);

      // Update record speed
      const prefix = t('index.slpPrefix');
      const diff = Math.floor((Date.now() - startTsRef.current) / 1000);
      const h = String(Math.floor(diff / 3600)).padStart(2, '0');
      const m = String(Math.floor((diff % 3600) / 60)).padStart(2, '0');
      const s = String(diff % 60).padStart(2, '0');
      setRecordSpeed(`${prefix} ${h}:${m}:${s}`);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, [t]);

  // Play button click handler
  const triggerPlay = () => {
    if (animating) return;
    setAnimating(true);

    // Small tactile push
    if (playBtnRef.current) {
      playBtnRef.current.style.transform = 'scale(.98)';
    }

    // Body vibration animation
    document.body.animate(
      [
        { transform: 'translateX(0px)' },
        { transform: 'translateX(6px)' },
        { transform: 'translateX(-6px)' },
        { transform: 'translateX(0px)' }
      ],
      { duration: 500, iterations: 1, easing: 'cubic-bezier(.2,.8,.2,1)' }
    );

    // Glitch overlay
    const glitchOverlay = document.getElementById('glitchOverlay');
    if (glitchOverlay) {
      glitchOverlay.classList.add('active');
      
      // Create glitch slices
      glitchOverlay.innerHTML = '';
      const colors = ['rgba(255,0,150,0.06)', 'rgba(0,255,255,0.06)', 'rgba(0,0,0,0.18)'];
      for (let i = 0; i < 6; i++) {
        const s = document.createElement('div');
        s.style.position = 'absolute';
        s.style.inset = '0';
        s.style.transform = `translateY(${(i % 2 ? -6 : 6) * (i / 6)}px)`;
        s.style.mixBlendMode = 'screen';
        s.style.background = `linear-gradient(90deg, ${colors[i % colors.length]}, transparent)`;
        s.style.opacity = 0.55 - i * 0.06;
        glitchOverlay.appendChild(s);
      }
    }

    // After 650ms, cut to black
    setTimeout(() => {
      if (glitchOverlay) glitchOverlay.classList.remove('active');
      
      const cutBlack = document.getElementById('cutBlack');
      if (cutBlack) {
        cutBlack.classList.add('active');
      }

      // Redirect or complete after cut to black
      setTimeout(() => {
        if (onComplete) {
          onComplete();
        }
      }, 250);
    }, 650);
  };

  // Keyboard handler
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      triggerPlay();
    }
  };

  // Build play label with character spans
  const playLabel = t('index.play');
  const playChars = playLabel.split('').map((char, i) => (
    <span key={i} className="char" style={{ '--i': i }}>
      {char}
    </span>
  ));

  return (
    <>
      {/* Visual layers */}
      <div className="noise"></div>
      <div className="noise noise-moving" aria-hidden="true"></div>
      <div className="scanlines" aria-hidden="true"></div>

      {/* Main intro HUD */}
      <div className="intro-wrap" role="region" aria-label="Intro">
        {/* LEFT bottom info */}
        <div className="recordSpeed" id="recordSpeed">{recordSpeed}</div>

        {/* Center: big play */}
        <div style={{ position: 'relative', margin: 'auto', zIndex: 600, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '.8rem' }}>
          {/* Hint/Instruction */}
          <div id="hint" style={{ fontSize: '.8rem', opacity: .9, textAlign: 'center' }}>
            {t('index.press')}
          </div>

          {/* PLAY button */}
          <div
            ref={playBtnRef}
            className="play"
            id="playBtn"
            role="button"
            tabIndex="0"
            aria-pressed={animating ? 'true' : 'false'}
            aria-label="Play"
            onClick={triggerPlay}
            onKeyDown={handleKeyDown}
          >
            {playChars}
          </div>
        </div>

        {/* Right top time */}
        <div className="time" id="timeDisplay">{time}</div>
      </div>

      {/* Language selector bottom-right */}
      <div className="lang-select" role="navigation" aria-label="Language selection">
        <button
          className={lang === 'fr' ? 'active' : ''}
          onClick={() => setLang('fr')}
          data-lang="fr"
        >
          FR
        </button>
        <button
          className={lang === 'en' ? 'active' : ''}
          onClick={() => setLang('en')}
          data-lang="en"
        >
          EN
        </button>
        <button
          className={lang === 'es' ? 'active' : ''}
          onClick={() => setLang('es')}
          data-lang="es"
        >
          ES
        </button>
      </div>

      {/* Glitch overlay + cut to black for transition */}
      <div className="glitch-overlay" id="glitchOverlay" aria-hidden="true"></div>
      <div className="cut-to-black" id="cutBlack" aria-hidden="true"></div>
    </>
  );
}

export default Intro;
