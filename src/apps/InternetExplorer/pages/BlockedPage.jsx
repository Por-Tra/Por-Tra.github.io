/**
 * Page d'erreur d'Internet Explorer 6 pour les sites qui refusent d'être affichés dans une autre page.
 */
import { useEffect } from 'react';
import { t } from '../../../i18n/text';

const COPY = {
  title: { FR: "Impossible d'afficher la page", EN: 'The page cannot be displayed', ES: 'No se puede mostrar la página' },
  refused: {
    FR: "Ce site refuse d'être affiché à l'intérieur d'une autre page (protection mise en place par le site lui-même).",
    EN: 'This website refuses to be displayed inside another page (a protection set up by the site itself).',
    ES: 'Este sitio se niega a mostrarse dentro de otra página (una protección establecida por el propio sitio).',
  },
  invalid: {
    FR: "L'adresse saisie n'est pas valide.",
    EN: 'The address you entered is not valid.',
    ES: 'La dirección introducida no es válida.',
  },
  tryTitle: { FR: 'Essayez ce qui suit :', EN: 'Please try the following:', ES: 'Intente lo siguiente:' },
  tryNewTab: {
    FR: 'Ouvrez la page dans un nouvel onglet de votre navigateur :',
    EN: 'Open the page in a new tab of your browser:',
    ES: 'Abra la página en una nueva pestaña de su navegador:',
  },
  tryAddress: {
    FR: "Vérifiez que l'adresse dans la barre d'adresses est correctement orthographiée.",
    EN: 'Make sure the Web site address displayed in the Address bar is spelled correctly.',
    ES: 'Compruebe que la dirección que aparece en la barra de direcciones está bien escrita.',
  },
  trySearch: {
    FR: "Tapez quelques mots dans la barre d'adresses pour lancer une recherche Google.",
    EN: 'Type a few words in the Address bar to search with Google.',
    ES: 'Escriba unas palabras en la barra de direcciones para buscar con Google.',
  },
  openInTab: { FR: 'Ouvrir dans un nouvel onglet', EN: 'Open in a new tab', ES: 'Abrir en una pestaña nueva' },
  footer: {
    FR: 'Impossible de trouver le serveur ou erreur DNS\nInternet Explorer',
    EN: 'Cannot find server or DNS Error\nInternet Explorer',
    ES: 'No se encuentra el servidor o error de DNS\nInternet Explorer',
  },
};

const BlockedPage = ({ url, reason, onPageInfo, currentLanguage }) => {
  useEffect(() => {
    onPageInfo?.({ title: t(COPY.title, currentLanguage), suffix: null, done: true, error: true });
  }, [onPageInfo, currentLanguage]);

  return (
    <div className="ie-blocked">
      <div className="ie-blocked-head">
        <span className="xp-error-icon xp-error-icon--info" aria-hidden="true" />
        <h1>{t(COPY.title, currentLanguage)}</h1>
      </div>
      <p>{t(reason === 'invalid' ? COPY.invalid : COPY.refused, currentLanguage)}</p>
      <hr />
      <p>{t(COPY.tryTitle, currentLanguage)}</p>
      <ul>
        {reason !== 'invalid' && (
          <li>
            {t(COPY.tryNewTab, currentLanguage)}{' '}
            <button type="button" className="ie-blocked-link" onClick={() => globalThis.open(url, '_blank', 'noopener')}>
              {t(COPY.openInTab, currentLanguage)}
            </button>
          </li>
        )}
        <li>{t(COPY.tryAddress, currentLanguage)}</li>
        <li>{t(COPY.trySearch, currentLanguage)}</li>
      </ul>
      <p className="ie-blocked-footer">{t(COPY.footer, currentLanguage)}</p>
    </div>
  );
};

export default BlockedPage;
