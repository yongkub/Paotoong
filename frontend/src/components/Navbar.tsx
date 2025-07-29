import { Link } from "react-router";
import useLogout from "../hooks/useLogout";
import PigIcon from "../assets/icons/pig.svg";
import useAuthContext from "../hooks/useAuthContext";
const Navbar = () => {
  const { logout } = useLogout();
  const { user } = useAuthContext();
  const handleLogout = () => {
    logout();
  };
  return (
    <div className="py-2 px-3 mb-3 d-flex align-items-center bg-secondary-subtle">
      <div>
        <Link to="/" style={{ textDecoration: "none", color: "#ffc107" }}>
          <img src={PigIcon} />
          <span className="ms-2">Paotoong</span>
        </Link>
      </div>
      <div className="ms-auto me-2">
        Welcome {user?.username ?? "UNKNOWN"} !
      </div>
      <button className="btn btn-primary" onClick={handleLogout}>
        Log out
      </button>
    </div>
  );
};

export default Navbar;
