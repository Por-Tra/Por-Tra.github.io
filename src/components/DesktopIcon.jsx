import { useRef, useCallback, useEffect } from 'react';
import { getAppLabel } from '../i18n/text';

const DesktopIcon = ({
  app,
  currentLanguage = 'FR',
  isSelected,
  isDropTarget,
  onSelect,
  onDoubleClick,
  onDragMove,
  onDragEnd,
}) => {
  const iconRef = useRef(null);
  const isDragging = useRef(false);
  const hasMoved = useRef(false);
  const dragOffset = useRef({ x: 0, y: 0 });
  const lastPosition = useRef({ x: app.x, y: app.y });
  const label = getAppLabel(app.id, app.name, currentLanguage);

  const handleMouseDown = useCallback((e) => {
    if (e.button !== 0) return;
    e.preventDefault();
    e.stopPropagation();
    onSelect(app.id, e);
    
    isDragging.current = true;
    hasMoved.current = false;
    lastPosition.current = { x: app.x, y: app.y };
    dragOffset.current = {
      x: e.clientX - app.x,
      y: e.clientY - app.y,
    };
  }, [app.id, app.x, app.y, onSelect]);

  const handleDoubleClick = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    onDoubleClick();
  }, [onDoubleClick]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (isDragging.current) {
        hasMoved.current = true;
        const newX = Math.max(0, e.clientX - dragOffset.current.x);
        const newY = Math.max(0, Math.min(window.innerHeight - 120, e.clientY - dragOffset.current.y));
        lastPosition.current = { x: newX, y: newY };
        if (typeof onDragMove === 'function') {
          onDragMove(app.id, newX, newY);
        }
      }
    };

    const handleMouseUp = (e) => {
      if (!isDragging.current) return;
      isDragging.current = false;

      if (hasMoved.current && typeof onDragEnd === 'function') {
        onDragEnd(app.id, lastPosition.current.x, lastPosition.current.y);
      }
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [app.id, onDragEnd, onDragMove]);

  return (
    <div
      ref={iconRef}
      onMouseDown={handleMouseDown}
      onDoubleClick={handleDoubleClick}
      onContextMenu={(e) => {
        e.preventDefault();
        e.stopPropagation();
      }}
      className={`absolute xp-desktop-icon cursor-pointer ${isSelected ? 'is-selected' : ''} ${
        isDropTarget ? 'xp-icon-drop-target' : ''
      }`}
      style={{
        left: app.x,
        top: app.y,
        '--icon-src': `url("${app.icon}")`,
      }}
    >
      <div className="xp-desktop-icon-image">
        <img src={app.icon} alt="" draggable={false} />
      </div>
      <span className="xp-desktop-icon-label">{label}</span>
    </div>
  );
};

export default DesktopIcon;
