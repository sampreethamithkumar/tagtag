import React, { useEffect } from "react";
import signOut from "../../services/aws-amplify/logoutUser";

const Logout = () => {
  useEffect(() => {
    signOut();

    window.location = "/login";
  });

  return null;
};

export default Logout;
