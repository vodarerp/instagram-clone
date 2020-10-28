import firebase from "firebase"

// const firebaseConfig = {
//     apiKey: "AIzaSyDz3q8X_DUn7EMlS6Tm_O2lsnwBMHsYwY8",
//     authDomain: "instagram-clone-68001.firebaseapp.com",
//     databaseURL: "https://instagram-clone-68001.firebaseio.com",
//     projectId: "instagram-clone-68001",
//     storageBucket: "instagram-clone-68001.appspot.com",
//     messagingSenderId: "9235421642",
//     appId: "1:9235421642:web:66bd19df645e512c9a9733",
//     measurementId: "G-7S51R3M9HC"
//   };


  const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyDz3q8X_DUn7EMlS6Tm_O2lsnwBMHsYwY8",
    authDomain: "instagram-clone-68001.firebaseapp.com",
    databaseURL: "https://instagram-clone-68001.firebaseio.com",
    projectId: "instagram-clone-68001",
    storageBucket: "instagram-clone-68001.appspot.com",
    messagingSenderId: "9235421642",
    appId: "1:9235421642:web:66bd19df645e512c9a9733",
    measurementId: "G-7S51R3M9HC"
  });

  const db = firebaseApp.firestore(); // pristup db
  const auth = firebase.auth(); // pristup auth...login...
  const storage = firebase.storage(); // storage -> upload img...

  export {db, auth, storage};