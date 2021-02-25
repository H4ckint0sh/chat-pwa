/* eslint-disable camelcase */
/* eslint-disable class-methods-use-this */
import { db, messaging } from './config/firebase';

export default class Notifications {
  allTokens = [];

  tokensLoaded = false;

  user = null;

  constructor() {
    this.populateAllTokens();
  }

  populateAllTokens() {
    db.collection('tokens').onSnapshot((snapshot) => {
      snapshot.docs.map((doc) => {
        return this.allTokens.push(doc.data);
      });
      this.tokensLoaded = true;
    });
  }

  getPermission() {
    if (messaging) {
      messaging
        .getToken({
          vapidKey:
            'BAf49dxIAejzr1OEJcrS8YgTScfCa1hpH4iTuyKM0_g-1e3mV7VVU6jv3qbWvhtJM0JkkAKMrmWmfGHxYrmtrJQ',
        })
        .then((currentToken) => {
          if (currentToken) {
            this.saveToken(currentToken);
          } else {
            // Show permission request UI
            console.log(
              'No registration token available. Request permission to generate one.'
            );
            // ...
          }
        })
        .catch((err) => {
          console.log('An error occurred while retrieving token. ', err);
          // ...
        });
    }
  }

  saveToken(token) {
    if (this.tokensLoaded) {
      const isTokenRegistered = this.findExistingToken();
      if (isTokenRegistered) {
        console.log('existingToken - updating');

        db.collection('tokens').doc(this.user.uid).update({
          token,
          user_id: this.user.uid,
        });
        console.log('token updated');
      } else {
        this.registerToken(token);
      }
    }
  }

  deleteToken() {
    db.collection('tokens')
      .doc(this.user.uid)
      .delete()
      .then(() => {
        console.log('Token deleted successfully');
      })
      .catch((err) => console.log('Error while deleting token', err));
  }

  findExistingToken() {
    const tokens = [...this.allTokens];
    const registered = tokens.find((item) => item.user_id === this.user.uid);
    if (registered) {
      return true;
    }
    return false;
  }

  changeUser(user) {
    this.user = user;
  }

  registerToken(token) {
    db.collection('tokens').doc(this.user.uid).set({
      token,
      user_id: this.user.uid,
    });
  }
}
