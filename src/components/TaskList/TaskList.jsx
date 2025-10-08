import { AnimatePresence, motion } from 'framer-motion'

import TaskItem from '@/components/TaskItem/TaskItem'
import EmptyState from '@/components/EmptyState/EmptyState'
import Button from '@/components/Button/Button'

import styles from './TaskList.module.scss'

const TaskList = ({
  tasks,
  totalTasks,
  onToggleTask,
  onDeleteTask,
  onEditTask,
  onDeleteTasks,
  theme
}) => {
  const hasTasks = totalTasks > 0
  const hasFilteredTasks = tasks.length > 0

  let emptyMessage

  if (!hasTasks) {
    emptyMessage = 'No tasks yet'
  } else if (!hasFilteredTasks) {
    emptyMessage = 'No results found'
  }

  const motionProps = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
    transition: { duration: 0.2 }
  }

  return (
    <div className={styles.taskListContainer}>

      <AnimatePresence>
        <motion.div className={styles.taskHeader}
          {...motionProps}
        >
          <Button
            onClick={onDeleteTasks}
            className={styles.clearButton}
            variant="clear"
            disabled={!hasTasks}
          >
            Clear All
          </Button>

          <span className={styles.taskQuantity}>Showing <span className={styles.tasksShown}>{tasks.length}</span> of {totalTasks}</span>
        </motion.div>
      </AnimatePresence>

      <div className={styles.taskListBody}>
        <AnimatePresence mode="wait">
          {!hasFilteredTasks ? (
            <EmptyState
              key="empty"
              theme={theme}
              message={emptyMessage}
            />
          ) : (
            <motion.ul
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
    </div>
  )
}

export default TaskList