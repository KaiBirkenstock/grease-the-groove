import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {GooglePlus} from '@ionic-native/google-plus/ngx';
import {Platform} from '@ionic/angular';
import * as firebase from 'firebase';

export interface GoogleLoginResponse {
  accessToken: string;
}

@Component({
  selector: 'app-registration',
  templateUrl: './registration.page.html',
  styleUrls: ['./registration.page.scss'],
})
export class RegistrationPage implements OnInit {
  userProfile: any;

  constructor(private googlePlus: GooglePlus,
              private router: Router,
              public platform: Platform) {
  }

  ngOnInit() {
    console.log(this);
    window[this.constructor.name] = this;

    this.setState();
  }

  setState() {
    firebase.auth()
      .onAuthStateChanged(user => {
        if (user) {
          this.userProfile = user;
        } else {
          this.userProfile = null;
        }
      });
  }

  loginWithGoogle() {
    if (this.platform.is('cordova')) {
      this.googlePlus.login({
        'scopes': 'email profile openid'
      })
        .then((res: GoogleLoginResponse) => {
          console.log(res);

          const credentials = firebase.auth.GoogleAuthProvider.credential(null, res.accessToken);
          firebase.auth().signInWithCredential(credentials)
            .then(success => {
              console.log("Firebase success: " + JSON.stringify(success));
            })
            .catch(error => console.log("Firebase failure: " + JSON.stringify(error)));
        })
        .catch(err => console.error("Error: ", err));
    } else {
      // Using a popup.
      const provider = new firebase.auth.GoogleAuthProvider();
      provider.addScope('profile');
      provider.addScope('email');
      firebase.auth().signInWithPopup(provider);
    }
  }

  start() {
    this.router.navigate(['']);
  }
}
