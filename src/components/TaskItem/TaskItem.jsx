import { motion } from 'framer-motion'

import { useEffect, useRef, useState } from 'react'

import EditIcon from '../../ui/icons/EditIcon/EditIcon'
import DeleteIcon from '../../ui/icons/DeleteIcon/DeleteIcon'
import CheckmarkIcon from '../../ui/icons/CheckmarkIcon/CheckmarkIcon'

import { cn } from '../../utils/utils'

import styles from './TaskItem.module.scss'

const TaskItem = ({ task, onToggleTask, onDeleteTask }) => {
  const [localCompleted, setIsLocalCompleted] = useState(task.completed)
  const timeoutRef = useRef(null)

  useEffect(() => {
    setIsLocalCompleted(task.completed)
  }, [task.completed])

  useEffect(() => {
    return () => clearTimeout(timeoutRef.current)
  }, [])

  const handleToggle = () => {
    setIsLocalCompleted((prev) => !prev)

    timeoutRef.current = setTimeout(() => onToggleTask(task.id), 250)
  }

  const motionProps = {
    layout: true,
    initial: { opacity: 0, scale: 0.95 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.95 },
    transition: { duration: 0.2 },
  }

  return (
    <motion.li className={styles.taskItem} {...motionProps}>
      <label className={styles.taskLabel}>
        <input
          className={cn(styles.checkbox, 'visually-hidden')}
          type="checkbox"
          name="checkbox"
          checked={localCompleted}
          onChange={handleToggle}
        />
        <div className={cn(styles.customCheckbox, localCompleted && styles.checkedCheckbox)}>
          <CheckmarkIcon className={styles.checkmarkIcon} />
        </div>
        <div className={cn(styles.taskText, localCompleted && styles.completed)}>
          {task.text}
        </div>
      </label>

      <div className={styles.taskControls}>
        <button
          className={styles.editButton}
          type="button"
        >
          <EditIcon />
        </button>

        <button
          className={styles.deleteButton}
          type="button"
          onClick={() => onDeleteTask(task.id)}
        >
          <DeleteIcon />
        </button>
      </div>
    </motion.li>
  )
}

export default TaskItem