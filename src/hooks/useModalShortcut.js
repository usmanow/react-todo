import { useEffect } from 'react'

export const useModalShortcut = (openModal, isModalOpen) => {
  useEffect(() => {
    const handleKeyDown = (e) => {
      const activeElement = document.activeElement
      const isInteractiveElement = activeElement.tagName === 'INPUT' || activeElement.tagName === 'BUTTON'

      if (isModalOpen || e.key !== 'Enter' || isInteractiveElement) return

      openModal()
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isModalOpen, openModal])
}