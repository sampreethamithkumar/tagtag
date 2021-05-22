import React, { useState } from "react";
import { Link } from "react-router-dom";
import signInUser from "../../services/aws-amplify/loginUser";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submit = async (event) => {
    event.preventDefault();
    try {
      await signInUser(email, password);
      window.location = "/home";
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <React.Fragment>
      <form onSubmit={submit}>
        <div class="mb-3">
          <label for="email" class="form-label">
            Email address
          </label>
          <input
            type="email"
            class="form-control"
            id="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </div>
        <div class="mb-3">
          <label for="password" class="form-label">
            Password
          </label>
          <input
            type="email"
            class="form-control"
            id="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
          <button type="submit" class="btn btn-primary">
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
