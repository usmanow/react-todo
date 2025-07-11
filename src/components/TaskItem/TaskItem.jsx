import EditIcon from '../../ui/icons/EditIcon/EditIcon'
import DeleteIcon from '../../ui/icons/DeleteIcon/DeleteIcon'
import CheckmarkIcon from '../../ui/icons/CheckmarkIcon/CheckmarkIcon'

import { cn } from '../../utils/utils'

import styles from './TaskItem.module.scss'

const TaskItem = ({ task, onToggleTask, onDeleteTask }) => {
  return (
    <li className={styles.taskItem}>
      <label className={styles.taskLabel}>
        <input
          className={cn(styles.checkbox, 'visually-hidden')}
          type="checkbox"
          name="checkbox"
          checked={task.completed}
          onChange={() => onToggleTask(task.id)}
        />
        <div className={cn(styles.customCheckbox, task.completed && styles.checkedCheckbox)}>
          <CheckmarkIcon className={styles.checkmarkIcon} />
        </div>
        <div className={cn(styles.taskText, task.completed && styles.completed)}>
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
    </li>
  )
}

export default TaskItem