/**
 * Application: WebReminder
 *
 * Petit message affiché quand l'utilisateur essaie d'ouvrir
 * un faux exécutable dans le système de fichiers virtuel.
 */

export const config = {
  id: 'web-reminder',
  name: 'Exécutable introuvable',
  icon: '/icons/questionMark.webp',
  defaultWidth: 460,
  defaultHeight: 260,
  showOnDesktop: false,
  showInStartMenu: false,
};

export const Component = () => {
  return (
    <div className="xp-app">
      <div className="xp-content" style={{ padding: '16px' }}>
        <div className="xp-box xp-box-blue" style={{ width: '100%' }}>
          <div className="xp-box-header">
            <img src="/icons/questionMark.webp" alt="" className="w-4 h-4" />
            Petit rappel
          </div>
          <div className="xp-box-content">
            <p className="text-xs mb-2">Fatal Error: File not found</p>
            <p className="text-xs text-gray-700">
              Oups ! Il semble que vous ayez essayé d'ouvrir un exécutable qui n'existe pas.
            </p>
          </div>
        </div>
      </div>
      <div className="status-bar">
        <p className="status-bar-field">Astuce</p>
        <p className="status-bar-field">Tentez de supprimer le système32.</p>
      </div>
    </div>
  );
};
