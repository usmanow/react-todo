import { FILTERS } from '@/constants/constants'

export const cn = (...classes) => classes.filter(Boolean).join(' ')

export const filterAndSearchTasks = (tasks, filterValue, searchValue) => {
  const normalizedSearch = searchValue.trim().toLowerCase()

  return tasks.filter((tasks) => {
    const filterMatch =
      filterValue === FILTERS.ALL ||
      (filterValue === FILTERS.COMPLETE && tasks.completed) ||
      (filterValue === FILTERS.INCOMPLETE && !tasks.completed)

    if (!filterMatch) return false
    if (!normalizedSearch) return true

    return tasks.text.toLowerCase().includes(normalizedSearch)
  })
}