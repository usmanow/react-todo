import { cn } from '../../utils/utils'

import styles from './Button.module.scss'

const Button = ({ children, onClick, variant = 'apply' }) => {
  return (
    <button
      className={cn(styles.button, variant === 'cancel' && styles.buttonCancel)}
      type="button"
      onClick={onClick}
    >
      {children}
    </button>
  )
}

export default Button