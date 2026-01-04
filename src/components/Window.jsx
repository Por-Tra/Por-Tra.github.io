import { useRef, useCallback, useEffect } from 'react';
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
}) => {
  const windowRef = useRef(null);
  const isDragging = useRef(false);
  const isResizing = useRef(false);
  const dragOffset = useRef({ x: 0, y: 0 });

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
    const handleMouseMove = (e) => {
      if (isDragging.current && !window.maximized) {
        const newX = Math.max(0, e.clientX - dragOffset.current.x);
        const newY = Math.max(0, e.clientY - dragOffset.current.y);
        onMove(newX, newY);
      }
      if (isResizing.current && !window.maximized) {
        const deltaX = e.clientX - dragOffset.current.x;
        const deltaY = e.clientY - dragOffset.current.y;
        const newWidth = Math.max(300, dragOffset.current.width + deltaX);
        const newHeight = Math.max(200, dragOffset.current.height + deltaY);
        onResize(newWidth, newHeight);
      }
    };

    const handleMouseUp = () => {
      isDragging.current = false;
      isResizing.current = false;
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [window.maximized, onMove, onResize]);

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
        onDoubleClick={onMaximize}
      >
        <div className="flex items-center gap-2">
          <img src={window.icon} alt="" className="w-4 h-4" />
          <span className="text-white text-sm font-medium truncate max-w-[300px]">
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
        <AppContent window={window} onOpenApp={onOpenApp} />
        
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
