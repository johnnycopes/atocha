import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AutofocusDirective } from './autofocus/autofocus.directive';
import { TreeComponent } from './tree/tree.component';

@NgModule({
  imports: [CommonModule],
  declarations: [
    AutofocusDirective,
    TreeComponent,
  ],
  exports: [
    AutofocusDirective,
    TreeComponent,
  ],
})
export class UiCoreModule {}
