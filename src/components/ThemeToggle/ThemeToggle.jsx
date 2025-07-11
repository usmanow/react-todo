import DarkThemeIcon from '../../ui/icons/DarkThemeIcon/DarkThemeIcon'
import LightThemeIcon from '../../ui/icons/LightThemeIcon/LightThemeIcon'

import styles from './ThemeToggle.module.scss'

const ThemeToggle = () => {
  return (
    <button
      className={styles.themeToggleButton}
      type="button"
    >
      <DarkThemeIcon />
    </button>
  )
}

export default ThemeToggle