/**
 * Application: ImageViewer
 *
 * Réplique de l'« Aperçu des images et des télécopies Windows » de Windows XP :
 * fond bleu pâle, image centrée et barre d'outils en bas, diaporama plein écran,
 * navigation dans les images du dossier, zoom, rotation et raccourcis clavier d'origine.
 *
 * Props (via extraProps) :
 * - images : [{ src, name }] liste des images parcourables (dossier, captures d'un projet...)
 * - startIndex : index de l'image affichée à l'ouverture
 * - imageSrc / imageName : ouverture d'une image seule (rétrocompatibilité)
 */
import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { t } from '../../i18n/text';
import { showError } from '../../core/errorDialog';
import {
  PrevIcon, NextIcon, BestFitIcon, ActualSizeIcon, SlideshowIcon, ZoomInIcon, ZoomOutIcon,
  RotateClockwiseIcon, RotateCounterClockwiseIcon, DeleteIcon, PrintIcon, CopyToIcon, EditIcon,
  HelpIcon, CloseIcon, PauseIcon, PlayIcon,
} from './icons';

export const config = {
  id: 'image-viewer',
  name: 'Aperçu des images et des télécopies Windows',
  icon: '/icons/image.webp',
  defaultWidth: 680,
  defaultHeight: 520,
  showOnDesktop: false,
  showInStartMenu: false,
};

const ZOOM_LEVELS = [0.05, 0.1, 0.15, 0.25, 0.33, 0.5, 0.66, 0.75, 1, 1.25, 1.5, 2, 3, 4, 6, 8, 12, 16];
const STAGE_PADDING = 24;
const SLIDESHOW_DELAY = 5000;
const SLIDESHOW_CONTROLS_DELAY = 2500;

const COPY = {
  appName: {
    FR: 'Aperçu des images et des télécopies Windows',
    EN: 'Windows Picture and Fax Viewer',
    ES: 'Visor de imágenes y fax de Windows',
  },
  previous: { FR: 'Image précédente (Flèche gauche)', EN: 'Previous Image (Left Arrow)', ES: 'Imagen anterior (Flecha izquierda)' },
  next: { FR: 'Image suivante (Flèche droite)', EN: 'Next Image (Right Arrow)', ES: 'Imagen siguiente (Flecha derecha)' },
  bestFit: { FR: 'Ajuster (Ctrl+B)', EN: 'Best Fit (Ctrl+B)', ES: 'Ajustar (Ctrl+B)' },
  actualSize: { FR: 'Taille réelle (Ctrl+A)', EN: 'Actual Size (Ctrl+A)', ES: 'Tamaño real (Ctrl+A)' },
  slideshow: { FR: 'Démarrer le diaporama (F11)', EN: 'Start Slide Show (F11)', ES: 'Iniciar presentación (F11)' },
  zoomIn: { FR: 'Zoom avant (+)', EN: 'Zoom In (+)', ES: 'Acercar (+)' },
  zoomOut: { FR: 'Zoom arrière (-)', EN: 'Zoom Out (-)', ES: 'Alejar (-)' },
  rotateClockwise: {
    FR: 'Rotation dans le sens des aiguilles d’une montre (Ctrl+K)',
    EN: 'Rotate Clockwise (Ctrl+K)',
    ES: 'Girar en el sentido de las agujas del reloj (Ctrl+K)',
  },
  rotateCounterClockwise: {
    FR: 'Rotation dans le sens inverse des aiguilles d’une montre (Ctrl+L)',
    EN: 'Rotate Counterclockwise (Ctrl+L)',
    ES: 'Girar en sentido contrario a las agujas del reloj (Ctrl+L)',
  },
  delete: { FR: 'Supprimer (Suppr)', EN: 'Delete (Del)', ES: 'Eliminar (Supr)' },
  print: { FR: 'Imprimer (Ctrl+P)', EN: 'Print (Ctrl+P)', ES: 'Imprimir (Ctrl+P)' },
  copyTo: { FR: 'Copier vers (Ctrl+S)', EN: 'Copy To (Ctrl+S)', ES: 'Copiar en (Ctrl+S)' },
  edit: {
    FR: 'Fermer cette image et l’ouvrir pour la modifier (Ctrl+E)',
    EN: 'Close this image and open it for editing (Ctrl+E)',
    ES: 'Cerrar esta imagen y abrirla para modificarla (Ctrl+E)',
  },
  help: { FR: 'Aide (F1)', EN: 'Help (F1)', ES: 'Ayuda (F1)' },
  helpTitle: { FR: 'Aide', EN: 'Help', ES: 'Ayuda' },
  helpText: {
    FR: 'Flèches gauche/droite : image précédente/suivante. + et - : zoom. Ctrl+B : ajuster. Ctrl+A : taille réelle. Ctrl+K / Ctrl+L : rotation. F11 : diaporama (Échap pour quitter). Ctrl+molette : zoom.',
    EN: 'Left/Right arrows: previous/next image. + and -: zoom. Ctrl+B: best fit. Ctrl+A: actual size. Ctrl+K / Ctrl+L: rotate. F11: slide show (Esc to exit). Ctrl+wheel: zoom.',
    ES: 'Flechas izquierda/derecha: imagen anterior/siguiente. + y -: zoom. Ctrl+B: ajustar. Ctrl+A: tamaño real. Ctrl+K / Ctrl+L: girar. F11: presentación (Esc para salir). Ctrl+rueda: zoom.',
  },
  deleteError: {
    FR: 'Impossible de supprimer ce fichier : il est protégé en écriture. (Et puis, ce serait dommage, non ?)',
    EN: 'Cannot delete this file: it is write-protected. (Besides, that would be a shame, right?)',
    ES: 'No se puede eliminar este archivo: está protegido contra escritura. (Además, sería una pena, ¿no?)',
  },
  loadError: {
    FR: 'Aucun aperçu disponible.',
    EN: 'No preview available.',
    ES: 'No hay vista previa disponible.',
  },
  close: { FR: 'Fermer (Échap)', EN: 'Close (Esc)', ES: 'Cerrar (Esc)' },
  pause: { FR: 'Suspendre le diaporama', EN: 'Pause Slide Show', ES: 'Pausar presentación' },
  resume: { FR: 'Reprendre le diaporama', EN: 'Resume Slide Show', ES: 'Reanudar presentación' },
  image: { FR: 'Image', EN: 'Image', ES: 'Imagen' },
};

const getFileName = (src) => {
  try {
    return decodeURIComponent(new URL(src, globalThis.location.href).pathname.split('/').pop() || 'image');
  } catch {
    return 'image';
  }
};

const ToolbarButton = ({ title, onClick, disabled = false, active = false, children }) => (
  <button
    type="button"
    className={`xp-iv-btn ${active ? 'is-active' : ''}`}
    title={title}
    aria-label={title}
    onClick={onClick}
    disabled={disabled}
  >
    {children}
  </button>
);

/* ---------------- Diaporama plein écran ---------------- */
const Slideshow = ({ images, index, onIndexChange, onClose, currentLanguage }) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [showControls, setShowControls] = useState(true);
  const hideTimer = useRef();
  const rootRef = useRef(null);
  const onCloseRef = useRef(onClose);

  useEffect(() => {
    onCloseRef.current = onClose;
  }, [onClose]);

  // Défilement automatique
  useEffect(() => {
    if (!isPlaying || images.length < 2) return undefined;
    const timer = setTimeout(() => onIndexChange((index + 1) % images.length), SLIDESHOW_DELAY);
    return () => clearTimeout(timer);
  }, [isPlaying, index, images.length, onIndexChange]);

  // Vrai plein écran si le navigateur le permet (sinon le calque couvre déjà toute la page)
  useEffect(() => {
    const element = rootRef.current;
    element?.focus();
    element?.requestFullscreen?.().catch(() => {});
    const handleFullscreenChange = () => {
      if (!document.fullscreenElement) onCloseRef.current();
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      if (document.fullscreenElement) document.exitFullscreen?.().catch(() => {});
      clearTimeout(hideTimer.current);
    };
  }, []);

  const revealControls = () => {
    setShowControls(true);
    clearTimeout(hideTimer.current);
    hideTimer.current = setTimeout(() => setShowControls(false), SLIDESHOW_CONTROLS_DELAY);
  };

  const goTo = (delta) => onIndexChange((index + delta + images.length) % images.length);

  const handleKeyDown = (event) => {
    if (event.key === 'Escape') onClose();
    else if (event.key === 'ArrowRight' || event.key === ' ') goTo(1);
    else if (event.key === 'ArrowLeft') goTo(-1);
    else return;
    event.preventDefault();
  };

  const current = images[index];

  return createPortal(
    <div
      ref={rootRef}
      className={`xp-iv-slideshow ${showControls ? '' : 'hide-cursor'}`}
      tabIndex={-1}
      onMouseMove={revealControls}
      onKeyDown={handleKeyDown}
      onClick={() => goTo(1)}
    >
      <img src={current.src} alt={current.name} draggable={false} />

      <div
        className={`xp-iv-slideshow-controls ${showControls ? '' : 'is-hidden'}`}
        onClick={(event) => event.stopPropagation()}
      >
        <ToolbarButton
          title={t(isPlaying ? COPY.pause : COPY.resume, currentLanguage)}
          onClick={() => setIsPlaying((value) => !value)}
        >
          {isPlaying ? <PauseIcon /> : <PlayIcon />}
        </ToolbarButton>
        <ToolbarButton title={t(COPY.previous, currentLanguage)} onClick={() => goTo(-1)} disabled={images.length < 2}>
          <PrevIcon />
        </ToolbarButton>
        <ToolbarButton title={t(COPY.next, currentLanguage)} onClick={() => goTo(1)} disabled={images.length < 2}>
          <NextIcon />
        </ToolbarButton>
        <ToolbarButton title={t(COPY.close, currentLanguage)} onClick={onClose}>
          <span className="xp-iv-slideshow-close"><CloseIcon /></span>
        </ToolbarButton>
      </div>
    </div>,
    document.body
  );
};

/* ---------------- Visionneuse ---------------- */
export const Component = ({ windowId, images, startIndex = 0, imageSrc, imageName, currentLanguage }) => {
  // Liste des images parcourables (une seule image si l'appelant ne fournit pas de liste)
  const imageList = useMemo(() => {
    if (Array.isArray(images) && images.length > 0) return images;
    const src = imageSrc || '/wallpaper.webp';
    return [{ src, name: imageName || getFileName(src) }];
  }, [images, imageSrc, imageName]);

  const [index, setIndex] = useState(() => Math.min(Math.max(0, startIndex), imageList.length - 1));
  const [mode, setMode] = useState('fit'); // 'fit' | 'zoom'
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [naturalSize, setNaturalSize] = useState(null);
  const [hasError, setHasError] = useState(false);
  const [stageSize, setStageSize] = useState({ width: 0, height: 0 });
  const [isSlideshow, setIsSlideshow] = useState(false);

  const rootRef = useRef(null);
  const stageRef = useRef(null);
  const panState = useRef(null);

  const current = imageList[index];
  const hasMany = imageList.length > 1;

  // Nouvelle image : on repart en mode « ajuster », sans rotation
  const showImage = useCallback((nextIndex) => {
    setIndex(nextIndex);
    setMode('fit');
    setRotation(0);
    setNaturalSize(null);
    setHasError(false);
  }, []);

  // Titre de la fenêtre « nom - Aperçu des images et des télécopies Windows »
  useEffect(() => {
    if (!windowId) return;
    globalThis.dispatchEvent(new CustomEvent('xp-window-title', {
      detail: { windowId, title: `${current.name} - ${t(COPY.appName, currentLanguage)}` },
    }));
  }, [windowId, current.name, currentLanguage]);

  // Taille de la zone d'affichage (pour le mode « ajuster »)
  useLayoutEffect(() => {
    const stage = stageRef.current;
    if (!stage) return undefined;
    const update = () => setStageSize({ width: stage.clientWidth, height: stage.clientHeight });
    update();
    const observer = new ResizeObserver(update);
    observer.observe(stage);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    rootRef.current?.focus();
  }, []);

  const isQuarterTurn = Math.abs(rotation) % 180 === 90;
  const rotatedWidth = naturalSize ? (isQuarterTurn ? naturalSize.height : naturalSize.width) : 0;
  const rotatedHeight = naturalSize ? (isQuarterTurn ? naturalSize.width : naturalSize.height) : 0;

  // « Ajuster » ne grossit jamais une petite image, comme dans XP
  const fitScale = naturalSize
    ? Math.min(
        1,
        Math.max(1, stageSize.width - STAGE_PADDING * 2) / rotatedWidth,
        Math.max(1, stageSize.height - STAGE_PADDING * 2) / rotatedHeight
      )
    : 1;
  const scale = mode === 'fit' ? fitScale : zoom;

  const changeZoom = useCallback((direction) => {
    const base = mode === 'fit' ? fitScale : zoom;
    const nextLevel = direction > 0
      ? ZOOM_LEVELS.find((level) => level > base + 0.001)
      : [...ZOOM_LEVELS].reverse().find((level) => level < base - 0.001);
    if (nextLevel === undefined) return;
    setZoom(nextLevel);
    setMode('zoom');
  }, [mode, fitScale, zoom]);

  const goTo = useCallback((delta) => {
    if (!hasMany) return;
    showImage((index + delta + imageList.length) % imageList.length);
  }, [hasMany, index, imageList.length, showImage]);

  const rotate = (delta) => setRotation((value) => value + delta);

  const handleDelete = () => {
    showError(COPY.deleteError, { title: COPY.appName });
  };

  const handlePrint = () => {
    const printWindow = globalThis.open('', '_blank');
    if (!printWindow) return;
    const doc = printWindow.document;
    doc.title = current.name;
    const img = doc.createElement('img');
    img.src = new URL(current.src, globalThis.location.href).href;
    img.style.maxWidth = '100%';
    img.onload = () => {
      printWindow.focus();
      printWindow.print();
    };
    doc.body.style.margin = '0';
    doc.body.appendChild(img);
  };

  const handleCopyTo = () => {
    const link = document.createElement('a');
    link.href = current.src;
    link.download = current.name.includes('.') ? current.name : getFileName(current.src);
    document.body.appendChild(link);
    link.click();
    link.remove();
  };

  const handleEdit = () => {
    globalThis.open(current.src, '_blank', 'noopener');
  };

  const handleHelp = () => {
    showError(COPY.helpText, { title: COPY.helpTitle, icon: 'info' });
  };

  // Raccourcis clavier de la visionneuse XP
  const handleKeyDown = (event) => {
    if (isSlideshow) return;
    const key = event.key.toLowerCase();
    const ctrl = event.ctrlKey || event.metaKey;

    if (key === 'arrowright' || (key === ' ' && !ctrl)) goTo(1);
    else if (key === 'arrowleft' || key === 'backspace') goTo(-1);
    else if (key === '+' || key === '=') changeZoom(1);
    else if (key === '-') changeZoom(-1);
    else if (ctrl && key === 'b') setMode('fit');
    else if (ctrl && key === 'a') { setZoom(1); setMode('zoom'); }
    else if (ctrl && key === 'k') rotate(90);
    else if (ctrl && key === 'l') rotate(-90);
    else if (ctrl && key === 'p') handlePrint();
    else if (ctrl && key === 's') handleCopyTo();
    else if (ctrl && key === 'e') handleEdit();
    else if (key === 'delete') handleDelete();
    else if (key === 'f11') setIsSlideshow(true);
    else if (key === 'f1') handleHelp();
    else return;
    event.preventDefault();
  };

  // Ctrl + molette : zoom (la molette seule fait défiler)
  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return undefined;
    const handleWheel = (event) => {
      if (!event.ctrlKey) return;
      event.preventDefault();
      changeZoom(event.deltaY < 0 ? 1 : -1);
    };
    stage.addEventListener('wheel', handleWheel, { passive: false });
    return () => stage.removeEventListener('wheel', handleWheel);
  }, [changeZoom]);

  // Déplacement de l'image à la souris quand elle dépasse de la zone
  const handlePanStart = (event) => {
    const stage = stageRef.current;
    if (event.button !== 0 || !stage) return;
    if (stage.scrollWidth <= stage.clientWidth && stage.scrollHeight <= stage.clientHeight) return;
    panState.current = { x: event.clientX, y: event.clientY, left: stage.scrollLeft, top: stage.scrollTop };
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const handlePanMove = (event) => {
    const pan = panState.current;
    const stage = stageRef.current;
    if (!pan || !stage) return;
    stage.scrollLeft = pan.left - (event.clientX - pan.x);
    stage.scrollTop = pan.top - (event.clientY - pan.y);
  };

  const handlePanEnd = () => {
    panState.current = null;
  };

  const displayedWidth = Math.round(rotatedWidth * scale);
  const displayedHeight = Math.round(rotatedHeight * scale);
  const imageWidth = naturalSize ? Math.round(naturalSize.width * scale) : 0;
  const imageHeight = naturalSize ? Math.round(naturalSize.height * scale) : 0;
  const canPan = displayedWidth > stageSize.width - STAGE_PADDING * 2 || displayedHeight > stageSize.height - STAGE_PADDING * 2;

  return (
    <div
      ref={rootRef}
      className="xp-iv"
      tabIndex={0}
      onKeyDown={handleKeyDown}
      onMouseDown={() => rootRef.current?.focus()}
    >
      <div
        ref={stageRef}
        className={`xp-iv-stage ${canPan ? 'can-pan' : ''}`}
        onPointerDown={handlePanStart}
        onPointerMove={handlePanMove}
        onPointerUp={handlePanEnd}
        onPointerCancel={handlePanEnd}
        onDoubleClick={() => setIsSlideshow(true)}
      >
        <div className="xp-iv-canvas">
          {hasError ? (
            <p className="xp-iv-error">{t(COPY.loadError, currentLanguage)}</p>
          ) : (
            <div
              className="xp-iv-frame"
              style={naturalSize ? { width: displayedWidth, height: displayedHeight } : { visibility: 'hidden' }}
            >
              <img
                key={current.src}
                src={current.src}
                alt={current.name || t(COPY.image, currentLanguage)}
                draggable={false}
                onLoad={(event) => setNaturalSize({
                  width: event.currentTarget.naturalWidth,
                  height: event.currentTarget.naturalHeight,
                })}
                onError={() => setHasError(true)}
                style={{
                  width: imageWidth || undefined,
                  height: imageHeight || undefined,
                  left: (displayedWidth - imageWidth) / 2,
                  top: (displayedHeight - imageHeight) / 2,
                  transform: `rotate(${rotation}deg)`,
                }}
              />
            </div>
          )}
        </div>
      </div>

      <div className="xp-iv-toolbar" role="toolbar">
        <ToolbarButton title={t(COPY.previous, currentLanguage)} onClick={() => goTo(-1)} disabled={!hasMany}>
          <PrevIcon />
        </ToolbarButton>
        <ToolbarButton title={t(COPY.next, currentLanguage)} onClick={() => goTo(1)} disabled={!hasMany}>
          <NextIcon />
        </ToolbarButton>
        <span className="xp-iv-separator" />
        <ToolbarButton title={t(COPY.bestFit, currentLanguage)} onClick={() => setMode('fit')} active={mode === 'fit'}>
          <BestFitIcon />
        </ToolbarButton>
        <ToolbarButton
          title={t(COPY.actualSize, currentLanguage)}
          onClick={() => { setZoom(1); setMode('zoom'); }}
          active={mode === 'zoom' && zoom === 1}
        >
          <ActualSizeIcon />
        </ToolbarButton>
        <ToolbarButton title={t(COPY.slideshow, currentLanguage)} onClick={() => setIsSlideshow(true)}>
          <SlideshowIcon />
        </ToolbarButton>
        <span className="xp-iv-separator" />
        <ToolbarButton title={t(COPY.zoomIn, currentLanguage)} onClick={() => changeZoom(1)}>
          <ZoomInIcon />
        </ToolbarButton>
        <ToolbarButton title={t(COPY.zoomOut, currentLanguage)} onClick={() => changeZoom(-1)}>
          <ZoomOutIcon />
        </ToolbarButton>
        <span className="xp-iv-separator" />
        <ToolbarButton title={t(COPY.rotateClockwise, currentLanguage)} onClick={() => rotate(90)}>
          <RotateClockwiseIcon />
        </ToolbarButton>
        <ToolbarButton title={t(COPY.rotateCounterClockwise, currentLanguage)} onClick={() => rotate(-90)}>
          <RotateCounterClockwiseIcon />
        </ToolbarButton>
        <span className="xp-iv-separator" />
        <ToolbarButton title={t(COPY.delete, currentLanguage)} onClick={handleDelete}>
          <DeleteIcon />
        </ToolbarButton>
        <ToolbarButton title={t(COPY.print, currentLanguage)} onClick={handlePrint}>
          <PrintIcon />
        </ToolbarButton>
        <ToolbarButton title={t(COPY.copyTo, currentLanguage)} onClick={handleCopyTo}>
          <CopyToIcon />
        </ToolbarButton>
        <ToolbarButton title={t(COPY.edit, currentLanguage)} onClick={handleEdit}>
          <EditIcon />
        </ToolbarButton>
        <span className="xp-iv-separator" />
        <ToolbarButton title={t(COPY.help, currentLanguage)} onClick={handleHelp}>
          <HelpIcon />
        </ToolbarButton>
      </div>

      {isSlideshow && (
        <Slideshow
          images={imageList}
          index={index}
          onIndexChange={showImage}
          onClose={() => {
            setIsSlideshow(false);
            rootRef.current?.focus();
          }}
          currentLanguage={currentLanguage}
        />
      )}
    </div>
  );
};
