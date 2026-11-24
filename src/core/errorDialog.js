/**
 * Boîtes d'erreur Windows XP, utilisables depuis n'importe où dans le projet.
 *
 * Exemples :
 *   showError("Le fichier est introuvable.");
 *   showError({ FR: 'Accès refusé.', EN: 'Access denied.', ES: 'Acceso denegado.' });
 *   showError('Cliquez sur « Réparer » pour corriger l’erreur.', { title: 'Erreur', buttonLabel: 'Réparer' });
 *
 * Le message, le titre et le libellé du bouton acceptent une chaîne ou un objet { FR, EN, ES }.
 * L'affichage est assuré par <ErrorDialogHost />, monté une seule fois dans le bureau.
 */

export const ERROR_DIALOG_EVENT = 'xp-show-error';

/**
 * @param {string|object} message - Texte de l'erreur
 * @param {object} [options]
 * @param {string|object} [options.title] - Titre de la fenêtre (par défaut « Erreur »)
 * @param {string|object} [options.buttonLabel] - Libellé du bouton (par défaut « OK »)
 * @param {'error'|'info'} [options.icon] - Icône affichée (par défaut 'error')
 * @param {function} [options.onClose] - Appelé à la fermeture de la boîte
 */
export const showError = (message, options = {}) => {
  globalThis.dispatchEvent(
    new CustomEvent(ERROR_DIALOG_EVENT, { detail: { message, ...options } })
  );
};

export default showError;
