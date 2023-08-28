import { call, Effect, put, takeEvery } from "redux-saga/effects"

import {
  ICompleteAction,
  ICreateAction,
  IDeleteAction,
  IEditAction,
  ITodo,
  ITodoActionTypes,
} from "../../types/types"
import { TodoApi } from "../../api"
import { hideAlert, showAlert } from "../actions"

// Ф-я ожидания
const delay = (time: number) =>
  new Promise((resolve) => setTimeout(resolve, time))

// Саги нужно писать с использованием функций-генераторов(помечаются *).
// Ф-я-генератор возвращает объект-генератор, кот. содержит в себе промежуточные значения выполнения скрипта в этой ф-и

function* sagaGetTodos(): Generator<Effect, void, ITodo[]> {
  try {
    const todos = yield call(TodoApi.getTodos)

    yield put({ type: ITodoActionTypes.GET_TODOS_SUCCESS, payload: todos })

    yield put(showAlert("Задачи успешно загружены!", "success"))
    // Первый арг-т = ф-я, второй - аргумент этой ф-и
    yield call(delay, 3000)
    yield put(hideAlert())
  } catch (error) {
    yield put(showAlert(`Не удалось загрузить задачи: ${error}`, "warning"))
  }
}

function* sagaCreateTodo(action: ICreateAction): Generator<Effect, void> {
  try {
    const todoObject: Partial<ITodo> = {
      title: action.payload,
      done: false,
    }

    // yield аналогично await для ф-й-генераторов=>
    const todo = yield call(TodoApi.createTodo, todoObject)

    // put в redux-saga- аналог dispatch в react
    yield put({ type: ITodoActionTypes.CREATE_TODO_SUCCESS, payload: todo })

    yield put(showAlert("Задача успешно создана!", "success"))
    yield call(delay, 3000)
    yield put(hideAlert())
  } catch (error) {
    yield put(showAlert(`Не удалось создать задачу: ${error}`, "warning"))
  }
}

function* sagaDeleteTodo(action: IDeleteAction): Generator<Effect, void> {
  try {
    // Вызываем метод для удаления и передаем id в action.payload
    yield call(TodoApi.deleteTodo, action.payload)

    // Также передаем id в action.payload
    yield put({
      type: ITodoActionTypes.DELETE_TODO_SUCCESS,
      payload: action.payload,
    })

    yield put(showAlert("Задача успешно удалена!", "success"))
    // Первый арг-т = ф-я, второй - аргумент этой ф-и
    yield call(delay, 3000)
    yield put(hideAlert())
  } catch (error) {
    yield put(showAlert(`Не удалось удалить задачу: ${error}`, "warning"))
  }
}

function* sagaCompleteTodo(
  action: ICompleteAction<ITodo>
): Generator<Effect, void> {
  try {
    const todoObject: Partial<ITodo> = {
      id: action.payload.id,
      done: action.payload.done,
    }

    yield call(TodoApi.completeTodo, todoObject)

    yield put({
      type: ITodoActionTypes.COMPLETE_TODO_SUCCESS,
      payload: action.payload.id,
    })

    yield put(
      showAlert(
        `Задача успешно ${
          action.payload.done ? "завершена!" : "возобновлена!"
        }`,
        "success"
      )
    )
    // Первый арг-т = ф-я, второй - аргумент этой ф-и
    yield call(delay, 3000)
    yield put(hideAlert())
  } catch (error) {
    yield put(
      showAlert(
        `Не удалось ${
          action.payload.done ? "завершить" : "возобновить"
        } задачу: ${error}`,
        "warning"
      )
    )
  }
}

function* sagaEditTodo(action: IEditAction): Generator<Effect, void, ITodo> {
  try {
    const todoObject: Partial<ITodo> = {
      id: action.payload.id,
      done: action.payload.done,
      title: action.payload.title,
    }

    const todo = yield call(TodoApi.editTodo, todoObject)

    yield put({
      type: ITodoActionTypes.EDIT_TODO_SUCCESS,
      payload: todo,
      id: action.payload.id,
    })

    yield put(showAlert("Задача успешно изменена!", "success"))
    // Первый арг-т = ф-я, второй - аргумент этой ф-и
    yield call(delay, 3000)
    yield put(hideAlert())
  } catch (error) {
    yield put(showAlert(`Не удалось изменить задачу: ${error}`, "warning"))
  }
}

export function* sagaWatcher(): Generator<Effect, void> {
  yield takeEvery(ITodoActionTypes.CREATE_TODO, sagaCreateTodo)
  yield takeEvery(ITodoActionTypes.DELETE_TODO, sagaDeleteTodo)
  yield takeEvery(ITodoActionTypes.GET_TODOS, sagaGetTodos)
  yield takeEvery(ITodoActionTypes.COMPLETE_TODO, sagaCompleteTodo)
  yield takeEvery(ITodoActionTypes.EDIT_TODO, sagaEditTodo)
}
