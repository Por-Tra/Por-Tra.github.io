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
    await new Promise(resolve => setTimeout(resolve, 300));
  }

  // Show sections with animation after typing
  const sections = document.querySelectorAll('.cv-section, .cv-info');
  sections.forEach((section, index) => {
    setTimeout(() => {
      section.style.opacity = '0';
      section.style.transform = 'translateY(30px)';
      setTimeout(() => {
        section.style.transition = 'all 0.8s ease';
        section.style.opacity = '1';
        section.style.transform = 'translateY(0)';
      }, 50);
    }, index * 200);
  });
}

// ==================== Initialization ====================
window.addEventListener('load', () => {
  startTyping();
});
