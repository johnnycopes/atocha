import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { MenuMatriarchUiModule } from '@atocha/menu-matriarch/ui';
import { SettingsComponent } from './settings.component';

@NgModule({
  declarations: [SettingsComponent],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild([{ path: '', component: SettingsComponent }]),
    MenuMatriarchUiModule,
  ],
})
export class MenuMatriarchFeatureSettingsModule {}
