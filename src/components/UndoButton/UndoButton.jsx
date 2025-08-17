import CircularTimer from '../../ui/CircularTimer/CircularTimer'
import UndoArrowIcon from '../../ui/icons/UndoArrowIcon/UndoArrowIcon'

import { cn } from '../../utils/utils'

import styles from './UndoButton.module.scss'

const UndoButton = ({ isVisible, onUndo, timeLeft, totalTime, animationKey }) => {
  return (
    <button
      className={cn(styles.undoButton, isVisible && styles.visible)}
      type="button"
      onClick={onUndo}
    >
      <CircularTimer
        animationKey={animationKey}
        timeLeft={timeLeft}
        totalTime={totalTime}
      />
      <UndoArrowIcon />
      <span className={styles.undoText}>Undo</span>
    </button>
  )
}

export default UndoButton
