import { forwardRef, useImperativeHandle, useRef } from 'react'

import SearchIcon from '../icons/SearchIcon/SearchIcon'

import { cn } from '../../utils/utils'

import styles from './Input.module.scss'

const Input = ({ name, value, placeholder, onChange, showSearchIcon }, ref) => {
  const inputRef = useRef(null)

  useImperativeHandle(ref, () => ({
    focus: () => inputRef.current.focus()
  }))

  const handleClear = () => {
    onChange('')
    inputRef.current.focus()
  }

  return (
    <div className={cn(styles.inputWrapper, !showSearchIcon && styles.noIcon)}>
      <input
        className={styles.input}
        type="text"
        name={name}
        value={value}
        placeholder={placeholder}
        ref={inputRef}
        onChange={(e) => onChange(e.target.value)}
      />

      {showSearchIcon && <SearchIcon className={styles.searchIcon} />}

      {value && (
        <button
          className={styles.clearButton}
          type="button"
          onClick={handleClear}
        >
        </button>
      )}
    </div>
  )
}

export default forwardRef(Input)