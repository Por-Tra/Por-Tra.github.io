let currentSelection = 0;
let dropdownOpen = false;
const langNames = { fr: 'Francais', en: 'English', es: 'Espanol' };

function exitBIOS(url) {
  const overlay = document.getElementById('exitOverlay');
  const biosContainer = document.querySelector('.bios-container');
  
  overlay.classList.add('active');
  biosContainer.classList.add('exiting');
  
  setTimeout(() => {
    window.location.href = url;
  }, 800);
}

function updateTime() {
  const now = new Date();
  const timeStr = now.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
  const dateStr = now.toLocaleDateString('fr-FR');
  
  const timeEl = document.getElementById('currentTime');
  const dateEl = document.getElementById('currentDate');
  
  if (timeEl) timeEl.textContent = timeStr;
  if (dateEl) dateEl.textContent = dateStr;
}

function initMenu() {
  const menuItems = document.querySelectorAll('.menu-item:not(.dropdown-trigger)');
  const dropdownTrigger = document.querySelector('.dropdown-trigger');
  const dropdown = document.getElementById('langDropdown');
  const dropdownItems = document.querySelectorAll('.dropdown-item');

  if (menuItems.length > 0) {
    menuItems[0].focus();
  }

  menuItems.forEach((item, index) => {
    item.addEventListener('click', () => {
      const page = item.getAttribute('data-page');
      if (page) {
        exitBIOS(page);
      }
    });

    item.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        const page = item.getAttribute('data-page');
        if (page) {
          exitBIOS(page);
        }
      }
    });
  });

  if (dropdownTrigger && dropdown) {
    dropdownTrigger.addEventListener('click', () => {
      dropdownOpen = !dropdownOpen;
      dropdown.classList.toggle('active', dropdownOpen);
    });

    dropdownTrigger.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        dropdownOpen = !dropdownOpen;
        dropdown.classList.toggle('active', dropdownOpen);
      }
    });
  }

  dropdownItems.forEach(item => {
    item.addEventListener('click', () => {
      const lang = item.getAttribute('data-lang');
      if (lang && window.langManager) {
        window.langManager.setLang(lang);
        const currentLangEl = document.getElementById('currentLang');
        if (currentLangEl) {
          currentLangEl.textContent = langNames[lang] || lang.toUpperCase();
        }
        dropdownItems.forEach(di => di.classList.remove('active'));
        item.classList.add('active');
        dropdown.classList.remove('active');
        dropdownOpen = false;
      }
    });
  });

  const currentLang = window.langManager ? window.langManager.getLang() : 'fr';
  const currentLangEl = document.getElementById('currentLang');
  if (currentLangEl) {
    currentLangEl.textContent = langNames[currentLang] || currentLang.toUpperCase();
  }
  dropdownItems.forEach(item => {
    if (item.getAttribute('data-lang') === currentLang) {
      item.classList.add('active');
    }
  });
}

document.addEventListener('keydown', (e) => {
  const allItems = Array.from(document.querySelectorAll('.menu-item'));
  const focusedIndex = allItems.findIndex(item => item === document.activeElement);

  if (e.key === 'ArrowDown') {
    e.preventDefault();
    const nextIndex = (focusedIndex + 1) % allItems.length;
    allItems[nextIndex].focus();
  } else if (e.key === 'ArrowUp') {
    e.preventDefault();
    const prevIndex = (focusedIndex - 1 + allItems.length) % allItems.length;
    allItems[prevIndex].focus();
  } else if (e.key === 'Escape') {
    exitBIOS('../index.html');
  } else if (e.key === 'F1') {
    e.preventDefault();
    alert('Navigation Help:\n\nUse Arrow Keys to move\nPress Enter to select\nPress ESC to exit');
  } else if (e.key === 'F10') {
    e.preventDefault();
    exitBIOS('../index.html');
  }
});

updateTime();
setInterval(updateTime, 1000);

document.addEventListener('DOMContentLoaded', () => {
  initMenu();
  if (typeof window.translatePage === 'function') {
    window.translatePage();
  }
});

