import { useState, ChangeEvent } from "react"
import { ITodo } from "../../types/types"
import "./styles.css"

export interface ITodoProps {
  todo: ITodo
  changeTodo: (arg0: string, arg1: boolean, arg2: string) => void
  completeTodo: (arg0: string, arg1: boolean) => void
  deleteTodo: (arg0: string) => void
}

export const TodoItem = ({
  todo,
  completeTodo,
  deleteTodo,
  changeTodo,
}: ITodoProps) => {
  // Включен ли режим редактирование todo
  const [isTodoEdit, setIsTodoEdit] = useState(false)
  // Новый измененный title редактируемой todo
  const [newTitle, setNewTitle] = useState("")

  const handleSubmit = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      changeTodo(todo.id, todo.done, newTitle)
      setIsTodoEdit(!isTodoEdit)
    }
  }

  const handleTodoEdit = () => setIsTodoEdit(!isTodoEdit)
  const handleTitleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setNewTitle(event.target.value)
  }

  const handleDelete = () => deleteTodo(todo.id)
  const handleComplete = () => completeTodo(todo.id, !todo.done)

  return (
    <li
      className={`todo-item list-group-item d-flex justify-content-between align-items-center
        ${todo.done ? "list-group-item-success" : ""}`}
    >
      <div className="todo-text" onKeyPress={handleSubmit}>
        {isTodoEdit ? (
          <input type="text" onChange={handleTitleChange} />
        ) : (
          <span className={`${todo.done ? "title-done" : ""}`}>
            {todo.title}
          </span>
        )}
      </div>

      <div className="todo-btns">
        <button className="btn btn-primary todo-btn" onClick={handleTodoEdit}>
          Изменить
        </button>
        <button className="btn btn-success todo-btn" onClick={handleComplete}>
          Завершить
        </button>
        <button className="btn btn-danger todo-btn" onClick={handleDelete}>
          Удалить
        </button>
      </div>
    </li>
  )
}
