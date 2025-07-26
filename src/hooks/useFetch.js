import axios from 'axios'
import { useEffect, useRef, useState } from 'react'

function useFetch(url, dependancies) {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const renderAfterCalled = useRef(false)
  renderAfterCalled.current = false

  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await axios.get(url)

        setData(response.data)
      } catch (e) {
        if (!e.isAxiosError && e.response) {
          setError('Error')
        }
        console.error('Erreur :', e)
      }
      setLoading(false)
    }

    if (!renderAfterCalled.current) {
      fetch()
    }
    renderAfterCalled.current = true
  }, dependancies)

  return { data, loading, error }
}

export default useFetch
