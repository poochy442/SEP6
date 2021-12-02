import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';

const firebaseConfig = {
  apiKey: "AIzaSyD56qfU8WTtcpnSarwoDx55oop_Acbg7Ac",
  authDomain: "sep6-123456.firebaseapp.com",
  projectId: "sep6-123456",
  storageBucket: "sep6-123456.appspot.com",
  messagingSenderId: "1053045522173",
  appId: "1:1053045522173:web:505beac44c210cbb50c894",
  measurementId: "G-VSBVEG5YNK"
};

firebase.initializeApp(firebaseConfig);
firebase.firestore().settings({ timestampsInSnapshots: true });

export default firebase;