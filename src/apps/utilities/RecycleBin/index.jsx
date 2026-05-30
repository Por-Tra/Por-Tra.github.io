import { useEffect, useState } from 'react';
import XpMenuBar from '../../../components/XpMenuBar';
import recycleBin from '../../../core/recycleBin';

export const config = {
  id: 'trash',
  name: 'Corbeille',
  icon: '/icons/trash.webp',
  defaultWidth: 420,
  defaultHeight: 360,
  showInStartMenu: false,
};

export const Component = () => {
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
    if (!confirm('Vider la corbeille ?')) return;
    recycleBin.clear();
  };

  return (
    <div className="h-full bg-white flex flex-col">
      <XpMenuBar
        className="bg-gradient-to-b from-[#ece9d8] to-[#d4d0c8] border-b border-[#808080] px-2 py-1 flex gap-4 text-xs"
        itemClassName="text-gray-600 hover:underline cursor-pointer"
      />

      <div className="bg-[#ece9d8] border-b border-[#808080] px-2 py-1 flex items-center justify-between text-xs">
        <span>Corbeille</span>
        <button
          onClick={handleEmpty}
          disabled={items.length === 0}
          className="xp-button px-2 py-0.5 text-[11px] disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Vider la corbeille
        </button>
      </div>

      <div className="flex-1 overflow-auto p-2">
        {items.length === 0 ? (
          <div className="text-sm text-gray-500">La corbeille est vide.</div>
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
                  Restaurer
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="bg-[#ece9d8] border-t border-[#808080] px-2 py-1 text-[10px] text-gray-600 flex justify-between">
        <span>Pret</span>
        <span>{items.length} element(s)</span>
      </div>
    </div>
  );
};
