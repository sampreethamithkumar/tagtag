import "./App.css";
import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { Auth } from "aws-amplify";
import "react-toastify/dist/ReactToastify.css";
import Navigation from "./components/NavigationBar/Navigation";
import Footer from "./components/Footer/Footer";
import Login from "./components/Login/Login";
import Registration from "./components/Registration/Registration";
import Home from "./components/Home/Home";
import Amplify from "@aws-amplify/core";
import awsmobile from "./services/aws-amplify/aws-exports";
import Logout from "./components/Logout/Logout";
import SearchImage from "./components/SearchImage/SearchImage";
import AddTag from "./components/AddTag/AddTag";
import DeleteImage from "./components/DeleteImage/DeleteImage";
import NotFound from "./components/NotFound/NotFound";

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
      });
  }, []);

  return (
    <React.Fragment>
      <Router>
        <Navigation />
        <ToastContainer />
        <main className="container-md">
          {Object.entries(currentUser).length !== 0 && (
            <Switch>
              <Route path="/home" component={Home} />
              <Route path="/search" component={SearchImage} />
              <Route path="/addtag" component={AddTag} />
              <Route path="/deleteimage" component={DeleteImage} />
              <Route path="/logout" component={Logout} />
              <Route path="/not-found" component={NotFound} />
              <Redirect from="/" exact to="/home" />
              <Redirect to="/home" />
            </Switch>
          )}
          {Object.entries(currentUser).length === 0 && (
            <Switch>
              <Route path="/login" component={Login} />
              <Route path="/register" component={Registration} />
              <Route path="/logout" component={Logout} />
              <Route path="/not-found" component={NotFound} />
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
