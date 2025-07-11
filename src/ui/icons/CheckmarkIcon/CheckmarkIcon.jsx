import { cn } from '../../../utils/utils'
import styles from './CheckmarkIcon.module.scss'

const CheckmarkIcon = ({ className }) => {
  const combinedClassName = cn(styles.checkmarkIcon, className)

  return (
    <svg
      className={combinedClassName}
      viewBox="0 0 15 15"
      fill="none"
    >
      <defs>
        <mask id="mask" fill="#fff">
          <path d="M4.998 14.649 0 9.748 9.56 0l4.997 4.901-9.56 9.748Z" />
        </mask>
      </defs>
      <path
        fill="currentColor"
        d="m4.998 14.649-1.4 1.428 1.427 1.4 1.4-1.428-1.427-1.4Zm1.4-1.428L1.4 8.32l-2.8 2.855 4.997 4.902 2.801-2.856ZM13.13 3.5l-9.56 9.747 2.857 2.801 9.559-9.747L13.129 3.5Z"
        mask="url(#mask)"
      />
    </svg>
  )
}

export default CheckmarkIcon