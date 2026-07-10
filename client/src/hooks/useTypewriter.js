import { useState, useEffect } from 'react'

// Typewriter effect for the hero section.
const useTypewriter = (words) => {
  const [wordIndex, setWordIndex] = useState(0)  // which word we are on
  const [text, setText] = useState('')           // what is shown right now
  const [deleting, setDeleting] = useState(false) // typing or deleting?

  useEffect(() => {
    const currentWord = words[wordIndex]
    let timer

    if (!deleting && text.length < currentWord.length) {
      // Still typing: add one letter after 60 ms
      timer = setTimeout(() => setText(currentWord.slice(0, text.length + 1)), 60)
    } else if (!deleting && text.length === currentWord.length) {
      // Word is complete: pause 2 seconds, then start deleting
      timer = setTimeout(() => setDeleting(true), 2000)
    } else if (deleting && text.length > 0) {
      // Deleting: remove one letter after 30 ms
      timer = setTimeout(() => setText(text.slice(0, -1)), 30)
    } else {
      // Everything deleted: move to the next word and type again
      setDeleting(false)
      setWordIndex((index) => (index + 1) % words.length) // % loops back to 0
    }

    // Cleanup: cancel the timer if the component unmounts
    return () => clearTimeout(timer)
  }, [text, deleting, wordIndex, words])

  return text
}

export default useTypewriter
