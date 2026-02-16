import { useRef, useCallback, useEffect, useState } from 'react';
import AppContent from '../core/AppContent';

const Window = ({
  window,
  isActive,
  onClose,
  onMinimize,
  onMaximize,
  onFocus,
  onMove,
  onResize,
  onOpenApp,
  onSetWallpaper,
  wallpaperUrl,
  utcOffsetMinutes,
  onSetUtcOffset,
  currentLanguage,
  onSetLanguage,
  onSearchChange,
  onSearchClose,
}) => {
  const windowRef = useRef(null);
  const isDragging = useRef(false);
  const isResizing = useRef(false);
  const dragOffset = useRef({ x: 0, y: 0 });
  const [isMobile, setIsMobile] = useState(globalThis.innerWidth < 768);

  // Check for mobile on mount and resize
  useEffect(() => {
    const checkMobile = () => setIsMobile(globalThis.innerWidth < 768);
    globalThis.addEventListener('resize', checkMobile);
    return () => globalThis.removeEventListener('resize', checkMobile);
  }, []);

  const handleMouseDown = useCallback((e) => {
    if (e.target.closest('.window-controls')) return;
    if (e.target.closest('.resize-handle')) return;
    
    isDragging.current = true;
    dragOffset.current = {
      x: e.clientX - window.x,
      y: e.clientY - window.y,
    };
    onFocus();
    e.preventDefault();
  }, [window.x, window.y, onFocus]);

  // Touch support for mobile
  const handleTouchStart = useCallback((e) => {
    if (e.target.closest('.window-controls')) return;
    if (e.target.closest('.resize-handle')) return;
    
    const touch = e.touches[0];
    isDragging.current = true;
    dragOffset.current = {
      x: touch.clientX - window.x,
      y: touch.clientY - window.y,
    };
    onFocus();
  }, [window.x, window.y, onFocus]);

  const handleResizeMouseDown = useCallback((e) => {
    isResizing.current = true;
    dragOffset.current = {
      x: e.clientX,
      y: e.clientY,
      width: window.width,
      height: window.height,
    };
    onFocus();
    e.preventDefault();
    e.stopPropagation();
  }, [window.width, window.height, onFocus]);

  useEffect(() => {
    const maxWidth = globalThis.innerWidth;
    const maxHeight = globalThis.innerHeight - 48;

    const handleMouseMove = (e) => {
      if (isDragging.current && !window.maximized) {
        const newX = Math.max(0, Math.min(maxWidth - 100, e.clientX - dragOffset.current.x));
        const newY = Math.max(0, Math.min(maxHeight - 30, e.clientY - dragOffset.current.y));
        onMove(newX, newY);
      }
      if (isResizing.current && !window.maximized) {
        const deltaX = e.clientX - dragOffset.current.x;
        const deltaY = e.clientY - dragOffset.current.y;
        const newWidth = Math.max(280, Math.min(maxWidth - window.x, dragOffset.current.width + deltaX));
        const newHeight = Math.max(180, Math.min(maxHeight - window.y, dragOffset.current.height + deltaY));
        onResize(newWidth, newHeight);
      }
    };

    const handleTouchMove = (e) => {
      if (isDragging.current && !window.maximized) {
        const touch = e.touches[0];
        const newX = Math.max(0, Math.min(maxWidth - 100, touch.clientX - dragOffset.current.x));
        const newY = Math.max(0, Math.min(maxHeight - 30, touch.clientY - dragOffset.current.y));
        onMove(newX, newY);
      }
    };

    const handleMouseUp = () => {
      isDragging.current = false;
      isResizing.current = false;
    };

    const handleTouchEnd = () => {
      isDragging.current = false;
      isResizing.current = false;
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('touchmove', handleTouchMove, { passive: false });
    document.addEventListener('touchend', handleTouchEnd);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleTouchEnd);
    };
  }, [window.maximized, window.x, window.y, onMove, onResize]);

  const windowStyle = window.maximized
    ? {
        left: 0,
        top: 0,
        width: '100%',
        height: 'calc(100vh - 48px)',
        zIndex: window.zIndex,
      }
    : {
        left: window.x,
        top: window.y,
        width: window.width,
        height: window.height,
        zIndex: window.zIndex,
      };

  return (
    <div
      ref={windowRef}
      className={`absolute overflow-hidden ${
        window.maximized ? '' : 'xp-window'
      } ${isActive ? '' : 'xp-window-inactive'}`}
      style={windowStyle}
      onMouseDown={onFocus}
    >
      {/* Title Bar */}
      <div
        className={`${isActive ? 'xp-titlebar' : 'xp-titlebar-inactive'} px-2 py-1 flex items-center justify-between cursor-move`}
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
        onDoubleClick={onMaximize}
      >
        <div className="flex items-center gap-2 min-w-0 flex-1">
          <img src={window.icon} alt="" className="w-4 h-4 flex-shrink-0" />
          <span className="text-white text-sm font-medium truncate">
            {window.title}
          </span>
        </div>
        <div className="window-controls flex gap-1">
          <button
            onClick={onMinimize}
            className="xp-minimize-btn w-5 h-5 flex items-center justify-center text-white text-xs font-bold"
            title="Réduire"
          >
            <span className="mb-1">_</span>
          </button>
          <button
            onClick={onMaximize}
            className="xp-maximize-btn w-5 h-5 flex items-center justify-center text-white text-xs font-bold"
            title={window.maximized ? "Restaurer" : "Agrandir"}
          >
            <span className="text-[10px]">{window.maximized ? '❐' : '□'}</span>
          </button>
          <button
            onClick={onClose}
            className="xp-close-btn w-5 h-5 flex items-center justify-center text-white text-xs font-bold"
            title="Fermer"
          >
            ✕
          </button>
        </div>
      </div>

      {/* Window Content */}
      <div className="bg-[#ece9d8] h-[calc(100%-28px)] overflow-hidden relative">
        {window.searchOpen && (
          <div className="xp-menu-search">
            <span>Rechercher:</span>
            <input
              type="text"
              value={window.searchQuery || ''}
              onChange={(event) => onSearchChange?.(window.id, event.target.value)}
              placeholder="Filtrer..."
            />
            <button
              type="button"
              className="xp-button px-2 py-0.5 text-xs"
              onClick={() => onSearchChange?.(window.id, '')}
            >
              Effacer
            </button>
            <button
              type="button"
              className="xp-button px-2 py-0.5 text-xs"
              onClick={() => onSearchClose?.(window.id)}
            >
              Fermer
            </button>
          </div>
        )}
        <AppContent
          window={window}
          onOpenApp={onOpenApp}
          onSetWallpaper={onSetWallpaper}
          wallpaperUrl={wallpaperUrl}
          utcOffsetMinutes={utcOffsetMinutes}
          onSetUtcOffset={onSetUtcOffset}
          currentLanguage={currentLanguage}
          onSetLanguage={onSetLanguage}
        />
        
        {/* Resize Handle */}
        {!window.maximized && (
          <div
            className="resize-handle"
            onMouseDown={handleResizeMouseDown}
          />
        )}
      </div>
    </div>
  );
};

export default Window;
