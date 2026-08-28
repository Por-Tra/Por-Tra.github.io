import { useEffect, useState } from 'react'
import Desktop from './components/Desktop'
import xpLogo from './assets/BOOT-LOGO.webp'
import profilePic from './assets/PP.webp'
import offButton from '../public/icons/off.webp'
import { t } from './i18n/text'

const BOOT_SESSION_KEY = 'xp-boot-shown-session-v1'
const DESKTOP_PREF_KEY = 'xp-desktop-preferences-v1'

const COPY = {
  loginHint: {
    FR: 'Pour commencer, cliquez sur votre profil',
    EN: 'To get started, click your profile',
    ES: 'Para comenzar, haz clic en tu perfil',
  },
  statusOnline: {
    FR: 'Connecté',
    EN: 'Signed in',
    ES: 'Conectado',
  },
  shutdownAlt: {
    FR: 'Arrêter',
    EN: 'Shut down',
    ES: 'Apagar',
  },
};

const readStoredLanguage = () => {
  try {
    const raw = globalThis.localStorage?.getItem(DESKTOP_PREF_KEY);
    if (!raw) return 'FR';
    const parsed = JSON.parse(raw);
    return typeof parsed?.currentLanguage === 'string' ? parsed.currentLanguage : 'FR';
  } catch (error) {
    return 'FR';
  }
};

const BootScreen = () => (
  <div className="xp-boot-screen">
    <div className="xp-boot-logo">
      <img src={xpLogo} alt="Microsoft Windows XP" />
    </div>
    <div className="xp-boot-progress" />
    <span className="xp-boot-brand">Portfolio<sup>®</sup></span>
  </div>
)

const LoginScreen = ({ onContinue, currentLanguage }) => (
  <div className="xp-login-screen">
    <div className="xp-login-topbar" />

    <div className="xp-login-body">
      <div className="xp-login-panel">
        <div className="xp-login-left">
          <img src={xpLogo} alt="Microsoft Windows XP" className="xp-login-logo" />
          <p className="xp-login-copy">{t(COPY.loginHint, currentLanguage)}</p>
        </div>

        <div className="xp-login-divider" />

        <div className="xp-login-users">
          <button className="xp-login-user" onClick={onContinue}>
            <div className="xp-login-avatar-wrapper">
              <img src={profilePic} alt="Lucas" className="xp-login-avatar" />
            </div>
            <div>
              <div className="xp-login-name">Lucas</div>
              <div className="xp-login-status">{t(COPY.statusOnline, currentLanguage)}</div>
            </div>
          </button>
        </div>
      </div>
    </div>

    <div className="xp-login-bottombar">
      <button className="xp-login-shutdown" onClick={onContinue}>
        <img src={offButton} alt={t(COPY.shutdownAlt, currentLanguage)} className='LoginOffBtn'/>
      </button>
    </div>
  </div>
)

function App() {
  const [currentLanguage] = useState(() => readStoredLanguage())
  const [stage, setStage] = useState(() => {
    try {
      if (globalThis.sessionStorage?.getItem(BOOT_SESSION_KEY) === '1') {
        return 'desktop'
      }
    } catch (error) {
      // no-op
    }
    return 'boot'
  })

  useEffect(() => {
    if (stage === 'desktop') return

    try {
      globalThis.sessionStorage?.setItem(BOOT_SESSION_KEY, '1')
    } catch (error) {
      // no-op
    }
  }, [stage])

  useEffect(() => {
    if (stage !== 'boot') return

    const timer = setTimeout(() => setStage('login'), 3600) // 3600ms
    return () => clearTimeout(timer)
  }, [stage])

  if (stage === 'boot') return <BootScreen />
  if (stage === 'login') return <LoginScreen onContinue={() => setStage('desktop')} currentLanguage={currentLanguage} />
  return <Desktop />
}

export default App

