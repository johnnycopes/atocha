import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { OverlayModule } from '@angular/cdk/overlay';
import { PortalModule } from '@angular/cdk/portal';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import {
  AutofocusDirective,
  CheckboxComponent,
  PluralPipe,
  SafePipe,
} from '@atocha/core/ui';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    OverlayModule,
    PortalModule,
    FontAwesomeModule,
    AutofocusDirective,
    CheckboxComponent,
    PluralPipe,
    SafePipe,
  ],
  declarations: [
  ],
  exports: [
    AutofocusDirective,
    CheckboxComponent,
    PluralPipe,
    SafePipe,
  ],
})
export class MenuMatriarchUiModule {}
