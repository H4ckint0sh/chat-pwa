/* eslint-disable import/no-mutable-exports */
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const app = !firebase.apps.length
  ? firebase.initializeApp({
      apiKey: 'AIzaSyDL5IW3Um6ORB1wWsz0zFD0lOGeLtvNEys',
      authDomain: 'pwa-chat-2a253.firebaseapp.com',
      databaseURL:
        'https://pwa-chat-2a253-default-rtdb.europe-west1.firebasedatabase.app',
      projectId: 'pwa-chat-2a253',
      storageBucket: 'pwa-chat-2a253.appspot.com',
      messagingSenderId: '194265597758',
      appId: '1:194265597758:web:990119cb7e8ab97474ce6f',
      measurementId: 'G-5153PG4PFL',
    })
  : firebase.app();

const db = app.firestore();
const auth = app.auth();

let messaging = null;
try {
  if (firebase.messaging.isSupported()) {
    messaging = app.messaging();
    messaging.onMessage((payload) => {
      console.log('onMessage:', payload);
    });
  }
} catch (e) {
  console.log(e);
}

export { messaging, db, auth };
export default app;
