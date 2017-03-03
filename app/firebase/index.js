import firebase from 'firebase';

// Initialize Firebase
try {
    var config = {
        apiKey: "AIzaSyD8vwcY3h8W6g-KmLGTQKC0RCflGzQt-x4",
        authDomain: "openhousewalkthru.firebaseapp.com",
        databaseURL: "https://openhousewalkthru.firebaseio.com",
        storageBucket: "openhousewalkthru.appspot.com",
        messagingSenderId: "264365099147"
    };
    firebase.initializeApp(config);
} catch(e) {

}
export var firebaseRef = firebase.database().ref();
export default firebase;