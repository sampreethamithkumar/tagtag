import "./App.css";
import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import Navigation from "./components/NavigationBar/Navigation";
import Footer from "./components/Footer/Footer";
import Login from "./components/Login/Login";
import Registration from "./components/Registration/Registration";
import Home from "./components/Home/Home";
import Amplify from "@aws-amplify/core";
import awsmobile from "./services/aws-amplify/aws-exports";
import Logout from "./components/Logout/Logout";
import { Auth } from "aws-amplify";
import SearchImage from "./components/SearchImage/SearchImage";
// import { withAuthenticator } from "@aws-amplify/ui-react";

Amplify.configure(awsmobile);
function App() {
  const [currentUser, setCurrentUser] = useState({});

  useEffect(() => {
    Auth.currentAuthenticatedUser()
      .then(({ attributes }) => {
        setCurrentUser(attributes);
      })
      .catch((e) => {
        setCurrentUser({});
        console.log("Error Occured", e);
      });
  }, []);

  return (
    <React.Fragment>
      <Router>
        <Navigation />
        <main className="container-md">
          {Object.entries(currentUser).length !== 0 && (
            <Switch>
              <Route path="/home" component={Home} />
              <Route path="/search" component={SearchImage} />
              <Route path="/logout" component={Logout} />
              <Redirect from="/" exact to="/home" />
              <Redirect to="/home" />
            </Switch>
          )}
          {Object.entries(currentUser).length === 0 && (
            <Switch>
              <Route path="/login" component={Login} />
              <Route path="/register" component={Registration} />
              <Route path="/logout" component={Logout} />
              <Redirect from="/" exact to="/login" />
              <Redirect to="/login" />
            </Switch>
          )}
        </main>
        <Footer />
      </Router>
    </React.Fragment>
  );
}

// export default withAuthenticator(App);
export default App;
