import { createContext, useContext, useEffect, useState } from "react";
import {createUserWithEmailAndPassword,signInWithEmailAndPassword,signInWithPopup,signOut,GithubAuthProvider,onAuthStateChanged,updateProfile} from "firebase/auth";
import { auth, googleProvider, githubProvider } from "../firebase";

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Register with email & password
  async function register(email, password, displayName) {
    const result = await createUserWithEmailAndPassword(auth, email, password);
    if (displayName) {
      await updateProfile(result.user, { displayName });
    }
    return result;
  }

  // Login with email & password
  function login(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
  }

  // Google sign-in
  function loginWithGoogle() {
    return signInWithPopup(auth, googleProvider);
  }

  // GitHub sign-in
  async function loginWithGithub() {
    const result = await signInWithPopup(auth, githubProvider);
    if(!result.user.email){
      const credential = GithubAuthProvider.credentialFromResult(result);
      const response = await fetch('https://api.github.com/user/emails',{headers: {Authorization: `token ${credential.accessToken}`}});
      const emails = await response.json();
      const data = emails.find((email) => email.primary)?.email || emails[0]?.email;
      return data;
    }
    return result;
  }

  // Logout
  function logout() {
    return signOut(auth);
  }

  // Auth state persistence listener
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    loading,
    register,
    login,
    loginWithGoogle,
    loginWithGithub,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

