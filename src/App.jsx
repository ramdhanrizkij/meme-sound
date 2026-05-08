import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [showBubble, setShowBubble] = useState(false)

  useEffect(() => {
    if (!showBubble) {
      return undefined
    }

    const timeoutId = window.setTimeout(() => {
      setShowBubble(false)
    }, 1800)

    return () => {
      window.clearTimeout(timeoutId)
    }
  }, [showBubble])

  const playSound = () => {
    const audio = new Audio('/hidup-jokowi.mp3')
    audio.play()
    setShowBubble(false)
    window.setTimeout(() => {
      setShowBubble(true)
    }, 10)
  }

  return (
    <main className="app">
      <div className="stage">
        {showBubble ? (
          <div className="comic-bubble" aria-live="polite">
            Hidup Jokowi
          </div>
        ) : null}
        <button type="button" className="sound-button" onClick={playSound}>
          <span className="button-shadow" aria-hidden="true"></span>
          <span className="button-base" aria-hidden="true"></span>
          <span className="button-rim" aria-hidden="true"></span>
          <span className="button-top" aria-hidden="true">
            <span className="button-glow"></span>
            <span className="button-gloss"></span>
            <span className="button-speckle"></span>
          </span>
          <span className="sr-only">Putar Suara</span>
        </button>
      </div>
    </main>
  )
}

export default App
