import { useEffect } from "react"
import { useTheme } from "../context/HeaderThemeContext"

export function useSectionTheme(ref, theme) {
  const { setTheme } = useTheme()

  useEffect(() => {
    if (!ref.current) return
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTheme(theme)
          }
        })
      },
      { threshold: 0.5 } // section should be at least 50% visible
    )
    observer.observe(ref.current)
    return () => observer.disconnect()
  }, [ref, theme, setTheme])
}
