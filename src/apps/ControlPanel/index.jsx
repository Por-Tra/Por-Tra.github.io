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

export const Component = ({ onSetWallpaper, currentWallpaper }) => {
  const [activeSection, setActiveSection] = useState(CONFIG_SECTIONS[0]?.id);
  const [uploadUrl, setUploadUrl] = useState(null);

  const selectedWallpaperId = useMemo(() => {
    const match = WALLPAPER_OPTIONS.find(option => option.src === currentWallpaper);
    return match?.id || null;
  }, [currentWallpaper]);

  useEffect(() => {
    return () => {
      if (uploadUrl) {
        URL.revokeObjectURL(uploadUrl);
      }
    };
  }, [uploadUrl]);

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

return (
    <div className="xp-app xp-controlpanel">
        <div className="xp-controlpanel-header">
            <div className="xp-controlpanel-header-inner">
                <h1>Choisissez une categorie</h1>
                <p>Selectionnez une categorie pour modifier les parametres du systeme.</p>
            </div>
        </div>

        <div className="xp-controlpanel-body">
            <aside className="xp-sidebar xp-controlpanel-sidebar">
                <div className="xp-sidebar-box">
                    <div className="xp-sidebar-title">
                        <img src="/icons/setting.png" alt="" />
                        Voir aussi
                    </div>
                    <div className="xp-sidebar-link">Systeme</div>
                    <div className="xp-sidebar-link">Comptes d'utilisateurs</div>
                    <div className="xp-sidebar-link">Options d'accessibilite</div>
                </div>
                <div className="xp-sidebar-box">
                    <div className="xp-sidebar-title">
                        <img src="/icons/folder.png" alt="" />
                        Taches
                    </div>
                    <div className="xp-sidebar-text">
                        Vous pouvez personnaliser le bureau depuis la categorie
                        "Personnaliser".
                    </div>
                </div>
            </aside>

            <main className="xp-controlpanel-main">
                <div className="xp-controlpanel-categories">
                    {CONFIG_SECTIONS.map(section => (
                        <button
                            key={section.id}
                            type="button"
                            className={
                                section.id === activeSection
                                    ? 'xp-controlpanel-card xp-controlpanel-card-active'
                                    : 'xp-controlpanel-card'
                            }
                            onClick={() => setActiveSection(section.id)}
                        >
                            <img src={section.icon} alt="" className="xp-controlpanel-card-icon" />
                            <div>
                                <div className="xp-controlpanel-card-title">{section.title}</div>
                                <div className="xp-controlpanel-card-desc">{section.description}</div>
                            </div>
                        </button>
                    ))}
                </div>

                {activeSection === 'personalize' && (
                    <div className="xp-controlpanel-section">
                        <div className="xp-controlpanel-section-header">
                            <img src="/icons/setting.png" alt="" />
                            <div>
                                <h2>Personnaliser</h2>
                                <p>Changer le fond d'ecran du bureau.</p>
                            </div>
                        </div>

                        <div className="xp-controlpanel-subsection">
                            <h3>Choisir un fond d'ecran</h3>
                            <div className="xp-wallpaper-grid">
                                {WALLPAPER_OPTIONS.map(option => (
                                    <button
                                        key={option.id}
                                        type="button"
                                        className={
                                            option.id === selectedWallpaperId
                                                ? 'xp-wallpaper-tile xp-wallpaper-tile-active'
                                                : 'xp-wallpaper-tile'
                                        }
                                        onClick={() => handleWallpaperPick(option.src)}
                                    >
                                        <img
                                            src={option.src}
                                            alt={option.title}
                                            className="xp-wallpaper-preview"
                                        />
                                        <span className="xp-wallpaper-title">{option.title}</span>
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="xp-controlpanel-subsection">
                            <h3>Importer une image</h3>
                            <div className="xp-upload-row">
                                <label className="xp-upload-button">
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={handleUpload}
                                        style={{ display: 'none' }}
                                    />
                                    Parcourir...
                                </label>
                                <span className="xp-upload-hint">Formats supportes : JPG, PNG, SVG</span>
                            </div>
                        </div>
                    </div>
                )}
            </main>
        </div>
    </div>
);
};
