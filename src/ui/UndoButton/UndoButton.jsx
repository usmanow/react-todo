import UndoArrowIcon from '../icons/UndoArrowIcon/UndoArrowIcon'

import styles from './UndoButton.module.scss'

const UndoButton = () => {
  return (
    <button
      className={styles.undoButton}
      type="button"
    >
      <div className={styles.timer}></div>
      Undo
      <UndoArrowIcon />
    </button>
  )
}

export default UndoButton