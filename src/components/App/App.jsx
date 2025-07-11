import { v4 as uuidv4 } from 'uuid'

import { useEffect, useState } from 'react'

import Header from '../Header/Header'
import Modal from '../Modal/Modal'
import AddTaskButton from '../../ui/AddTaskButton/AddTaskButton'
import UndoButton from '../../ui/UndoButton/UndoButton'
import TaskList from '../TaskList/TaskList'

import styles from './App.module.scss'

const filterOptions = ['All', 'Complete', 'Incomplete']

const App = () => {
  const [searchValue, setSearchValue] = useState('')
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

  const addTask = (inputValue) => {
    const taskText = inputValue.trim()
    if (taskText === '') return

    const newTask = {
      id: uuidv4(),
      text: taskText,
      completed: false
    }

    setTasks(prevTasks => [...prevTasks, newTask])
  }

  const toggleTaskCompleted = (id) => {
    setTasks(prevTasks => prevTasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ))
  }

  const deleteTask = (id) => setTasks(prevTask => prevTask.filter(task => task.id !== id))

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
          tasks={tasks}
          onToggleTask={toggleTaskCompleted}
          onDeleteTask={deleteTask}
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