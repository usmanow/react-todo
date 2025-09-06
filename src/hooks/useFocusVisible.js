import { useEffect } from 'react'

export const useFocusVisible = () => {
  useEffect(() => {
    let isKeyboard = false

    const handleKeyDown = (e) => {
      if (e.key === 'Tab') {
        isKeyboard = true
      }
    }

    const handleMouseDown = () => {
      isKeyboard = false
    }

    const handleTouchStart = () => {
      isKeyboard = false
    }

    const handleFocus = (e) => {
      if (isKeyboard && e.target.classList.contains('js-focus')) {
        e.target.classList.add('focus-visible')
      }
    }

    const handleBlur = (e) => {
      if (e.target.classList.contains('js-focus')) {
        e.target.classList.remove('focus-visible')
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    document.addEventListener('mousedown', handleMouseDown)
    document.addEventListener('touchstart', handleTouchStart)
    document.addEventListener('focusin', handleFocus)
    document.addEventListener('focusout', handleBlur)

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.removeEventListener('mousedown', handleMouseDown)
      document.removeEventListener('touchstart', handleTouchStart)
      document.removeEventListener('focusin', handleFocus)
      document.removeEventListener('focusout', handleBlur)
    }
  }, [])
}