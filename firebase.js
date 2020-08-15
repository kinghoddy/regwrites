import * as firebase from "firebase/app";
import "firebase/analytics";

// Your web app's Firebase configuration
var config = {
    apiKey: "AIzaSyD02kXckbTcpcGB_Q-OGnQ2YrSONOHk_5I",
    authDomain: "regwrites-663a4.firebaseapp.com",
    databaseURL: "https://regwrites-663a4.firebaseio.com",
    projectId: "regwrites-663a4",
    storageBucket: "regwrites-663a4.appspot.com",
    messagingSenderId: "1097756937162",
    appId: "1:1097756937162:web:7e8997ebeeb896228ddd33",
    measurementId: "G-C185QBBQZE"
};
// Initialize Firebase

try {
    firebase.initializeApp(config)
    console.log('success');

} catch (error) {
    console.log('failed');

}
export default firebase

