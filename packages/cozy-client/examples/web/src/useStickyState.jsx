import { useState, useEffect } from 'react'

const useStickyState = (initialValue, lsKey) => {
  const [val, setVal] = useState(initialValue)

  const setValAndSave = newVal => {
    setVal(newVal)
    localStorage.setItem(lsKey, newVal)
  }

  useEffect(() => {
    const savedVal = localStorage.getItem(lsKey)
    if (savedVal && savedVal !== 'null') {
      setVal(savedVal)
    }
  }, [lsKey])

  return [val, setValAndSave]
}

export default useStickyState
