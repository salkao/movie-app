
import firebase from 'firebase';
require("firebase/firestore");

const config = {
  apiKey: "AIzaSyCRWBQrRDOmZ5x7Vn1MrGQ74VTbmbN34q0",
  authDomain: "movie-app-7cf00.firebaseapp.com",
  databaseURL: "https://movie-app-7cf00.firebaseio.com",
  projectId: "movie-app-7cf00",
  storageBucket: "movie-app-7cf00.appspot.com",
  messagingSenderId: "469192259681",
  appId: "1:469192259681:web:53ec836be7edc09d"
};

export default !firebase.apps.length ? firebase.initializeApp(config) : firebase.app();
