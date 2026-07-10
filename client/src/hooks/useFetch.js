import { useState, useEffect } from 'react'

const useFetch = (fetchFunction) => {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const [reloadCount, setReloadCount] = useState(0)

  useEffect(() => {

    const loadData = async () => {
      try {
        setLoading(true)
        setError('')
        const result = await fetchFunction() 
        setData(result.data)                 
      } catch (err) {
        setError(err.message)                
      } finally {
        setLoading(false)                    
      }
    }

    loadData()
  }, [reloadCount]) 

  const refetch = () => setReloadCount((count) => count + 1)

  return { data, loading, error, refetch }
}

export default useFetch
