import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule } from '@angular/forms';

import { CoreUiModule } from '@atocha/core/ui';
import { MenuMatriarchUiModule } from '@atocha/menu-matriarch/ui';

@NgModule({
  imports: [CommonModule, DragDropModule, FontAwesomeModule, FormsModule, CoreUiModule, MenuMatriarchUiModule],
  declarations: [],
  exports: [],
})
export class GenericModule {}
