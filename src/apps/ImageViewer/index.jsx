/**
 * Application: ImageViewer
 * 
 * Visionneuse d'images style Windows XP
 */
import { useState } from 'react';

export const config = {
  id: 'image-viewer',
  name: 'Aperçu des images',
  icon: '/icons/folder.png',
  defaultWidth: 650,
  defaultHeight: 500,
  showOnDesktop: false,
  showInStartMenu: false,
};

export const Component = ({ imageSrc, imageName }) => {
  const [zoom, setZoom] = useState(100);
  const [rotation, setRotation] = useState(0);

  const handleZoomIn = () => setZoom(z => Math.min(z + 25, 400));
  const handleZoomOut = () => setZoom(z => Math.max(z - 25, 25));
  const handleRotateLeft = () => setRotation(r => r - 90);
  const handleRotateRight = () => setRotation(r => r + 90);
  const handleReset = () => {
    setZoom(100);
    setRotation(0);
  };

  // Image par défaut si non spécifiée
  const src = imageSrc || '/images/wallpapers/bliss.jpg';
  const name = imageName || 'Image';

  return (
    <div className="h-full bg-[#1a1a2e] flex flex-col">
      {/* Toolbar */}
      <div className="bg-gradient-to-b from-[#3a3a5a] to-[#2a2a4a] border-b border-[#4a4a6a] px-2 py-1 flex items-center gap-1">
        <button 
          onClick={handleZoomIn}
          className="px-3 py-1 text-xs text-white bg-[#4a4a6a] hover:bg-[#5a5a7a] rounded border border-[#6a6a8a]"
          title="Zoom avant"
        >
          +
        </button>
        <button 
          onClick={handleZoomOut}
          className="px-3 py-1 text-xs text-white bg-[#4a4a6a] hover:bg-[#5a5a7a] rounded border border-[#6a6a8a]"
          title="Zoom arrière"
        >
          -
        </button>
        <div className="w-px h-5 bg-[#4a4a6a] mx-1"></div>
        <button 
          onClick={handleRotateLeft}
          className="px-3 py-1 text-xs text-white bg-[#4a4a6a] hover:bg-[#5a5a7a] rounded border border-[#6a6a8a]"
          title="Rotation gauche"
        >
          ↺
        </button>
        <button 
          onClick={handleRotateRight}
          className="px-3 py-1 text-xs text-white bg-[#4a4a6a] hover:bg-[#5a5a7a] rounded border border-[#6a6a8a]"
          title="Rotation droite"
        >
          ↻
        </button>
        <div className="w-px h-5 bg-[#4a4a6a] mx-1"></div>
        <button 
          onClick={handleReset}
          className="px-3 py-1 text-xs text-white bg-[#4a4a6a] hover:bg-[#5a5a7a] rounded border border-[#6a6a8a]"
          title="Réinitialiser"
        >
          ⟲ Reset
        </button>
        <div className="flex-1"></div>
        <span className="text-xs text-gray-400">{zoom}%</span>
      </div>

      {/* Image Container */}
      <div className="flex-1 overflow-auto flex items-center justify-center p-4">
        <div 
          className="transition-transform duration-200"
          style={{ 
            transform: `scale(${zoom / 100}) rotate(${rotation}deg)`,
          }}
        >
          <img 
            src={src}
            alt={name}
            className="max-w-none shadow-2xl"
            onError={(e) => {
              e.target.src = '/icons/questionMark.png';
              e.target.className = 'w-32 h-32 opacity-50';
            }}
          />
        </div>
      </div>

      {/* Status Bar */}
      <div className="bg-[#2a2a4a] border-t border-[#4a4a6a] px-3 py-1 text-[10px] text-gray-400 flex justify-between">
        <span>{name}</span>
        <span>Zoom: {zoom}% | Rotation: {rotation}°</span>
      </div>
    </div>
  );
};
