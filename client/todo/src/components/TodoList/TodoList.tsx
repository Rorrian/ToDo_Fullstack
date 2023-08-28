import { useSelector, useDispatch } from "react-redux"
import { TransitionGroup, CSSTransition } from "react-transition-group"
import { ITodoReducer } from "../../types/types"
import { TodoItem } from "../TodoItem/TodoItem"
import "./styles.css"
import { completeTodo, deleteTodo, editTodo } from "../../redux/actions"

export const TodoList = () => {
  const state = useSelector((state: ITodoReducer) => state.todoReducer)
  const dispatch = useDispatch()

  const removeTodo = (id: string) => {
    dispatch(deleteTodo(id))
  }

  const doneTodo = (id: string, done: boolean) => {
    dispatch(completeTodo(id, done))
  }

  const changeTodo = (id: string, done: boolean, title: string) => {
    dispatch(editTodo(id, done, title))
  }

  return (
    // Пар-р ul - в дальнейшем компонент преобразуется в список
    <TransitionGroup component="ul" className="list-group">
      {state.todos.map((todo) => (
        <CSSTransition
          key={todo.id}
          timeout={800}
          //  Стиль на кот. должна применится анимация
          classNames={"todo"}
        >
          <TodoItem
            todo={todo}
            deleteTodo={removeTodo}
            completeTodo={doneTodo}
            changeTodo={changeTodo}
          />
        </CSSTransition>
      ))}
    </TransitionGroup>
  )
}
