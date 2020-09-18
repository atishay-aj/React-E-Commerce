import firebase from 'firebase/app';

import 'firebase/firestore';
import 'firebase/auth';


const config = {
    apiKey: "AIzaSyDIbq28NN4wpHDJyUyDCyEvGJ-z5DKWWKY",
    authDomain: "react-backend-5e880.firebaseapp.com",
    databaseURL: "https://react-backend-5e880.firebaseio.com",
    projectId: "react-backend-5e880",
    storageBucket: "react-backend-5e880.appspot.com",
    messagingSenderId: "846393261253",
    appId: "1:846393261253:web:020e98a70fc7dee3c244ac",
    measurementId: "G-6V2M2T5MHT"
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
    if (!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`);
    const snapShot = await userRef.get();
    console.log(snapShot);
    if (!snapShot.exists) {
        const { displayName, email } = userAuth;
        const createAt = new Date();
        try {
            await userRef.set({
                displayName,
                email,
                createAt,
                ...additionalData
            })
        } catch (error) {
            console.log(error);

        }

    }


    return userRef;
}

firebase.initializeApp(config);

export const auth = firebase.auth();

export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();

provider.setCustomParameters({ prompt: 'select_account' });

export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;

