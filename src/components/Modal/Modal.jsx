import { useEffect, useState } from 'react'

import Input from '../../ui/Input/Input'
import Button from '../../ui/Button/Button'

import { cn } from '../../utils/utils'

import styles from './Modal.module.scss'

const Modal = ({ isOpen, onClose, onSubmit }) => {
  const [inputValue, setInputValue] = useState('')
  const [isRendered, setIsRendered] = useState(false)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    if (isOpen) {
      setIsRendered(true)
      setTimeout(() => setIsVisible(true), 10)
    } else if (isRendered) {
      setIsVisible(false)
      const timer = setTimeout(() => setIsRendered(false), 300)
      return () => clearTimeout(timer)
    }
  }, [isOpen, isRendered])

  const handleApply = () => {
    onSubmit(inputValue)
    setInputValue('')
  }

  if (!isRendered) return null

  return (
    <div
      className={cn(styles.overlay, isVisible && styles.visible)}
      onClick={onClose}
    >
      <form
        className={cn(styles.modal, isVisible && styles.visible)}
        onClick={(e) => e.stopPropagation(e)}
        onSubmit={(e) => {
          e.preventDefault()
          handleApply()
        }}
      >
        <div className={styles.modalHeader}>
          <h2 className={styles.modalTitle}>New Task</h2>
          <div className={styles.modalInputWrapper}>
            <Input
              value={inputValue}
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
            onClick={onClose}
            type="button"
          >
            Cancel
          </Button>

          <Button
            variant="apply"
            onClick={handleApply}
            type="submit"
          >
            Apply
          </Button>
        </div>
      </form>
    </div>
  )
}

export default Modal