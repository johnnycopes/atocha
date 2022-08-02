import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule } from '@angular/forms';

import { CoreUiModule } from '@atocha/core/ui';
import { MenuMatriarchUiModule } from '@atocha/menu-matriarch/ui';

import { KanbanBoardColumnComponent } from './kanban-board/kanban-board-column/kanban-board-column.component';
import { KanbanBoardComponent } from './kanban-board/kanban-board.component';
import { KanbanBoardFormComponent } from './kanban-board/kanban-board-form/kanban-board-form.component';

@NgModule({
  imports: [CommonModule, DragDropModule, FontAwesomeModule, FormsModule, CoreUiModule, MenuMatriarchUiModule],
  declarations: [
    KanbanBoardColumnComponent,
    KanbanBoardComponent,
    KanbanBoardFormComponent,
  ],
  exports: [
    KanbanBoardColumnComponent,
    KanbanBoardComponent,
    KanbanBoardFormComponent,
  ],
})
export class GenericModule {}
