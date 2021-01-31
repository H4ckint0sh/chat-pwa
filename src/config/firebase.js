/* eslint-disable import/no-mutable-exports */
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/messaging';

const app = !firebase.apps.length
  ? firebase.initializeApp({
      apiKey: 'AIzaSyC_a5BrNlSUXU47ijfPTBSQUrwPx6NXPZ0',
      authDomain: 'chat-pwa-c78fb.firebaseapp.com',
      databaseURL:
        'https://chat-pwa-c78fb-default-rtdb.europe-west1.firebasedatabase.app',
      projectId: 'chat-pwa-c78fb',
      storageBucket: 'chat-pwa-c78fb.appspot.com',
      messagingSenderId: '110370424194',
      appId: '1:110370424194:web:187e9927d4fb081c60bb9b',
      measurementId: 'G-6W2JNJ707Z',
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

db.enablePersistence().catch(function (err) {
  if (err.code === 'failed-precondition') {
    // mutltiple browser tabs open
    console.log('persistence failed');
  } else if (err.code === 'unimplemented') {
    // Lack of browser support
    console.log('persistence not availible');
  }
});

export { messaging, db, auth };
export default app;
