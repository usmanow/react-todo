import Input from '../../ui/Input/Input'
import Select from '../../ui/Select/Select'
import ThemeToggle from '../ThemeToggle/ThemeToggle'

import styles from './Header.module.scss'

const Header = ({
  searchValue,
  onSearchChange,
  filterValue,
  onFilterChange,
  filterOptions,
  theme,
  onToggleTheme
}) => {
  return (
    <header className={styles.header}>
      <h1 className={styles.title}>Todo List</h1>
      <div className={styles.controls}>
        <div className={styles.headerInputWrapper}>
          <label className="visually-hidden" htmlFor="search">Search tasks</label>
          <Input
            value={searchValue}
            id="search"
            onChange={onSearchChange}
            placeholder="Search task..."
            showSearchIcon={true}
          />
        </div>

        <label className="visually-hidden" htmlFor="filter">Filter tasks</label>
        <Select
          id="filter"
          options={filterOptions}
          selected={filterValue}
          onChange={onFilterChange}
        />

        <ThemeToggle
          theme={theme}
          onToggleTheme={onToggleTheme}
        />
      </div>
    </header>
  )
}

export default Header