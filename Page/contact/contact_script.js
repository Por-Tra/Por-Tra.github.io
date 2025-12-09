// ==================== Burger Menu ====================
const burger = document.getElementById('burger');
const menu = document.getElementById('menu');

burger.addEventListener('click', () => {
  menu.classList.toggle('show');
  burger.classList.toggle('active');
});

// Close menu when clicking outside
document.addEventListener('click', e => {
  if (!burger.contains(e.target) && !menu.contains(e.target)) {
    menu.classList.remove('show');
    burger.classList.remove('active');
  }
});

// ==================== Typing Animation ====================
function typeText(element, text, speed = 50) {
  return new Promise(resolve => {
    element.textContent = '';
    let index = 0;

    const interval = setInterval(() => {
      if (index < text.length) {
        element.textContent += text.charAt(index);
        index++;
      } else {
        clearInterval(interval);
        element.classList.add('typed');
        resolve();
      }
    }, speed);
  });
}

// ==================== Start Typing Animations ====================
async function startTyping() {
  const typingElements = document.querySelectorAll('.typing-text');

  for (let elem of typingElements) {
    const text = elem.getAttribute('data-text') || elem.textContent;
    await typeText(elem, text, 50);
    await new Promise(resolve => setTimeout(resolve, 300)); // Pause between elements
  }

  // Show contact items with animation after typing
  const contactItems = document.querySelectorAll('.contact-item');
  contactItems.forEach((item, index) => {
    setTimeout(() => {
      item.style.opacity = '0';
      item.style.transform = 'translateY(30px)';
      setTimeout(() => {
        item.style.transition = 'all 0.6s ease';
        item.style.opacity = '1';
        item.style.transform = 'translateY(0)';
      }, 50);
    }, index * 150);
  });
}

// ==================== Initialization ====================
window.addEventListener('load', () => {
  startTyping();
  initCollapsibles();
});

// ==================== COLLAPSIBLE MENUS (FORMATIONS, EXPÉRIENCES) ====================
function initCollapsibles() {
  // Collapsible lists (formations, expériences)
  const collapsibleHeaders = document.querySelectorAll('.collapsible-header');
  
  collapsibleHeaders.forEach(header => {
    header.addEventListener('click', function() {
      const item = this.closest('.collapsible-item');
      const wasExpanded = item.classList.contains('expanded');
      
      // Close all other items in the same list
      const parentList = item.closest('.collapsible-list');
      if (parentList) {
        parentList.querySelectorAll('.collapsible-item').forEach(otherItem => {
          if (otherItem !== item) {
            otherItem.classList.remove('expanded');
          }
        });
      }
      
      // Toggle current item
      item.classList.toggle('expanded', !wasExpanded);
    });
  });
}
