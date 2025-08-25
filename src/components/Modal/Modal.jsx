import { useEffect, useRef, useState } from 'react'

import Input from '../../ui/Input/Input'
import Button from '../../ui/Button/Button'

import { cn } from '../../utils/utils'

import styles from './Modal.module.scss'

const Modal = ({ isOpen, onClose, onSubmit }) => {
  const [inputValue, setInputValue] = useState('')
  const [isRendered, setIsRendered] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const inputRef = useRef(null)

  const isInputEmpty = inputValue.trim() === ''

  useEffect(() => {
    if (isVisible) {
      inputRef.current.focus()
    }
  }, [isVisible])

  useEffect(() => {
    if (isOpen) {
      setIsRendered(true)

      requestAnimationFrame(() => {
        requestAnimationFrame(() => setIsVisible(true))
      })
    } else if (isRendered) {
      setIsVisible(false)

      const timer = setTimeout(() => setIsRendered(false), 300)
      return () => clearTimeout(timer)
    }
  }, [isOpen, isRendered])

  const handleApply = (e) => {
    e.preventDefault()

    const taskText = inputValue.trim()
    if (!taskText) return
    onSubmit(taskText)
    setInputValue('')
    onClose()
  }

  const handleClose = () => {
    setInputValue('')
    onClose()
  }

  if (!isRendered) return null

  return (
    <div
      className={cn(styles.overlay, isVisible && styles.visible)}
      onClick={handleClose}
    >
      <form
        className={cn(styles.modal, isVisible && styles.visible)}
        onClick={(e) => e.stopPropagation()}
        onSubmit={handleApply}
      >
        <div className={styles.modalHeader}>
          <h2 className={styles.modalTitle}>New Task</h2>
          <div className={styles.modalInputWrapper}>
            <Input
              ref={inputRef}
              value={inputValue}
              maxLength={55}
              name="newTask"
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