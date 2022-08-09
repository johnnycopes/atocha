import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { MenuMatriarchUiModule } from '@atocha/menu-matriarch/ui';
import { MenusComponent } from './menus.component';
import { MenuCardComponent } from './menu-card/menu-card.component';

@NgModule({
  declarations: [MenuCardComponent, MenusComponent],
  imports: [
    MenuMatriarchUiModule,
    CommonModule,
    RouterModule.forChild([{ path: '', component: MenusComponent }]),
  ],
})
export class MenuMatriarchFeatureMenusModule {}
