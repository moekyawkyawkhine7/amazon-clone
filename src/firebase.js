import firebase from 'firebase';

const firebaseConfig = {
    authDomain: "amz-clone-cc9a2.firebaseapp.com",
    apiKey: "AIzaSyAnOcozrfvjOIaSCDwTyQHj8ucWBTsKnjg",
    projectId: "amz-clone-cc9a2",
    storageBucket: "amz-clone-cc9a2.appspot.com",
    messagingSenderId: "1007980430060",
    appId: "1:1007980430060:web:136bd51f8514f0041fdbc9"
};

const app = !firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app();
const db = app.firestore();

export default db;