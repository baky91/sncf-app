import axios from 'axios'
import { useEffect, useState } from 'react'

function useFetch(url, dependancies) {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const controller = new AbortController()
    const signal = controller.signal

    const fetch = async () => {
      try {
        const response = await axios.get(url, { signal })

        setData(response.data)
      } catch (e) {
        setData([])
        if (!e.isAxiosError && e.response) {
          setError('Error')
        }
        console.error('Erreur :', e)
      }
      setLoading(false)
    }

    fetch()

    return () => controller.abort()
  }, dependancies)

  return { data, loading, error }
}

export default useFetch
