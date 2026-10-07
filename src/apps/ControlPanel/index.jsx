/**
 * Application: Control Panel
 *
 * Panneau de configuration style Windows XP
 */
import { useEffect, useMemo, useState } from 'react';
import XpMenuBar from '../../components/XpMenuBar';
import { t, getLocale } from '../../i18n/text';
import { useAccessibility, TEXT_SIZES } from '../../core/accessibility';
import {
    useClippySettings, CLIPPY_SIZES, resetClippyPosition, playClippyAnimation,
} from '../../core/clippySettings';

export const config = {
  id: 'control-panel',
  name: 'Panneau de configuration',
  icon: '/icons/setting.webp',
  defaultWidth: 760,
  defaultHeight: 540,
  showOnDesktop: false,
  showInStartMenu: true,
};

const COPY = {
    menuTitle: { FR: 'Panneau de configuration', EN: 'Control Panel', ES: 'Panel de control' },
    switchClassic: { FR: "Basculer vers l'affichage classique", EN: 'Switch to classic view', ES: 'Cambiar a vista clásica' },
    seeAlso: { FR: 'Voir aussi', EN: 'See also', ES: 'Ver también' },
    windowsUpdate: { FR: 'Windows Update', EN: 'Windows Update', ES: 'Windows Update' },
    helpSupport: { FR: 'Aide et support', EN: 'Help and Support', ES: 'Ayuda y soporte' },
    otherOptions: { FR: 'Autres options du Panneau de configuration', EN: 'Other Control Panel options', ES: 'Otras opciones del Panel de control' },
    chooseCategory: { FR: 'Choisissez une catégorie', EN: 'Choose a category', ES: 'Elige una categoría' },
    personalizeTitle: { FR: 'Personnaliser', EN: 'Personalize', ES: 'Personalizar' },
    personalizeDesc: { FR: "Changer l'apparence du bureau et du fond d'écran.", EN: 'Change the desktop look and wallpaper.', ES: 'Cambia la apariencia del escritorio y el fondo de pantalla.' },
    personalizeHeaderDesc: { FR: "Changer le fond d'écran du bureau.", EN: 'Change the desktop wallpaper.', ES: 'Cambia el fondo de pantalla del escritorio.' },
    datetimeTitle: { FR: "Réglage de la date et de l'heure", EN: 'Date and time settings', ES: 'Configuración de fecha y hora' },
    datetimeDesc: { FR: "Modifier l'horloge et la date du système.", EN: 'Adjust the system clock and date.', ES: 'Ajusta el reloj y la fecha del sistema.' },
    datetimeHeaderDesc: { FR: "Modifier la date et l'heure de l'ordinateur.", EN: "Change the computer's date and time.", ES: 'Cambia la fecha y la hora del ordenador.' },
    powerTitle: { FR: 'Menu système', EN: 'Power menu', ES: 'Menú de energía' },
    powerDesc: { FR: 'Éteindre ou redémarrer la session.', EN: 'Shut down or restart the session.', ES: 'Apagar o reiniciar la sesión.' },
    languageTitle: { FR: 'Choix de la langue', EN: 'Language selection', ES: 'Selección de idioma' },
    languageDesc: { FR: "Sélectionner la langue de l'interface.", EN: 'Select the interface language.', ES: 'Selecciona el idioma de la interfaz.' },
    toolbarPrev: { FR: 'Précédent', EN: 'Back', ES: 'Anterior' },
    toolbarNext: { FR: 'Suivant', EN: 'Next', ES: 'Siguiente' },
    toolbarSearch: { FR: 'Rechercher', EN: 'Search', ES: 'Buscar' },
    toolbarFolders: { FR: 'Dossiers', EN: 'Folders', ES: 'Carpetas' },
    address: { FR: 'Adresse', EN: 'Address', ES: 'Dirección' },
    addressValue: { FR: 'Panneau de configuration', EN: 'Control Panel', ES: 'Panel de control' },
    chooseWallpaper: { FR: "Choisir un fond d'écran", EN: 'Choose a wallpaper', ES: 'Elige un fondo de pantalla' },
    importImage: { FR: 'Importer une image', EN: 'Import an image', ES: 'Importar una imagen' },
    browse: { FR: 'Parcourir...', EN: 'Browse...', ES: 'Explorar...' },
    uploadHint: { FR: 'Formats pris en charge : JPG, PNG, SVG', EN: 'Supported formats: JPG, PNG, SVG', ES: 'Formatos soportados: JPG, PNG, SVG' },
    currentTime: { FR: 'Heure actuelle', EN: 'Current time', ES: 'Hora actual' },
    dateLabel: { FR: 'Date', EN: 'Date', ES: 'Fecha' },
    timeLabel: { FR: 'Heure', EN: 'Time', ES: 'Hora' },
    apply: { FR: 'Appliquer', EN: 'Apply', ES: 'Aplicar' },
    selection: { FR: 'Sélection', EN: 'Selection', ES: 'Selección' },
    shutdown: { FR: 'Éteindre', EN: 'Shut down', ES: 'Apagar' },
    restart: { FR: 'Redémarrer', EN: 'Restart', ES: 'Reiniciar' },
    languageNote: { FR: 'Le changement de langue est visuel uniquement.', EN: 'Language change is visual only.', ES: 'El cambio de idioma es solo visual.' },
    confirmShutdown: { FR: 'Voulez-vous vraiment éteindre la session ?', EN: 'Do you really want to shut down the session?', ES: '¿Realmente quieres apagar la sesión?' },
    confirmRestart: { FR: 'Voulez-vous vraiment redémarrer ?', EN: 'Do you really want to restart?', ES: '¿Realmente quieres reiniciar?' },
    ok: { FR: 'OK', EN: 'OK', ES: 'Aceptar' },
    wallpaperDefault: { FR: 'Par défaut', EN: 'Default', ES: 'Predeterminado' },
    accessibilityTitle: { FR: "Options d'accessibilité", EN: 'Accessibility Options', ES: 'Opciones de accesibilidad' },
    accessibilityDesc: {
        FR: "Adapter l'affichage, la lecture et la souris à vos besoins.",
        EN: 'Adjust the display, reading and mouse to your needs.',
        ES: 'Adapta la pantalla, la lectura y el ratón a tus necesidades.',
    },
    a11yReading: { FR: 'Lecture', EN: 'Reading', ES: 'Lectura' },
    a11yDyslexia: {
        FR: 'Utiliser une police adaptée à la dyslexie (OpenDyslexic)',
        EN: 'Use a dyslexia-friendly font (OpenDyslexic)',
        ES: 'Usar una fuente adaptada a la dislexia (OpenDyslexic)',
    },
    a11yDyslexiaHint: {
        FR: 'Lettres plus distinctes et texte plus espacé.',
        EN: 'More distinct letters and more widely spaced text.',
        ES: 'Letras más distinguibles y texto más espaciado.',
    },
    a11yDisplay: { FR: 'Affichage', EN: 'Display', ES: 'Pantalla' },
    a11yTextSize: { FR: 'Taille de la police :', EN: 'Font size:', ES: 'Tamaño de fuente:' },
    a11yTextNormal: { FR: 'Normale', EN: 'Normal', ES: 'Normal' },
    a11yTextLarge: { FR: 'Grandes polices', EN: 'Large Fonts', ES: 'Fuentes grandes' },
    a11yTextXLarge: { FR: 'Polices très grandes', EN: 'Extra Large Fonts', ES: 'Fuentes muy grandes' },
    a11yContrast: { FR: 'Renforcer le contraste', EN: 'Increase contrast', ES: 'Aumentar el contraste' },
    a11yMouseKeyboard: { FR: 'Souris et clavier', EN: 'Mouse and keyboard', ES: 'Ratón y teclado' },
    a11yCursor: { FR: 'Utiliser un pointeur de souris agrandi', EN: 'Use a large mouse pointer', ES: 'Usar un puntero del ratón grande' },
    a11yFocus: {
        FR: "Mettre en évidence l'élément sélectionné au clavier (Tab)",
        EN: 'Highlight the element selected with the keyboard (Tab)',
        ES: 'Resaltar el elemento seleccionado con el teclado (Tab)',
    },
    a11yMotion: { FR: 'Animations', EN: 'Animations', ES: 'Animaciones' },
    a11yReduceMotion: {
        FR: 'Réduire les animations (Clippy, transitions, démarrage)',
        EN: 'Reduce animations (Clippy, transitions, startup)',
        ES: 'Reducir las animaciones (Clippy, transiciones, inicio)',
    },
    a11yPreview: { FR: 'Aperçu', EN: 'Preview', ES: 'Vista previa' },
    a11yPreviewText: {
        FR: 'Portez ce vieux whisky au juge blond qui fume. 0123456789',
        EN: 'The quick brown fox jumps over the lazy dog. 0123456789',
        ES: 'El veloz murciélago hindú comía feliz cardillo y kiwi. 0123456789',
    },
    a11yReset: { FR: 'Rétablir les paramètres par défaut', EN: 'Restore defaults', ES: 'Restablecer valores predeterminados' },
    a11ySaved: {
        FR: 'Les réglages sont appliqués immédiatement et conservés pour vos prochaines visites.',
        EN: 'Settings apply immediately and are kept for your next visits.',
        ES: 'Los ajustes se aplican al instante y se conservan para tus próximas visitas.',
    },
    clippyTitle: { FR: 'Clippy, le compagnon', EN: 'Clippy, your companion', ES: 'Clippy, el compañero' },
    clippyDesc: {
        FR: 'Choisir la taille et le comportement du trombone.',
        EN: "Choose the paperclip's size and behavior.",
        ES: 'Elegir el tamaño y el comportamiento del clip.',
    },
    clippyDisplay: { FR: 'Affichage', EN: 'Display', ES: 'Pantalla' },
    clippyVisible: { FR: 'Afficher Clippy sur le bureau', EN: 'Show Clippy on the desktop', ES: 'Mostrar a Clippy en el escritorio' },
    clippySize: { FR: 'Taille :', EN: 'Size:', ES: 'Tamaño:' },
    clippySizeSmall: { FR: 'Petit', EN: 'Small', ES: 'Pequeño' },
    clippySizeNormal: { FR: 'Normal', EN: 'Normal', ES: 'Normal' },
    clippySizeLarge: { FR: 'Grand', EN: 'Large', ES: 'Grande' },
    clippySizeXLarge: { FR: 'Très grand', EN: 'Extra large', ES: 'Muy grande' },
    clippyBehavior: { FR: 'Comportement', EN: 'Behavior', ES: 'Comportamiento' },
    clippyIdle: {
        FR: "S'occuper quand on ne fait rien (animations d'attente)",
        EN: 'Keep busy when idle (idle animations)',
        ES: 'Entretenerse cuando no hay actividad (animaciones de espera)',
    },
    clippyIdleHint: {
        FR: "Désactivé automatiquement si « Réduire les animations » est coché dans les Options d'accessibilité.",
        EN: 'Turned off automatically when "Reduce animations" is checked in Accessibility Options.',
        ES: 'Se desactiva automáticamente si «Reducir las animaciones» está marcado en Opciones de accesibilidad.',
    },
    clippyOpenOnArrival: {
        FR: "Ouvrir sa bulle d'aide dès son arrivée",
        EN: 'Open his help balloon as soon as he arrives',
        ES: 'Abrir su globo de ayuda en cuanto llega',
    },
    clippyActions: { FR: 'Actions', EN: 'Actions', ES: 'Acciones' },
    clippyWave: { FR: 'Faire coucou', EN: 'Wave hello', ES: 'Saludar' },
    clippyResetPosition: { FR: 'Replacer en bas à droite', EN: 'Move back to bottom right', ES: 'Volver abajo a la derecha' },
    clippyReset: { FR: 'Rétablir les paramètres par défaut', EN: 'Restore defaults', ES: 'Restablecer valores predeterminados' },
};

const CLIPPY_SIZE_LABELS = {
    small: COPY.clippySizeSmall,
    normal: COPY.clippySizeNormal,
    large: COPY.clippySizeLarge,
    xlarge: COPY.clippySizeXLarge,
};

const TEXT_SIZE_LABELS = {
    normal: COPY.a11yTextNormal,
    large: COPY.a11yTextLarge,
    xlarge: COPY.a11yTextXLarge,
};

const CONFIG_SECTIONS = [
    {
        id: 'personalize',
        title: COPY.personalizeTitle,
        description: COPY.personalizeDesc,
        icon: '/icons/setting.webp',
    },
    {
        id: 'datetime',
        title: COPY.datetimeTitle,
        description: COPY.datetimeDesc,
        icon: '/icons/setting.webp',
    },
    {
        id: 'power',
        title: COPY.powerTitle,
        description: COPY.powerDesc,
        icon: '/icons/off.webp',
    },
    {
        id: 'language',
        title: COPY.languageTitle,
        description: COPY.languageDesc,
        icon: '/icons/location.ico',
    },
    {
        id: 'accessibility',
        title: COPY.accessibilityTitle,
        description: COPY.accessibilityDesc,
        icon: '/icons/accessibility.svg',
    },
    {
        id: 'clippy',
        title: COPY.clippyTitle,
        description: COPY.clippyDesc,
        icon: '/clippy/clippy-icon.png',
    },
];

const LANGUAGE_OPTIONS = [
    { id: 'FR', label: { FR: 'Francais (FR)', EN: 'French (FR)', ES: 'Francés (FR)' } },
    { id: 'EN', label: { FR: 'Anglais (EN)', EN: 'English (EN)', ES: 'Inglés (EN)' } },
    { id: 'ES', label: { FR: 'Espagnol (ES)', EN: 'Spanish (ES)', ES: 'Español (ES)' } },
];

const WALLPAPER_OPTIONS = [
  {
    id: 'default',
        title: COPY.wallpaperDefault,
    src: '/wallpaper.webp',
  },
  {
    id: 'win11Dark',
    title: 'W11D',
    src: '/images/wallpapers/win11Dark.webp',
  },
  {
    id: 'dog',
    title: 'DOG',
    src: '/images/wallpapers/Dog.webp',
  },
  {
    id: 'winXPDark',
    title: 'WXP Dark',
    src: '/images/wallpapers/winXPDark.webp',
  },
  {
    id : 'FunWallpaper',
        title: 'Fun' ,
    src: '/images/wallpapers/1.webp',
  },
  {
    id : 'Desert',
        title: 'Desert',
    src: '/images/wallpapers/2.webp',
  },
  {
    id : 'mountains',
    title: 'Mountains',
    src : '/images/wallpapers/mountain.webp',
  },
  {
    id: 'forest',
    title: 'Forest',
    src: '/images/wallpapers/forest.webp',
  },
  {
    id: 'city',
    title: 'City',
    src: '/images/wallpapers/city.webp',
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
    const [a11y, updateA11y, resetA11y] = useAccessibility();
    const [clippy, updateClippy, resetClippy] = useClippySettings();

    // Lookup helper: reuses the same COPY[key][lang] fallback pattern
    // already used below for confirmShutdown / confirmRestart.
    const tr = (entry) => entry[selectedLanguage] || entry['FR'];

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
    };
    }, []);

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

        const reader = new FileReader();
        reader.onload = () => {
            if (typeof reader.result !== 'string') return;
            onSetWallpaper?.(reader.result);
        };
        reader.readAsDataURL(file);
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
        const confirmed = window.confirm(COPY.confirmShutdown[selectedLanguage] || COPY.confirmShutdown['FR']);
        if (!confirmed) return;
        window.location.href = 'about:blank';
    };

    const handleRestart = () => {
        const confirmed = window.confirm(COPY.confirmRestart[selectedLanguage] || COPY.confirmRestart['FR']);
        if (!confirmed) return;
        window.location.reload();
    };

    return (
        <div className="xp-app cp-root">
            <XpMenuBar
                preset="explorer"
                className="xp-menubar xp-menubar-explorer"
                currentLanguage={selectedLanguage}
            />

            <div className="xp-toolbar">
                <button type="button" className="xp-toolbar-btn" disabled>
                    <img src="/icons/back.webp" alt="" className="xp-toolbar-icon-lg" />
                    {tr(COPY.toolbarPrev)}
                </button>
                <button type="button" className="xp-toolbar-btn" disabled>
                    <img src="/icons/back.webp" alt="" className="xp-toolbar-icon-lg" style={{ transform: 'scaleX(-1)' }} />
                </button>
                <div className="xp-toolbar-separator"></div>
                <button type="button" className="xp-toolbar-btn">
                    <img src="/icons/explorer.webp" alt="" className="xp-toolbar-icon-lg" />
                    {tr(COPY.toolbarSearch)}
                </button>
                <button type="button" className="xp-toolbar-btn">
                    <img src="/icons/folder.webp" alt="" className="xp-toolbar-icon-lg" />
                    {tr(COPY.toolbarFolders)}
                </button>
            </div>

            <div className="xp-addressbar">
                <span className="xp-addressbar-label">{tr(COPY.address)}</span>
                <div className="xp-addressbar-input">
                    <img src="/icons/setting.webp" alt="" className="w-4 h-4 shrink-0" />
                    {tr(COPY.addressValue)}
                </div>
                <button type="button" className="xp-addressbar-go">{tr(COPY.ok)}</button>
            </div>

            <div className="cp-body">
                <aside className="xp-sidebar">
                    <div className="xp-sidebar-box">
                        <div className="xp-sidebar-title">{tr(COPY.menuTitle)}</div>
                        <div className="xp-sidebar-link">
                            <img src="/icons/setting.webp" alt="" />
                            {tr(COPY.switchClassic)}
                        </div>
                    </div>

                    <div className="xp-sidebar-box">
                        <div className="xp-sidebar-title">{tr(COPY.seeAlso)}</div>
                        <div className="xp-sidebar-link">
                            <img src="/icons/explorer.webp" alt="" />
                            {tr(COPY.windowsUpdate)}
                        </div>
                        <div className="xp-sidebar-link">
                            <img src="/icons/questionMark.webp" alt="" />
                            {tr(COPY.helpSupport)}
                        </div>
                        <div className="xp-sidebar-link">
                            <img src="/icons/setting.webp" alt="" />
                            {tr(COPY.otherOptions)}
                        </div>
                    </div>
                </aside>

                <main className="cp-right">
                    <div className="cp-right-title">{tr(COPY.chooseCategory)}</div>
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
                                    <div className="cp-category-title">{tr(section.title)}</div>
                                    <div className="cp-category-desc">{tr(section.description)}</div>
                                </div>
                            </button>
                        ))}
                    </div>

                    {activeSection === 'personalize' && (
                        <div className="cp-panel">
                            <div className="cp-panel-header">
                                <img src="/icons/setting.webp" alt="" />
                                <div>
                                    <h2>{tr(COPY.personalizeTitle)}</h2>
                                    <p>{tr(COPY.personalizeHeaderDesc)}</p>
                                </div>
                            </div>

                            <div className="cp-panel-section">
                                <h3>{tr(COPY.chooseWallpaper)}</h3>
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
                                                alt={typeof option.title === 'string' ? option.title : tr(option.title)}
                                                className="cp-wallpaper-preview"
                                            />
                                            <span className="cp-wallpaper-title">
                                                {typeof option.title === 'string' ? option.title : tr(option.title)}
                                            </span>
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="cp-panel-section">
                                <h3>{tr(COPY.importImage)}</h3>
                                <div className="cp-upload-row">
                                    <label className="cp-upload-button">
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={handleUpload}
                                            style={{ display: 'none' }}
                                        />
                                        {tr(COPY.browse)}
                                    </label>
                                    <span className="cp-upload-hint">{tr(COPY.uploadHint)}</span>
                                </div>
                            </div>

                        </div>
                    )}

                    {activeSection === 'datetime' && (
                        <div className="cp-panel">
                            <div className="cp-panel-header">
                                <img src="/icons/setting.webp" alt="" />
                                <div>
                                    <h2>{tr(COPY.datetimeTitle)}</h2>
                                    <p>{tr(COPY.datetimeHeaderDesc)}</p>
                                </div>
                            </div>

                            <div className="cp-panel-section">
                                <div className="cp-info-line">
                                    {tr(COPY.currentTime)}: {getAdjustedTime(currentTime, utcOffsetMinutes ?? -currentTime.getTimezoneOffset()).toLocaleString(
                                        selectedLanguage === 'EN' ? 'en-US' : selectedLanguage === 'ES' ? 'es-ES' : 'fr-FR'
                                    )}
                                </div>
                                <div className="cp-form-row">
                                    <label className="cp-form-label" htmlFor="cp-date">{tr(COPY.dateLabel)}</label>
                                    <input
                                        id="cp-date"
                                        className="cp-form-input"
                                        type="date"
                                        value={dateValue}
                                        onChange={(e) => setDateValue(e.target.value)}
                                    />
                                </div>
                                <div className="cp-form-row">
                                    <label className="cp-form-label" htmlFor="cp-time">{tr(COPY.timeLabel)}</label>
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
                                        {tr(COPY.apply)}
                                    </button>
                                    {appliedDateTime && (
                                        <span className="cp-action-note">{tr(COPY.selection)}: {appliedDateTime}</span>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}

                    {activeSection === 'power' && (
                        <div className="cp-panel">
                            <div className="cp-panel-header">
                                <img src="/icons/off.webp" alt="" />
                                <div>
                                    <h2>{tr(COPY.powerTitle)}</h2>
                                    <p>{tr(COPY.powerDesc)}</p>
                                </div>
                            </div>

                            <div className="cp-panel-section">
                                <div className="cp-power-grid">
                                    <button type="button" className="cp-power-btn" onClick={handleShutdown}>
                                        <img src="/icons/off.webp" alt="" />
                                        {tr(COPY.shutdown)}
                                    </button>
                                    <button type="button" className="cp-power-btn" onClick={handleRestart}>
                                        <img src="/icons/restart.webp" alt="" />
                                        {tr(COPY.restart)}
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeSection === 'language' && (
                        <div className="cp-panel">
                            <div className="cp-panel-header">
                                <img src="/icons/location.ico" alt="" />
                                <div>
                                    <h2>{tr(COPY.languageTitle)}</h2>
                                    <p>{tr(COPY.languageDesc)}</p>
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
                                            <span>{tr(option.label)}</span>
                                        </label>
                                    ))}
                                </div>
                                <div className="cp-action-note">{tr(COPY.languageNote)}</div>
                            </div>
                        </div>
                    )}
                    {activeSection === 'accessibility' && (
                        <div className="cp-panel">
                            <div className="cp-panel-header">
                                <img src="/icons/accessibility.svg" alt="" />
                                <div>
                                    <h2>{tr(COPY.accessibilityTitle)}</h2>
                                    <p>{tr(COPY.accessibilityDesc)}</p>
                                </div>
                            </div>

                            <fieldset className="cp-fieldset">
                                <legend>{tr(COPY.a11yReading)}</legend>
                                <label className="cp-check">
                                    <input
                                        type="checkbox"
                                        checked={a11y.dyslexiaFont}
                                        onChange={(e) => updateA11y('dyslexiaFont', e.target.checked)}
                                    />
                                    <span>{tr(COPY.a11yDyslexia)}</span>
                                </label>
                                <p className="cp-check-hint">{tr(COPY.a11yDyslexiaHint)}</p>
                            </fieldset>

                            <fieldset className="cp-fieldset">
                                <legend>{tr(COPY.a11yDisplay)}</legend>
                                <div className="cp-radio-group" role="radiogroup" aria-label={tr(COPY.a11yTextSize)}>
                                    <span>{tr(COPY.a11yTextSize)}</span>
                                    {TEXT_SIZES.map(size => (
                                        <label key={size} className="cp-check">
                                            <input
                                                type="radio"
                                                name="a11y-text-size"
                                                checked={a11y.textSize === size}
                                                onChange={() => updateA11y('textSize', size)}
                                            />
                                            <span>{tr(TEXT_SIZE_LABELS[size])}</span>
                                        </label>
                                    ))}
                                </div>
                                <label className="cp-check">
                                    <input
                                        type="checkbox"
                                        checked={a11y.highContrast}
                                        onChange={(e) => updateA11y('highContrast', e.target.checked)}
                                    />
                                    <span>{tr(COPY.a11yContrast)}</span>
                                </label>
                            </fieldset>

                            <fieldset className="cp-fieldset">
                                <legend>{tr(COPY.a11yMouseKeyboard)}</legend>
                                <label className="cp-check">
                                    <input
                                        type="checkbox"
                                        checked={a11y.largeCursor}
                                        onChange={(e) => updateA11y('largeCursor', e.target.checked)}
                                    />
                                    <span>{tr(COPY.a11yCursor)}</span>
                                </label>
                                <label className="cp-check">
                                    <input
                                        type="checkbox"
                                        checked={a11y.focusHighlight}
                                        onChange={(e) => updateA11y('focusHighlight', e.target.checked)}
                                    />
                                    <span>{tr(COPY.a11yFocus)}</span>
                                </label>
                            </fieldset>

                            <fieldset className="cp-fieldset">
                                <legend>{tr(COPY.a11yMotion)}</legend>
                                <label className="cp-check">
                                    <input
                                        type="checkbox"
                                        checked={a11y.reduceMotion}
                                        onChange={(e) => updateA11y('reduceMotion', e.target.checked)}
                                    />
                                    <span>{tr(COPY.a11yReduceMotion)}</span>
                                </label>
                            </fieldset>

                            <fieldset className="cp-fieldset">
                                <legend>{tr(COPY.a11yPreview)}</legend>
                                <p className="cp-a11y-preview">{tr(COPY.a11yPreviewText)}</p>
                            </fieldset>

                            <div className="cp-action-row">
                                <button type="button" className="cp-action-btn" onClick={resetA11y}>
                                    {tr(COPY.a11yReset)}
                                </button>
                            </div>
                            <p className="cp-action-note mt-2">{tr(COPY.a11ySaved)}</p>
                        </div>
                    )}
                    {activeSection === 'clippy' && (
                        <div className="cp-panel">
                            <div className="cp-panel-header">
                                <img src="/clippy/clippy-icon.png" alt="" />
                                <div>
                                    <h2>{tr(COPY.clippyTitle)}</h2>
                                    <p>{tr(COPY.clippyDesc)}</p>
                                </div>
                            </div>

                            <fieldset className="cp-fieldset">
                                <legend>{tr(COPY.clippyDisplay)}</legend>
                                <label className="cp-check">
                                    <input
                                        type="checkbox"
                                        checked={clippy.visible}
                                        onChange={(e) => updateClippy('visible', e.target.checked)}
                                    />
                                    <span>{tr(COPY.clippyVisible)}</span>
                                </label>
                                <div className="cp-clippy-size">
                                    <div className="cp-radio-group" role="radiogroup" aria-label={tr(COPY.clippySize)}>
                                        <span>{tr(COPY.clippySize)}</span>
                                        {Object.keys(CLIPPY_SIZES).map(size => (
                                            <label key={size} className="cp-check">
                                                <input
                                                    type="radio"
                                                    name="clippy-size"
                                                    checked={clippy.size === size}
                                                    onChange={() => updateClippy('size', size)}
                                                />
                                                <span>{tr(CLIPPY_SIZE_LABELS[size])}</span>
                                            </label>
                                        ))}
                                    </div>
                                    {/* Aperçu à la taille choisie (première image de la spritemap) */}
                                    <div className="cp-clippy-preview" aria-hidden="true">
                                        <div
                                            style={{
                                                width: 124 * CLIPPY_SIZES[clippy.size],
                                                height: 93 * CLIPPY_SIZES[clippy.size],
                                                backgroundImage: 'url("/clippy/clippy__spritemap.png")',
                                                backgroundSize: `${3348 * CLIPPY_SIZES[clippy.size]}px ${3162 * CLIPPY_SIZES[clippy.size]}px`,
                                                backgroundPosition: '0 0',
                                            }}
                                        />
                                    </div>
                                </div>
                            </fieldset>

                            <fieldset className="cp-fieldset">
                                <legend>{tr(COPY.clippyBehavior)}</legend>
                                <label className="cp-check">
                                    <input
                                        type="checkbox"
                                        checked={clippy.idleAnimations}
                                        onChange={(e) => updateClippy('idleAnimations', e.target.checked)}
                                    />
                                    <span>{tr(COPY.clippyIdle)}</span>
                                </label>
                                <p className="cp-check-hint">{tr(COPY.clippyIdleHint)}</p>
                                <label className="cp-check">
                                    <input
                                        type="checkbox"
                                        checked={clippy.openOnArrival}
                                        onChange={(e) => updateClippy('openOnArrival', e.target.checked)}
                                    />
                                    <span>{tr(COPY.clippyOpenOnArrival)}</span>
                                </label>
                            </fieldset>

                            <fieldset className="cp-fieldset">
                                <legend>{tr(COPY.clippyActions)}</legend>
                                <div className="cp-action-row">
                                    <button
                                        type="button"
                                        className="cp-action-btn"
                                        disabled={!clippy.visible}
                                        onClick={() => playClippyAnimation('Wave')}
                                    >
                                        {tr(COPY.clippyWave)}
                                    </button>
                                    <button
                                        type="button"
                                        className="cp-action-btn"
                                        disabled={!clippy.visible}
                                        onClick={resetClippyPosition}
                                    >
                                        {tr(COPY.clippyResetPosition)}
                                    </button>
                                    <button type="button" className="cp-action-btn" onClick={resetClippy}>
                                        {tr(COPY.clippyReset)}
                                    </button>
                                </div>
                            </fieldset>
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
};