import { useDispatch } from "react-redux"

import { IAlertState } from "../../types/types"
import { hideAlert } from "../../redux/actions"
import "./styles.css"

interface IAlertProps {
  props: IAlertState
}

export const Alert = ({ props }: IAlertProps) => {
  const dispatch = useDispatch()

  const handleAlertClose = () => {
    dispatch(hideAlert())
  }

  return (
    <div className={`alert alert-wrapper alert-${props.alertStatus}`}>
      {props.alertText}
      <button
        type="button"
        className="btn-close alert-btn"
        onClick={handleAlertClose}
      />
    </div>
  )
}
