import React, { useState } from 'react';
import Register from '../components/Register';
import { auth, db } from '../config/firebase';

function RegisterContainer({ history }) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignUp = async (event) => {
    event.preventDefault();
    try {
      await auth
        .createUserWithEmailAndPassword(email, password)
        .then((resp) => {
          const fullName = `${
            firstName.charAt(0).toUpperCase() +
            firstName.substring(1, firstName.length)
          }  ${
            lastName.charAt(0).toUpperCase() +
            lastName.substring(1, lastName.length)
          }`;
          import('firebase/firestore').then(async () => {
            await db.collection('users').doc(resp.user.uid.toString()).set({
              name: fullName,
              id: resp.user.uid.toString(),
              email: resp.user.email,
              notify: false,
            });
          });
        });
      history.push('/login');
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Register
      firstName={firstName}
      setFirstName={setFirstName}
      lastName={lastName}
      setLastName={setLastName}
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      handleSignUp={handleSignUp}
    />
  );
}

export default RegisterContainer;
