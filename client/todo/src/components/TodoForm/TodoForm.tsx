import { useState, FormEvent, ChangeEvent } from "react"
import { useDispatch, useSelector } from "react-redux"

import { Alert } from "../Alert/Alert"
import { createTodo, showAlert } from "../../redux/actions"
import { IAlertReducer } from "../../types/types"
// import "./App.css"

export const TodoForm = () => {
  const [title, setTitle] = useState("")
  const alertState = useSelector((state: IAlertReducer) => state.alertReducer)
  const dispatch = useDispatch()

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    // При попытке создать todo c пустым текстом - выводим alert
    if (!title.trim()) {
      dispatch(showAlert("Название не может быть пустым!", "warning"))

      return
    }

    dispatch(createTodo(title))
    setTitle("")
  }

  const handleChangeInputValue = (event: ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value)
  }

  return (
    <form onSubmit={handleSubmit}>
      {!!alertState.alertText.length && <Alert props={alertState} />}
      <div className="d-flex mb-3 align-items-end justify-content-between">
        <div
          className="form-group"
          style={{
            display: "flex",
            flexDirection: "column",
            width: "92%",
            marginRight: "10px",
          }}
        >
          <label htmlFor="" className="form-label">
            Введите название дела
          </label>
          <input
            className="form-input"
            type="text"
            onChange={handleChangeInputValue}
          />
        </div>
        <button className="btn btn-success">Создать</button>
      </div>
    </form>
  )
}
