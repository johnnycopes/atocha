import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';
import { map, shareReplay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private _auth: AngularFireAuth) {}

  uid$ = this._auth.user.pipe(
    map((user) => user?.uid),
    shareReplay({ bufferSize: 1, refCount: true })
  );

  loggedIn$ = this._auth.user.pipe(
    map(Boolean),
    shareReplay({ bufferSize: 1, refCount: true })
  );

  async login(): Promise<{ name: string; email: string } | void> {
    const loginInfo = await this._auth.signInWithPopup(
      new firebase.auth.GoogleAuthProvider()
    );
    if (loginInfo?.user && loginInfo.additionalUserInfo?.isNewUser) {
      const displayName = loginInfo.user.displayName ?? '';
      const email = loginInfo.user.email ?? '';
      return { name: displayName, email };
    }
  }

  async logout(): Promise<void> {
    await this._auth.signOut();
  }
}
