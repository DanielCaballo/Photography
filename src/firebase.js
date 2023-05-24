import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import 'firebase/compat/storage'
import 'firebase/compat/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyCh6-1EvNnoJEMvLo2WeKMY_9kNIjR3trY",
    authDomain: "photography-2d2c3.firebaseapp.com",
    projectId: "photography-2d2c3",
    storageBucket: "photography-2d2c3.appspot.com",
    messagingSenderId: "306639783194",
    appId: "1:306639783194:web:1b3a370e62352ec2c118a3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = firebase.auth()
const storage = firebase.storage()

const db = app.firestore()

export{auth,storage,db}

