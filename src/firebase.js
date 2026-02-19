import { initializeApp } from "firebase/app";
import {getAuth,GoogleAuthProvider,GithubAuthProvider} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBriksFchs2HGoKuRWJf7QjHHcWLNK0hGA",
  authDomain: "front-end-web-authentication.firebaseapp.com",
  projectId: "front-end-web-authentication",
  storageBucket: "front-end-web-authentication.firebasestorage.app",
  messagingSenderId: "756518261194",
  appId: "1:756518261194:web:c89df2f9b4b1c2c7657f33"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();
githubProvider.addScope("user:email");

export { auth, googleProvider, githubProvider };

