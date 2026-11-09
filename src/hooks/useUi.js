import { useEffect, useState } from 'react'

export function useReveal() {
  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const elements = document.querySelectorAll('.reveal')
    if (reduce) {
      elements.forEach((el) => el.classList.add('visible'))
      return
    }
    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return
          entry.target.classList.add('visible')
          obs.unobserve(entry.target)
        })
      },
      { threshold: 0.12 },
    )
    elements.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])
}

export function useActiveSection(ids) {
  const [active, setActive] = useState('')
  useEffect(() => {
    const sections = ids.map((id) => document.getElementById(id)).filter(Boolean)
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id)
        })
      },
      { rootMargin: '-35% 0px -55%' },
    )
    sections.forEach((s) => observer.observe(s))
    return () => observer.disconnect()
  }, [ids])
  return active
}
