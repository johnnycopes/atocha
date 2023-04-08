import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SettingsComponent } from './settings.component';

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild([{ path: '', component: SettingsComponent }]),
    SettingsComponent,
  ],
})
export class MenuMatriarchFeatureSettingsModule {}
