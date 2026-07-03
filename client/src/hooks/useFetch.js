import { useState, useEffect } from 'react'

/**
 * Custom hook for loading data from the API.
 *
 * Every page that loads data needs the same three things:
 *   - loading : true while we wait for the server
 *   - error   : text if something went wrong
 *   - data    : the result when it worked
 * This hook writes that logic once, so pages stay short.
 *
 * Usage:  const { data, loading, error, refetch } = useFetch(getProjects)
 */
const useFetch = (fetchFunction) => {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  // Changing this number re-runs the effect below. That is how refetch works.
  const [reloadCount, setReloadCount] = useState(0)

  useEffect(() => {
    // Step 1: define an async function that talks to the API
    const loadData = async () => {
      try {
        setLoading(true)
        setError('')
        const result = await fetchFunction() // e.g. GET /api/projects
        setData(result.data)                 // save the projects in state
      } catch (err) {
        setError(err.message)                // save the error text instead
      } finally {
        setLoading(false)                    // stop the spinner either way
      }
    }
    // Step 2: run it
    loadData()
    // fetchFunction is an imported API function that never changes,
    // so the effect only re-runs when reloadCount changes.
  }, [reloadCount]) // eslint-disable-line react-hooks/exhaustive-deps

  // Calling refetch() bumps the counter, which re-runs the effect above.
  const refetch = () => setReloadCount((count) => count + 1)

  return { data, loading, error, refetch }
}

export default useFetch
