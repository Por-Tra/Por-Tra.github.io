import { useState, useCallback, useEffect, useRef } from 'react';
import DesktopIcon from './DesktopIcon';
import Window from './Window';
import Taskbar from './Taskbar';
// Import du registry et initialisation des apps
import appRegistry from '../apps';
import recycleBin from '../core/recycleBin';

const STORAGE_KEY = 'xp-desktop-preferences-v1';
const WELCOME_SESSION_KEY = 'xp-welcome-opened-session-v1';

// Grid configuration for icon snapping
const GRID_SIZE = 80;
const ICON_WIDTH = 70;
const ICON_HEIGHT = 80;
const GRID_PADDING = 10;
const TRASH_APP_ID = 'trash';

const readStoredPreferences = () => {
  try {
    const raw = globalThis.localStorage?.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    return parsed && typeof parsed === 'object' ? parsed : null;
  } catch (error) {
    return null;
  }
};

const Desktop = () => {
  const [windows, setWindows] = useState([]);
  const [nextId, setNextId] = useState(1);
  const [activeWindow, setActiveWindow] = useState(null);
  const [nextZIndex, setNextZIndex] = useState(100);
  const [selectedIcons, setSelectedIcons] = useState([]);
  const [contextMenu, setContextMenu] = useState(null);
  const lastSelectedId = useRef(null);
  const [lassoRect, setLassoRect] = useState(null);
  const lassoActive = useRef(false);
  const lassoStart = useRef({ x: 0, y: 0 });
  const lassoBaseSelection = useRef([]);
  const lassoHasMoved = useRef(false);
  const lassoJustFinished = useRef(false);
  const [dragGhost, setDragGhost] = useState(null);
  const [wallpaperUrl, setWallpaperUrl] = useState(() => {
    const stored = readStoredPreferences();
    return typeof stored?.wallpaperUrl === 'string' ? stored.wallpaperUrl : '/wallpaper.webp';
  });
  const [utcOffsetMinutes, setUtcOffsetMinutes] = useState(() => {
    const stored = readStoredPreferences();
    const fallback = -new Date().getTimezoneOffset();
    return Number.isFinite(stored?.utcOffsetMinutes) ? stored.utcOffsetMinutes : fallback;
  });
  const [currentLanguage, setCurrentLanguage] = useState(() => {
    const stored = readStoredPreferences();
    return typeof stored?.currentLanguage === 'string' ? stored.currentLanguage : 'FR';
  });

  const clampPosition = useCallback((x, y) => {
    const maxX = Math.max(0, window.innerWidth - ICON_WIDTH);
    const maxY = Math.max(0, window.innerHeight - 120);
    return {
      x: Math.max(0, Math.min(maxX, x)),
      y: Math.max(0, Math.min(maxY, y)),
    };
  }, []);
  
  // Snap position to grid
  const snapToGrid = (x, y) => {
    const snappedX = Math.round(x / GRID_SIZE) * GRID_SIZE + GRID_PADDING;
    const snappedY = Math.round(y / GRID_SIZE) * GRID_SIZE + GRID_PADDING;
    return { x: snappedX, y: snappedY };
  };

  // Check if position is occupied by another icon
  const isPositionOccupied = (x, y, excludeId, icons) => {
    return icons.some(icon => 
      icon.id !== excludeId && 
      Math.abs(icon.x - x) < ICON_WIDTH && 
      Math.abs(icon.y - y) < ICON_HEIGHT
    );
  };

  // Find nearest free grid position
  const findFreePosition = (x, y, excludeId, icons) => {
    const snapped = snapToGrid(x, y);
    if (!isPositionOccupied(snapped.x, snapped.y, excludeId, icons)) {
      return snapped;
    }
    
    // Search in expanding squares for free position
    for (let radius = 1; radius < 20; radius++) {
      for (let dx = -radius; dx <= radius; dx++) {
        for (let dy = -radius; dy <= radius; dy++) {
          if (Math.abs(dx) === radius || Math.abs(dy) === radius) {
            const testX = snapped.x + dx * GRID_SIZE;
            const testY = snapped.y + dy * GRID_SIZE;
            if (testX >= GRID_PADDING && testY >= GRID_PADDING && 
                !isPositionOccupied(testX, testY, excludeId, icons)) {
              return { x: testX, y: testY };
            }
          }
        }
      }
    }
    return snapped;
  };
  
  // Calculate how many icons can fit in a column based on screen height
  const getIconsPerColumn = () => {
    // Subtract taskbar height (~48px) and some padding
    const availableHeight = window.innerHeight - 60;
    return Math.max(1, Math.floor(availableHeight / GRID_SIZE));
  };

  // Initialize icons with grid positions using the registry
  const [icons, setIcons] = useState(() => {
    const desktopApps = appRegistry.getDesktopApps();
    const trashedIds = recycleBin.getTrashedIds();
    const visibleApps = desktopApps.filter(app => !trashedIds.has(app.id) || app.id === TRASH_APP_ID);
    const iconsPerColumn = getIconsPerColumn();
    const stored = readStoredPreferences();
    const storedPositions = stored?.iconPositions || {};
    
    return visibleApps.map((app, index) => {
      const savedPosition = storedPositions?.[app.id];
      if (savedPosition && Number.isFinite(savedPosition.x) && Number.isFinite(savedPosition.y)) {
        return {
          ...app,
          x: savedPosition.x,
          y: savedPosition.y,
        };
      }

      const column = Math.floor(index / iconsPerColumn);
      const row = index % iconsPerColumn;
      return {
        ...app,
        x: GRID_PADDING + column * GRID_SIZE,
        y: GRID_PADDING + row * GRID_SIZE,
      };
    });
  });

  // Handle window resize - reorganize icons and adjust windows
  useEffect(() => {
    const handleResize = () => {
      const iconsPerColumn = getIconsPerColumn();
      
      // Reorganize icons
      setIcons(prev => prev.map((icon, index) => {
        const column = Math.floor(index / iconsPerColumn);
        const row = index % iconsPerColumn;
        return {
          ...icon,
          x: GRID_PADDING + column * GRID_SIZE,
          y: GRID_PADDING + row * GRID_SIZE,
        };
      }));

      // Adjust windows to fit in viewport
      const maxWidth = window.innerWidth;
      const maxHeight = window.innerHeight - 48; // taskbar height
      
      setWindows(prev => prev.map(w => {
        if (w.maximized) return w;
        
        let newX = w.x;
        let newY = w.y;
        let newWidth = Math.min(w.width, maxWidth - 20);
        let newHeight = Math.min(w.height, maxHeight - 20);
        
        // Ensure window is visible
        if (newX + newWidth > maxWidth) {
          newX = Math.max(0, maxWidth - newWidth);
        }
        if (newY + newHeight > maxHeight) {
          newY = Math.max(0, maxHeight - newHeight);
        }
        
        return {
          ...w,
          x: newX,
          y: newY,
          width: newWidth,
          height: newHeight,
        };
      }));
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Get responsive window dimensions
  const getResponsiveWindowSize = (defaultWidth, defaultHeight) => {
    const maxWidth = window.innerWidth - 40;
    const maxHeight = window.innerHeight - 100; // taskbar + padding
    const isMobile = window.innerWidth < 768;
    
    if (isMobile) {
      return {
        width: maxWidth,
        height: maxHeight,
        x: 20,
        y: 20,
      };
    }
    
    return {
      width: Math.min(defaultWidth, maxWidth),
      height: Math.min(defaultHeight, maxHeight),
      x: Math.max(20, (window.innerWidth - Math.min(defaultWidth, maxWidth)) / 4),
      y: Math.max(20, (window.innerHeight - Math.min(defaultHeight, maxHeight)) / 4),
    };
  };

  const openApp = useCallback((app) => {
    const existingWindow = windows.find(w => w.appId === app.id);
    if (existingWindow) {
      if (existingWindow.minimized) {
        setWindows(prev => prev.map(w => 
          w.id === existingWindow.id ? { ...w, minimized: false } : w
        ));
      }
      setActiveWindow(existingWindow.id);
      return;
    }

    const responsiveSize = getResponsiveWindowSize(app.defaultWidth || 800, app.defaultHeight || 500);
    const isMobile = window.innerWidth < 768;

    const newWindow = {
      id: nextId,
      appId: app.id,
      title: app.name,
      icon: app.icon,
      url: app.url,
      content: app.content,
      openExternal: app.openExternal,
      x: isMobile ? responsiveSize.x : responsiveSize.x + (windows.length % 5) * 30,
      y: isMobile ? responsiveSize.y : responsiveSize.y + (windows.length % 5) * 30,
      width: responsiveSize.width,
      height: responsiveSize.height,
      minimized: false,
      maximized: false,
      searchOpen: false,
      searchQuery: '',
      zIndex: nextZIndex,
      extraProps: app.extraProps || {},
    };
    setWindows(prev => [...prev, newWindow]);
    setActiveWindow(nextId);
    setNextId(prev => prev + 1);
    setNextZIndex(prev => prev + 1);
  }, [windows, nextId, nextZIndex]);

  // Ouvir l'app Welcome au lancement du desktop
  useEffect(() => {
    try {
      if (globalThis.sessionStorage?.getItem(WELCOME_SESSION_KEY) === '1') {
        return;
      }
    } catch (error) {
      // no-op
    }

    const welcomeApp = appRegistry.get('welcome');
    if (!welcomeApp) return;

    const responsiveSize = getResponsiveWindowSize(
      welcomeApp.defaultWidth || 800,
      welcomeApp.defaultHeight || 500
    );
    const isMobile = window.innerWidth < 768;

    const welcomeWindow = {
      id: 1,
      appId: welcomeApp.id,
      title: welcomeApp.name,
      icon: welcomeApp.icon,
      url: welcomeApp.url,
      content: welcomeApp.content,
      openExternal: welcomeApp.openExternal,
      x: isMobile ? responsiveSize.x : responsiveSize.x,
      y: isMobile ? responsiveSize.y : responsiveSize.y,
      width: responsiveSize.width,
      height: responsiveSize.height,
      minimized: false,
      maximized: false,
      searchOpen: false,
      searchQuery: '',
      zIndex: 100,
      extraProps: welcomeApp.extraProps || {},
    };

    setWindows(prev => {
      if (prev.some(windowItem => windowItem.appId === 'welcome')) {
        return prev;
      }
      return [...prev, welcomeWindow];
    });
    setActiveWindow(1);
    setNextId(prev => Math.max(prev, 2));
    setNextZIndex(prev => Math.max(prev, 101));

    try {
      globalThis.sessionStorage?.setItem(WELCOME_SESSION_KEY, '1');
    } catch (error) {
      // no-op
    }
  }, []);

  // Ouvre une app par son ID (utilisé par l'Explorer et autres apps)
  const openAppById = useCallback((appId, extraProps = {}) => {
    const app = appRegistry.get(appId);
    if (!app) {
      console.warn(`App not found: ${appId}`);
      return;
    }

    const resolvedExtraProps = {
      ...(app.extraProps || {}),
      ...extraProps,
    };

    // Si extraProps contient un titre personnalisé, on l'utilise
    const customTitle = resolvedExtraProps.windowTitle || app.name;
    
    // Pour les apps avec extraProps, on crée toujours une nouvelle fenêtre
    // (par exemple, plusieurs images peuvent être ouvertes)
    const responsiveSize = getResponsiveWindowSize(app.defaultWidth || 800, app.defaultHeight || 500);
    const isMobile = window.innerWidth < 768;

    const newWindow = {
      id: nextId,
      appId: app.id,
      title: customTitle,
      icon: app.icon,
      url: app.url,
      openExternal: app.openExternal,
      x: isMobile ? responsiveSize.x : responsiveSize.x + (windows.length % 5) * 30,
      y: isMobile ? responsiveSize.y : responsiveSize.y + (windows.length % 5) * 30,
      width: responsiveSize.width,
      height: responsiveSize.height,
      minimized: false,
      maximized: false,
      searchOpen: false,
      searchQuery: '',
      zIndex: nextZIndex,
      extraProps: resolvedExtraProps, // Props supplémentaires pour le composant
    };
    
    setWindows(prev => [...prev, newWindow]);
    setActiveWindow(nextId);
    setNextId(prev => prev + 1);
    setNextZIndex(prev => prev + 1);
  }, [windows, nextId, nextZIndex]);

  const closeWindow = useCallback((id) => {
    setWindows(prev => prev.filter(w => w.id !== id));
    if (activeWindow === id) {
      setActiveWindow(null);
    }
  }, [activeWindow]);

  const minimizeWindow = useCallback((id) => {
    setWindows(prev => prev.map(w => 
      w.id === id ? { ...w, minimized: true } : w
    ));
    if (activeWindow === id) {
      setActiveWindow(null);
    }
  }, [activeWindow]);

  const maximizeWindow = useCallback((id) => {
    setWindows(prev => prev.map(w => 
      w.id === id ? { ...w, maximized: !w.maximized } : w
    ));
  }, []);

  const restoreWindow = useCallback((id) => {
    setWindows(prev => prev.map(w => 
      w.id === id ? { ...w, minimized: false } : w
    ));
    bringToFront(id);
  }, []);

  const bringToFront = useCallback((id) => {
    setActiveWindow(id);
    setWindows(prev => prev.map(w => 
      w.id === id ? { ...w, zIndex: nextZIndex } : w
    ));
    setNextZIndex(prev => prev + 1);
  }, [nextZIndex]);

  const updateWindowPosition = useCallback((id, x, y) => {
    setWindows(prev => prev.map(w => 
      w.id === id ? { ...w, x, y } : w
    ));
  }, []);

  const updateWindowSize = useCallback((id, width, height) => {
    setWindows(prev => prev.map(w => 
      w.id === id ? { ...w, width, height } : w
    ));
  }, []);

  const updateWindowSearchQuery = useCallback((id, query) => {
    setWindows(prev => {
      const target = prev.find(w => w.id === id);
      if (!target) return prev;
      const next = prev.map(w =>
        w.id === id ? { ...w, searchQuery: query } : w
      );
      window.dispatchEvent(
        new CustomEvent('xp-menu-search', {
          detail: { windowId: id, appId: target.appId, query }
        })
      );
      return next;
    });
  }, []);

  const closeWindowSearch = useCallback((id) => {
    setWindows(prev => prev.map(w =>
      w.id === id ? { ...w, searchOpen: false } : w
    ));
  }, []);

  const updateIconPosition = useCallback((appId, x, y) => {
    setIcons(prev => {
      const clamped = clampPosition(x, y);
      const freePos = findFreePosition(clamped.x, clamped.y, appId, prev);
      const finalPos = clampPosition(freePos.x, freePos.y);
      return prev.map(icon =>
        icon.id === appId ? { ...icon, x: finalPos.x, y: finalPos.y } : icon
      );
    });
  }, [clampPosition]);

  const isDroppedOnTrash = useCallback((x, y) => {
    const trashIcon = icons.find(icon => icon.id === TRASH_APP_ID);
    if (!trashIcon) return false;

    const bounds = {
      left: trashIcon.x,
      top: trashIcon.y,
      right: trashIcon.x + ICON_WIDTH,
      bottom: trashIcon.y + ICON_HEIGHT,
    };

    const right = x + ICON_WIDTH;
    const bottom = y + ICON_HEIGHT;

    return right > bounds.left && x < bounds.right && bottom > bounds.top && y < bounds.bottom;
  }, [icons]);

  const moveToTrash = useCallback((appId, position) => {
    if (appId === TRASH_APP_ID) return;

    setIcons(prev => {
      const target = prev.find(icon => icon.id === appId);
      if (!target) return prev;

      recycleBin.addItem({
        id: target.id,
        name: target.name,
        icon: target.icon,
        restorePosition: position || { x: target.x, y: target.y },
      });

      return prev.filter(icon => icon.id !== appId);
    });

    setSelectedIcons(current => current.filter(id => id !== appId));
  }, []);

  const restoreFromTrash = useCallback((item) => {
    if (!item?.id) return;
    const app = appRegistry.get(item.id);
    if (!app) return;

    setIcons(prev => {
      if (prev.some(icon => icon.id === app.id)) {
        return prev;
      }

      const basePosition = item.restorePosition;
      const desired = basePosition && Number.isFinite(basePosition.x) && Number.isFinite(basePosition.y)
        ? basePosition
        : { x: GRID_PADDING, y: GRID_PADDING };
      const clamped = clampPosition(desired.x, desired.y);
      const freePos = findFreePosition(clamped.x, clamped.y, app.id, prev);
      const finalPos = clampPosition(freePos.x, freePos.y);

      return [...prev, { ...app, x: finalPos.x, y: finalPos.y }];
    });
  }, [clampPosition]);

  const handleIconDragMove = useCallback((appId, x, y) => {
    const clamped = clampPosition(x, y);
    setDragGhost({ id: appId, x: clamped.x, y: clamped.y });
  }, [clampPosition]);

  const handleIconDragEnd = useCallback((appId, x, y) => {
    setDragGhost(null);
    if (appId === TRASH_APP_ID) {
      updateIconPosition(appId, x, y);
      return;
    }

    if (isDroppedOnTrash(x, y)) {
      moveToTrash(appId, { x, y });
      return;
    }

    updateIconPosition(appId, x, y);
  }, [isDroppedOnTrash, moveToTrash, updateIconPosition]);

  useEffect(() => {
    const handleRestore = (event) => {
      const item = event?.detail?.item;
      restoreFromTrash(item);
    };

    window.addEventListener('xp-recycle-bin-restore', handleRestore);
    return () => window.removeEventListener('xp-recycle-bin-restore', handleRestore);
  }, [restoreFromTrash]);

  const handleDesktopClick = useCallback((e) => {
    if (lassoJustFinished.current) {
      lassoJustFinished.current = false;
      return;
    }
    if (e.target === e.currentTarget) {
      setSelectedIcons([]);
      setContextMenu(null);
      lastSelectedId.current = null;
    }
  }, []);

  const handleIconSelect = useCallback((appId, event) => {
    const isCtrl = event?.ctrlKey || event?.metaKey;
    const isShift = event?.shiftKey;

    setSelectedIcons(prev => {
      const orderedIds = icons.map(icon => icon.id);

      if (isShift && lastSelectedId.current) {
        const start = orderedIds.indexOf(lastSelectedId.current);
        const end = orderedIds.indexOf(appId);
        if (start === -1 || end === -1) {
          return [appId];
        }

        const [minIndex, maxIndex] = start < end ? [start, end] : [end, start];
        const range = orderedIds.slice(minIndex, maxIndex + 1);
        const base = isCtrl ? prev : [];
        return Array.from(new Set([...base, ...range]));
      }

      if (isCtrl) {
        if (prev.includes(appId)) {
          return prev.filter(id => id !== appId);
        }
        return [...prev, appId];
      }

      if (prev.includes(appId)) {
        return prev;
      }

      return [appId];
    });

    lastSelectedId.current = appId;
  }, [icons]);

  const alignIconsToGrid = useCallback(() => {
    const iconsPerColumn = getIconsPerColumn();
    setIcons(prev => prev.map((icon, index) => {
      const column = Math.floor(index / iconsPerColumn);
      const row = index % iconsPerColumn;
      return {
        ...icon,
        x: GRID_PADDING + column * GRID_SIZE,
        y: GRID_PADDING + row * GRID_SIZE,
      };
    }));
  }, []);

  const handleContextAction = useCallback((action) => {
    if (action === 'refresh') {
      setIcons(prev => [...prev]);
      setContextMenu(null);
      return;
    }

    if (action === 'align') {
      alignIconsToGrid();
      setContextMenu(null);
      return;
    }

    if (action === 'select-all') {
      setSelectedIcons(icons.map(icon => icon.id));
      setContextMenu(null);
      return;
    }

    if (action === 'properties') {
      const controlPanel = appRegistry.get('control-panel');
      if (controlPanel) {
        openApp(controlPanel);
      }
      setContextMenu(null);
    }
  }, [alignIconsToGrid, icons, openApp]);

  const handleDesktopContextMenu = useCallback((e) => {
    if (e.target !== e.currentTarget) return;
    e.preventDefault();

    const menuWidth = 190;
    const menuHeight = 160;
    const maxX = Math.max(0, window.innerWidth - menuWidth);
    const maxY = Math.max(0, window.innerHeight - menuHeight);
    const x = Math.min(e.clientX, maxX);
    const y = Math.min(e.clientY, maxY);

    setContextMenu({ x, y });
  }, []);

  const handleDesktopMouseDown = useCallback((e) => {
    if (e.button !== 0) return;
    if (e.target !== e.currentTarget) return;

    if (contextMenu) {
      setContextMenu(null);
    }

    lassoActive.current = true;
    lassoHasMoved.current = false;
    lassoJustFinished.current = false;
    lassoStart.current = { x: e.clientX, y: e.clientY };

    const isCtrl = e.ctrlKey || e.metaKey;
    lassoBaseSelection.current = isCtrl ? selectedIcons : [];
    setSelectedIcons(lassoBaseSelection.current);

    setLassoRect({ left: e.clientX, top: e.clientY, width: 0, height: 0 });
  }, [contextMenu, selectedIcons]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!lassoActive.current) return;

      const start = lassoStart.current;
      const left = Math.min(start.x, e.clientX);
      const top = Math.min(start.y, e.clientY);
      const width = Math.abs(e.clientX - start.x);
      const height = Math.abs(e.clientY - start.y);

      if (width > 2 || height > 2) {
        lassoHasMoved.current = true;
      }

      const rect = { left, top, width, height };
      setLassoRect(rect);

      const selected = icons
        .filter(icon => {
          const iconRect = {
            left: icon.x,
            top: icon.y,
            right: icon.x + ICON_WIDTH,
            bottom: icon.y + ICON_HEIGHT,
          };
          const rectRight = left + width;
          const rectBottom = top + height;
          return rectRight > iconRect.left && left < iconRect.right && rectBottom > iconRect.top && top < iconRect.bottom;
        })
        .map(icon => icon.id);

      const merged = Array.from(new Set([...lassoBaseSelection.current, ...selected]));
      setSelectedIcons(merged);
    };

    const handleMouseUp = () => {
      if (!lassoActive.current) return;
      lassoActive.current = false;
      setLassoRect(null);

      if (!lassoHasMoved.current) {
        setSelectedIcons([]);
        lastSelectedId.current = null;
      }

      lassoJustFinished.current = true;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [icons]);

  const handleTaskbarClick = useCallback((id) => {
    const window = windows.find(w => w.id === id);
    if (window.minimized) {
      restoreWindow(id);
    } else if (activeWindow === id) {
      minimizeWindow(id);
    } else {
      bringToFront(id);
    }
  }, [windows, activeWindow, restoreWindow, minimizeWindow, bringToFront]);

  const handleSetWallpaper = useCallback((nextUrl) => {
    if (!nextUrl) return;
    setWallpaperUrl(nextUrl);
  }, []);

  const handleSetUtcOffset = useCallback((nextOffsetMinutes) => {
    if (Number.isNaN(Number(nextOffsetMinutes))) return;
    setUtcOffsetMinutes(Number(nextOffsetMinutes));
  }, []);

  const handleSetLanguage = useCallback((nextLanguage) => {
    if (!nextLanguage) return;
    setCurrentLanguage(nextLanguage);
  }, []);

  const dragGhostApp = dragGhost ? icons.find(icon => icon.id === dragGhost.id) : null;
  const isTrashHovered = dragGhost && dragGhost.id !== TRASH_APP_ID
    ? isDroppedOnTrash(dragGhost.x, dragGhost.y)
    : false;

  useEffect(() => {
    try {
      const iconPositions = icons.reduce((acc, icon) => {
        acc[icon.id] = { x: icon.x, y: icon.y };
        return acc;
      }, {});

      const payload = {
        wallpaperUrl,
        utcOffsetMinutes,
        currentLanguage,
        iconPositions,
      };

      globalThis.localStorage?.setItem(STORAGE_KEY, JSON.stringify(payload));
    } catch (error) {
      console.warn('Unable to persist desktop preferences', error);
    }
  }, [icons, wallpaperUrl, utcOffsetMinutes, currentLanguage]);

  useEffect(() => {
    const handleMenuAction = (event) => {
      const action = event?.detail?.action;
      if (!action) return;

      if (action === 'file.close') {
        if (activeWindow) closeWindow(activeWindow);
        return;
      }

      if (action === 'file.quit') {
        setWindows([]);
        setActiveWindow(null);
        return;
      }

      if (action === 'edit.search') {
        if (!activeWindow) return;
        setWindows(prev => prev.map(w =>
          w.id === activeWindow ? { ...w, searchOpen: !w.searchOpen } : w
        ));
        return;
      }

      if (action === 'view.fullscreen') {
        if (!activeWindow) return;
        maximizeWindow(activeWindow);
      }
    };

    window.addEventListener('xp-menu-action', handleMenuAction);
    return () => window.removeEventListener('xp-menu-action', handleMenuAction);
  }, [activeWindow, closeWindow, maximizeWindow]);

  return (
    <div 
      className="xp-desktop w-full h-screen relative overflow-hidden no-select"
      style={{ '--xp-wallpaper-url': `url("${wallpaperUrl}")` }}
      onContextMenu={handleDesktopContextMenu}
      onMouseDown={handleDesktopMouseDown}
      onClick={handleDesktopClick}
    >
      {/* Desktop Icons */}
        {icons.map(icon => (
          <DesktopIcon
            key={icon.id}
            app={icon}
            isSelected={selectedIcons.includes(icon.id)}
            isDropTarget={icon.id === TRASH_APP_ID && isTrashHovered}
            onSelect={handleIconSelect}
            onDoubleClick={() => openApp(icon)}
            onDragMove={handleIconDragMove}
            onDragEnd={handleIconDragEnd}
          />
        ))}

        {lassoRect && (
          <div
            className="xp-lasso"
            style={{
              left: lassoRect.left,
              top: lassoRect.top,
              width: lassoRect.width,
              height: lassoRect.height,
            }}
          ></div>
        )}

        {dragGhost && dragGhostApp && (
          <div
            className="absolute flex flex-col items-center p-1 w-[75px] pointer-events-none opacity-50"
            style={{
              left: dragGhost.x,
              top: dragGhost.y,
            }}
          >
            <div className="w-12 h-12 flex items-center justify-center mb-1">
              <img
                src={dragGhostApp.icon}
                alt=""
                className="w-10 h-10 drop-shadow-[1px_1px_1px_rgba(0,0,0,0.5)]"
                draggable={false}
              />
            </div>
            <span
              className="text-[11px] text-center leading-tight break-words w-full px-1 text-white"
              style={{
                textShadow: '1px 1px 2px rgba(0,0,0,0.9)',
              }}
            >
              {dragGhostApp.name}
            </span>
          </div>
        )}

        {contextMenu && (
          <div
            className="xp-desktop-context-menu"
            style={{ left: contextMenu.x, top: contextMenu.y }}
            onMouseDown={(e) => e.stopPropagation()}
          >
            <button
              className="xp-desktop-context-item"
              onClick={() => handleContextAction('refresh')}
            >
              Actualiser
            </button>
            <div className="xp-desktop-context-separator"></div>
            <button
              className="xp-desktop-context-item"
              onClick={() => handleContextAction('align')}
            >
              Aligner les icones
            </button>
            <button
              className="xp-desktop-context-item"
              onClick={() => handleContextAction('select-all')}
            >
              Tout selectionner
            </button>
            <div className="xp-desktop-context-separator"></div>
            <button
              className="xp-desktop-context-item"
              onClick={() => handleContextAction('properties')}
            >
              Proprietes
            </button>
          </div>
        )}

        {/* Windows */}
        {windows.filter(w => !w.minimized).map(window => (
          <Window
            key={window.id}
            window={window}
            isActive={activeWindow === window.id}
            onClose={() => closeWindow(window.id)}
            onMinimize={() => minimizeWindow(window.id)}
            onMaximize={() => maximizeWindow(window.id)}
            onFocus={() => bringToFront(window.id)}
            onMove={(x, y) => updateWindowPosition(window.id, x, y)}
            onResize={(width, height) => updateWindowSize(window.id, width, height)}
            onSearchChange={updateWindowSearchQuery}
            onSearchClose={closeWindowSearch}
            onOpenApp={openAppById}
            onSetWallpaper={handleSetWallpaper}
            wallpaperUrl={wallpaperUrl}
            utcOffsetMinutes={utcOffsetMinutes}
            onSetUtcOffset={handleSetUtcOffset}
            currentLanguage={currentLanguage}
            onSetLanguage={handleSetLanguage}
          />
        ))}

        {/* Taskbar */}
        <Taskbar
          windows={windows}
          activeWindow={activeWindow}
          onWindowClick={handleTaskbarClick}
          onWindowClose={closeWindow}
          apps={icons}
          onOpenApp={openApp}
          utcOffsetMinutes={utcOffsetMinutes}
          currentLanguage={currentLanguage}
          onSetLanguage={handleSetLanguage}
        />
    </div>
  );
};

export default Desktop;
