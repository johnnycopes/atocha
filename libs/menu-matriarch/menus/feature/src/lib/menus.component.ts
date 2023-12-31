import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BehaviorSubject, combineLatest, map } from 'rxjs';

import { ButtonComponent, trackByFactory } from '@atocha/core/ui';
import {
  MenuService,
  PrintService,
} from '@atocha/menu-matriarch/menus/data-access';
import {
  InlineNameEditComponent,
  SectionComponent,
} from '@atocha/menu-matriarch/shared/ui';
import { Day, Menu } from '@atocha/menu-matriarch/shared/util';
import { MenuCardComponent } from './menu-card/menu-card.component';

@Component({
  standalone: true,
  selector: 'app-menus',
  imports: [
    ButtonComponent,
    CommonModule,
    InlineNameEditComponent,
    MenuCardComponent,
    SectionComponent,
  ],
  templateUrl: './menus.component.html',
  styleUrls: ['./menus.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MenusComponent {
  addingSubject = new BehaviorSubject<boolean>(false);

  vm$ = combineLatest([
    this._menuService.getAll(),
    this._menuService.activeMenuId$,
    this.addingSubject.asObservable(),
  ]).pipe(
    map(([menus, activeMenuId, adding]) => ({ menus, activeMenuId, adding }))
  );

  readonly trackByFn = trackByFactory<Menu>(({ id }) => id);

  constructor(
    private _menuService: MenuService,
    private _printService: PrintService
  ) {}

  onSave(name: string): void {
    this._menuService.create({ name }).subscribe();
    this.addingSubject.next(false);
  }

  onPrint({ name, entries, orientation, fallbackText }: Menu): void {
    this._printService.printMenu({
      name,
      orientation,
      entries,
      fallbackText,
    });
  }

  onRename(menu: Menu, name: string): void {
    this._menuService.update(menu, { name });
  }

  onStartDayChange(menu: Menu, startDay: Day): void {
    this._menuService.update(menu, { startDay });
  }

  onDelete(menu: Menu): void {
    this._menuService.delete(menu);
  }
}
