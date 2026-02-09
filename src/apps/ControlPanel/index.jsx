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
                <span className="cp-address-label">Application</span>
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
                </main>
            </div>
        </div>
    );
};
