import { useState } from "react";
import LoginFooter from "../widgets/LoginFooter";
import Input from "../control/LoginInput";
import {
  Auth,
  googleProvider,
  facebookProvider,
} from "../../firebase-config.js";
import {
  createUserWithEmailAndPassword,
  signInWithPopup,
  signInWithEmailAndPassword,
} from "firebase/auth";
// onAuthStateChanged

export default function LoginForm(prop) {
  const { noAccount, setNoAccount } = prop;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [state, setState] = useState(true);
  // onAuthStateChanged(Auth, (currentUser) => {

  //        setUser(currentUser)

  // })
  const register = async () => {
    try {
      await createUserWithEmailAndPassword(Auth, email, password);
      // console.log( `This is the email after logging in ${Auth?.currentUser?.email}`)
      console.log("register Ran");
      setState(false);
    } catch (err) {
      console.log(err);
    }
    console.log(Auth?.currentUser?.email);
    console.log("register Ran");
  };

  const logIn = async () => {
    try {
      await signInWithEmailAndPassword(Auth, email, password);
      console.log(
        `This is the email after logging in ${Auth?.currentUser?.email}`
      );
      console.log("Login Ran");
    } catch (err) {
      console.log(err);
    }

    console.log("Login Ran");
  };

  const signInWithGoogle = async () => {
    try {
      await signInWithPopup(Auth, googleProvider);
    } catch (err) {
      console.log(err);
    }
  };

  const signInWithFacebook = async () => {
    try {
      await signInWithPopup(Auth, facebookProvider);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="main">
      <section className="container ">
        <div className="center">
          <h1>{noAccount ? "Register" : "Login"}</h1>
          <form>
            <Input
              type="text"
              label="Username"
              setEmail={setEmail}
              email={email}
            />
            <Input
              type="password"
              label="Password"
              setPassword={setPassword}
              password={password}
            />
            <LoginFooter
              // Login={Login}
              register={register}
              signInWithGoogle={signInWithGoogle}
              signInWithFacebook={signInWithFacebook}
              logIn={logIn}
              state={state}
              noAccount={noAccount}
              setNoAccount={setNoAccount}
            />
          </form>
        </div>
      </section>
    </div>
  );
}
