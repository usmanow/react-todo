import styles from './AddTaskButton.module.scss'

const AddNoteButton = ({ onClick }) => {
  return (
    <button
      className={styles.addTaskButton}
      type="button"
      onClick={onClick}
    >
    </button>
  )
}

export default AddNoteButton