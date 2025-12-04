import { useState } from 'react';
import { useTranslation } from '../i18n';
import './Intro.css';

function Intro({ onComplete }) {
  const { t, lang, setLang } = useTranslation();
  const [animating, setAnimating] = useState(false);

  // Play button click handler
  const triggerPlay = () => {
    if (animating) return;
    setAnimating(true);

    // Smooth fade transition
    const cutBlack = document.getElementById('cutBlack');
    if (cutBlack) {
      cutBlack.classList.add('active');
    }

    // Complete after smooth transition
    setTimeout(() => {
      if (onComplete) {
        onComplete();
      }
    }, 400);
  };

  // Keyboard handler
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      triggerPlay();
    }
  };

  return (
    <>
      <div className="intro-wrap" role="region" aria-label="Intro">
        {/* Decorative gradients */}
        <div className="intro-decoration"></div>
        <div className="intro-decoration"></div>

        {/* Main content */}
        <div className="intro-content">
          <h1 className="intro-title">
            {t('index.welcome') || 'Welcome'}
          </h1>
          <p className="intro-subtitle">
            {t('index.subtitle') || 'Creative Developer & Designer'}
          </p>

          {/* Modern PLAY button */}
          <button
            className="play"
            onClick={triggerPlay}
            onKeyDown={handleKeyDown}
            aria-pressed={animating ? 'true' : 'false'}
            aria-label="Start"
          >
            <span className="play-icon">▶</span>
            <span>{t('index.play') || 'ENTER'}</span>
          </button>

          <div id="hint">
            {t('index.press') || 'Press to continue'}
          </div>
        </div>
      </div>

      {/* Language selector */}
      <div className="lang-select" role="navigation" aria-label="Language selection">
        <button
          className={lang === 'fr' ? 'active' : ''}
          onClick={() => setLang('fr')}
        >
          FR
        </button>
        <button
          className={lang === 'en' ? 'active' : ''}
          onClick={() => setLang('en')}
        >
          EN
        </button>
        <button
          className={lang === 'es' ? 'active' : ''}
          onClick={() => setLang('es')}
        >
          ES
        </button>
      </div>

      {/* Transition overlay */}
      <div id="cutBlack" aria-hidden="true"></div>
    </>
  );
}

export default Intro;
