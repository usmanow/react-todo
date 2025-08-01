import { v4 as uuidv4 } from 'uuid'

import { useEffect, useState } from 'react'
import { useDebounce } from '../../hooks/useDebounce'

import Header from '../Header/Header'
import Modal from '../Modal/Modal'
import AddTaskButton from '../../ui/AddTaskButton/AddTaskButton'
import UndoButton from '../../ui/UndoButton/UndoButton'
import TaskList from '../TaskList/TaskList'

import { filterAndSearchTasks } from '../../utils/utils'
import { filterOptions } from '../../constants/constants'

import styles from './App.module.scss'

const App = () => {
  const [searchValue, setSearchValue] = useState('')
  const debouncedSearchValue = useDebounce(searchValue, 300)

  const [filterValue, setFilterValue] = useState(filterOptions[0])
  const [isModalOpen, setIsModalOpen] = useState(false)

  const [tasks, setTasks] = useState(() => {
    const storedTasks = localStorage.getItem('tasks')
    return storedTasks ? JSON.parse(storedTasks) : []
  })

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks))
  }, [tasks])

  const handleFilterChange = (newFilter) => setFilterValue(newFilter)

  const addTask = (text) => {
    const newTask = {
      id: uuidv4(),
      text,
      completed: false
    }

    setTasks((prevTasks) => [...prevTasks, newTask])
  }

  const toggleTaskCompleted = (id) => {
    setTasks((prevTasks) => prevTasks.map((task) =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ))
  }

  const deleteTask = (id) => setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id))

  const filteredTasks = filterAndSearchTasks(tasks, filterValue, debouncedSearchValue)

  const handleEditTask = (id, newText) => {
    setTasks((prevTasks) => prevTasks.map((task) =>
      task.id === id ? { ...task, text: newText } : task
    ))
  }

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
        <UndoButton />
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