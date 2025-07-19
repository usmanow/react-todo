import { AnimatePresence } from 'framer-motion'

import TaskItem from '../TaskItem/TaskItem'

import styles from './TaskList.module.scss'

const TaskList = ({ tasks, filterValue, onToggleTask, onDeleteTask }) => {
  return (
    <div className={styles.taskListWrapper}>
      <ul className={styles.taskList}>
        <AnimatePresence mode="popLayout">
          {tasks.map(task => (
            <TaskItem
              key={task.id}
              task={task}
              filterValue={filterValue}
              onToggleTask={onToggleTask}
              onDeleteTask={onDeleteTask}
            />
          ))}
        </AnimatePresence>
      </ul>
    </div>
  )
}

export default TaskList