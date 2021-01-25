/* eslint-disable no-plusplus */
/* eslint-disable no-restricted-globals */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
importScripts('https://www.gstatic.com/firebasejs/8.2.4/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.2.4/firebase-messaging.js');

firebase.initializeApp({
  apiKey: 'AIzaSyBn3bOGqdErFELu2hT4W1-1DJ2dkQG-lnQ',
  authDomain: 'whatsapp-pwa-b6131.firebaseapp.com',
  databaseURL:
    'https://whatsapp-pwa-b6131-default-rtdb.europe-west1.firebasedatabase.app',
  projectId: 'whatsapp-pwa-b6131',
  storageBucket: 'whatsapp-pwa-b6131.appspot.com',
  messagingSenderId: '626765727757',
  appId: '1:626765727757:web:98fedf8b054f912892ad44',
  measurementId: 'G-C47TBZCQRB',
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage(function (payload) {
  console.log('Received background message ', payload);

  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});

self.addEventListener('notificationclick', function (event) {
  // do what you want
  // ...
});
