import { Auth } from "aws-amplify";

function getCurrentUser() {
  try {
    return Auth.currentAuthenticatedUser()
      .then((user) => {
        return user;
      })
      .catch((e) => console.log("Error in getCurrentUser(): ", e));
  } catch (error) {}
}

export default getCurrentUser;
