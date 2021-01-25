/* eslint-disable import/no-unresolved */
/* eslint-disable camelcase */
const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp(functions.config().firebase);

exports.sendNotification = functions.firestore
  .document('/rooms/{roomId}/messages/{messageId}')
  .onWrite(async (event) => {
    const title = event.after.get('name');
    const body = event.after.get('message');
    // eslint-disable-next-line prefer-const
    let registrationTokens = [];

    await admin
      .firestore()
      .collection('tokens')
      .get()
      .then((resp) => {
        resp.docs.map((doc) => {
          return registrationTokens.push(doc.data().token);
        });
        console.log(registrationTokens);
      })
      .catch((err) => console.log('Error getting tokens', err));

    const message = {
      notification: {
        title,
        body,
      },
      data: {},
    };

    await admin
      .messaging()
      .sendToDevice(registrationTokens, message)
      .then(function (resp) {
        console.log('Successfully sent message:', resp);
        console.log(resp.results[0].error);
      })
      .catch(function (error) {
        console.log('Error sending message:', error);
      });
  });
