import { useCallback, useEffect, useRef, useState } from 'react'

import Input from '@/components/Input/Input'
import Button from '@/components/Button/Button'

import { cn } from '@/utils/utils'

import styles from './Modal.module.scss'

const Modal = ({ isOpen, onClose, onSubmit }) => {
  const [inputValue, setInputValue] = useState('')
  const [isRendered, setIsRendered] = useState(false)
  const [isVisible, setIsVisible] = useState(false)

  const modalRef = useRef(null)
  const inputRef = useRef(null)

  const isInputEmpty = inputValue.trim() === ''

  const handleApply = (e) => {
    e.preventDefault()

    const taskText = inputValue.trim()
    if (!taskText) return
    onSubmit(taskText)
    handleClose()
  }

  const handleClose = useCallback(() => {
    setInputValue('')
    onClose()
  }, [onClose])

  const handleFocusTrap = (e) => {
    if (e.key !== 'Tab') return

    const focusableElements = modalRef.current.querySelectorAll('input, button:not([disabled])')
    if (!focusableElements.length) return

    const first = focusableElements[0]
    const last = focusableElements[focusableElements.length - 1]

    if (e.shiftKey) {
      if (document.activeElement === first) {
        e.preventDefault()
        last.focus()
      }
    } else {
      if (document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }
  }

  useEffect(() => {
    let timer
    if (isOpen) {
      setIsRendered(true)

      timer = setTimeout(() => setIsVisible(true), 0)
    } else if (isRendered) {
      setIsVisible(false)

      timer = setTimeout(() => setIsRendered(false), 300)
      return () => clearTimeout(timer)
    }
  }, [isOpen, isRendered])

  useEffect(() => {
    if (isVisible) {
      inputRef.current.focus()
    }
  }, [isVisible])

  useEffect(() => {
    if (!isRendered) return

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        e.preventDefault()
        handleClose()
      }

      if (e.key === 'Tab') {
        handleFocusTrap(e)
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [handleClose, isRendered])

  if (!isRendered) return null

  return (
    <div
      className={cn(styles.overlay, isVisible && styles.visible)}
      onClick={handleClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <form
        className={cn(styles.modal, isVisible && styles.visible)}
        ref={modalRef}
        onClick={(e) => e.stopPropagation()}
        onSubmit={handleApply}
      >
        <div className={styles.modalHeader}>
          <h2 className={styles.modalTitle} id="modal-title">New Task</h2>
          <div className={styles.modalInputWrapper}>
            <label className="visually-hidden" htmlFor="newTask">New Task</label>
            <Input
              ref={inputRef}
              id="newTask"
              value={inputValue}
              maxLength={55}
              onChange={setInputValue}
              placeholder="Input your task..."
              showSearchIcon={false}
            />
          </div>
        </div>
        <div className={styles.modalFooter}>
          <Button
            variant="cancel"
            onClick={handleClose}
            type="button"
          >
            Cancel
          </Button>

          <Button
            variant="apply"
            type="submit"
            disabled={isInputEmpty}
          >
            Apply
          </Button>
        </div>
      </form>
    </div>
  )
}

export default Modal