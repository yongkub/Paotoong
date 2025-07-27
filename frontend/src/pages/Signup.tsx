import { useState, type FormEvent } from "react";
import useSignup from "../hooks/useSignup";
import { Link, useNavigate } from "react-router";

const Signup = () => {
  const { signup, error } = useSignup();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");

  const handleSignup = async (e: FormEvent) => {
    e.preventDefault();
    const success = await signup(username, password, confirm);
    if (success) {
      navigate("/");
    }
  };
  return (
    <div className="container-fluid px-3">
      <div className="row justify-content-center">
        <form
          className="col-12 col-sm-10 col-lg-6 p-3"
          onSubmit={(e) => handleSignup(e)}
        >
          <div className="row text-start gap-3 mx-auto">
            <div className="col-12 text-end">
              Already have an account? <Link to="/login">Sign in</Link>
            </div>
            <div
              className="col-12 d-flex flex-column alert alert-secondary"
              style={{ fontSize: "14px" }}
            >
              <div>
                Create your free account with{" "}
                <span style={{ color: "#ffc107" }}>Paotoong</span>
              </div>
              <div>
                <i className="bi bi-check2 text-success"></i>
                Unlimited transactions
              </div>
              <div>
                <i className="bi bi-check2 text-success"></i>
                Access with smartphone, laptops
              </div>
            </div>
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
              <label htmlFor="password" className="form-label">
                Confirm your password
              </label>
              <input
                type="password"
                id="confirm"
                value={confirm}
                className="form-control"
                onChange={(e) => setConfirm(e.target.value)}
              />
            </div>
            <div className="col-12">
              <button className="btn btn-primary w-100" type="submit">
                Sign Up
              </button>
            </div>
            {error && (
              <div className="col-12 text-danger text-center">{error}</div>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
