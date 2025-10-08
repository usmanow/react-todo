import CircularTimer from '@/components/CircularTimer/CircularTimer'
import UndoArrowIcon from '@/icons/UndoArrowIcon/UndoArrowIcon'

import { cn } from '@/utils/utils'

import styles from './UndoButton.module.scss'

const UndoButton = ({ isVisible, onUndo, timeLeft, totalTime, animationKey }) => {
  return (
    <button
      className={cn(styles.undoButton, isVisible && styles.visible)}
      type="button"
      onClick={onUndo}
      aria-label="Undo last deleted task"
      tabIndex={isVisible ? 0 : -1}
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
