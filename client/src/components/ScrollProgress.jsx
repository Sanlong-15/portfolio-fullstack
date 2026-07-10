import { useEffect, useState } from 'react'

/**
 * A thin bar fixed at the top of the page.
 * Its width grows from 0% to 100% as the user scrolls down the page.
 */
export default function ScrollProgress() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const update = () => {
      const scrollTop = window.scrollY
      const height = document.documentElement.scrollHeight - window.innerHeight
      const percent = height > 0 ? (scrollTop / height) * 100 : 0
      setProgress(percent)
    }

    update() // set the starting value
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    return () => {
      window.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
  }, [])

  return (
    <div className="scroll-progress" aria-hidden="true">
      <div className="scroll-progress-bar" style={{ width: `${progress}%` }} />
    </div>
  )
}
