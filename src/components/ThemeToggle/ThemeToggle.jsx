import DarkThemeIcon from '../../ui/icons/DarkThemeIcon/DarkThemeIcon'
import LightThemeIcon from '../../ui/icons/LightThemeIcon/LightThemeIcon'

import styles from './ThemeToggle.module.scss'

const ThemeToggle = ({ theme, onToggleTheme }) => {
  return (
    <button
      className={styles.themeToggleButton}
      type="button"
      onClick={onToggleTheme}
      aria-label="Toggle theme"
      aria-pressed={theme === 'dark'}
    >
      {theme === 'light' ? <DarkThemeIcon /> : <LightThemeIcon />}
    </button>
  )
}

export default ThemeToggle