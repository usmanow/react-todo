import { motion } from 'framer-motion'

import { useEffect, useRef, useState } from 'react'

import EditIcon from '@/icons/EditIcon/EditIcon'
import DeleteIcon from '@/icons/DeleteIcon/DeleteIcon'
import CheckmarkIcon from '@/icons/CheckmarkIcon/CheckmarkIcon'
import CloseIcon from '@/icons/CloseIcon/CloseIcon'

import { cn } from '@/utils/utils'

import styles from './TaskItem.module.scss'

const TaskItem = ({ task, onToggleTask, onDeleteTask, onEditTask }) => {
  const [localCompleted, setIsLocalCompleted] = useState(task.completed)
  const [isEditing, setIsEditing] = useState(false)
  const [editedText, setEditedText] = useState(task.text)

  const timeoutRef = useRef(null)
  const inputRef = useRef(null)

  const date = new Date(task.createdAt)
  const datePart = date.toLocaleDateString('en-GB')
  const timePart = date.toLocaleTimeString('ru-RU', {
    hour: '2-digit',
    minute: '2-digit',
  })
  const createdAt = `${datePart}, ${timePart}`

  const handleToggle = () => {
    setIsLocalCompleted((prev) => !prev)

    timeoutRef.current = setTimeout(() => onToggleTask(task.id), 250)
  }

  const startEditing = () => {
    setEditedText(task.text)
    setIsEditing(true)
  }

  const confirmEdit = () => {
    const trimmed = editedText.trim()

    if (trimmed !== '') {
      onEditTask(task.id, trimmed)
    }

    setIsEditing(false)
  }

  const cancelEdit = () => {
    setEditedText(task.text)
    setIsEditing(false)
  }

  useEffect(() => {
    setIsLocalCompleted(task.completed)
  }, [task.completed])

  useEffect(() => {
    return () => clearTimeout(timeoutRef.current)
  }, [])

  useEffect(() => {
    if (isEditing && inputRef.current) inputRef.current.focus()
  }, [isEditing])

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
          name={`task-${task.id}`}
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

        <div className={styles.taskContainer}>
          {isEditing ? (
            <input
              className={styles.editInput}
              ref={inputRef}
              type="text"
              maxLength={55}
              value={editedText}
              name="editing"
              aria-label="Task name"
              onChange={(e) => setEditedText(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.stopPropagation()
                  confirmEdit()
                }
                if (e.key === 'Escape') {
                  cancelEdit()
                }
              }}
            />
          ) : (
            <div className={cn(styles.taskText, localCompleted && styles.completed)}>
              {task.text}
            </div>
          )}
          <time className={styles.time} dateTime={date.toISOString()}>Added: {createdAt}</time>
        </div>
      </label>

      <div className={styles.taskControls}>
        {!isEditing ? (
          <>
            <button
              className={styles.editButton}
              type="button"
              onClick={startEditing}
              aria-label="Edit task"
            >
              <EditIcon />
            </button>

            <button
              className={styles.deleteButton}
              type="button"
              onClick={() => onDeleteTask(task.id)}
              aria-label="Delete task"
            >
              <DeleteIcon />
            </button>
          </>
        ) : (
          <>
            <button
              className={styles.confirmButton}
              type="button"
              onClick={confirmEdit}
              aria-label="Save changes"
            >
              <CheckmarkIcon className={styles.confirmIcon} />
            </button>

            <button
              className={styles.cancelButton}
              type="button"
              onClick={cancelEdit}
              aria-label="Cancel editing"
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