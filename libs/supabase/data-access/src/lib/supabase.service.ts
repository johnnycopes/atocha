import { Injectable, InjectionToken, inject } from '@angular/core';
import {
  AuthChangeEvent,
  AuthSession,
  Session,
  SupabaseClient,
  createClient,
} from '@supabase/supabase-js';
import { Observable, from, merge, of, shareReplay, switchMap } from 'rxjs';
import { map } from 'rxjs/operators';

export interface SupabaseConfig {
  url: string;
  anonKey: string;
}

export const SUPABASE_CONFIG = new InjectionToken<SupabaseConfig>(
  'SUPABASE_CONFIG',
);

@Injectable({
  providedIn: 'root',
})
export class SupabaseService {
  private _config = inject(SUPABASE_CONFIG);
  readonly client: SupabaseClient = createClient(
    this._config.url,
    this._config.anonKey,
  );

  // getSession() awaits the client's internal initializePromise, so it only
  // resolves after URL tokens (OAuth callback) are fully processed. We use it
  // as the first emission, then merge with ongoing onAuthStateChange events.
  session$ = from(this.client.auth.getSession()).pipe(
    map(({ data }) => data.session),
    switchMap((initialSession) =>
      merge(
        of(initialSession),
        new Observable<AuthSession | null>((subscriber) => {
          const { data } = this.client.auth.onAuthStateChange(
            (_event: AuthChangeEvent, session: Session | null) => {
              subscriber.next(session);
            },
          );
          return () => data.subscription.unsubscribe();
        }),
      ),
    ),
    shareReplay({ bufferSize: 1, refCount: true }),
  );

  async signInWithGoogle(redirectTo: string): Promise<void> {
    const { error } = await this.client.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo },
    });
    if (error) throw error;
  }

  signOut(): Promise<void> {
    return this.client.auth.signOut().then(() => undefined);
  }
}
