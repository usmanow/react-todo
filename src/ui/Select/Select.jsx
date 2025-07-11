import { useEffect, useRef, useState } from 'react'

import DropdownIcon from '../icons/DropdownIcon/DropdownIcon'

import { cn } from '../../utils/utils'

import styles from './Select.module.scss'

const Select = ({ options, selected, onChange }) => {
  const [isOpen, setIsOpen] = useState(false)
  const wrapperRef = useRef(null)

  const toggleDropdown = () => setIsOpen(prev => !prev)

  const handleSelect = (option) => {
    onChange(option)
    setIsOpen(false)
  }

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div className={styles.selectWrapper} ref={wrapperRef}>
      <button
        className={cn(styles.selectButton, isOpen && styles.open)}
        type="button"
        onClick={toggleDropdown}
      >
        {selected}
        <DropdownIcon className={styles.dropdownIcon} />
      </button>

      {isOpen && (
        <ul className={styles.optionList}>
          {options.map(option => (
            <li
              key={option}
              className={cn(styles.optionItem, option === selected && styles.selected)}
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