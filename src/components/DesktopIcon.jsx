import { useRef, useCallback, useEffect } from 'react';

const DesktopIcon = ({ app, isSelected, onSelect, onDoubleClick, onDragMove, onDragEnd }) => {
  const iconRef = useRef(null);
  const isDragging = useRef(false);
  const hasMoved = useRef(false);
  const dragOffset = useRef({ x: 0, y: 0 });
  const lastPosition = useRef({ x: app.x, y: app.y });

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
      className={`absolute flex flex-col items-center p-1 w-[75px] cursor-pointer ${
        isSelected ? 'xp-icon-selected' : 'xp-icon'
      }`}
      style={{
        left: app.x,
        top: app.y,
      }}
    >
      <div className="w-12 h-12 flex items-center justify-center mb-1">
        <img 
          src={app.icon} 
          alt={app.name}
          className="w-10 h-10 drop-shadow-[1px_1px_1px_rgba(0,0,0,0.5)]"
          draggable={false}
        />
      </div>
      <span 
        className={`text-[11px] text-center leading-tight break-words w-full px-1 ${
          isSelected 
            ? 'bg-[#316ac5] text-white' 
            : 'text-white drop-shadow-[1px_1px_1px_rgba(0,0,0,0.8)]'
        }`}
        style={{
          textShadow: isSelected ? 'none' : '1px 1px 2px rgba(0,0,0,0.9)',
        }}
      >
        {app.name}
      </span>
    </div>
  );
};

export default DesktopIcon;
