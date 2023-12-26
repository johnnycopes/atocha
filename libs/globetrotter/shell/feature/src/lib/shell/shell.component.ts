import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BehaviorSubject, combineLatest } from 'rxjs';
import { map, distinctUntilChanged } from 'rxjs/operators';

import { LoaderService } from '@atocha/globetrotter/shared/data-access';
import { LoaderComponent } from '@atocha/globetrotter/shared/ui';
import { NavigationComponent } from '../navigation/navigation.component';

@Component({
  standalone: true,
  selector: 'app-shell',
  imports: [CommonModule, LoaderComponent, NavigationComponent, RouterModule],
  templateUrl: './shell.component.html',
  styleUrls: ['./shell.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShellComponent {
  private _navReadySubject = new BehaviorSubject<boolean>(false);
  private _navReady$ = this._navReadySubject.pipe(distinctUntilChanged());
  private _loading$ = this._loaderService.shell$;

  vm$ = combineLatest([this._navReady$, this._loading$]).pipe(
    map(([showContent, loading]) => ({
      loading,
      ready: showContent && !loading,
    }))
  );

  constructor(private _loaderService: LoaderService) {}

  onNavReady(): void {
    this._navReadySubject.next(true);
  }
}
