import { useEffect, useRef } from 'react'

/**
 * Adds the "visible" class to .reveal children when the section
 * scrolls into view. Uses IntersectionObserver (no scroll listeners).
 */
const useScrollReveal = () => {
  const ref = useRef(null)

  useEffect(() => {
    const root = ref.current
    if (!root) return
    const items = root.querySelectorAll('.reveal')
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.15 }
    )
    items.forEach((item) => observer.observe(item))
    return () => observer.disconnect()
  }, [])

  return ref
}

export default useScrollReveal
