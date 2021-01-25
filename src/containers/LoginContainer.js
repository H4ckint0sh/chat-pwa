import React, { useState, useContext } from 'react';
import firebase from 'firebase/app';
import app from '../config/firebase';
import { AuthContext } from '../context/Auth';
import Login from '../components/Login';

function LoginContainer(props) {
  const { history } = props;
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      await app.auth().signInWithEmailAndPassword(email, password);
      history.push('/');
    } catch (error) {
      console.log(error);
    }
  };

  const handleGoogleLogin = async () => {
    const provider = new firebase.auth.GoogleAuthProvider();

    await app
      .auth()
      .signInWithPopup(provider)
      .then(async (result) => {
        // const token = result.credential.accessToken;
        const { user } = result;
        import('firebase/firestore').then(async () => {
          const database = app.firestore();

          await database
            .collection('users')
            .doc(user.providerData[0].uid.toString())
            .set({
              name: user.providerData[0].displayName,
              id: user.providerData[0].uid.toString(),
              email: user.providerData[0].email,
              photoUrl: user.providerData[0].photoURL,
            });
        });
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
