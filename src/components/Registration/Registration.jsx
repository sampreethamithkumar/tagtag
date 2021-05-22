import React, { useState } from "react";
import { Link } from "react-router-dom";
import signUp from "../../services/aws-amplify/registerUser";

const Registration = () => {
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");

  const submit = (event) => {
    event.preventDefault();
    signUp(email, password, firstName, lastName);
  };

  return (
    <div>
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
          <label for="firstName" class="form-label">
            First Name
          </label>
          <input
            type="text"
            class="form-control"
            id="firstName"
            value={firstName}
            onChange={(event) => setFirstName(event.target.value)}
          />
        </div>
        <div class="mb-3">
          <label for="lastName" class="form-label">
            last Name
          </label>
          <input
            type="text"
            class="form-control"
            id="lastName"
            value={lastName}
            onChange={(event) => setLastName(event.target.value)}
          />
        </div>
        <div class="mb-3">
          <label for="password" class="form-label">
            Password
          </label>
          <input
            type="password"
            class="form-control"
            id="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
          <button type="submit" class="btn btn-primary">
            Register
          </button>
        </div>
      </form>
      <p className="text--align-center">
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </div>
  );
};

export default Registration;
