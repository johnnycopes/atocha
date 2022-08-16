import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { ButtonComponent, CardComponent, InlineDaySelectComponent, InlineNameEditComponent, MealSummaryComponent, OptionsMenuComponent, OptionsMenuTriggerDirective, SectionComponent, SmallCapsLabelComponent } from '@atocha/menu-matriarch/ui';
import { MenusComponent } from './menus.component';
import { MenuCardComponent } from './menu-card/menu-card.component';

@NgModule({
  declarations: [MenuCardComponent, MenusComponent],
  imports: [
    ButtonComponent,
    CardComponent,
    CommonModule,
    InlineDaySelectComponent,
    InlineNameEditComponent,
    MealSummaryComponent,
    OptionsMenuComponent,
    OptionsMenuTriggerDirective,
    RouterModule.forChild([{ path: '', component: MenusComponent }]),
    SectionComponent,
    SmallCapsLabelComponent,
  ],
})
export class MenuMatriarchFeatureMenusModule {}
