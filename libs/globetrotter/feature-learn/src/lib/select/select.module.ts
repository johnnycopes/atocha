import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import {
  ButtonComponent,
  CheckboxComponent,
  CountedSelectionTreeComponent,
} from '@atocha/core/ui';
import {
  IconComponent,
  InputComponent,
  RadioButtonsComponent,
  SmallCapsComponent,
} from '@atocha/globetrotter/ui';
import { SelectComponent } from './select.component';
import { SelectPlacesComponent } from './select-places/select-places.component';
import { SelectQuantityComponent } from './select-quantity/select-quantity.component';
import { SelectTypeComponent } from './select-type/select-type.component';

@NgModule({
  imports: [
    ButtonComponent,
    CheckboxComponent,
    CommonModule,
    CountedSelectionTreeComponent,
    FormsModule,
    IconComponent,
    InputComponent,
    RadioButtonsComponent,
    SmallCapsComponent,
  ],
  declarations: [
    SelectComponent,
    SelectPlacesComponent,
    SelectQuantityComponent,
    SelectTypeComponent,
  ],
})
export class SelectModule {}
