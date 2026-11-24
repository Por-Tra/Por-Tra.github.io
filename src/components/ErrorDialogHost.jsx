/**
 * Affiche les boîtes d'erreur demandées via showError() (voir core/errorDialog.js)
 */
import { useCallback, useEffect, useRef, useState } from 'react';
import { ERROR_DIALOG_EVENT } from '../core/errorDialog';
import { t } from '../i18n/text';

const DIALOG_WIDTH = 340;
const STACK_OFFSET = 24;

const COPY = {
  title: { FR: 'Erreur', EN: 'Error', ES: 'Error' },
  ok: { FR: 'OK', EN: 'OK', ES: 'Aceptar' },
  close: { FR: 'Fermer', EN: 'Close', ES: 'Cerrar' },
};

const ErrorDialog = ({ dialog, isTop, currentLanguage, onClose, onMove }) => {
  const buttonRef = useRef(null);

  // Le bouton a le focus, comme dans XP : Entrée ou Espace ferment la boîte
  useEffect(() => {
    if (isTop) buttonRef.current?.focus();
  }, [isTop]);

  const handleTitlePointerDown = (event) => {
    if (event.button !== 0 || event.target.closest('button')) return;
    const offsetX = event.clientX - dialog.x;
    const offsetY = event.clientY - dialog.y;

    const handleMove = (moveEvent) => {
      onMove(dialog.id, moveEvent.clientX - offsetX, moveEvent.clientY - offsetY);
    };
    const handleUp = () => {
      globalThis.removeEventListener('pointermove', handleMove);
      globalThis.removeEventListener('pointerup', handleUp);
    };
    globalThis.addEventListener('pointermove', handleMove);
    globalThis.addEventListener('pointerup', handleUp);
  };

  return (
    <div
      className={`xp-window xp-error-dialog ${isTop ? '' : 'xp-window-inactive'}`}
      style={{ left: dialog.x, top: dialog.y, width: DIALOG_WIDTH }}
      role="alertdialog"
      aria-modal="true"
      aria-label={t(dialog.title ?? COPY.title, currentLanguage)}
    >
      <div className={isTop ? 'xp-titlebar' : 'xp-titlebar-inactive'} onPointerDown={handleTitlePointerDown}>
        <span className="xp-titlebar-text">{t(dialog.title ?? COPY.title, currentLanguage)}</span>
        <div className="window-controls">
          <button
            type="button"
            className="xp-control-btn xp-close-btn"
            title={t(COPY.close, currentLanguage)}
            aria-label={t(COPY.close, currentLanguage)}
            onClick={() => onClose(dialog.id)}
          />
        </div>
      </div>

      <div className="xp-error-dialog-body">
        <div className="xp-error-dialog-content">
          <span className={`xp-error-icon ${dialog.icon === 'info' ? 'xp-error-icon--info' : ''}`} aria-hidden="true" />
          <p className="xp-error-dialog-message">{t(dialog.message, currentLanguage)}</p>
        </div>
        <div className="xp-error-dialog-actions">
          <button ref={buttonRef} type="button" className="xp-button" onClick={() => onClose(dialog.id)}>
            {t(dialog.buttonLabel ?? COPY.ok, currentLanguage)}
          </button>
        </div>
      </div>
    </div>
  );
};

const ErrorDialogHost = ({ currentLanguage = 'FR' }) => {
  const [dialogs, setDialogs] = useState([]);
  const nextId = useRef(1);

  useEffect(() => {
    const handleShowError = (event) => {
      const id = nextId.current;
      nextId.current += 1;

      setDialogs((prev) => {
        // Centrée à l'écran, chaque nouvelle boîte légèrement décalée pour rester visible
        const offset = (prev.length % 6) * STACK_OFFSET;
        const x = Math.max(0, (globalThis.innerWidth - DIALOG_WIDTH) / 2 + offset);
        const y = Math.max(0, globalThis.innerHeight / 2 - 110 + offset);
        return [...prev, { id, x, y, ...event.detail }];
      });
    };

    globalThis.addEventListener(ERROR_DIALOG_EVENT, handleShowError);
    return () => globalThis.removeEventListener(ERROR_DIALOG_EVENT, handleShowError);
  }, []);

  const closeDialog = useCallback((id) => {
    dialogs.find((dialog) => dialog.id === id)?.onClose?.();
    setDialogs((prev) => prev.filter((dialog) => dialog.id !== id));
  }, [dialogs]);

  const moveDialog = useCallback((id, x, y) => {
    setDialogs((prev) => prev.map((dialog) => (dialog.id === id ? { ...dialog, x, y } : dialog)));
  }, []);

  // Échap ferme la boîte au premier plan
  useEffect(() => {
    if (dialogs.length === 0) return undefined;
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') closeDialog(dialogs[dialogs.length - 1].id);
    };
    globalThis.addEventListener('keydown', handleKeyDown);
    return () => globalThis.removeEventListener('keydown', handleKeyDown);
  }, [dialogs, closeDialog]);

  return dialogs.map((dialog, index) => (
    <ErrorDialog
      key={dialog.id}
      dialog={dialog}
      isTop={index === dialogs.length - 1}
      currentLanguage={currentLanguage}
      onClose={closeDialog}
      onMove={moveDialog}
    />
  ));
};

export default ErrorDialogHost;
