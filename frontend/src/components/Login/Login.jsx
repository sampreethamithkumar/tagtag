import React, { useState } from "react";
import { Link } from "react-router-dom";
import signInUser from "../../services/aws-amplify/loginUser";
import Amplify, { Auth } from 'aws-amplify';

Amplify.configure({
  Auth: {
      identityPoolId: 'us-east-1:9b78a14e-947f-4f7e-a42f-cd0c1ed4175d',
      region: 'us-east-1',
      identityPoolRegion: 'us-east-1',
      userPoolId: 'us-east-1_9murdLpC4',
      userPoolWebClientId: '6ap3ivpv9qvv7l4vrqnkadmeju',
      oauth: {
        domain: 'tagtagcloudsystem.auth.us-east-1.amazoncognito.com/',
        redirectSignIn: 'http://localhost:3000/',
        redirectSignOut: 'http://localhost:3000/',
        responseType: 'token'

      }
  }
})

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submit = async (event) => {
    event.preventDefault();
    try {
      const response = await signInUser(email, password);
      console.log('Response: ' + response);
      const { jwtToken } = response.signInUserSession.idToken;
      localStorage.setItem("accessToken", jwtToken);
      window.location = "/home";
    } catch (e) {
      console.log(e);
    }
  };

  const googleSignIn = async (event) => {
    event.preventDefault();
    try {
      const response = await Auth.federatedSignIn({provider : 'Google'});
      const { jwtToken } = response.signInUserSession.idToken;
      localStorage.setItem("accessToken", jwtToken);
      window.location = "/home";

    }catch(e)
    {
      console.log(e);
    }
  };

  const facebookSignIn = async (event) => {
    event.preventDefault();
    try {
      const response = await Auth.federatedSignIn({provider : 'Facebook'});
      console.log('Facebook Response: ' + response);
      const { jwtToken } = response.signInUserSession.idToken;
      localStorage.setItem("accessToken", jwtToken);
      window.location = "/home";

    }catch(e)
    {
      console.log(e);
    }
  }

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
      <button type="submit" className="btn btn-dark btn-lg btn-block" onClick={facebookSignIn}>Login Using Facebook</button>
      <button type="submit" className="btn btn-dark btn-lg btn-block" onClick={googleSignIn}>Login Using Google</button>
      <p className="text--align-center">
        Don't have an account? <Link to="register">Sign Up</Link>
      </p>
    </React.Fragment>
  );
};

export default Login;
