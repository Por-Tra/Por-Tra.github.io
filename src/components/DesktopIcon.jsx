import { useRef, useCallback, useEffect } from 'react';

const DesktopIcon = ({ app, isSelected, onSelect, onDoubleClick, onMove }) => {
  const iconRef = useRef(null);
  const isDragging = useRef(false);
  const hasMoved = useRef(false);
  const dragOffset = useRef({ x: 0, y: 0 });

  const handleMouseDown = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    onSelect();
    
    isDragging.current = true;
    hasMoved.current = false;
    dragOffset.current = {
      x: e.clientX - app.x,
      y: e.clientY - app.y,
    };
  }, [app.x, app.y, onSelect]);

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
        onMove(newX, newY);
      }
    };

    const handleMouseUp = () => {
      isDragging.current = false;
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [onMove]);

  return (
    <div
      ref={iconRef}
      onMouseDown={handleMouseDown}
      onDoubleClick={handleDoubleClick}
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
