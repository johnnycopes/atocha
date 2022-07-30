import { ChangeDetectionStrategy, Component } from '@angular/core';
import { merge, Subject } from 'rxjs';
import { mapTo, shareReplay } from 'rxjs/operators';

import { MenuService } from '@services/menu.service';
import { Menu } from '@models/menu.interface';
import { trackByFactory } from '@shared/utility/generic/track-by-factory';

@Component({
  selector: 'app-menus',
  templateUrl: './menus.component.html',
  styleUrls: ['./menus.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MenusComponent {
  public menus$ = this._menuService.getMenus();
  public startAdd$ = new Subject<void>();
  public finishAdd$ = new Subject<void>();
  public adding$ = merge(
    this.startAdd$.pipe(mapTo(true)),
    this.finishAdd$.pipe(mapTo(false)),
  ).pipe(
    shareReplay({ refCount: true, bufferSize: 1 })
  );
  public readonly trackByFn = trackByFactory<Menu>(({ id }) => id);

  constructor(private _menuService: MenuService) { }

  public onSave(name: string): void {
    this._menuService
      .createMenu({ name })
      .subscribe();
    this.finishAdd$.next();
  }
}
