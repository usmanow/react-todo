import styles from './CloseIcon.module.scss'

const CloseIcon = () => {
  return (
    <svg
      className={styles.closeIcon}
      viewBox="0 0 24 24"
      fill="none"
    >
    <line
      x1="6"
      y1="6"
      x2="18"
      y2="18"
      stroke='currentColor'
      strokeWidth="2"
      strokeLinecap="round"
    />
    <line
      x1="6"
      y1="18"
      x2="18"
      y2="6"
      stroke='currentColor'
      strokeWidth="2"
      strokeLinecap="round"
    />
    </svg>
  )
}

export default CloseIcon