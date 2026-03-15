import { useEffect, useState } from 'react'
import Desktop from './components/Desktop'
import xpLogo from './assets/BOOT-LOGO.png'
import profilePic from './assets/PP.jpg'
import offButton from '../public/icons/off.png'

const BootScreen = () => (
  <div className="xp-boot-screen">
    <div className="xp-boot-logo">
      <img src={xpLogo} alt="Microsoft Windows XP" />
    </div>
    <div className="xp-boot-progress" />
    <span className="xp-boot-copyright">Copyright © Microsoft Corporation</span>
    <span className="xp-boot-brand">Microsoft<sup>®</sup></span>
  </div>
)

const LoginScreen = ({ onContinue }) => (
  <div className="xp-login-screen">
    <div className="xp-login-topbar" />

    <div className="xp-login-body">
      <div className="xp-login-panel">
        <div className="xp-login-left">
          <img src={xpLogo} alt="Microsoft Windows XP" className="xp-login-logo" />
          <p className="xp-login-copy">Pour commencer, cliquez sur votre nom</p>
        </div>

        <div className="xp-login-divider" />

        <div className="xp-login-users">
          <button className="xp-login-user" onClick={onContinue}>
            <div className="xp-login-avatar-wrapper">
              <img src={profilePic} alt="Lucas" className="xp-login-avatar" />
            </div>
            <div>
              <div className="xp-login-name">Lucas</div>
              <div className="xp-login-status">Connecté</div>
            </div>
          </button>
        </div>
      </div>
    </div>

    <div className="xp-login-bottombar">
      <button className="xp-login-shutdown" onClick={onContinue}>
        <img src={offButton} alt="Shut down" className='LoginOffBtn'/>
      </button>
    </div>
  </div>
)

function App() {
  const [stage, setStage] = useState('boot')

  useEffect(() => {
    const timer = setTimeout(() => setStage('login'), 2600)
    return () => clearTimeout(timer)
  }, [])

  if (stage === 'boot') return <BootScreen />
  if (stage === 'login') return <LoginScreen onContinue={() => setStage('desktop')} />
  return <Desktop />
}

export default App

