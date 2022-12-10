import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OverlayModule } from '@angular/cdk/overlay';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { ButtonComponent } from '@atocha/core/ui';
import {
  CardComponent,
  InlineDaySelectComponent,
  InlineNameEditComponent,
  MealSummaryComponent,
  OptionsMenuComponent,
  OptionsMenuItemComponent,
  OptionsMenuTriggerDirective,
  SectionComponent,
  SmallCapsLabelComponent,
} from '@atocha/menu-matriarch/ui';
import { MenusComponent } from './menus.component';
import { MenuCardComponent } from './menu-card/menu-card.component';

@NgModule({
  declarations: [MenuCardComponent, MenusComponent],
  imports: [
    ButtonComponent,
    CardComponent,
    CommonModule,
    FontAwesomeModule,
    InlineDaySelectComponent,
    InlineNameEditComponent,
    MealSummaryComponent,
    OptionsMenuComponent,
    OptionsMenuItemComponent,
    OptionsMenuTriggerDirective,
    OverlayModule,
    RouterModule.forChild([{ path: '', component: MenusComponent }]),
    SectionComponent,
    SmallCapsLabelComponent,
  ],
})
export class MenuMatriarchFeatureMenusModule {}
