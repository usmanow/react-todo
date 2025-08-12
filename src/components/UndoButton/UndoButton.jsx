import CircularTimer from '../../ui/CircularTimer/CircularTimer'
import UndoArrowIcon from '../../ui/icons/UndoArrowIcon/UndoArrowIcon'

import { cn } from '../../utils/utils'

import styles from './UndoButton.module.scss'

const UndoButton = ({ visible, onUndo, timeLeft, totalTime, animationKey }) => {
  return (
    <button
      className={cn(styles.undoButton, visible && styles.visible)}
      type="button"
      onClick={onUndo}
    >
      <CircularTimer
        animationKey={animationKey}
        timeLeft={timeLeft}
        totalTime={totalTime}
      />
      Undo
      <UndoArrowIcon />
    </button>
  )
}

export default UndoButton
