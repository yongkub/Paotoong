import { Outlet } from "react-router";
import Navbar from "../components/Navbar";
const NavbarLayout = () => {
  return (
    <div>
      <Navbar />
      <Outlet />
    </div>
  );
};
export default NavbarLayout;
