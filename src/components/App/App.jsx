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

  const [deletedTask, setDeletedTask] = useState(null)
  const [timeLeft, setTimeLeft] = useState(UNDO_TIME)
  const [searchValue, setSearchValue] = useState('')
  const debouncedSearchValue = useDebounce(searchValue, 300)

  const [filterValue, setFilterValue] = useState(filterOptions[0])
  const [isModalOpen, setIsModalOpen] = useState(false)

  const showUndo = deletedTask !== null

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks))
  }, [tasks])

  useEffect(() => {
    if (!deletedTask) return
    setTimeLeft(UNDO_TIME)

    const timerId = setInterval(() => setTimeLeft((prev) => {
      if (prev <= 1) {
        setDeletedTask(null)
        return UNDO_TIME
      }

      return prev - 1
    }), 1000)

    return () => clearInterval(timerId)
  }, [deletedTask])

  const addTask = (text) => {
    const newTask = {
      id: uuidv4(),
      text,
      completed: false
    }

    setTasks((prevTasks) => [...prevTasks, newTask])
  }

  const deleteTask = (id) => {
    const taskToDelete = tasks.find((task) => task.id === id)
    if (!taskToDelete) return

    setDeletedTask(taskToDelete)
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id))
  }

  const handleUndo = () => {
    if (!deletedTask) return

    setTasks((prevTasks) => [...prevTasks, deletedTask])
    setDeletedTask(null)
    setTimeLeft(UNDO_TIME)
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