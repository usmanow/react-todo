import EditIcon from '../../ui/icons/EditIcon/EditIcon'
import DeleteIcon from '../../ui/icons/DeleteIcon/DeleteIcon'
import CheckmarkIcon from '../../ui/icons/CheckmarkIcon/CheckmarkIcon'

import { cn } from '../../utils/utils'

import styles from './TaskItem.module.scss'

const TaskItem = ({ task }) => {
  return (
    <li className={styles.taskItem}>
      <label className={styles.taskContent}>
        <input
          className={cn(styles.checkbox, 'visually-hidden')}
          type="checkbox"
          name="checkbox"
        />
        <span className={styles.customCheckbox}>
          <CheckmarkIcon className={styles.checkmarkIcon} />
        </span>
        <span className={styles.taskText}>{task.text}</span>
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
        >
          <DeleteIcon />
        </button>
      </div>
    </li>
  )
}

export default TaskItem