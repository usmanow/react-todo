import { forwardRef } from 'react'
import styles from './OpenModalButton.module.scss'

const OpenModalButton  = forwardRef(({ onClick}, ref) => {
  return (
    <button
      className={styles.openModalButton }
      ref={ref}
      type="button"
      onClick={onClick}
      aria-label="Add new task"
    />
  )
})

export default OpenModalButton