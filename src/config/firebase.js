import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/database';

const app = !firebase.apps.length
  ? firebase.initializeApp({
      apiKey: 'AIzaSyDgghoHIJgt2_wf5tJwHarzX1ZX_-2vwvA',
      authDomain: 'chat-50ae5.firebaseapp.com',
      databaseURL:
        'https://chat-50ae5-default-rtdb.europe-west1.firebasedatabase.app',
      projectId: 'chat-50ae5',
      storageBucket: 'chat-50ae5.appspot.com',
      messagingSenderId: '95740192503',
      appId: '1:95740192503:web:dc15534a45af60603255f2',
      measurementId: 'G-7NBMGEM6ME',
    })
  : firebase.app();

export const database = firebase.firestore();
export const db = firebase.database();
export default app;
