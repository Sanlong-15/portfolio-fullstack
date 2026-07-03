import { useEffect, useRef } from 'react'

/**
 * Adds the "visible" class to .reveal children when they scroll into view.
 *
 * The `trigger` parameter matters for pages that load data from the API:
 * the effect re-runs when `trigger` changes (for example, when the
 * projects finish loading), so newly rendered cards get observed too.
 * Without it, elements created after page load would stay invisible.
 */
const useScrollReveal = (trigger) => {
  const ref = useRef(null)

  useEffect(() => {
    const root = ref.current
    if (!root) return
    const items = root.querySelectorAll('.reveal:not(.visible)')
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
  }, [trigger])

  return ref
}

export default useScrollReveal
