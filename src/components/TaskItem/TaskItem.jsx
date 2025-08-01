import { motion } from 'framer-motion'

import { useEffect, useRef, useState } from 'react'

import EditIcon from '../../ui/icons/EditIcon/EditIcon'
import DeleteIcon from '../../ui/icons/DeleteIcon/DeleteIcon'
import CheckmarkIcon from '../../ui/icons/CheckmarkIcon/CheckmarkIcon'
import CloseIcon from '../../ui/icons/CloseIcon/CloseIcon'

import { cn } from '../../utils/utils'

import styles from './TaskItem.module.scss'

const TaskItem = ({ task, onToggleTask, onDeleteTask, onEditTask }) => {
  const [localCompleted, setIsLocalCompleted] = useState(task.completed)
  const [isEditing, setIsEditing] = useState(false)
  const [editedText, setEditedText] = useState(task.text)

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

  const handleStartEditing = () => {
    setEditedText(task.text)
    setIsEditing(true)
  }

  const handleConfirmEdit = () => {
    onEditTask(task.id, editedText)
    setIsEditing(false)
  }

  const handleCancelEdit = () => {
    setEditedText(task.text)
    setIsEditing(false)
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
      <label className={cn(styles.taskLabel, isEditing && styles.editing)}>
        <input
          className={cn(styles.checkbox, 'visually-hidden')}
          type="checkbox"
          name="checkbox"
          disabled={isEditing}
          checked={localCompleted}
          onChange={handleToggle}
        />
        <div
          className={cn(
            styles.customCheckbox,
            localCompleted && styles.checkedCheckbox,
            isEditing && styles.disabledCheckbox
          )}
        >
          <CheckmarkIcon className={styles.checkmarkIcon} />
        </div>

        {!isEditing ? (
          <div className={cn(styles.taskText, localCompleted && styles.completed)}>
            {task.text}
          </div>
        ) : (
          <input
            className={styles.editInput}
            type="text"
            value={editedText}
            name="edit"
            autoFocus
            onChange={(e) => setEditedText(e.target.value)}
          />
        )}
      </label>

      <div className={styles.taskControls}>
        {!isEditing ? (
          <>
            <button
              className={styles.editButton}
              type="button"
              onClick={handleStartEditing}
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
          </>
        ) : (
          <>
            <button
              className={styles.confirmButton}
              type="button"
              onClick={handleConfirmEdit}
            >
              <CheckmarkIcon className={styles.confirmIcon} />
            </button>

            <button
              className={styles.cancelButton}
              type="button"
              onClick={handleCancelEdit}
            >
              <CloseIcon />
            </button>
          </>
        )}
      </div>
    </motion.li>
  )
}

export default TaskItem