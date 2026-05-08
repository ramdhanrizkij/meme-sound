import { useEffect, useRef, useState } from 'react'
import './App.css'

const soundOptions = [
  {
    src: '/hidup-jokowi.mp3',
    text: 'Hidup Jokowi',
  },
  {
    src: '/jokowi-saya-akan-lawan.mp3',
    text: 'Saya akan lawan',
  },
  {
    src: '/yntkts-yo-ndak-tahu-kok-tanya-saya.mp3',
    text: 'Yo nda tahu kok tanya saya',
  },
]

function App() {
  const [showBubble, setShowBubble] = useState(false)
  const [bubbleText, setBubbleText] = useState(soundOptions[0].text)
  const audioRef = useRef(null)
  const lastSoundIndexRef = useRef(-1)

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

  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current.currentTime = 0
      }
    }
  }, [])

  const playSound = () => {
    let randomIndex = Math.floor(Math.random() * soundOptions.length)

    if (soundOptions.length > 1) {
      while (randomIndex === lastSoundIndexRef.current) {
        randomIndex = Math.floor(Math.random() * soundOptions.length)
      }
    }

    const selectedSound = soundOptions[randomIndex]
    lastSoundIndexRef.current = randomIndex

    if (audioRef.current) {
      audioRef.current.pause()
      audioRef.current.currentTime = 0
    }

    const audio = new Audio(selectedSound.src)
    audioRef.current = audio
    audio.play()
    setBubbleText(selectedSound.text)
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
            {bubbleText}
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
