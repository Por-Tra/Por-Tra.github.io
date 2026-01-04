import { useState, useCallback } from 'react';
import DesktopIcon from './DesktopIcon';
import Window from './Window';
import Taskbar from './Taskbar';
// Import du registry et initialisation des apps
import appRegistry from '../apps';

// Grid configuration for icon snapping
const GRID_SIZE = 80;
const ICON_WIDTH = 70;
const ICON_HEIGHT = 80;
const GRID_PADDING = 10;

const Desktop = () => {
  const [windows, setWindows] = useState([]);
  const [nextId, setNextId] = useState(1);
  const [activeWindow, setActiveWindow] = useState(null);
  const [nextZIndex, setNextZIndex] = useState(100);
  const [selectedIcon, setSelectedIcon] = useState(null);
  
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
  
  // Initialize icons with grid positions using the registry
  const [icons, setIcons] = useState(() => {
    const desktopApps = appRegistry.getDesktopApps();
    return desktopApps.map((app, index) => ({
      ...app,
      x: GRID_PADDING,
      y: GRID_PADDING + index * GRID_SIZE,
    }));
  });

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

    const newWindow = {
      id: nextId,
      appId: app.id,
      title: app.name,
      icon: app.icon,
      url: app.url,
      content: app.content,
      x: 100 + (windows.length % 5) * 30,
      y: 80 + (windows.length % 5) * 30,
      width: app.defaultWidth || 800,
      height: app.defaultHeight || 500,
      minimized: false,
      maximized: false,
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
    const newWindow = {
      id: nextId,
      appId: app.id,
      title: customTitle,
      icon: app.icon,
      url: app.url,
      x: 120 + (windows.length % 5) * 30,
      y: 100 + (windows.length % 5) * 30,
      width: app.defaultWidth || 800,
      height: app.defaultHeight || 500,
      minimized: false,
      maximized: false,
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

  return (
    <div 
      className="xp-desktop w-full h-screen relative overflow-hidden no-select"
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
          onOpenApp={openAppById}
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
      />
    </div>
  );
};

export default Desktop;
