import CircularTimer from '../../ui/CircularTimer/CircularTimer'
import UndoArrowIcon from '../../ui/icons/UndoArrowIcon/UndoArrowIcon'

import styles from './UndoButton.module.scss'

const UndoButton = ({ show, onUndo, timeLeft, totalTime }) => {
  if (!show) return null

  return (
    <button
      className={styles.undoButton}
      type="button"
      onClick={onUndo}
    >
      <CircularTimer
        timeLeft={timeLeft}
        totalTime={totalTime}
      />
      Undo
      <UndoArrowIcon />
    </button>
  )
}

export default UndoButton
