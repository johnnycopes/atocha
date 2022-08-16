import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { CardComponent, InputComponent, SectionComponent } from '@atocha/menu-matriarch/ui';
import { SettingsComponent } from './settings.component';

@NgModule({
  declarations: [SettingsComponent],
  imports: [
    CardComponent,
    CommonModule,
    FormsModule,
    InputComponent,
    RouterModule.forChild([{ path: '', component: SettingsComponent }]),
    SectionComponent,
  ],
})
export class MenuMatriarchFeatureSettingsModule {}
