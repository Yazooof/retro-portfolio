import { useState, useEffect, useCallback } from 'react'

const KONAMI_CODE = [
  'ArrowUp', 'ArrowUp',
  'ArrowDown', 'ArrowDown',
  'ArrowLeft', 'ArrowRight',
  'ArrowLeft', 'ArrowRight',
  'b', 'a'
]

export const useKonamiCode = (callback) => {
  const [index, setIndex] = useState(0)

  const handleKeyDown = useCallback((e) => {
    const key = e.key.toLowerCase() === e.key ? e.key : e.key
    const expectedKey = KONAMI_CODE[index]

    if (key === expectedKey || key.toLowerCase() === expectedKey.toLowerCase()) {
      if (index === KONAMI_CODE.length - 1) {
        callback()
        setIndex(0)
      } else {
        setIndex(index + 1)
      }
    } else {
      setIndex(0)
    }
  }, [index, callback])

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [handleKeyDown])

  return index
}

export default useKonamiCode
