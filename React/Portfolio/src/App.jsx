import { useState } from 'react'
import Intro from './components/Intro'
import './App.css'

function App() {
  const [showIntro, setShowIntro] = useState(true)

  const handleIntroComplete = () => {
    setShowIntro(false)
    // Ici vous pourrez ajouter la navigation vers le menu principal
    console.log('Intro terminée - prêt pour le menu principal')
  }

  return (
    <>
      {showIntro ? (
        <Intro onComplete={handleIntroComplete} />
      ) : (
        <div style={{ padding: '2rem', color: 'white' }}>
          <h1>Menu Principal</h1>
          <p>Le contenu principal du portfolio sera ici...</p>
        </div>
      )}
    </>
  )
}

export default App
