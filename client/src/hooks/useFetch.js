import { useState, useEffect, useCallback } from 'react'

/**
 * Custom hook for data loading with the three UI states
 * the assessment asks for: loading, error, and data.
 */
const useFetch = (fetcher) => {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const load = useCallback(async () => {
    try {
      setLoading(true)
      setError('')
      const result = await fetcher()
      setData(result.data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }, [fetcher])

  useEffect(() => {
    load()
  }, [load])

  // refetch lets pages reload after create/update/delete
  return { data, loading, error, refetch: load }
}

export default useFetch
