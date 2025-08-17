import { motion } from 'framer-motion'

import emptyImageLight from '../../assets/images/empty-light.png'
import emptyImageDark from '../../assets/images/empty-dark.png'

import styles from './EmptyState.module.scss'

const EmptyState = ({ theme }) => {
  const imgSrc = theme === 'light' ? emptyImageLight : emptyImageDark

  const motionProps = {
    layout: true,
    initial: { opacity: 0, scale: 0.95 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.95 },
    transition: { duration: 0.2 }
  }

  return (
    <motion.div className={styles.wrapper} {...motionProps}>
      <motion.img
        className={styles.emptyImage}
        src={imgSrc}
        width="221"
        height="174"
        alt="No tasks available"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      />

      <span className={styles.emptyText}>No tasks yet</span>
    </motion.div>
  )
}

export default EmptyState