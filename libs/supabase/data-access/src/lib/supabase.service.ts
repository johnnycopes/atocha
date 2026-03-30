import { Injectable, InjectionToken, inject } from '@angular/core';
import {
  AuthChangeEvent,
  AuthSession,
  Session,
  SupabaseClient,
  User,
  createClient,
} from '@supabase/supabase-js';
import { Observable, from, shareReplay } from 'rxjs';

export interface SupabaseConfig {
  url: string;
  anonKey: string;
}

export const SUPABASE_CONFIG = new InjectionToken<SupabaseConfig>(
  'SUPABASE_CONFIG'
);

@Injectable({
  providedIn: 'root',
})
export class SupabaseService {
  private _config = inject(SUPABASE_CONFIG);
  readonly client: SupabaseClient = createClient(
    this._config.url,
    this._config.anonKey
  );

  get auth() {
    return this.client.auth;
  }

  get db() {
    return this.client;
  }

  session$ = new Observable<AuthSession | null>((subscriber) => {
    this.client.auth.getSession().then(({ data }) => {
      subscriber.next(data.session);
    });
    const { data } = this.client.auth.onAuthStateChange(
      (_event: AuthChangeEvent, session: Session | null) => {
        subscriber.next(session);
      }
    );
    return () => data.subscription.unsubscribe();
  }).pipe(shareReplay({ bufferSize: 1, refCount: true }));

  signInWithGoogle(): Promise<void> {
    return this.client.auth
      .signInWithOAuth({ provider: 'google' })
      .then(() => undefined);
  }

  signOut(): Promise<void> {
    return this.client.auth.signOut().then(() => undefined);
  }
}
