/**
 * Application: WebReminder
 *
 * Petit message affiché quand l'utilisateur essaie d'ouvrir
 * un faux exécutable dans le système de fichiers virtuel.
 */

export const config = {
  id: 'web-reminder',
  name: 'Exécutable introuvable',
  icon: '/icons/questionMark.png',
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
            <img src="/icons/questionMark.png" alt="" className="w-4 h-4" />
            Petit rappel
          </div>
          <div className="xp-box-content">
            <p className="text-xs mb-2">Eh bien non... vous êtes sur un site web 😄</p>
            <p className="text-xs text-gray-700">
              Ces fichiers <strong>.exe</strong> sont des éléments décoratifs pour l'ambiance Windows XP.
            </p>
          </div>
        </div>
      </div>
      <div className="status-bar">
        <p className="status-bar-field">Astuce</p>
        <p className="status-bar-field">Explorez les autres apps du portfolio</p>
      </div>
    </div>
  );
};
