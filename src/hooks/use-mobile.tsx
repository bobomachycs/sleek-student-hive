
import * as React from "react"

const MOBILE_BREAKPOINT = 768

export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState<boolean | undefined>(undefined)

  React.useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`)
    const onChange = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    }
    mql.addEventListener("change", onChange)
    setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    return () => mql.removeEventListener("change", onChange)
  }, [])

  // Return false during SSR, true if mobile, false if desktop
  return typeof isMobile === "undefined" ? false : isMobile
}

// Add additional breakpoint hooks for more granular control
export function useIsTablet() {
  const [isTablet, setIsTablet] = React.useState<boolean | undefined>(undefined)
  
  React.useEffect(() => {
    const mql = window.matchMedia(`(min-width: ${MOBILE_BREAKPOINT}px) and (max-width: 1023px)`)
    const onChange = () => {
      setIsTablet(mql.matches)
    }
    mql.addEventListener("change", onChange)
    setIsTablet(mql.matches)
    return () => mql.removeEventListener("change", onChange)
  }, [])
  
  return typeof isTablet === "undefined" ? false : isTablet
}

export function useIsDesktop() {
  const [isDesktop, setIsDesktop] = React.useState<boolean | undefined>(undefined)
  
  React.useEffect(() => {
    const mql = window.matchMedia(`(min-width: 1024px)`)
    const onChange = () => {
      setIsDesktop(mql.matches)
    }
    mql.addEventListener("change", onChange)
    setIsDesktop(mql.matches)
    return () => mql.removeEventListener("change", onChange)
  }, [])
  
  return typeof isDesktop === "undefined" ? false : isDesktop
}
