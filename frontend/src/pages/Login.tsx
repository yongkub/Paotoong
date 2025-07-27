import { useState, type FormEvent } from "react";
import useLogin from "../hooks/useLogin";
import { useNavigate, Link } from "react-router";
import Paotoong from "../assets/paotoong-logo.png";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { error, login } = useLogin();
  const navigate = useNavigate();
  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    const success = await login(username, password);
    if (success) {
      navigate("/");
    } else {
      setPassword("");
    }
  };
  return (
    <div className="container-fluid px-3 py-5">
      <div className="row justify-content-center">
        <div className="col-12 text-center">
          <img src={Paotoong} style={{ width: "150px" }} />
        </div>
        <div className="col-12 text-center fs-2 fw-bold">Money Tracker</div>
        <div className="col-12 text-center">Simple. Secure. Personal.</div>
        <div className="col-12 col-sm-10 col-lg-6 p-3 m-3">
          <form
            className="row text-start gap-3 mx-auto"
            onSubmit={(e) => handleLogin(e)}
          >
            <div className="col-12">
              <label htmlFor="username" className="form-label">
                Username
              </label>
              <input
                type="text"
                className="form-control"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="col-12">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                className="form-control"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="col-12">
              <button className="btn btn-primary w-100" type="submit">
                Login
              </button>
            </div>
            {error && (
              <div className="col-12 text-center text-danger">{error}</div>
            )}
            <div>
              Don't have an account? <Link to="/signup">Sign up</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
