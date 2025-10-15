# Structure du Portfolio - Organisation des fichiers

## 📁 Structure globale

```
Por-Tra.github.io/
├── index.html              # Page d'accueil avec animation PLAY
├── intro.css               # Styles pour la page d'accueil
├── intro_script.js         # Scripts pour la page d'accueil
│
├── Page/
│   ├── menu.html           # Menu principal avec scroll-snap
│   ├── menu_style.css      # Styles pour le menu
│   ├── menu_script.js      # Scripts pour le menu (burger, sliders)
│   │
│   ├── contact/
│   │   ├── contact.html        # Page de contact
│   │   ├── style_contact.css   # Styles pour la page contact
│   │   └── contact_script.js   # Scripts pour la page contact
│   │
│   ├── CV_Page/
│   │   ├── CV.html             # Page CV avec PDF viewer
│   │   ├── CV_style.css        # Styles pour la page CV
│   │   └── CV_script.js        # Scripts pour la page CV
│   │
│   ├── project/
│   │   ├── Projet_index.html   # Page portfolio projets
│   │   ├── projet_style.css    # Styles pour la page projets
│   │   └── projet_script.js    # Scripts (lightbox, sliders auto)
│   │
│   └── 3D/
│       └── Rendu1/
│           ├── projet1.html        # Visualisation 3D
│           ├── proj1_style.css     # Styles pour la page 3D
│           ├── projet1_script.js   # Scripts Three.js
│           └── Room_avec_texture.glb
```

## 🎨 Système de design

### Variables CSS communes
Toutes les pages utilisent les mêmes variables pour la cohérence visuelle :

```css
:root {
  --accent: #2b52ff;     /* Bleu principal */
  --accent2: #00adee;    /* Cyan */
  --light: #fd5d8d;      /* Rose */
  --dark: #0a0a0a;       /* Noir */
}
```

### Effets CRT
Chaque page utilise les effets CRT rétro :
- **Noise** : Texture de bruit PNG externe (optimisé pour la mémoire)
- **Scanlines** : Lignes de balayage animées
- **RGB Text** : Animation de couleur sur les titres
- **Vignette** : Dégradé radial en overlay

## 📄 Pages détaillées

### 1. Page d'accueil (`index.html`)
**Fonctionnalités :**
- Animation PLAY avec effet de frappe
- Sélecteur de langue (FR/EN)
- Horloge en temps réel
- Effet glitch au clic
- Redirection vers `menu.html`

**Fichiers :**
- `index.html` - Structure HTML
- `intro.css` - Tous les styles (CRT, animations, responsive)
- `intro_script.js` - Logique JS (langues, horloge, animations)

---

### 2. Menu principal (`menu.html`)
**Fonctionnalités :**
- 5 sections avec scroll-snap
- Background sliders automatiques
- Menu burger responsive
- Navigation smooth scroll

**Fichiers :**
- `menu.html` - Structure HTML
- `menu_style.css` - Styles complets avec responsive
- `menu_script.js` - Burger menu, sliders, smooth scroll

---

### 3. Page Contact (`contact/`)
**Fonctionnalités :**
- Cartes de réseaux sociaux avec animations
- Sections: À propos, Formations, Compétences, Centres d'intérêt
- Animation typing sur les titres
- Effets hover impressionnants

**Fichiers :**
- `contact.html` - Structure HTML
- `style_contact.css` - Styles avec PNG noise optimisé
- `contact_script.js` - Burger menu, typing animations

---

### 4. Page CV (`CV_Page/`)
**Fonctionnalités :**
- Visualiseur PDF embarqué
- Boutons de téléchargement et visualisation
- Fallback mobile (cache PDF sur petits écrans)
- Animation typing

**Fichiers :**
- `CV.html` - Structure HTML
- `CV_style.css` - Styles avec responsive adaptatif
- `CV_script.js` - Burger menu, typing, animations

---

### 5. Page Projets (`project/`)
**Fonctionnalités :**
- Grille de cartes de projets
- Sliders d'images automatiques
- Lightbox plein écran avec navigation
- Téléchargement de fichiers

**Fichiers :**
- `Projet_index.html` - Structure HTML
- `projet_style.css` - Styles avec effets glassmorphism
- `projet_script.js` - Classes Lightbox et AutoSlider

---

### 6. Visualisation 3D (`3D/Rendu1/`)
**Fonctionnalités :**
- Rendu Three.js WebGL
- OrbitControls pour rotation
- Textures optimisées (anisotropic filtering)
- Éclairage réaliste (4 sources de lumière)
- Info overlays avec glassmorphism

**Fichiers :**
- `projet1.html` - Structure HTML minimaliste
- `proj1_style.css` - Styles CRT et overlays
- `projet1_script.js` - Logique Three.js complète (ES6 modules)

**Technologies :**
- Three.js r150+ via CDN
- GLTFLoader pour modèles 3D
- OrbitControls pour interaction
- Filtrage anisotropique pour textures nettes

## 🎯 Bonnes pratiques appliquées

### Séparation des préoccupations
✅ HTML uniquement pour la structure  
✅ CSS externalisé dans des fichiers dédiés  
✅ JavaScript dans des fichiers `.js` séparés  

### Performance
✅ Texture PNG externe au lieu de SVG inline (70% moins de mémoire)  
✅ Animations CSS optimisées (transform, opacity)  
✅ Anisotropic filtering pour textures 3D lisses  
✅ Lazy loading des ressources lourdes  

### Responsive Design
✅ Breakpoints: 1600px, 900px, 600px, 400px  
✅ Mode paysage mobile optimisé  
✅ Menu burger sur mobile  
✅ Glassmorphism avec backdrop-filter  

### Accessibilité
✅ Navigation au clavier (tabindex, aria-labels)  
✅ Animations respectent `prefers-reduced-motion`  
✅ Contraste des couleurs élevé  
✅ Structure sémantique HTML5  

## 🚀 Maintenance

### Ajouter une nouvelle page
1. Créer `nouvelle_page.html`
2. Créer `nouvelle_page_style.css`
3. Créer `nouvelle_page_script.js`
4. Copier la structure HTML d'une page existante
5. Adapter le contenu

### Modifier les couleurs
Éditer les variables CSS dans chaque fichier CSS :
```css
:root {
  --accent: #2b52ff;   /* Modifier ici */
  --accent2: #00adee;
  --light: #fd5d8d;
}
```

### Optimisation des images
- Utiliser WebP quand possible
- Compresser les PNG/JPG
- Sprites CSS pour petites icônes
- Lazy loading avec `loading="lazy"`

## 📝 Notes importantes

- **Font** : Press Start 2P (Google Fonts) - rétro gaming
- **Noise texture** : https://ice-creme.de/images/background-noise.png
- **Three.js** : CDN unpkg (toujours la dernière version)
- **Burger menu** : ID `burger` et `menu` requis
- **Typing animation** : Attribut `data-text` sur éléments `.typing-text`

## 🐛 Dépannage

### Le burger menu ne fonctionne pas
Vérifier que le fichier `*_script.js` est bien lié et que les IDs sont corrects.

### Les effets CRT ne s'affichent pas
Vérifier la connexion internet (PNG noise externe).

### Three.js ne charge pas
Vérifier la console, l'import map doit être avant le script module.

### Le PDF ne s'affiche pas
Normal sur mobile < 400px, le fallback est activé.

---

**Dernière mise à jour** : Octobre 2025  
**Auteur** : Lucas Contreras Hodapp  
**Style inspiré de** : https://prismic.io/blog/css-background-effects
