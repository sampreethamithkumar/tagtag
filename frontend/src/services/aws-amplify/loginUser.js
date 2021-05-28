import { Auth } from "aws-amplify";

function signInUser(email, password) {
  // try {
  //   await Auth.signIn(email, password);

  //   window.location = "/home";
  //   // Auth.signIn(email, password)
  //   //   .then((s) => {
  //   //     console.log("Success login");
  //   //     window.location = "/home";
  //   //   })
  //   //   .catch((e) => console.log(e));
  // } catch (error) {
  //   console.log("error signing in", error);
  //   return error;
  // }

  return Auth.signIn(email, password);
}

function facebookLogin(){
  return Auth.federatedSignIn({provider : 'Facebook'});
}

function googleLogIn(){
  return Auth.federatedSignIn({provider : 'Google'});
}

export default signInUser;
