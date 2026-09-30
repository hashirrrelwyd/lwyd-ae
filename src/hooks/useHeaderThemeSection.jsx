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
      // only the strip at the top of the screen (where the navbar sits) counts,
      // so the theme follows whichever section is actually behind the navbar
      { rootMargin: "0px 0px -90% 0px", threshold: 0 }
    )
    observer.observe(ref.current)
    return () => observer.disconnect()
  }, [ref, theme, setTheme])
}
