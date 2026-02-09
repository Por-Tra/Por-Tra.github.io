/**
 * Application: Control Panel
 *
 * Panneau de configuration style Windows XP
 */
import { useEffect, useMemo, useState } from 'react';

export const config = {
  id: 'control-panel',
  name: 'Panneau de configuration',
  icon: '/icons/setting.png',
  defaultWidth: 760,
  defaultHeight: 540,
  showOnDesktop: false,
  showInStartMenu: true,
};

const CONFIG_SECTIONS = [
  {
    id: 'personalize',
    title: 'Personnaliser',
    description: "Changer l'apparence du bureau et du fond d'ecran.",
    icon: '/icons/setting.png',
  },
    {
        id: 'datetime',
        title: "Reglage de la date et de l'heure",
        description: "Modifier l'horloge et la date du systeme.",
        icon: '/icons/setting.png',
    },
    {
        id: 'power',
        title: 'Menu systeme',
        description: 'Eteindre ou redemarrer la session.',
        icon: '/icons/off.png',
    },
    {
        id: 'language',
        title: 'Choix de la langue',
        description: 'Selectionner la langue de l’interface.',
        icon: '/icons/user.svg',
    },
];

const LANGUAGE_OPTIONS = [
    { id: 'FR', label: 'Francais (FR)' },
    { id: 'EN', label: 'English (EN)' },
    { id: 'ES', label: 'Espanol (ES)' },
    { id: 'DE', label: 'Deutsch (DE)' },
];

const WALLPAPER_OPTIONS = [
  {
    id: 'default',
    title: 'Defaut',
    src: '/wallpaper.jpg',
  },
  {
    id: 'win11Dark',
    title: 'W11D',
    src: '/images/wallpapers/win11Dark.jpg',
  },
  {
    id: 'dog',
    title: 'DOG',
    src: '/images/wallpapers/Dog.jpg',
  },
  {
    id: 'winXPDark',
    title: 'WXP Dark',
    src: '/images/wallpapers/winXPDark.jpeg',
  },
];

export const Component = ({
    onSetWallpaper,
    currentWallpaper,
    utcOffsetMinutes,
    onSetUtcOffset,
        currentLanguage,
        onSetLanguage,
}) => {
  const [activeSection, setActiveSection] = useState(CONFIG_SECTIONS[0]?.id);
  const [uploadUrl, setUploadUrl] = useState(null);
        const [selectedLanguage, setSelectedLanguage] = useState(currentLanguage || 'FR');
    const [dateValue, setDateValue] = useState(() => {
        const now = new Date();
        return now.toISOString().slice(0, 10);
    });
    const [timeValue, setTimeValue] = useState(() => {
        const now = new Date();
        return now.toTimeString().slice(0, 5);
    });
    const [appliedDateTime, setAppliedDateTime] = useState('');
    const [currentTime, setCurrentTime] = useState(() => new Date());

  const selectedWallpaperId = useMemo(() => {
    const match = WALLPAPER_OPTIONS.find(option => option.src === currentWallpaper);
    return match?.id || null;
  }, [currentWallpaper]);

  useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);

    return () => {
            clearInterval(timer);
      if (uploadUrl) {
        URL.revokeObjectURL(uploadUrl);
      }
    };
  }, [uploadUrl]);

    useEffect(() => {
        if (currentLanguage && currentLanguage !== selectedLanguage) {
            setSelectedLanguage(currentLanguage);
        }
    }, [currentLanguage, selectedLanguage]);

  const handleWallpaperPick = (src) => {
    if (!src) return;
    onSetWallpaper?.(src);
  };

  const handleUpload = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const nextUrl = URL.createObjectURL(file);
    if (uploadUrl) {
      URL.revokeObjectURL(uploadUrl);
    }
    setUploadUrl(nextUrl);
    onSetWallpaper?.(nextUrl);
  };

    const getAdjustedTime = (now, offsetMinutes) => {
        const utcMs = now.getTime() + now.getTimezoneOffset() * 60000;
        return new Date(utcMs + offsetMinutes * 60000);
    };

    const handleApplyDateTime = () => {
        if (!dateValue || !timeValue) return;
        const [year, month, day] = dateValue.split('-').map(Number);
        const [hours, minutes] = timeValue.split(':').map(Number);
        const selectedUtcMs = Date.UTC(year, month - 1, day, hours, minutes);
        const nowUtcMs = Date.now() + new Date().getTimezoneOffset() * 60000;
        const nextOffsetMinutes = Math.round((selectedUtcMs - nowUtcMs) / 60000);
        onSetUtcOffset?.(nextOffsetMinutes);
        setAppliedDateTime(`${dateValue} ${timeValue}`);
    };

    const handleShutdown = () => {
        const confirmed = window.confirm('Voulez-vous vraiment eteindre la session ?');
        if (!confirmed) return;
        window.location.href = 'about:blank';
    };

    const handleRestart = () => {
        const confirmed = window.confirm('Voulez-vous vraiment redemarrer ?');
        if (!confirmed) return;
        window.location.reload();
    };

    return (
        <div className="xp-app cp-root">
            <div className="cp-menubar">
                <span>Fichier</span>
                <span>Edition</span>
                <span>Affichage</span>
                <span>Favoris</span>
                <span>Outils</span>
                <span>?</span>
            </div>

            <div className="cp-toolbar">
                <div className="cp-toolbar-group">
                    <button type="button" className="cp-tool-btn">Precedent</button>
                    <button type="button" className="cp-tool-btn">Suivant</button>
                </div>
                <div className="cp-toolbar-group">
                    <button type="button" className="cp-tool-btn">Rechercher</button>
                    <button type="button" className="cp-tool-btn">Dossiers</button>
                </div>
            </div>

            <div className="cp-addressbar">
                <span className="cp-address-label">Adresse</span>
                <div className="cp-address-input">
                    Panneau de configuration
                </div>
                <button type="button" className="cp-address-go">OK</button>
            </div>

            <div className="cp-body">
                <aside className="cp-left">
                    <div className="cp-left-header">Panneau de configuration</div>
                    <button type="button" className="cp-left-link">Basculer vers l'affichage classique</button>

                    <div className="cp-left-box">
                        <div className="cp-left-title">Voir aussi</div>
                        <div className="cp-left-item">Windows Update</div>
                        <div className="cp-left-item">Aide et support</div>
                        <div className="cp-left-item">Autres options du Panneau de configuration</div>
                    </div>
                </aside>

                <main className="cp-right">
                    <div className="cp-right-title">Choisissez une categorie</div>
                    <div className="cp-categories">
                        {CONFIG_SECTIONS.map(section => (
                            <button
                                key={section.id}
                                type="button"
                                className={
                                    section.id === activeSection
                                        ? 'cp-category cp-category-active'
                                        : 'cp-category'
                                }
                                onClick={() => setActiveSection(section.id)}
                            >
                                <img src={section.icon} alt="" className="cp-category-icon" />
                                <div>
                                    <div className="cp-category-title">{section.title}</div>
                                    <div className="cp-category-desc">{section.description}</div>
                                </div>
                            </button>
                        ))}
                    </div>

                    {activeSection === 'personalize' && (
                        <div className="cp-panel">
                            <div className="cp-panel-header">
                                <img src="/icons/setting.png" alt="" />
                                <div>
                                    <h2>Personnaliser</h2>
                                    <p>Changer le fond d'ecran du bureau.</p>
                                </div>
                            </div>

                            <div className="cp-panel-section">
                                <h3>Choisir un fond d'ecran</h3>
                                <div className="cp-wallpaper-grid">
                                    {WALLPAPER_OPTIONS.map(option => (
                                        <button
                                            key={option.id}
                                            type="button"
                                            className={
                                                option.id === selectedWallpaperId
                                                    ? 'cp-wallpaper-tile cp-wallpaper-tile-active'
                                                    : 'cp-wallpaper-tile'
                                            }
                                            onClick={() => handleWallpaperPick(option.src)}
                                        >
                                            <img
                                                src={option.src}
                                                alt={option.title}
                                                className="cp-wallpaper-preview"
                                            />
                                            <span className="cp-wallpaper-title">{option.title}</span>
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="cp-panel-section">
                                <h3>Importer une image</h3>
                                <div className="cp-upload-row">
                                    <label className="cp-upload-button">
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={handleUpload}
                                            style={{ display: 'none' }}
                                        />
                                        Parcourir...
                                    </label>
                                    <span className="cp-upload-hint">Formats supportes : JPG, PNG, SVG</span>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeSection === 'datetime' && (
                        <div className="cp-panel">
                            <div className="cp-panel-header">
                                <img src="/icons/setting.png" alt="" />
                                <div>
                                    <h2>Reglage de la date et de l'heure</h2>
                                    <p>Modifier la date et l'heure de l'ordinateur.</p>
                                </div>
                            </div>

                            <div className="cp-panel-section">
                                <div className="cp-info-line">
                                    Heure actuelle: {getAdjustedTime(currentTime, utcOffsetMinutes ?? -currentTime.getTimezoneOffset()).toLocaleString('fr-FR')}
                                </div>
                                <div className="cp-form-row">
                                    <label className="cp-form-label" htmlFor="cp-date">Date</label>
                                    <input
                                        id="cp-date"
                                        className="cp-form-input"
                                        type="date"
                                        value={dateValue}
                                        onChange={(e) => setDateValue(e.target.value)}
                                    />
                                </div>
                                <div className="cp-form-row">
                                    <label className="cp-form-label" htmlFor="cp-time">Heure</label>
                                    <input
                                        id="cp-time"
                                        className="cp-form-input"
                                        type="time"
                                        value={timeValue}
                                        onChange={(e) => setTimeValue(e.target.value)}
                                    />
                                </div>
                                <div className="cp-action-row">
                                    <button type="button" className="cp-action-btn" onClick={handleApplyDateTime}>
                                        Appliquer
                                    </button>
                                    {appliedDateTime && (
                                        <span className="cp-action-note">Selection: {appliedDateTime}</span>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}

                    {activeSection === 'power' && (
                        <div className="cp-panel">
                            <div className="cp-panel-header">
                                <img src="/icons/off.png" alt="" />
                                <div>
                                    <h2>Menu systeme</h2>
                                    <p>Eteindre ou redemarrer la session.</p>
                                </div>
                            </div>

                            <div className="cp-panel-section">
                                <div className="cp-power-grid">
                                    <button type="button" className="cp-power-btn" onClick={handleShutdown}>
                                        <img src="/icons/off.png" alt="" />
                                        Eteindre
                                    </button>
                                    <button type="button" className="cp-power-btn" onClick={handleRestart}>
                                        <img src="/icons/restart.png" alt="" />
                                        Redemarrer
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeSection === 'language' && (
                        <div className="cp-panel">
                            <div className="cp-panel-header">
                                <img src="/icons/user.svg" alt="" />
                                <div>
                                    <h2>Choix de la langue</h2>
                                    <p>Selectionner la langue de l'interface.</p>
                                </div>
                            </div>

                            <div className="cp-panel-section">
                                <div className="cp-language-list">
                                    {LANGUAGE_OPTIONS.map(option => (
                                        <label key={option.id} className="cp-language-item">
                                            <input
                                                type="radio"
                                                name="language"
                                                value={option.id}
                                                checked={selectedLanguage === option.id}
                                                onChange={() => {
                                                    setSelectedLanguage(option.id);
                                                    onSetLanguage?.(option.id);
                                                }}
                                            />
                                            <span>{option.label}</span>
                                        </label>
                                    ))}
                                </div>
                                <div className="cp-action-note">Le changement de langue est visuel uniquement.</div>
                            </div>
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
};
