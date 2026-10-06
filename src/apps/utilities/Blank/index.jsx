/**
 * Application: Blank (Utilitaire)
 * 
 * Application vide réutilisable pour les apps non implémentées
 */

import XpMenuBar from '../../../components/XpMenuBar';
import { t } from '../../../i18n/text';

export const config = {
  id: 'blank',
  name: 'Application',
  icon: '/icons/folder.webp',
  defaultWidth: 400,
  defaultHeight: 300,
};

const COPY = {
  unavailable: { FR: "Cette application n'est pas encore disponible", EN: 'This application is not available yet', ES: 'Esta aplicación aún no está disponible' },
  inProgress: { FR: 'Fonctionnalité en cours de développement', EN: 'Feature under development', ES: 'Funcionalidad en desarrollo' },
  ready: { FR: 'Prêt', EN: 'Ready', ES: 'Listo' },
  items: { FR: 'éléments', EN: 'items', ES: 'elementos' },
};

export const Component = ({ currentLanguage }) => {
  return (
    <div className="h-full bg-white flex flex-col">
      {/* XP Explorer Toolbar */}
      <XpMenuBar
        currentLanguage={currentLanguage}
      />

      {/* Content Area */}
      <div className="flex-1 flex items-center justify-center bg-white">
        <div className="text-center text-gray-400">
          <div className="w-24 h-24 mx-auto mb-4 bg-[#ece9d8] rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center">
            <svg className="w-12 h-12 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <p className="text-sm font-medium text-gray-500">{t(COPY.unavailable, currentLanguage)}</p>
          <p className="text-xs text-gray-400 mt-1">{t(COPY.inProgress, currentLanguage)}</p>
        </div>
      </div>

      {/* Status Bar */}
      <div className="xp-statusbar">
        <span>{t(COPY.ready, currentLanguage)}</span>
        <span>0 {t(COPY.items, currentLanguage)}</span>
      </div>
    </div>
  );
};
