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
import { useFocusVisible } from '../../hooks/useFocusVisible'

const App = () => {
  useFocusVisible()

  const [tasks, setTasks] = useState(() => JSON.parse(localStorage.getItem('tasks')) || [])
  const [deletedTasksStack, setDeletedTasksStack] = useState([])
  const [timeLeft, setTimeLeft] = useState(UNDO_TIME)
  const [animationKey, setAnimationKey] = useState(0)

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [searchValue, setSearchValue] = useState('')
  const debouncedSearchValue = useDebounce(searchValue, 300)
  const [filterValue, setFilterValue] = useState(filterOptions[0])

  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'light')

  const showUndo = deletedTasksStack.length > 0

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks))
  }, [tasks])

  useEffect(() => {
    if (deletedTasksStack.length === 0) return

    const timerId = setInterval(() => setTimeLeft((prev) => {
      if (prev <= 1) {
        setDeletedTasksStack([])
        return 0
      }

      return prev - 1
    }), 1000)

    return () => clearInterval(timerId)
  }, [deletedTasksStack])

  useEffect(() => {
    localStorage.setItem('theme', theme)
    document.documentElement.setAttribute('data-theme', theme)
  }, [theme])

  const addTask = (text) => {
    const newTask = {
      id: uuidv4(),
      text,
      completed: false,
      createdAt: new Date()
    }

    setTasks((prevTasks) => [...prevTasks, newTask])
  }

  const deleteTask = (id) => {
    const index = tasks.findIndex((task) => task.id === id)
    if (index === -1) return

    const taskToDelete = tasks[index]
    setTimeLeft(UNDO_TIME)
    setAnimationKey((prev) => prev + 1)
    setDeletedTasksStack((prevStack) => [...prevStack, { task: taskToDelete, index, type: 'single' }])

    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id))
  }

  const handleClearAllTasks = () => {
    const tasksToDelete = tasks.map((task, index) => ({ task, index }))
    setDeletedTasksStack((prevStack) => [...prevStack, { tasks: tasksToDelete, type: 'all' }])
    setTasks([])
    setTimeLeft(UNDO_TIME)
    setAnimationKey((prev) => prev + 1)
  }

  const handleUndo = () => {
    if (deletedTasksStack.length === 0) return

    const lastDeleted = deletedTasksStack[deletedTasksStack.length - 1]

    if (lastDeleted.type === 'single') {
      const { task, index } = lastDeleted

      setTasks((prevTasks) => {
        const newTasks = [...prevTasks]
        newTasks.splice(index, 0, task)
        return newTasks
      })

    } else if (lastDeleted.type === 'all') {
      setTasks((prevTasks) => {
        const newTasks = [...prevTasks]
        lastDeleted.tasks.forEach(({ task, index }) => newTasks.splice(index, 0, task))
        return newTasks
      })
    }

    setDeletedTasksStack((prevStack) => prevStack.slice(0, -1))
  }

  const toggleTaskCompleted = (id) => {
    setTasks((prevTasks) => prevTasks.map((task) =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ))
  }

  const handleFilterChange = (newFilter) => setFilterValue(newFilter)

  const editTask = (id, newText) => {
    setTasks((prevTasks) => prevTasks.map((task) =>
      task.id === id ? { ...task, text: newText } : task
    ))
  }

  const filteredTasks = filterAndSearchTasks(tasks, filterValue, debouncedSearchValue)

  const handleToggleTheme = () => {
    const root = document.documentElement
    root.classList.add('theme-transition')

    setTheme((prevTheme) => prevTheme === 'light' ? 'dark' : 'light')

    setTimeout(() => root.classList.remove('theme-transition'), 300)
  }

  return (
    <div className={styles.container}>
      <Header
        searchValue={searchValue}
        onSearchChange={setSearchValue}
        filterValue={filterValue}
        onFilterChange={handleFilterChange}
        filterOptions={filterOptions}
        theme={theme}
        onToggleTheme={handleToggleTheme}
      />

      <main className={styles.main}>
        <TaskList
          tasks={filteredTasks}
          totalTasks={tasks.length}
          onToggleTask={toggleTaskCompleted}
          onDeleteTask={deleteTask}
          onDeleteTasks={handleClearAllTasks}
          onEditTask={editTask}
          theme={theme}
        />
      </main>

      <footer className={styles.footer}>
        <UndoButton
          isVisible={showUndo}
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