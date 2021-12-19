import React, { 
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState 
} from 'react';
import * as Google from 'expo-google-app-auth';
import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithCredential,
  signOut
} from '@firebase/auth';

import { auth } from '../../firebase';
import config from '../../config';

const AuthContext = createContext({});

const googleConfig = {
  androidClientId: config.ANDROID_CLIENT_ID,
  iosClientId: config.IOS_CLIENT_ID,
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

    await Google.logInAsync(googleConfig).then(async (logInResult) => {
      if (logInResult.type === 'success') {
        const { idToken, accessToken } = logInResult;
        const credential = GoogleAuthProvider.credential(idToken, accessToken);
        
        await signInWithCredential(auth, credential);
      }

      return Promise.reject();
    }).catch(error => setError(error))
    .finally(() => setLoading(false));
  }

  const memoedValue = useMemo(() => ({
    user,
    loading,
    error,
    logout,
    signInWithGoogle
  }), [user, loading, error]);

  console.log('Aqui', memoedValue);

  return (
    <AuthContext.Provider  
      value={memoedValue}
    >
      { !loadingInitial && children }
    </AuthContext.Provider>
  );
}

export default function useAuth() {
  return useContext(AuthContext);
}
