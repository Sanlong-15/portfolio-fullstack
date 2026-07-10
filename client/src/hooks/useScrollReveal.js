import { useEffect } from 'react'

/**
 * Finds every element with the class "reveal" on the page and makes it
 * fade/slide in when it scrolls into view (adds the class "is-visible").
 *
 * Pass the current route path as `key` so it re-scans after you navigate
 * to a new page.
 */
export default function useScrollReveal(key) {
  useEffect(() => {
    const elements = document.querySelectorAll('.reveal:not(.is-visible)')
    if (elements.length === 0) return

    // If the browser can't observe, just show everything (safe fallback).
    if (!('IntersectionObserver' in window)) {
      elements.forEach((el) => el.classList.add('is-visible'))
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.12 }
    )

    elements.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [key])
}
