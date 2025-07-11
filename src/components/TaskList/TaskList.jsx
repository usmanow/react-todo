import TaskItem from '../TaskItem/TaskItem'

import styles from './TaskList.module.scss'

const TaskList = ({ tasks, onToggleTask, onDeleteTask }) => {
  return (
    <div className={styles.taskListWrapper}>
      <ul className={styles.taskList}>
        {tasks.map(task => (
          <TaskItem
            key={task.id}
            task={task}
            onToggleTask={onToggleTask}
            onDeleteTask={onDeleteTask}
          />
        ))}
      </ul>
    </div>
  )
}

export default TaskList