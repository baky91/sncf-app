import axios from 'axios'
import { useEffect, useRef, useState } from 'react'

function useFetch(url, dependancies) {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const renderAfterCalled = useRef(false)
  renderAfterCalled.current = false

  useEffect(() => {
    if (!renderAfterCalled.current) {
      setData([])
      axios(url)
        .then((res) => setData(res.data))
        .catch((e) => {
          setError('Erreur')
          console.error('Erreur :', e)
        })
        .finally(() => setLoading(false))
    }
    renderAfterCalled.current = true
  }, dependancies)

  return { data, loading, error }
}

export default useFetch
