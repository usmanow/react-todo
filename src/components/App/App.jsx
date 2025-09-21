import { v4 as uuidv4 } from 'uuid'

import { useEffect, useRef, useState } from 'react'

import { useDebounce } from '../../hooks/useDebounce'
import { useFocusVisible } from '../../hooks/useFocusVisible'
import { useModalShortcut } from '../../hooks/useModalShortcut'
import { useUndoShortcut } from '../../hooks/useUndoShortcut'

import Header from '../Header/Header'
import Modal from '../Modal/Modal'
import OpenModalButton from '../../ui/OpenModalButton/OpenModalButton'
import UndoButton from '../UndoButton/UndoButton'
import TaskList from '../TaskList/TaskList'

import { filterAndSearchTasks } from '../../utils/utils'
import { filterOptions, UNDO_TIME } from '../../constants/constants'

import styles from './App.module.scss'

const App = () => {
  const [tasks, setTasks] = useState(() => JSON.parse(localStorage.getItem('tasks')) || [])
  const [deletedTasksStack, setDeletedTasksStack] = useState([])
  const [undoTimeLeft, setUndoTimeLeft] = useState(UNDO_TIME)
  const [undoAnimationKey, setUndoAnimationKey] = useState(0)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [searchValue, setSearchValue] = useState('')
  const [filterValue, setFilterValue] = useState(filterOptions[0])
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'light')

  const openModalButtonRef = useRef(null)
  const buttonHadFocusRef = useRef(false)

  const showUndo = deletedTasksStack.length > 0

  const debouncedSearchValue = useDebounce(searchValue, 300)
  useFocusVisible()

  const handleOpenModal = (e) => {
    if (e.detail === 0) {
        buttonHadFocusRef.current = true
      } else {
        buttonHadFocusRef.current = false
      }

    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)

    if (buttonHadFocusRef.current && openModalButtonRef.current) {
      setTimeout(() => {
        openModalButtonRef.current.focus()
      }, 0)
      buttonHadFocusRef.current = false
    }
  }

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
    setUndoTimeLeft(UNDO_TIME)
    setUndoAnimationKey((prev) => prev + 1)
    setDeletedTasksStack((prevStack) => [...prevStack, { task: taskToDelete, index, type: 'single' }])

    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id))
  }

  const handleClearAllTasks = () => {
    const tasksToDelete = tasks.map((task, index) => ({ task, index }))
    setDeletedTasksStack((prevStack) => [...prevStack, { tasks: tasksToDelete, type: 'all' }])
    setTasks([])
    setUndoTimeLeft(UNDO_TIME)
    setUndoAnimationKey((prev) => prev + 1)
  }

  const toggleTaskCompleted = (id) => {
    setTasks((prevTasks) => prevTasks.map((task) =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ))
  }

  const editTask = (id, newText) => {
    setTasks((prevTasks) => prevTasks.map((task) =>
      task.id === id ? { ...task, text: newText } : task
    ))
  }

  const handleFilterChange = (newFilter) => setFilterValue(newFilter)

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

  const handleToggleTheme = () => {
    const root = document.documentElement
    root.classList.add('theme-transition')

    setTheme((prevTheme) => prevTheme === 'light' ? 'dark' : 'light')

    setTimeout(() => root.classList.remove('theme-transition'), 300)
  }

  useModalShortcut(() => setIsModalOpen(true), isModalOpen)
  useUndoShortcut(handleUndo, showUndo)

  const filteredTasks = filterAndSearchTasks(tasks, filterValue, debouncedSearchValue)

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks))
  }, [tasks])

  useEffect(() => {
    if (deletedTasksStack.length === 0) return

    const timerId = setInterval(() => setUndoTimeLeft((prev) => {
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
          timeLeft={undoTimeLeft}
          totalTime={UNDO_TIME}
          animationKey={undoAnimationKey}
        />
        <OpenModalButton
          ref={openModalButtonRef}
          onClick={handleOpenModal}
        />
      </footer>

      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSubmit={addTask}
      />
    </div>
  )
}

export default App