import { AnimatePresence, motion } from 'framer-motion'

import TaskItem from '../TaskItem/TaskItem'
import EmptyState from '../EmptyState/EmptyState'

import styles from './TaskList.module.scss'

const TaskList = ({ tasks, onToggleTask, onDeleteTask, onEditTask, theme }) => {
  const isEmpty = tasks.length === 0

  const motionProps = {
    initial: { opacity: 1 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
    transition: { duration: 0.2 }
  }

  return (
    <div className={styles.taskListWrapper}>
      <AnimatePresence mode="wait">
        {isEmpty ? (
          <EmptyState
            key="empty"
            theme={theme}
          />
        ) : (
          <motion.ul
            key="task-list"
            className={styles.taskList}
            {...motionProps}
          >
            <AnimatePresence mode="popLayout">
              {tasks.map((task) => (
                <TaskItem
                  key={task.id}
                  task={task}
                  onToggleTask={onToggleTask}
                  onDeleteTask={onDeleteTask}
                  onEditTask={onEditTask}
                />
              ))}
            </AnimatePresence>
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  )
}

export default TaskList