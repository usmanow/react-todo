import { useCallback, useEffect, useRef, useState } from 'react'

import DropdownIcon from '../icons/DropdownIcon/DropdownIcon'

import { cn } from '../../utils/utils'

import styles from './Select.module.scss'

const Select = ({ options, selected, onChange, id }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [activeIndex, setActiveIndex] = useState(null)
  const wrapperRef = useRef(null)
  const buttonRef = useRef(null)

  const toggleDropdown = () => {
    setIsOpen((prev) => {
      if (!prev) {
        setActiveIndex(null)
      }
      return !prev
    })
  }

  const handleSelect = useCallback((option) => {
    onChange(option)
    setIsOpen(false)
  }, [onChange])

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isOpen) return

      if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
        e.preventDefault()

        let nextIndex

        if (activeIndex === null) {
          nextIndex = options.indexOf(selected)
        } else if (e.key === 'ArrowDown') {
          nextIndex = (activeIndex + 1) % options.length
        } else {
          nextIndex = (activeIndex - 1 + options.length) % options.length
        }

        setActiveIndex(nextIndex)
      }

      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault()

        if (activeIndex !== null) {
          handleSelect(options[activeIndex])
        } else {
          setIsOpen(false)
        }
      }

      if (e.key === 'Escape') {
        setIsOpen(false)
        buttonRef.current?.focus()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [activeIndex, handleSelect, isOpen, options, selected])

  return (
    <div className={styles.selectWrapper} ref={wrapperRef}>
      <button
        className={cn(styles.selectButton, isOpen && styles['selectButton--open'])}
        id={id}
        ref={buttonRef}
        type="button"
        onClick={toggleDropdown}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-controls={`${id}-list`}
      >
        {selected}
        <DropdownIcon className={styles.dropdownIcon} />
      </button>

      {isOpen && (
        <ul
          id={`${id}-list`}
          className={styles.optionList}
          role="listbox"
          aria-labelledby={id}
          aria-activedescendant={`${id}-option-${activeIndex ?? options.indexOf(selected)}`}
        >
          {options.map((option, index) => (
            <li
              key={`${id}-option-${index}`}
              id={`${id}-option-${index}`}
              className={cn(
                styles.optionItem,
                option === selected && styles.selected,
                activeIndex === index && styles.active
              )}
              role="option"
              aria-selected={option === selected}
              onClick={() => handleSelect(option)}
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default Select