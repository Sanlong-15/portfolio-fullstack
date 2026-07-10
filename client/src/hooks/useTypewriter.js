import { useState, useEffect } from 'react'

const useTypewriter = (words) => {
  const [wordIndex, setWordIndex] = useState(0)  
  const [text, setText] = useState('')          
  const [deleting, setDeleting] = useState(false) 

  useEffect(() => {
    const currentWord = words[wordIndex]
    let timer

    if (!deleting && text.length < currentWord.length) {
      timer = setTimeout(() => setText(currentWord.slice(0, text.length + 1)), 60)
    } else if (!deleting && text.length === currentWord.length) {
      timer = setTimeout(() => setDeleting(true), 2000)
    } else if (deleting && text.length > 0) {
      timer = setTimeout(() => setText(text.slice(0, -1)), 30)
    } else {
      setDeleting(false)
      setWordIndex((index) => (index + 1) % words.length) 
    }

    return () => clearTimeout(timer)
  }, [text, deleting, wordIndex, words])

  return text
}

export default useTypewriter
