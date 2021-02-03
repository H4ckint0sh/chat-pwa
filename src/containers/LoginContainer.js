import React, { useState, useContext } from 'react';
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from 'firebase/auth';
import { getDoc, collection, doc, setDoc } from 'firebase/firestore';
import { auth, db } from '../config/firebase';
import { AuthContext } from '../context/Auth';
import Login from '../components/Login';

function LoginContainer(props) {
  const { history } = props;
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (event) => {
    event.preventDefault();
    await signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        console.log(userCredential.user);
        history.push('/');
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log('errorCode : ', errorCode, 'ErrorMessage : ', errorMessage);
      });
  };

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();

    await signInWithPopup(auth, provider)
      .then(async (result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        //
        const docRef = doc(collection(db, 'users'), result.user.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap) {
          return;
        }
        const user = {
          displayName: result.user.displayName,
          photoURL: result.user.photoURL,
          uid: result.user.uid,
          email: result.user.email,
          notify: false,
        };

        // Add a new document with a generated id
        const newUserRef = doc(collection(db, 'users'));

        // add new user
        await setDoc(newUserRef, user);
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const { email } = error;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
  };

  const { currentUser } = useContext(AuthContext);

  return (
    <Login
      currentUser={currentUser}
      handleLogin={handleLogin}
      email={email}
      password={password}
      setEmail={setEmail}
      setPassword={setPassword}
      handleGoogleLogin={handleGoogleLogin}
      {...props}
    />
  );
}

export default LoginContainer;
