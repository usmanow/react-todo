import styles from './CircularTimer.module.scss'

const CircularTimer = ({ timeLeft, totalTime, animationKey }) => {
  const size = 28
  const strokeWidth = 2
  const radius = (size / 2) - (strokeWidth / 2)
  const circumference = 2 * Math.PI * radius

  return (
    <svg
      key={animationKey}
      className={styles.timer}
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      style={{
        '--animation-duration': `${totalTime}s`,
        '--circumference': circumference
      }}
    >
      <circle
        className={styles.animatedCircle }
        cx={size / 2}
        cy={size / 2}
        r={radius}
        stroke="currentColor"
        strokeWidth={strokeWidth}
        fill="transparent"
        strokeDasharray={circumference}
        transform={`rotate(-90 ${size / 2} ${size / 2})`}
      />
      <text
        x="50%"
        y="50%"
        dominantBaseline="middle"
        textAnchor="middle"
        dy="0.1em"
      >
        {timeLeft}
      </text>
    </svg>
  )
}

export default CircularTimer