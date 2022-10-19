import { ChangeEvent, FormEvent, useState } from 'react'

import { BiPlusCircle } from 'react-icons/bi'

import clipboardImage from '../../assets/clipboard.svg'
import { TaskItem } from '../TaskItem';
import styles from './Task.module.css'

interface INewTaskProps {
  id: string;
  check: boolean;
  content: string;
}

export function Task() {
  const [ newTask, setNewTask ] = useState<INewTaskProps[]>([])
  const [ title, setTitle ] = useState("")

  function handleChangeTitle(event: ChangeEvent<HTMLInputElement>) {
    setTitle(event.target.value)
  }
  
  function handleOnSubmitForm(event: FormEvent) {
    event.preventDefault()

    setNewTask([
      ...newTask,
      {
        id: crypto.randomUUID(),
        check: false,
        content: title
      }
    ])

    console.log(crypto.randomUUID())

    setTitle("")
  }

  function handleTaskComplete(taskId: string) {

    console.log('clicado')
    const task = newTask.map(task => {
      if(task.id === taskId) {
        return {
          ...task,
          check: !task.check
        }
      }

      return task
    })

    setNewTask(task)
  }

  function handleDeleteTask(taskId: string) {
    const task = newTask.filter(task => task.id !== taskId)
    setNewTask(task)
  }

  const newTaskLength = newTask.length

  const taskEnded = newTask.filter(task => task.check).length

  return (
    <main className={styles.main}>
      
      <form className={styles.form} onSubmit={handleOnSubmitForm}>
        <input
          type="text"
          value={title}
          onChange={handleChangeTitle}
          placeholder='Adicione uma nova tarefa'
        />
        <button type="submit">
          Criar
          <BiPlusCircle size={40} />
        </button>
      </form>
      
      <section className={styles.section}>
        
        <div className={styles.sectionHeader}>
          <strong>Tarefas criadas <span>{newTaskLength}</span></strong>
          <strong>Concluídas <span>{taskEnded} de {newTaskLength}</span></strong>
        </div>

        { newTask.length === 0 
          ? 
            <div className={styles.sectionWithoutTasks}>
              <img src={clipboardImage} alt="Clipboard Image" />
              <strong>Você ainda não tem tarefas cadastradas</strong>
              <span>Crie tarefas e organize seus itens a fazer</span>
            </div>
          :
            newTask.map(task => (
              <TaskItem
                key={task.id}
                task={task}
                onDelete={handleDeleteTask}
                onComplete={handleTaskComplete}
              />
            ))
        }

      </section>
    </main>
  )
}