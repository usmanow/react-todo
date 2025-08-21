import { AnimatePresence, motion } from 'framer-motion'

import TaskItem from '../TaskItem/TaskItem'
import EmptyState from '../EmptyState/EmptyState'
import Button from '../../ui/Button/Button'

import styles from './TaskList.module.scss'

const TaskList = ({ tasks, onToggleTask, onDeleteTask, onEditTask, onDeleteTasks, theme }) => {
  const isEmpty = tasks.length === 0

  const motionProps = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
    transition: { duration: 0.2 }
  }

  return (
    <div className={styles.taskListContainer}>

      <AnimatePresence>
        {!isEmpty && (
          <motion.div
            {...motionProps}
          >
            <Button
              onClick={onDeleteTasks}
              className={styles.clearButton}
              variant="clear"
            >
              Clear All
            </Button>
          </motion.div>
        )}
      </AnimatePresence>

      <div className={styles.taskListWrapper}>
        <AnimatePresence mode="wait">
          {isEmpty ? (
            <EmptyState
              key="empty"
              theme={theme}
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