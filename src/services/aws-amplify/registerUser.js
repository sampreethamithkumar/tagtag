import { Auth } from "aws-amplify";

async function signUp(email, password, firstname, lastname) {
  try {
    await Auth.signUp({
      username: email,
      password,
      attributes: {
        email,
        name: firstname + " " + lastname,
      },
    });
    window.location = "/login";
  } catch (error) {
    console.log("error signing up:", error);
  }
}

export default signUp;
