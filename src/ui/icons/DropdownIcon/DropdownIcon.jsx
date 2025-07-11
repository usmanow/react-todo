import { cn } from '../../../utils/utils'
import styles from './DropdownIcon.module.scss'

const DropdownIcon = ({ className }) => {
  return (
    <svg
      className={cn(styles.dropdownIcon, className)}
      viewBox="0 0 8 5" fill="none"
    >
      <path
        d="M4 4L1 1"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M7 1L4 4"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default DropdownIcon