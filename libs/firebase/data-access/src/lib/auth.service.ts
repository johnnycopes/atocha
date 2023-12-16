import { Injectable } from '@angular/core';
import {
  Auth,
  GoogleAuthProvider,
  getAdditionalUserInfo,
  signInWithPopup,
  user,
} from '@angular/fire/auth';
import { map, shareReplay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private _auth: Auth) {}

  uid$ = user(this._auth).pipe(
    map((user) => user?.uid),
    shareReplay({ bufferSize: 1, refCount: true })
  );

  loggedIn$ = user(this._auth).pipe(
    map(Boolean),
    shareReplay({ bufferSize: 1, refCount: true })
  );

  async login(): Promise<{ name: string; email: string } | void> {
    const loginInfo = await signInWithPopup(
      this._auth,
      new GoogleAuthProvider()
    );
    if (
      loginInfo &&
      loginInfo.user &&
      getAdditionalUserInfo(loginInfo)?.isNewUser
    ) {
      const displayName = loginInfo.user.displayName ?? '';
      const email = loginInfo.user.email ?? '';
      return { name: displayName, email };
    }
  }

  async logout(): Promise<void> {
    await this._auth.signOut();
  }
}
