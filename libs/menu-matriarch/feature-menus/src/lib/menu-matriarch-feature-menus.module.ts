import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { MenusComponent } from './menus.component';

@NgModule({
  imports: [
    MenusComponent,
    RouterModule.forChild([{ path: '', component: MenusComponent }]),
  ],
})
export class MenuMatriarchFeatureMenusModule {}
