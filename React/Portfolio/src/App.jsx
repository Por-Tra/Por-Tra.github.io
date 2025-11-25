import { useState } from 'react'
import Intro from './components/Intro'
import Menu from './components/Menu'
import Projects from './components/Projects'
import About from './components/About'
import CV from './components/CV'
import './App.css'

function App() {
  const [currentPage, setCurrentPage] = useState('intro')

  const handleIntroComplete = () => {
    setCurrentPage('menu')
  }

  const handleNavigate = (page) => {
    setCurrentPage(page)
  }

  return (
    <>
      {currentPage === 'intro' && (
        <Intro onComplete={handleIntroComplete} />
      )}
      {currentPage === 'menu' && (
        <Menu onNavigate={handleNavigate} />
      )}
      {currentPage === 'projects' && (
        <Projects onNavigate={handleNavigate} />
      )}
      {currentPage === 'about' && (
        <About onNavigate={handleNavigate} />
      )}
      {currentPage === 'cv' && (
        <CV onNavigate={handleNavigate} />
      )}
    </>
  )
}

export default App
