import React, { createContext, useContext, useEffect, useState } from 'react';
import * as Google from 'expo-google-app-auth';
import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithCredential,
  signOut
} from '@firebase/auth';

import { auth } from '../../firebase';

const AuthContext = createContext({});

const config = {
  androidClientId: '752917325907-hg6a98gj5g50b4o9t7at59crv9la6ai9.apps.googleusercontent.com',
  iosClientId: '752917325907-sum04l73qpnoe8p1sl7bev32j9r65p1o.apps.googleusercontent.com',
  scopes: ["profile", "email"],
  permissions: ["public_profile", "email", "gender", "location"],
}

export const AuthProvider = ({ children }) => {
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);
  const [loadingInitial, setLoadingInitial] = useState(true);
  const [loading, setLoading] = useState(false);

  useEffect(() => 
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }

      setLoadingInitial(false);
    }),
  []);

  const logout = () => {
    setLoading(true);

    signOut(auth)
      .catch(error => setError(error))
      .finally(() => setLoading(false));
  }

  const signInWithGoogle = async() => {
    setLoading(true);

    await Google.logInAsync(config).then(async (logInResult) => {
      if (logInResult.type === 'success') {
        const { idToken, accessToken } = logInResult;
        const credential = GoogleAuthProvider.credential(idToken, accessToken);
        
        await signInWithCredential(auth, credential);
      }

      return Promise.reject();
    }).catch(error => setError(error))
    .finally(() => setLoading(false));
  }

  return (
    <AuthContext.Provider 
      value={{
        user,
        loading,
        error,
        logout,
        signInWithGoogle
      }}
    >
      { !loadingInitial && children }
    </AuthContext.Provider>
  );
}

export default function useAuth() {
  return useContext(AuthContext);
}
