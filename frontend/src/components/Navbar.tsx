import { Link } from "react-router";
import useLogout from "../hooks/useLogout";
const Navbar = () => {
  const { logout } = useLogout();
  const handleLogout = () => {
    logout();
  };
  return (
    <div className="py-2 px-3 mb-3 d-flex align-items-center bg-secondary-subtle">
      <div>
        <Link to="/" style={{ textDecoration: "none", color: "#ffc107" }}>
          Paotoong
        </Link>
      </div>
      <button className="btn btn-primary ms-auto" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
};

export default Navbar;
