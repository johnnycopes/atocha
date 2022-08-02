import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule } from '@angular/forms';

import { CoreUiModule } from '@atocha/core/ui';
import { MenuMatriarchUiModule } from '@atocha/menu-matriarch/ui';

import { CheckboxComponent } from './checkbox/checkbox.component';
import { InlineFormComponent } from './inline-form/inline-form.component';
import { KanbanBoardColumnComponent } from './kanban-board/kanban-board-column/kanban-board-column.component';
import { KanbanBoardComponent } from './kanban-board/kanban-board.component';
import { KanbanBoardFormComponent } from './kanban-board/kanban-board-form/kanban-board-form.component';
import { OptionsMenuComponent } from './options-menu/options-menu.component';
import { OptionsMenuItemComponent } from './options-menu/options-menu-item/options-menu-item.component';
import { OptionsMenuTriggerDirective } from './options-menu/options-menu-trigger.directive';
import { SearchInputComponent } from './search-input/search-input.component';

@NgModule({
  imports: [CommonModule, DragDropModule, FontAwesomeModule, FormsModule, CoreUiModule, MenuMatriarchUiModule],
  declarations: [
    CheckboxComponent,
    InlineFormComponent,
    KanbanBoardColumnComponent,
    KanbanBoardComponent,
    KanbanBoardFormComponent,
    OptionsMenuComponent,
    OptionsMenuItemComponent,
    OptionsMenuTriggerDirective,
    SearchInputComponent,
  ],
  exports: [
    CheckboxComponent,
    InlineFormComponent,
    KanbanBoardColumnComponent,
    KanbanBoardComponent,
    KanbanBoardFormComponent,
    OptionsMenuComponent,
    OptionsMenuItemComponent,
    OptionsMenuTriggerDirective,
    SearchInputComponent,
  ],
})
export class GenericModule {}
