import { useEffect, useState } from 'react';
import XpMenuBar from '../../../components/XpMenuBar';
import recycleBin from '../../../core/recycleBin';
import { t } from '../../../i18n/text';

export const config = {
  id: 'trash',
  name: 'Corbeille',
  icon: '/icons/trash.webp',
  defaultWidth: 420,
  defaultHeight: 360,
  showInStartMenu: false,
};

const COPY = {
  title: { FR: 'Corbeille', EN: 'Recycle Bin', ES: 'Papelera' },
  confirmEmpty: { FR: 'Vider la corbeille ?', EN: 'Empty the Recycle Bin?', ES: '¿Vaciar la papelera?' },
  empty: { FR: 'Vider la corbeille', EN: 'Empty Recycle Bin', ES: 'Vaciar la papelera' },
  isEmpty: { FR: 'La corbeille est vide.', EN: 'The Recycle Bin is empty.', ES: 'La papelera está vacía.' },
  restore: { FR: 'Restaurer', EN: 'Restore', ES: 'Restaurar' },
  ready: { FR: 'Prêt', EN: 'Ready', ES: 'Listo' },
  items: { FR: 'élément(s)', EN: 'item(s)', ES: 'elemento(s)' },
};

export const Component = ({ currentLanguage }) => {
  const [items, setItems] = useState(() => recycleBin.getItems());

  useEffect(() => {
    const handleUpdate = () => {
      setItems(recycleBin.getItems());
    };

    window.addEventListener('xp-recycle-bin-update', handleUpdate);
    return () => window.removeEventListener('xp-recycle-bin-update', handleUpdate);
  }, []);

  const handleRestore = (itemId) => {
    recycleBin.removeItem(itemId, { reason: 'restore' });
  };

  const handleEmpty = () => {
    if (items.length === 0) return;
    if (!confirm(t(COPY.confirmEmpty, currentLanguage))) return;
    recycleBin.clear();
  };

  return (
    <div className="h-full bg-white flex flex-col">
      <XpMenuBar
        currentLanguage={currentLanguage}
      />

      <div className="xp-toolbar justify-between">
        <span>{t(COPY.title, currentLanguage)}</span>
        <button
          onClick={handleEmpty}
          disabled={items.length === 0}
          className="xp-button px-2 py-0.5 text-[11px] disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {t(COPY.empty, currentLanguage)}
        </button>
      </div>

      <div className="flex-1 overflow-auto p-2">
        {items.length === 0 ? (
          <div className="text-sm text-gray-500">{t(COPY.isEmpty, currentLanguage)}</div>
        ) : (
          <div className="flex flex-col gap-1">
            {items.map(item => (
              <div
                key={item.id}
                className="flex items-center justify-between gap-2 px-2 py-1 rounded hover:bg-[#e8f4fc]"
              >
                <div className="flex items-center gap-2 min-w-0">
                  <img src={item.icon} alt="" className="w-5 h-5" draggable={false} />
                  <span className="text-xs truncate">{item.name}</span>
                </div>
                <button
                  onClick={() => handleRestore(item.id)}
                  className="xp-button px-2 py-0.5 text-[11px]"
                >
                  {t(COPY.restore, currentLanguage)}
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="xp-statusbar">
        <span>{t(COPY.ready, currentLanguage)}</span>
        <span>{items.length} {t(COPY.items, currentLanguage)}</span>
      </div>
    </div>
  );
};
