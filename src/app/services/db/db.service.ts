import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { UserConfig } from 'src/app/models/UserConfig';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  db: any;
  user: any = firebase.auth().currentUser;

  constructor() {
    this.db = firebase.firestore();

    this.db.settings({
      timestampsInSnapshots: true
    });

    this.init();
  }

  init() {
    this.userExists()
      .catch(() => {
        this.createUser();
      });
  }

  async loadConfig() {
    const configRef = this.db.collection('config')
      .doc(this.user.uid);

    const config = await configRef.get();

    if (config.exists) {
      return config.data();
    } else {
      await configRef.set({
        currentMax: 8,
        date: null
      });

      return this.loadConfig();
    }
  }

  updateConfig(config: UserConfig) {
    const configRef = this.db.collection('config')
      .doc(this.user.uid);

    configRef.set(config.data.toJS());
  }

  createUser() {
    this.db.collection(`users`)
      .doc(this.user.uid)
      .set({
        id: this.user.uid,
        username: this.user.displayName,
        email: this.user.email,
        profile_picture: this.user.photoURL
      })
      .then(() => console.log('created'))
      .catch(e => console.error(e));
  }

  userExists(): Promise<any> {
    return this.db.collection('users')
      .doc(this.user.uid)
      .get()
      .then((doc) => {
        if (doc.exists) {
          return doc;
        } else {
          return Promise.reject(false);
        }
      });
  }

  clearUserData() {
    return this.db.collection('config')
      .doc(this.user.uid)
      .delete();
  }
}
