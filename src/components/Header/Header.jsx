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
          <Input
            value={searchValue}
            name="search"
            onChange={onSearchChange}
            placeholder="Search task..."
            showSearchIcon={true}
          />
        </div>

        <Select
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