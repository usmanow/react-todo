import { v4 as uuidv4 } from 'uuid'

import { useEffect, useState } from 'react'
import { useDebounce } from '../../hooks/useDebounce'

import Header from '../Header/Header'
import Modal from '../Modal/Modal'
import AddTaskButton from '../../ui/AddTaskButton/AddTaskButton'
import UndoButton from '../UndoButton/UndoButton'
import TaskList from '../TaskList/TaskList'

import { filterAndSearchTasks } from '../../utils/utils'
import { filterOptions, UNDO_TIME } from '../../constants/constants'

import styles from './App.module.scss'

const App = () => {
  const [tasks, setTasks] = useState(() => {
    const storedTasks = localStorage.getItem('tasks')
    return storedTasks ? JSON.parse(storedTasks) : []
  })

  const [isModalOpen, setIsModalOpen] = useState(false)

  const [deletedTasksStack, setDeletedTasksStack] = useState([])
  const [timeLeft, setTimeLeft] = useState(UNDO_TIME)
  const [animationKey, setAnimationKey] = useState(0)

  const [searchValue, setSearchValue] = useState('')
  const debouncedSearchValue = useDebounce(searchValue, 300)

  const [filterValue, setFilterValue] = useState(filterOptions[0])

  const showUndo = deletedTasksStack.length > 0

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks))
  }, [tasks])

  useEffect(() => {
    if (deletedTasksStack.length === 0) {
      setTimeLeft(UNDO_TIME)
      return
    }

    setTimeLeft(UNDO_TIME)

    const timerId = setInterval(() => setTimeLeft((prev) => {
      if (prev <= 1) {
        setDeletedTasksStack([])
        return UNDO_TIME
      }

      return prev - 1
    }), 1000)

    return () => clearInterval(timerId)
  }, [deletedTasksStack])

  useEffect(() => {
    if (deletedTasksStack.length > 0) {
      setAnimationKey((prev) => prev + 1)
    }
  }, [deletedTasksStack])

  const addTask = (text) => {
    const newTask = {
      id: uuidv4(),
      text,
      completed: false
    }

    setTasks((prevTasks) => [...prevTasks, newTask])
  }

  const deleteTask = (id) => {
    const index = tasks.findIndex((task) => task.id === id)
    if (index === -1) return

    const taskToDelete = tasks[index]
    setDeletedTasksStack((prevStack) => [...prevStack, { task: taskToDelete, index }])

    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id))
  }

  const handleUndo = () => {
    if (deletedTasksStack.length === 0) return

    const lastDeleted = deletedTasksStack[deletedTasksStack.length - 1]
    const { task, index } = lastDeleted

    setTasks((prevTasks) => {
      const newTasks = [...prevTasks]
      newTasks.splice(index, 0, task)
      return newTasks
    })

    setDeletedTasksStack((prevStack) => prevStack.slice(0, -1))
  }

  const toggleTaskCompleted = (id) => {
    setTasks((prevTasks) => prevTasks.map((task) =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ))
  }

  const handleFilterChange = (newFilter) => setFilterValue(newFilter)

  const handleEditTask = (id, newText) => {
    setTasks((prevTasks) => prevTasks.map((task) =>
      task.id === id ? { ...task, text: newText } : task
    ))
  }

  const filteredTasks = filterAndSearchTasks(tasks, filterValue, debouncedSearchValue)

  return (
    <div className={styles.container}>
      <Header
        searchValue={searchValue}
        onSearchChange={setSearchValue}
        filterValue={filterValue}
        onFilterChange={handleFilterChange}
        filterOptions={filterOptions}
      />

      <main className={styles.main}>
        <TaskList
          tasks={filteredTasks}
          onToggleTask={toggleTaskCompleted}
          onDeleteTask={deleteTask}
          onEditTask={handleEditTask}
        />
      </main>

      <footer className={styles.footer}>
        <UndoButton
          show={showUndo}
          onUndo={handleUndo}
          timeLeft={timeLeft}
          totalTime={UNDO_TIME}
          animationKey={animationKey}
        />
        <AddTaskButton
          onClick={() => setIsModalOpen(true)}
        />
      </footer>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={addTask}
      />
    </div>
  )
}

export default App