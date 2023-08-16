import { useEffect } from 'react'
import { history } from '../components/Router'

export const useTracking = (trackingId) => {

  useEffect(() => {
    const unlisten = history.listen((location) => {
      // if you pasted the google snippet on your index.html
      // you've declared this function in the global
      if (!window.gtag) return

      window.gtag('config', trackingId, { page_path: location.pathname })
    })

    // remember, hooks that add listeners
    // should have cleanup to remove them
    return unlisten
  }, [trackingId])
}