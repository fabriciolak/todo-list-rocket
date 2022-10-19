import { BiCheckCircle, BiCircle, BiTrash } from 'react-icons/bi'
import styles from './TaskItem.module.css'

interface INewTaskProps {
  id: string;
  check?: boolean;
  content: string;
}

interface Props {
  task: INewTaskProps
  onDelete: (k: string) => void;
  onComplete: (k: string) => void;
}

export function TaskItem({ task, onDelete, onComplete }: Props) {
  function handleDeleteTask() {
    onDelete(task.id)
  }

  function handleCompleteTask() {
    onComplete(task.id)
  }

  return (
    <div className={styles.task}>
      <button onClick={handleCompleteTask}>
        {task.check ? <BiCheckCircle size={24} /> : <BiCircle size={24} /> }
      </button>
      
      <p className={task.check ? styles.completed : ""}>{task.content}</p>

      <button onClick={handleDeleteTask}>
        <BiTrash size={24} />
      </button>
    </div>
  )
}