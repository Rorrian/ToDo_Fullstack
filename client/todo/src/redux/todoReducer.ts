import { ITodoAction, ITodoActionTypes, ITodoState } from "../types/types"

export const initialState = {
  todos: [],
}

export const todoReducer = (
  state: ITodoState = initialState,
  action: ITodoAction
) => {
  switch (action.type) {
    case ITodoActionTypes.GET_TODOS_SUCCESS:
      // action.payload - это массив todos
      return { ...state, todos: action.payload }
    case ITodoActionTypes.CREATE_TODO_SUCCESS:
      return { todos: [...state.todos, action.payload] }
    case ITodoActionTypes.DELETE_TODO_SUCCESS:
      return {
        ...state,
        // action.payload - это id
        todos: state.todos.filter((todo) => todo.id !== action.payload),
      }
    case ITodoActionTypes.COMPLETE_TODO_SUCCESS: {
      const newTodos = [...state.todos]

      // Ищем нужную todo по id
      const completeIndex = state.todos.findIndex(
        (todo) => todo.id === action.payload
      )

      // Проверка: если todo по данному индексу не найдена(в этом случае возвращается -1), то возвращаем массив todos
      if (completeIndex === -1) {
        return state
      }

      // Переключаем поле
      newTodos[completeIndex].done = !newTodos[completeIndex].done

      return { ...state, todos: newTodos }
    }
    case ITodoActionTypes.EDIT_TODO_SUCCESS: {
      const newTodos = [...state.todos]

      // Ищем нужную todo по id
      const completeIndex = state.todos.findIndex(
        (todo) => todo.id === action.id
      )

      // Проверка: если todo по данному индексу не найдена(в этом случае возвращается -1), то возвращаем массив todos
      if (completeIndex === -1) {
        return state
      }

      // Иначе изменяем существующую todo в соответствии с новыми значениями
      newTodos[completeIndex] = action.payload

      return { ...state, todos: newTodos }
    }
    default:
      return state
  }
}
