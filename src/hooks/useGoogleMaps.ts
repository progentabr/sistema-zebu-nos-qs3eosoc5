import { useState, useEffect } from 'react'

const API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY

export function useGoogleMaps() {
  const [isLoaded, setIsLoaded] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!API_KEY) {
      setError('API Key not configured')
      return
    }

    if ((window as any).google && (window as any).google.maps) {
      setIsLoaded(true)
      return
    }

    const scriptId = 'google-maps-script'
    const existingScript = document.getElementById(scriptId)

    if (existingScript) {
      existingScript.addEventListener('load', () => setIsLoaded(true))
      existingScript.addEventListener('error', () =>
        setError('Failed to load Google Maps script'),
      )
      return
    }

    const script = document.createElement('script')
    script.id = scriptId
    script.src = `https://maps.googleapis.com/maps/api/js?key=${API_KEY}&libraries=drawing,geometry`
    script.async = true
    script.defer = true
    script.onload = () => setIsLoaded(true)
    script.onerror = () => setError('Failed to load Google Maps script')

    document.head.appendChild(script)
  }, [])

  return { isLoaded, error }
}
