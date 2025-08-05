import styles from './CircularTimer.module.scss'

const CircularTimer = ({ timeLeft, totalTime }) => {
  const radius = 12
  const circumference = 2 * Math.PI * radius

  return (
    <svg
      className={styles.timer}
      viewBox="0 0 28 28"
    >
      <circle
        className={styles.animatedCircle }
        cx={14}
        cy={14}
        r={radius}
        stroke="currentColor"
        strokeWidth={2}
        fill="transparent"
        strokeDasharray={circumference}
        style={{ '--animation-duration': `${totalTime}s` }}
        transform="rotate(-90 14 14)"
      />
      <text
        x="50%"
        y="50%"
        dominantBaseline="middle"
        textAnchor="middle"
        dy="0.10em"
      >
        {timeLeft}
      </text>
    </svg>
  )
}

export default CircularTimer