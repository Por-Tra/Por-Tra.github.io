import { useState, useCallback, useEffect } from 'react';
import DesktopIcon from './DesktopIcon';
import Window from './Window';
import Taskbar from './Taskbar';
// Import du registry et initialisation des apps
import appRegistry from '../apps';

const STORAGE_KEY = 'xp-desktop-preferences-v1';

// Grid configuration for icon snapping
const GRID_SIZE = 80;
const ICON_WIDTH = 70;
const ICON_HEIGHT = 80;
const GRID_PADDING = 10;

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
  const [selectedIcon, setSelectedIcon] = useState(null);
  const [wallpaperUrl, setWallpaperUrl] = useState(() => {
    const stored = readStoredPreferences();
    return typeof stored?.wallpaperUrl === 'string' ? stored.wallpaperUrl : '/wallpaper.jpg';
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
    const iconsPerColumn = getIconsPerColumn();
    const stored = readStoredPreferences();
    const storedPositions = stored?.iconPositions || {};
    
    return desktopApps.map((app, index) => {
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
    };
    setWindows(prev => [...prev, newWindow]);
    setActiveWindow(nextId);
    setNextId(prev => prev + 1);
    setNextZIndex(prev => prev + 1);
  }, [windows, nextId, nextZIndex]);

  // Ouvre une app par son ID (utilisé par l'Explorer et autres apps)
  const openAppById = useCallback((appId, extraProps = {}) => {
    const app = appRegistry.get(appId);
    if (!app) {
      console.warn(`App not found: ${appId}`);
      return;
    }

    // Si extraProps contient un titre personnalisé, on l'utilise
    const customTitle = extraProps.windowTitle || app.name;
    
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
      extraProps: extraProps, // Props supplémentaires pour le composant
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
      const freePos = findFreePosition(x, y, appId, prev);
      return prev.map(icon => 
        icon.id === appId ? { ...icon, x: freePos.x, y: freePos.y } : icon
      );
    });
  }, []);

  const handleDesktopClick = useCallback((e) => {
    if (e.target === e.currentTarget) {
      setSelectedIcon(null);
    }
  }, []);

  const handleIconSelect = useCallback((appId) => {
    setSelectedIcon(appId);
  }, []);

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
      onClick={handleDesktopClick}
    >
      {/* Desktop Icons */}
        {icons.map(icon => (
          <DesktopIcon
            key={icon.id}
            app={icon}
            isSelected={selectedIcon === icon.id}
            onSelect={() => handleIconSelect(icon.id)}
            onDoubleClick={() => openApp(icon)}
            onMove={(x, y) => updateIconPosition(icon.id, x, y)}
          />
        ))}

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
