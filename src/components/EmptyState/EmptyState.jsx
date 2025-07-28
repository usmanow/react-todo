import { motion } from 'framer-motion'

import emptyImageLight from '../../assets/images/empty-light.png'
import emptyImageDark from '../../assets/images/empty-dark.png'

import styles from './EmptyState.module.scss'

const EmptyState = () => {
  const motionProps = {
    layout: true,
    initial: { opacity: 0, scale: 0.95 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.95 },
    transition: { duration: 0.2 }
  }

  return (
    <motion.div className={styles.wrapper} {...motionProps}>
      <img
        className={styles.emptyImage}
        src={emptyImageLight}
        width="221"
        height="174"
        alt="No tasks available"
      />

      <span className={styles.emptyText}>No tasks yet</span>
    </motion.div>
  )
}

export default EmptyState