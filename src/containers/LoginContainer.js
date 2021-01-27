import React, { useState, useContext } from 'react';
import firebase from 'firebase/app';
import { auth, db } from '../config/firebase';
import { AuthContext } from '../context/Auth';
import Login from '../components/Login';

function LoginContainer(props) {
  const { history } = props;
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      await auth().signInWithEmailAndPassword(email, password);
      history.push('/');
    } catch (error) {
      console.log(error);
    }
  };

  const handleGoogleLogin = async () => {
    const provider = new firebase.auth.GoogleAuthProvider();

    await auth
      .signInWithPopup(provider)
      .then(async (result) => {
        // const token = result.credential.accessToken;
        const user = {
          displayName: result.user.displayName,
          photoURL: result.user.photoURL,
          uid: result.user.uid,
          email: result.user.email,
        };
        await db.collection('users').doc(user.uid).set(user);
      })
      .catch((error) => {
        console.log(error);
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
