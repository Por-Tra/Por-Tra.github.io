const MENU_PRESETS = {
  basic: ['Fichier', 'Édition', 'Affichage', 'Aide'],
  explorer: ['Fichier', 'Édition', 'Affichage', 'Favoris', 'Outils', 'Aide'],
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
  className = 'xp-menubar',
  itemClassName = 'xp-menubar-item',
  itemsWrapperClassName = '',
  useWrapper = false,
  rightSlot = null,
}) => {
  const resolvedItems = resolveItems({ preset, items });
  const itemNodes = resolvedItems.map((label) => (
    <span key={label} className={itemClassName || undefined}>
      {label}
    </span>
  ));

  return (
    <div className={className}>
      {useWrapper ? (
        <div className={itemsWrapperClassName}>{itemNodes}</div>
      ) : (
        itemNodes
      )}
      {rightSlot}
    </div>
  );
};

export default XpMenuBar;
export { MENU_PRESETS };
