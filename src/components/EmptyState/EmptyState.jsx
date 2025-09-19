import { motion } from 'framer-motion'

import emptyImageLight from '../../assets/images/empty-light.png'
import emptyImageDark from '../../assets/images/empty-dark.png'

import styles from './EmptyState.module.scss'

const EmptyState = ({ theme, message }) => {
  const imgSrc = theme === 'light' ? emptyImageLight : emptyImageDark

  const motionProps = {
    layout: true,
    initial: { opacity: 0, scale: 0.95 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.95 },
    transition: { duration: 0.2 }
  }

  return (
    <motion.figure
      className={styles.wrapper}
      role="status"
      aria-live="polite"
      {...motionProps}
    >
      <motion.img
        className={styles.emptyImage}
        src={imgSrc}
        width="221"
        height="174"
        alt=""
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.2 }}
      />

      <figcaption className={styles.emptyText}>{message}</figcaption>
    </motion.figure>
  )
}

export default EmptyState