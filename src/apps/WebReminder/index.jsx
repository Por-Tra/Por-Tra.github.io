/**
 * Application: WebReminder
 *
 * Petit message affiché quand l'utilisateur essaie d'ouvrir
 * un faux exécutable dans le système de fichiers virtuel.
 */
import { t } from '../../i18n/text';

export const config = {
  id: 'web-reminder',
  name: 'Exécutable introuvable',
  icon: '/icons/questionMark.webp',
  defaultWidth: 460,
  defaultHeight: 260,
  showOnDesktop: false,
  showInStartMenu: false,
};

const COPY = {
  title: { FR: 'Petit rappel', EN: 'Friendly reminder', ES: 'Pequeño recordatorio' },
  body: {
    FR: "Oups ! Il semble que vous ayez essayé d'ouvrir un exécutable qui n'existe pas.",
    EN: "Oops! It looks like you tried to open an executable that doesn't exist.",
    ES: '¡Ups! Parece que has intentado abrir un ejecutable que no existe.',
  },
  tip: { FR: 'Astuce', EN: 'Tip', ES: 'Consejo' },
  tipBody: { FR: 'Tentez de supprimer le système32.', EN: 'Try deleting System32.', ES: 'Prueba a borrar System32.' },
};

export const Component = ({ currentLanguage }) => {
  return (
    <div className="xp-app">
      <div className="xp-content" style={{ padding: '16px' }}>
        <div className="xp-box xp-box-blue" style={{ width: '100%' }}>
          <div className="xp-box-header">
            <img src="/icons/questionMark.webp" alt="" className="w-4 h-4" />
            {t(COPY.title, currentLanguage)}
          </div>
          <div className="xp-box-content">
            <p className="text-xs mb-2">Fatal Error: File not found</p>
            <p className="text-xs text-gray-700">
              {t(COPY.body, currentLanguage)}
            </p>
          </div>
        </div>
      </div>
      <div className="status-bar">
        <p className="status-bar-field">{t(COPY.tip, currentLanguage)}</p>
        <p className="status-bar-field">{t(COPY.tipBody, currentLanguage)}</p>
      </div>
    </div>
  );
};
