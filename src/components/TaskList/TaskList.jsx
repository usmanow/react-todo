import TaskItem from '../TaskItem/TaskItem'

import styles from './TaskList.module.scss'

const TaskList = ({ tasks }) => {
  return (
    <div className={styles.taskListWrapper}>
      <ul className={styles.taskList}>
        {tasks.map(task => (
          <TaskItem
            key={task.id}
            task={task}
          />
        ))}
      </ul>
    </div>
  )
}

export default TaskList