import { Auth } from "aws-amplify";

async function signOut() {
  try {
    await Auth.signOut();
    localStorage.removeItem("user");
  } catch (error) {
    console.log("error signing out: ", error);
  }
}

export default signOut;
