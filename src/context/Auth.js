import React, { useEffect, useState } from 'react';
import app from '../config/firebase';

export const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [pending, setPending] = useState(true);

  useEffect(() => {
    import('firebase/auth').then(() => {
      const auth = app.auth();

      auth.onAuthStateChanged((user) => {
        setCurrentUser(user);
        setPending(false);
      });
    });
  }, []);

  if (pending) {
    return <>Loading....</>;
  }

  return (
    <AuthContext.Provider
      value={{
        currentUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
