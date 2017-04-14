import firebase from 'firebase';

// Initialize Firebase
// Eventually move this to deployment website
try {
    var config = {
        apiKey: "YOUR_API_KEY",
        authDomain: "YOUR_FIREBASE_DOMAIN", 
        /*example: openhousewalkthru.firebaseapp.com*/
        databaseURL: "YOUR_DATABASE_URL", 
        /*example: https://openhousewalkthru.firebaseio.com*/
        storageBucket: "YOUR_STORAGEBUCKET",
        /*example: openhousewalkthru.appspot.com*/
        messagingSenderId: "YOUR_MESSAGINGID"
        /*example: 264365099147*/
    };
    firebase.initializeApp(config);
} catch(e) {

}

export var firebaseRef = firebase.database().ref();
export default firebase;
