import { useState, useEffect, useCallback } from 'react';

/**
 * Hook pour écouter les recherches via l'événement xp-menu-search
 * et fournir des fonctions de filtrage et de highlight
 */
export function useSearchHighlight(windowId, defaultQuery = '') {
  const [query, setQuery] = useState(defaultQuery);

  useEffect(() => {
    const handleSearch = (event) => {
      const { detail } = event;
      if (detail?.windowId === windowId) {
        setQuery(detail.query || '');
      }
    };

    window.addEventListener('xp-menu-search', handleSearch);
    return () => window.removeEventListener('xp-menu-search', handleSearch);
  }, [windowId]);

  /**
   * Filtre un tableau d'items basé sur la requête
   * @param {Array} items - Tableau d'items à filtrer
   * @param {Function} getTextFn - Fonction pour extraire le texte searchable de chaque item
   * @returns {Array} Items filtrés
   */
  const filterItems = useCallback((items, getTextFn) => {
    if (!query.trim()) return items;
    return items.filter((item) => {
      const text = getTextFn(item).toLowerCase();
      return text.includes(query.toLowerCase());
    });
  }, [query]);

  /**
   * Ajoute des balises <mark> autour des termes recherchés
   * @param {string} text - Texte à highlighter
   * @returns {JSX.Element} Texte avec highlights
   */
  const highlightText = useCallback((text) => {
    if (!query.trim()) return text;

    const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
    const parts = text.split(regex);

    return parts.map((part, idx) => 
      regex.test(part) ? (
        <mark key={idx} className="bg-yellow-300 font-semibold">{part}</mark>
      ) : (
        <span key={idx}>{part}</span>
      )
    );
  }, [query]);

  /**
   * Filtre les items ET surligne les résultats
   * @param {Array} items - Tableau d'items
   * @param {Function} getTextFn - Fonction pour extraire le texte
   * @param {Function} renderFn - Fonction pour renderer un item avec highlight
   * @returns {Array} Items filtrés et rendus avec highlights
   */
  const filterAndHighlight = useCallback((items, getTextFn, renderFn) => {
    if (!query.trim()) {
      return items.map((item, idx) => renderFn(item, idx, item));
    }

    const filtered = items.filter((item) => {
      const text = getTextFn(item).toLowerCase();
      return text.includes(query.toLowerCase());
    });

    return filtered.map((item, idx) => renderFn(item, idx, highlightText(getTextFn(item))));
  }, [query, highlightText]);

  return {
    query,
    setQuery,
    filterItems,
    highlightText,
    filterAndHighlight,
    isSearching: query.trim().length > 0,
  };
}
