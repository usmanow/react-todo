import { forwardRef, useImperativeHandle, useRef } from 'react'

import SearchIcon from '../icons/SearchIcon/SearchIcon'

import { cn } from '../../utils/utils'

import styles from './Input.module.scss'

const Input = ({ id, value, placeholder, onChange, showSearchIcon, maxLength }, ref) => {
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
        className={cn(styles.input, 'js-focus')}
        type="text"
        id={id}
        value={value}
        maxLength={maxLength}
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
          aria-label="Clear input"
        >
        </button>
      )}
    </div>
  )
}

export default forwardRef(Input)