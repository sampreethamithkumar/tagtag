import React, { useState } from "react";
import { Link } from "react-router-dom";
import signInUser from "../../services/aws-amplify/loginUser";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submit = async (event) => {
    event.preventDefault();
    try {
      const response = await signInUser(email, password);
      const { jwtToken } = response.signInUserSession.idToken;
      localStorage.setItem("accessToken", jwtToken);
      window.location = "/home";
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <React.Fragment>
      <form onSubmit={submit}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
          <button type="submit" className="btn btn-primary">
            Login
          </button>
        </div>
      </form>
      <p className="text--align-center">
        Don't have an account? <Link to="register">Sign Up</Link>
      </p>
    </React.Fragment>
  );
};

export default Login;
