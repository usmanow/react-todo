import { cn } from '../../utils/utils'

import styles from './Button.module.scss'

const Button = ({ children, onClick, variant, type, disabled }) => {
  return (
    <button
      className={cn(styles.button, variant && styles[`button--${variant}`])}
      type={type}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  )
}

export default Button