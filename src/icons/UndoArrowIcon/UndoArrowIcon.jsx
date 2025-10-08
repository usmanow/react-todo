import styles from './UndoArrowIcon.module.scss'

const UndoArrowIcon = () => {
  return (
    <svg
      className={styles.undoIcon}
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <g
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      >
        <path d="m8 5l-5 5l5 5"></path>
        <path d="M3 10h8c5.523 0 10 4.477 10 10v1"></path>
      </g>
    </svg>
  )
}

export default UndoArrowIcon