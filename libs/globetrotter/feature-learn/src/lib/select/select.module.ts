import { NgModule } from '@angular/core';

import { SelectComponent } from './select.component';
import { SelectPlacesComponent } from './select-places/select-places.component';
import { SelectQuantityComponent } from './select-quantity/select-quantity.component';
import { SelectTypeComponent } from './select-type/select-type.component';

@NgModule({
  imports: [
    SelectComponent,
    SelectPlacesComponent,
    SelectQuantityComponent,
    SelectTypeComponent,
  ],
})
export class SelectModule {}
