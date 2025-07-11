import { cn } from '../../../utils/utils'
import styles from './CheckmarkIcon.module.scss'

const CheckmarkIcon = ({ className }) => {
  return (
    <svg
      className={cn(styles.checkmarkIcon, className)}
      viewBox="0 0 24 24"
      fill="none"
    >
      <path
        d="M5 13L9 17L19 7"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default CheckmarkIcon