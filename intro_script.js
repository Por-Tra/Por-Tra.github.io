/* ==================== Configuration / Translations ==================== */
const translations = {
  fr: { play: 'CLIQUE', press: 'Insérer un disque', slpPrefix: 'SLP' },
  en: { play: 'CLIC', press: 'Insert disk', slpPrefix: 'SLP' }
};

/* ==================== Helpers ==================== */
const $ = sel => document.querySelector(sel);
const qs = sel => document.querySelectorAll(sel);

/* ==================== Language handling ==================== */
const LANG_KEY = 'portfolio_lang';

function getStoredLang() {
  const l = localStorage.getItem(LANG_KEY);
  return l === 'en' || l === 'fr' ? l : (navigator.language && navigator.language.startsWith('fr') ? 'fr' : 'en');
}

function setLang(lang) {
  localStorage.setItem(LANG_KEY, lang);
  applyLang(lang);
}

function applyLang(lang) {
  const t = translations[lang] || translations.en;
  // change texts
  const playBtn = $('#playBtn');
  // update play label — we keep letters as chars
  playBtn.setAttribute('data-label', t.play);
  // hint text
  $('#hint').textContent = t.press;
  // record label prefix
  window.__slpPrefix = t.slpPrefix;
  updateRecordSpeedDisplay();
  // active button
  $('#langFR').classList.toggle('active', lang === 'fr');
  $('#langEN').classList.toggle('active', lang === 'en');
}

/* ==================== PLAY button: build char spans ==================== */
function buildPlayLabel(label) {
  const play = $('#playBtn');
  play.innerHTML = ''; // clear
  // create spans
  for (let i = 0; i < label.length; i++) {
    const ch = label[i];
    const span = document.createElement('span');
    span.className = 'char';
    span.style.setProperty('--i', i);
    span.textContent = ch;
    play.appendChild(span);
  }
}

/* ==================== Clock display (24h) ==================== */
function pad(n) {
  return String(n).padStart(2, '0');
}

function updateTime() {
  const now = new Date();
  const hh = pad(now.getHours()),
    mm = pad(now.getMinutes()),
    ss = pad(now.getSeconds());
  $('#timeDisplay').textContent = `${hh}:${mm}:${ss}`;
  // also update recordSpeed small timer (fake example)
  updateRecordSpeedDisplay();
}

function updateRecordSpeedDisplay() {
  const prefix = window.__slpPrefix || 'SLP';
  // simple uptime style hh:mm:ss since page load
  if (!window.__startTs) window.__startTs = Date.now();
  const diff = Math.floor((Date.now() - window.__startTs) / 1000);
  const h = pad(Math.floor(diff / 3600)),
    m = pad(Math.floor((diff % 3600) / 60)),
    s = pad(diff % 60);
  $('#recordSpeed').textContent = `${prefix} ${h}:${m}:${s}`;
}

/* ==================== Play click behavior + glitch animation ==================== */
const playBtn = $('#playBtn');
const redirectUrl = playBtn.getAttribute('data-redirect') || '';

let animating = false;

function triggerPlay() {
  if (animating) return;
  animating = true;
  playBtn.setAttribute('aria-pressed', 'true');

  // small tactile push
  playBtn.style.transform = 'scale(.98)';

  // Start glitch overlay (visible briefly)
  const gl = $('#glitchOverlay');
  gl.classList.add('active');

  // Play a quick "glitch" effect by cloning the screen into it
  // We'll create colored slices to mimic RGB split
  gl.innerHTML = '';
  const colors = ['rgba(255,0,150,0.06)', 'rgba(0,255,255,0.06)', 'rgba(0,0,0,0.18)'];
  for (let i = 0; i < 6; i++) {
    const s = document.createElement('div');
    s.style.position = 'absolute';
    s.style.inset = '0';
    s.style.transform = `translateY(${(i % 2 ? -6 : 6) * (i / 6)}px)`;
    s.style.mixBlendMode = 'screen';
    s.style.background = `linear-gradient(90deg, ${colors[i % colors.length]}, transparent)`;
    s.style.opacity = 0.55 - i * 0.06;
    gl.appendChild(s);
  }

  // small vibration in page
  document.body.animate(
    [
      { transform: 'translateX(0px)' },
      { transform: 'translateX(6px)' },
      { transform: 'translateX(-6px)' },
      { transform: 'translateX(0px)' }
    ],
    { duration: 500, iterations: 1, easing: 'cubic-bezier(.2,.8,.2,1)' }
  );

  // After 650ms, cut to black
  setTimeout(() => {
    gl.classList.remove('active');
    const cb = $('#cutBlack');
    cb.classList.add('active');

    // small delay then redirect if provided
    setTimeout(() => {
      if (redirectUrl) {
        // redirect after the cut-to-black
        window.location.href = redirectUrl;
      } else {
        // if no redirect: remove black after a moment and let user continue
        setTimeout(() => {
          $('#cutBlack').classList.remove('active');
          animating = false;
          playBtn.style.transform = '';
          playBtn.setAttribute('aria-pressed', 'false');
        }, 600);
      }
    }, 250);
  }, 650);
}

/* ==================== Event Listeners ==================== */
// Click / key handling
playBtn.addEventListener('click', triggerPlay);
playBtn.addEventListener('keydown', e => {
  if (e.key === 'Enter' || e.key === ' ') {
    e.preventDefault();
    triggerPlay();
  }
});

// Language buttons
document.getElementById('langFR').addEventListener('click', () => setLang('fr'));
document.getElementById('langEN').addEventListener('click', () => setLang('en'));

// Small accessibility: focus on play
playBtn.tabIndex = 0;

/* ==================== Initialization ==================== */
// set language from storage (or default)
const initialLang = getStoredLang();
applyLang(initialLang);

// build initial play label
buildPlayLabel($('#playBtn').getAttribute('data-label') || translations[initialLang].play);

// observe changing label when language changes (rebuild)
const observer = new MutationObserver(() => {
  const label = $('#playBtn').getAttribute('data-label') || translations[getStoredLang()].play;
  buildPlayLabel(label);
});
observer.observe($('#playBtn'), { attributes: true, attributeFilter: ['data-label'] });

// start time updates
updateTime();
setInterval(updateTime, 1000);

// start fake record timer
updateRecordSpeedDisplay();
setInterval(updateRecordSpeedDisplay, 1000);

/* ==================== Animation cleanup ==================== */
document.addEventListener('animationend', e => {
  if (e.animationName === 'glitchSequence') {
    $('#glitchOverlay').classList.remove('active');
  }
});
