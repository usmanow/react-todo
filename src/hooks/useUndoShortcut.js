import { useEffect } from 'react'

export const useUndoShortcut = (onUndo, isVisible) => {
  useEffect(() => {
    const handleKeyDown = (e) => {
      const isInteractiveElement = document.activeElement.tagName === 'INPUT'
      const isMac = navigator.userAgent.toUpperCase().includes('MAC')

      const undoPressed =
        (isMac && e.metaKey && e.key === 'z') ||
        (!isMac && e.ctrlKey && e.key === 'z')

      if (!isVisible || !undoPressed || isInteractiveElement) return

      e.preventDefault()
      onUndo()
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isVisible, onUndo])
}