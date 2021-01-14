import firebase from 'firebase/app';

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

export default app;
