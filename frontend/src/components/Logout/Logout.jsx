import { useEffect } from "react";
import signOut from "../../services/aws-amplify/logoutUser";

const Logout = () => {
  useEffect(() => {
    signOut();
    localStorage.removeItem("accessToken");
    window.location = "/login";
  });

  return null;
};

export default Logout;
