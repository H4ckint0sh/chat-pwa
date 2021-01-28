/* eslint-disable no-plusplus */
/* eslint-disable no-restricted-globals */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
importScripts('https://www.gstatic.com/firebasejs/8.2.4/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.2.4/firebase-messaging.js');

firebase.initializeApp({
  apiKey: 'AIzaSyC_a5BrNlSUXU47ijfPTBSQUrwPx6NXPZ0',
  authDomain: 'chat-pwa-c78fb.firebaseapp.com',
  databaseURL:
    'https://chat-pwa-c78fb-default-rtdb.europe-west1.firebasedatabase.app',
  projectId: 'chat-pwa-c78fb',
  storageBucket: 'chat-pwa-c78fb.appspot.com',
  messagingSenderId: '110370424194',
  appId: '1:110370424194:web:187e9927d4fb081c60bb9b',
  measurementId: 'G-6W2JNJ707Z',
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
