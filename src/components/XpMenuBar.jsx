import { useEffect, useMemo, useRef, useState } from 'react';

const MENU_PRESETS = {
  basic: ['Fichier', 'Édition', 'Affichage', 'Aide'],
  explorer: ['Fichier', 'Édition', 'Affichage', 'Favoris', 'Outils', 'Aide'],
};

const DEFAULT_MENUS = {
  Fichier: [
    { label: 'Nouveau', action: 'file.new' },
    { label: 'Ouvrir', action: 'file.open' },
    { label: 'Imprimer', action: 'file.print' },
    { divider: true },
    { label: 'Fermer', action: 'file.close' },
    { label: 'Quitter', action: 'file.quit' },
  ],
  'Édition': [
    { label: 'Annuler', action: 'edit.undo' },
    { divider: true },
    { label: 'Couper', action: 'edit.cut' },
    { label: 'Copier', action: 'edit.copy' },
    { label: 'Coller', action: 'edit.paste' },
    { divider: true },
    { label: 'Sélectionner tout', action: 'edit.selectAll' },
    { label: 'Rechercher', action: 'edit.search' },
    { label: 'Préférences', action: 'edit.preferences' },
  ],
  Edition: [
    { label: 'Annuler', action: 'edit.undo' },
    { divider: true },
    { label: 'Couper', action: 'edit.cut' },
    { label: 'Copier', action: 'edit.copy' },
    { label: 'Coller', action: 'edit.paste' },
    { divider: true },
    { label: 'Sélectionner tout', action: 'edit.selectAll' },
    { label: 'Rechercher', action: 'edit.search' },
    { label: 'Préférences', action: 'edit.preferences' },
  ],
  Affichage: [
    { label: 'Actualiser', action: 'view.refresh' },
    { divider: true },
    { label: 'Mode icônes', action: 'view.mode.icons' },
    { label: 'Mode liste', action: 'view.mode.list' },
    { label: 'Mode détails', action: 'view.mode.details' },
    { divider: true },
    { label: 'Plein écran', action: 'view.fullscreen' },
    { label: "Barre d'outils", action: 'view.toolbar' },
    { label: 'Thèmes', action: 'view.themes' },
    { divider: true },
    { label: 'Trier par nom', action: 'view.sort.name' },
    { label: 'Trier par date', action: 'view.sort.date' },
    { label: 'Trier par compétence', action: 'view.sort.skill' },
  ],
  Favoris: [
    { label: 'Ajouter aux favoris', action: 'favorites.add' },
    { label: 'Organiser les favoris', action: 'favorites.organize' },
  ],
  Outils: [
    { label: 'Options des dossiers', action: 'tools.folderOptions' },
    { label: 'Synchroniser', action: 'tools.sync' },
  ],
  Aide: [
    { label: 'Aide', action: 'help.tutorial' },
    { label: 'À propos', action: 'help.about' },
    { label: 'Contact', action: 'help.contact' },
    { label: 'Crédits', action: 'help.credits' },
    { label: 'Mettre à jour', action: 'help.update' },
    { label: 'Mode debug', action: 'help.debug' },
  ],
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
    'file.new': () => window.alert('Nouveau dossier / projet fictif.'),
    'file.open': () => window.alert('Ouvrir un projet selectionne.'),
    'file.print': () => window.print(),
    'file.close': () => dispatchMenuEvent('file.close'),
    'file.quit': () => dispatchMenuEvent('file.quit'),
    'edit.undo': () => dispatchMenuEvent('edit.undo'),
    'edit.cut': () => dispatchMenuEvent('edit.cut'),
    'edit.copy': async () => {
      try {
        await navigator.clipboard.writeText(window.location.href);
        window.alert('Lien copie dans le presse-papiers.');
      } catch (error) {
        window.alert('Impossible de copier le lien.');
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
      'Aide',
      'Clique sur les icones pour ouvrir les applications. Utilise la barre de menu pour les actions rapides.'
    ),
    'help.about': () => openModal(
      'A propos',
      'Portfolio Windows XP Edition. Menu Aide pour les fonctions rapides.'
    ),
    'help.contact': () => openModal(
      'Contact',
      'Ouvre le formulaire de contact via le menu Demarrer ou l application Contact.'
    ),
    'help.credits': () => openModal(
      'Credits',
      'Inspirations: Windows XP. Tools: Vite, React, GitHub Pages.'
    ),
    'help.update': () => openModal(
      'Mettre a jour',
      'Aucune mise a jour critique. Changelog: plus de pixels, moins de bugs.'
    ),
    'help.debug': () => openModal(
      'Mode debug',
      'Mode debug active.'
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
    const menuItems = menuDefinitions[label];
    const hasMenu = Array.isArray(menuItems) && menuItems.length > 0;
    const isOpen = openMenu === label;

    return (
      <div key={label} className="xp-menu">
        <button
          type="button"
          className={`xp-menu-button ${itemClassName || ''}`.trim()}
          onClick={() => {
            if (!hasMenu) {
              return;
            }
            setOpenMenu(isOpen ? null : label);
          }}
        >
          {label}
        </button>
        {hasMenu && isOpen && (
          <div className="xp-menu-dropdown">
            {menuItems.map((item, index) => {
              if (item.divider) {
                return <div key={`divider-${label}-${index}`} className="xp-menu-separator" />;
              }
              return (
                <button
                  key={`${label}-${item.label}`}
                  type="button"
                  className="xp-menu-item"
                  onClick={() => handleAction(item.action, item)}
                >
                  <span>{item.label}</span>
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
                OK
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
