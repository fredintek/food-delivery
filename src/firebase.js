import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBdrUYtIqAd8puMUW7Y1FTtskGFGdc1vno",
  authDomain: "food-delivery-app-27b7d.firebaseapp.com",
  databaseURL: "https://food-delivery-app-27b7d-default-rtdb.firebaseio.com",
  projectId: "food-delivery-app-27b7d",
  storageBucket: "food-delivery-app-27b7d.appspot.com",
  messagingSenderId: "815131751357",
  appId: "1:815131751357:web:b2bce4cbb34ff0ebccd8d4",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();

const auth = firebase.auth();

const provider = new firebase.auth.GoogleAuthProvider();

const storage = getStorage(firebaseApp);

export { db, auth, provider, storage };
