import { useEffect, useMemo, useRef, useState } from 'react';
import { t } from '../i18n/text';

const MENU_KEY_ALIASES = {
  Fichier: 'file',
  'Édition': 'edit',
  Edition: 'edit',
  Affichage: 'view',
  Favoris: 'favorites',
  Outils: 'tools',
  Aide: 'help',
};

const MENU_LABELS = {
  file: { FR: 'Fichier', EN: 'File', ES: 'Archivo' },
  edit: { FR: 'Édition', EN: 'Edit', ES: 'Edicion' },
  view: { FR: 'Affichage', EN: 'View', ES: 'Ver'},
  favorites: { FR: 'Favoris', EN: 'Favorites', ES: 'Favoritos' },
  tools: { FR: 'Outils', EN: 'Tools', ES: 'Herramientas' },
  help: { FR: 'Aide', EN: 'Help', ES: 'Ayuda' },
};

const MENU_PRESETS = {
  basic: ['file', 'edit', 'view', 'help'],
  explorer: ['file', 'edit', 'view', 'favorites', 'tools', 'help'],
};

const DEFAULT_MENUS = {
  file: [
    { label: { FR: 'Nouveau', EN: 'New', ES: 'Nuevo' }, action: 'file.new' },
    { label: { FR: 'Ouvrir', EN: 'Open', ES: 'Abrir' }, action: 'file.open' },
    { label: { FR: 'Imprimer', EN: 'Print', ES: 'Imprimir' }, action: 'file.print' },
    { divider: true },
    { label: { FR: 'Fermer', EN: 'Close', ES: 'Cerrar' }, action: 'file.close' },
    { label: { FR: 'Quitter', EN: 'Quit', ES: 'Salir' }, action: 'file.quit' },
  ],
  edit: [
    { label: { FR: 'Annuler', EN: 'Undo', ES: 'Deshacer' }, action: 'edit.undo' },
    { divider: true },
    { label: { FR: 'Couper', EN: 'Cut', ES: 'Cortar' }, action: 'edit.cut' },
    { label: { FR: 'Copier', EN: 'Copy', ES: 'Copiar' }, action: 'edit.copy' },
    { label: { FR: 'Coller', EN: 'Paste', ES: 'Pegar' }, action: 'edit.paste' },
    { divider: true },
    { label: { FR: 'Sélectionner tout', EN: 'Select all', ES: 'Seleccionar todo' }, action: 'edit.selectAll' },
    { label: { FR: 'Rechercher', EN: 'Search', ES: 'Buscar' }, action: 'edit.search' },
    { label: { FR: 'Préférences', EN: 'Preferences', ES: 'Preferencias' }, action: 'edit.preferences' },
  ],
  view: [
    { label: { FR: 'Actualiser', EN: 'Refresh', ES: 'Actualizar' }, action: 'view.refresh' },
    { divider: true },
    { label: { FR: 'Mode icônes', EN: 'Icons view', ES: 'Vista de iconos' }, action: 'view.mode.icons' },
    { label: { FR: 'Mode liste', EN: 'List view', ES: 'Vista de lista' }, action: 'view.mode.list' },
    { label: { FR: 'Mode détails', EN: 'Details view', ES: 'Vista de detalles' }, action: 'view.mode.details' },
    { divider: true },
    { label: { FR: 'Plein écran', EN: 'Full screen', ES: 'Pantalla completa' }, action: 'view.fullscreen' },
    { label: { FR: "Barre d'outils", EN: 'Toolbar', ES: 'Barra de herramientas' }, action: 'view.toolbar' },
    { label: { FR: 'Thèmes', EN: 'Themes', ES: 'Temas' }, action: 'view.themes' },
    { divider: true },
    { label: { FR: 'Trier par nom', EN: 'Sort by name', ES: 'Ordenar por nombre' }, action: 'view.sort.name' },
    { label: { FR: 'Trier par date', EN: 'Sort by date', ES: 'Ordenar por fecha' }, action: 'view.sort.date' },
    { label: { FR: 'Trier par compétence', EN: 'Sort by skill', ES: 'Ordenar por habilidad' }, action: 'view.sort.skill' },
  ],
  favorites: [
    { label: { FR: 'Ajouter aux favoris', EN: 'Add to favorites', ES: 'Anadir a favoritos' }, action: 'favorites.add' },
    { label: { FR: 'Organiser les favoris', EN: 'Organize favorites', ES: 'Organizar favoritos' }, action: 'favorites.organize' },
  ],
  tools: [
    { label: { FR: 'Options des dossiers', EN: 'Folder options', ES: 'Opciones de carpeta' }, action: 'tools.folderOptions' },
    { label: { FR: 'Synchroniser', EN: 'Sync', ES: 'Sincronizar' }, action: 'tools.sync' },
  ],
  help: [
    { label: { FR: 'Aide', EN: 'Help', ES: 'Ayuda' }, action: 'help.tutorial' },
    { label: { FR: 'À propos', EN: 'About', ES: 'Acerca de' }, action: 'help.about' },
    { label: { FR: 'Contact', EN: 'Contact', ES: 'Contacto' }, action: 'help.contact' },
    { label: { FR: 'Crédits', EN: 'Credits', ES: 'Creditos' }, action: 'help.credits' },
    { label: { FR: 'Mettre à jour', EN: 'Update', ES: 'Actualizar' }, action: 'help.update' },
    { label: { FR: 'Mode debug', EN: 'Debug mode', ES: 'Modo debug' }, action: 'help.debug' },
  ],
};

const COPY = {
  fileNew: {
    FR: 'Nouveau dossier / projet fictif.',
    EN: 'New folder / demo project.',
    ES: 'Nueva carpeta / proyecto de demo.',
  },
  fileOpen: {
    FR: 'Ouvrir un projet selectionne.',
    EN: 'Open a selected project.',
    ES: 'Abrir un proyecto seleccionado.',
  },
  copyLinkOk: {
    FR: 'Lien copie dans le presse-papiers.',
    EN: 'Link copied to clipboard.',
    ES: 'Enlace copiado al portapapeles.',
  },
  copyLinkFail: {
    FR: 'Impossible de copier le lien.',
    EN: 'Unable to copy the link.',
    ES: 'No se pudo copiar el enlace.',
  },
  helpTitle: { FR: 'Aide', EN: 'Help', ES: 'Ayuda', DE: 'Hilfe' },
  helpBody: {
    FR: 'Clique sur les icones pour ouvrir les applications. Utilise la barre de menu pour les actions rapides.',
    EN: 'Click icons to open apps. Use the menu bar for quick actions.',
    ES: 'Haz clic en los iconos para abrir apps. Usa la barra de menu para acciones rapidas.',
  },
  aboutTitle: { FR: 'A propos', EN: 'About', ES: 'Acerca de', DE: 'Info' },
  aboutBody: {
    FR: 'Portfolio Windows XP Edition. Menu Aide pour les fonctions rapides.',
    EN: 'Windows XP portfolio edition. Help menu for quick actions.',
    ES: 'Edicion portfolio Windows XP. Menu de ayuda para acciones rapidas.',
  },
  contactTitle: { FR: 'Contact', EN: 'Contact', ES: 'Contacto', DE: 'Kontakt' },
  contactBody: {
    FR: 'Ouvre le formulaire de contact via le menu Demarrer ou l application Contact.',
    EN: 'Open the contact form from the Start menu or the Contact app.',
    ES: 'Abre el formulario desde el menu Inicio o la app Contacto.',
  },
  creditsTitle: { FR: 'Credits', EN: 'Credits', ES: 'Creditos', DE: 'Credits' },
  creditsBody: {
    FR: 'Inspirations: Windows XP. Tools: Vite, React, GitHub Pages.',
    EN: 'Inspiration: Windows XP. Tools: Vite, React, GitHub Pages.',
    ES: 'Inspiracion: Windows XP. Tools: Vite, React, GitHub Pages.',
  },
  updateTitle: { FR: 'Mettre a jour', EN: 'Update', ES: 'Actualizar', DE: 'Aktualisieren' },
  updateBody: {
    FR: 'Aucune mise a jour critique. Changelog: plus de pixels, moins de bugs.',
    EN: 'No critical updates. Changelog: more pixels, fewer bugs.',
    ES: 'Sin actualizaciones criticas. Cambios: mas pixeles, menos bugs.',
  },
  debugTitle: { FR: 'Mode debug', EN: 'Debug mode', ES: 'Modo debug', DE: 'Debug-Modus' },
  debugBody: {
    FR: 'Mode debug active.',
    EN: 'Debug mode enabled.',
    ES: 'Modo debug activado.',
  },
  ok: { FR: 'OK', EN: 'OK', ES: 'OK', DE: 'OK' },
};

const resolveItems = ({ preset, items }) => {
  if (Array.isArray(items) && items.length > 0) {
    return items;
  }

  return MENU_PRESETS[preset] || MENU_PRESETS.basic;
};

const XpMenuBar = ({
  preset = 'basic',
  items,
  menus,
  onAction,
  className = 'xp-menubar',
  itemClassName = 'xp-menubar-item',
  itemsWrapperClassName = '',
  useWrapper = false,
  rightSlot = null,
  currentLanguage = 'FR',
}) => {
  const [openMenu, setOpenMenu] = useState(null);
  const [modal, setModal] = useState(null);
  const barRef = useRef(null);
  const resolvedItems = resolveItems({ preset, items });

  const menuDefinitions = useMemo(() => {
    if (menus && Object.keys(menus).length > 0) {
      return menus;
    }
    return DEFAULT_MENUS;
  }, [menus]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (barRef.current && !barRef.current.contains(event.target)) {
        setOpenMenu(null);
      }
    };

    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        setOpenMenu(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, []);

  const dispatchMenuEvent = (action) => {
    window.dispatchEvent(new CustomEvent('xp-menu-action', { detail: { action } }));
  };

  const openModal = (title, body) => {
    setModal({ title, body });
  };

  const defaultHandlers = {
    'file.new': () => window.alert(t(COPY.fileNew, currentLanguage)),
    'file.open': () => window.alert(t(COPY.fileOpen, currentLanguage)),
    'file.print': () => window.print(),
    'file.close': () => dispatchMenuEvent('file.close'),
    'file.quit': () => dispatchMenuEvent('file.quit'),
    'edit.undo': () => dispatchMenuEvent('edit.undo'),
    'edit.cut': () => dispatchMenuEvent('edit.cut'),
    'edit.copy': async () => {
      try {
        await navigator.clipboard.writeText(window.location.href);
        window.alert(t(COPY.copyLinkOk, currentLanguage));
      } catch (error) {
        window.alert(t(COPY.copyLinkFail, currentLanguage));
      }
    },
    'edit.paste': () => dispatchMenuEvent('edit.paste'),
    'edit.selectAll': () => dispatchMenuEvent('edit.selectAll'),
    'edit.search': () => dispatchMenuEvent('edit.search'),
    'edit.preferences': () => dispatchMenuEvent('edit.preferences'),
    'view.refresh': () => window.location.reload(),
    'view.mode.icons': () => dispatchMenuEvent('view.mode.icons'),
    'view.mode.list': () => dispatchMenuEvent('view.mode.list'),
    'view.mode.details': () => dispatchMenuEvent('view.mode.details'),
    'view.fullscreen': () => dispatchMenuEvent('view.fullscreen'),
    'view.toolbar': () => dispatchMenuEvent('view.toolbar'),
    'view.themes': () => dispatchMenuEvent('view.themes'),
    'view.sort.name': () => dispatchMenuEvent('view.sort.name'),
    'view.sort.date': () => dispatchMenuEvent('view.sort.date'),
    'view.sort.skill': () => dispatchMenuEvent('view.sort.skill'),
    'favorites.add': () => dispatchMenuEvent('favorites.add'),
    'favorites.organize': () => dispatchMenuEvent('favorites.organize'),
    'tools.folderOptions': () => dispatchMenuEvent('tools.folderOptions'),
    'tools.sync': () => dispatchMenuEvent('tools.sync'),
    'help.tutorial': () => openModal(
      t(COPY.helpTitle, currentLanguage),
      t(COPY.helpBody, currentLanguage)
    ),
    'help.about': () => openModal(
      t(COPY.aboutTitle, currentLanguage),
      t(COPY.aboutBody, currentLanguage)
    ),
    'help.contact': () => openModal(
      t(COPY.contactTitle, currentLanguage),
      t(COPY.contactBody, currentLanguage)
    ),
    'help.credits': () => openModal(
      t(COPY.creditsTitle, currentLanguage),
      t(COPY.creditsBody, currentLanguage)
    ),
    'help.update': () => openModal(
      t(COPY.updateTitle, currentLanguage),
      t(COPY.updateBody, currentLanguage)
    ),
    'help.debug': () => openModal(
      t(COPY.debugTitle, currentLanguage),
      t(COPY.debugBody, currentLanguage)
    ),
  };

  const handleAction = async (action, item) => {
    if (!action) {
      return;
    }

    const handled = await onAction?.(action, item);
    if (handled) {
      setOpenMenu(null);
      return;
    }

    const handler = defaultHandlers[action];
    if (handler) {
      await handler();
    }
    setOpenMenu(null);
  };

  const itemNodes = resolvedItems.map((label) => {
    const menuKey = MENU_KEY_ALIASES[label] ?? label;
    const menuItems = menuDefinitions[menuKey] || menuDefinitions[label];
    const hasMenu = Array.isArray(menuItems) && menuItems.length > 0;
    const isOpen = openMenu === menuKey;
    const displayLabel = t(MENU_LABELS[menuKey] ?? label, currentLanguage);

    return (
      <div key={menuKey} className="xp-menu">
        <button
          type="button"
          className={`xp-menu-button ${itemClassName || ''}`.trim()}
          onClick={() => {
            if (!hasMenu) {
              return;
            }
            setOpenMenu(isOpen ? null : menuKey);
          }}
        >
          {displayLabel}
        </button>
        {hasMenu && isOpen && (
          <div className="xp-menu-dropdown">
            {menuItems.map((item, index) => {
              if (item.divider) {
                return <div key={`divider-${menuKey}-${index}`} className="xp-menu-separator" />;
              }
              return (
                <button
                  key={`${menuKey}-${index}-${item.action || item.label}`}
                  type="button"
                  className="xp-menu-item"
                  onClick={() => handleAction(item.action, item)}
                >
                  <span>{t(item.label, currentLanguage)}</span>
                  {item.shortcut && <span className="xp-menu-shortcut">{item.shortcut}</span>}
                </button>
              );
            })}
          </div>
        )}
      </div>
    );
  });

  return (
    <div className={className} ref={barRef}>
      {useWrapper ? (
        <div className={itemsWrapperClassName}>{itemNodes}</div>
      ) : (
        itemNodes
      )}
      {rightSlot}
      {modal && (
        <div className="xp-menu-modal">
          <div className="xp-menu-modal-backdrop" onClick={() => setModal(null)} />
          <div className="xp-menu-modal-card">
            <div className="xp-menu-modal-header">
              <span>{modal.title}</span>
              <button type="button" onClick={() => setModal(null)}>
                ✕
              </button>
            </div>
            <div className="xp-menu-modal-body">
              <p>{modal.body}</p>
            </div>
            <div className="xp-menu-modal-footer">
              <button type="button" className="xp-button" onClick={() => setModal(null)}>
                {t(COPY.ok, currentLanguage)}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default XpMenuBar;
export { MENU_PRESETS };
