import firebase from 'firebase'

var firebaseConfig = {
  apiKey: "AIzaSyCjsyE2OQiuXYqM9a2eq9fO0q6x1k4RtbA",
  authDomain: "swp-final-twitter.firebaseapp.com",
  databaseURL: "https://swp-final-twitter.firebaseio.com",
  projectId: "swp-final-twitter",
  storageBucket: "swp-final-twitter.appspot.com",
  messagingSenderId: "906912338865",
  appId: "1:906912338865:web:293fd41de7b59436"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase