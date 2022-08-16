import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { InlineNameEditComponent, MenuMatriarchUiModule, SectionComponent } from '@atocha/menu-matriarch/ui';
import { MenusComponent } from './menus.component';
import { MenuCardComponent } from './menu-card/menu-card.component';

@NgModule({
  declarations: [MenuCardComponent, MenusComponent],
  imports: [
    CommonModule,
    InlineNameEditComponent,
    MenuMatriarchUiModule,
    RouterModule.forChild([{ path: '', component: MenusComponent }]),
    SectionComponent,
  ],
})
export class MenuMatriarchFeatureMenusModule {}
