import { useState } from "react";
import { auth, googleProvider } from "../config/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";

const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // console.log(auth?.currentUser);

  async function signIn(e) {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.log(error);
    }
  }

  async function signInWithGoogle(e) {
    e.preventDefault();
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (err) {
      console.error(err);
    }
  }

  async function logout(e) {
    e.preventDefault();
    try {
      await signOut(auth);
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <form>
      <input
        placeholder='Email...'
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        placeholder='Password...'
        value={password}
        type='password'
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={signIn}>Sign In </button>
      <button onClick={signInWithGoogle}> Sign In With Google</button>
      <button onClick={logout}> Logout </button>
    </form>
  );
};

export default Auth;
