const STORAGE_KEY = 'xp-recycle-bin-v1';

const readItems = () => {
  try {
    const raw = globalThis.localStorage?.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    return [];
  }
};

const writeItems = (items, detail) => {
  try {
    globalThis.localStorage?.setItem(STORAGE_KEY, JSON.stringify(items));
  } catch (error) {
    // no-op
  }

  if (typeof globalThis.dispatchEvent === 'function') {
    globalThis.dispatchEvent(
      new CustomEvent('xp-recycle-bin-update', { detail })
    );
  }
};

const normalizeItem = (item) => {
  if (!item?.id) return null;
  const fallbackName = item.name || item.id;
  return {
    id: item.id,
    name: fallbackName,
    icon: item.icon || '/icons/folder.webp',
    trashedAt: item.trashedAt || new Date().toISOString(),
    restorePosition: item.restorePosition || null,
  };
};

const getItems = () => readItems();

const getTrashedIds = () => {
  return new Set(readItems().map(item => item.id));
};

const addItem = (item) => {
  const normalized = normalizeItem(item);
  if (!normalized) return null;

  const items = readItems();
  const index = items.findIndex(entry => entry.id === normalized.id);

  if (index >= 0) {
    items[index] = { ...items[index], ...normalized };
  } else {
    items.push(normalized);
  }

  writeItems(items, { action: 'add', item: normalized });
  return normalized;
};

const removeItem = (id, options = {}) => {
  if (!id) return null;
  const items = readItems();
  const index = items.findIndex(entry => entry.id === id);
  if (index === -1) return null;

  const [removed] = items.splice(index, 1);
  writeItems(items, { action: 'remove', item: removed, reason: options.reason || 'remove' });

  if (options.reason === 'restore' && typeof globalThis.dispatchEvent === 'function') {
    globalThis.dispatchEvent(
      new CustomEvent('xp-recycle-bin-restore', { detail: { item: removed } })
    );
  }

  return removed;
};

const clear = () => {
  writeItems([], { action: 'clear' });

  if (typeof globalThis.dispatchEvent === 'function') {
    globalThis.dispatchEvent(new CustomEvent('xp-recycle-bin-clear'));
  }
};

const recycleBin = {
  getItems,
  getTrashedIds,
  addItem,
  removeItem,
  clear,
};

export default recycleBin;
