import { useNavigate } from "react-router";
import useAuthContext from "./useAuthContext";
const useLogout = () => {
  const { dispatch } = useAuthContext();
  const navigate = useNavigate();
  const logout = () => {
    localStorage.removeItem("user");
    dispatch({ type: "LOGOUT" });
    navigate("/login");
  };
  return { logout };
};
export default useLogout;
