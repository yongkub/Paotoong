import ErrorIcon from "../assets/icons/error-ghost.svg";
import "../css/Home.css";
const Alert = ({
  msg,
  closeAlert,
}: {
  msg: string;
  closeAlert: () => void;
}) => {
  return (
    <div className="alert-wrapper">
      <div>
        <img src={ErrorIcon} />
        <div className="fw-bold">ERROR</div>
        <div>{msg}</div>
        <button onClick={closeAlert} className="btn btn-danger">
          Close
        </button>
      </div>
    </div>
  );
};

export default Alert;
