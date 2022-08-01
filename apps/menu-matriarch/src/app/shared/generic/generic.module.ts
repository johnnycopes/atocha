import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule } from '@angular/forms';

import { CoreUiModule } from '@atocha/core/ui';
import { MenuMatriarchUiModule } from '@atocha/menu-matriarch/ui';

import { AlertComponent } from './alert/alert.component';
import { CardComponent } from './card/card.component';
import { CheckboxComponent } from './checkbox/checkbox.component';
import { InlineFormComponent } from './inline-form/inline-form.component';
import { InputComponent } from './input/input.component';
import { KanbanBoardColumnComponent } from './kanban-board/kanban-board-column/kanban-board-column.component';
import { KanbanBoardComponent } from './kanban-board/kanban-board.component';
import { KanbanBoardFormComponent } from './kanban-board/kanban-board-form/kanban-board-form.component';
import { OptionsMenuComponent } from './options-menu/options-menu.component';
import { OptionsMenuItemComponent } from './options-menu/options-menu-item/options-menu-item.component';
import { OptionsMenuTriggerDirective } from './options-menu/options-menu-trigger.directive';
import { PanelComponent } from './panel/panel.component';
import { SafePipe } from './safe/safe.pipe';
import { SearchInputComponent } from './search-input/search-input.component';
import { SectionComponent } from './section/section.component';
import { SmallCapsLabelComponent } from './small-caps-label/small-caps-label.component';
import { TabComponent } from './tabset/tab/tab.component';
import { TabsetComponent } from './tabset/tabset.component';

@NgModule({
  imports: [CommonModule, DragDropModule, FontAwesomeModule, FormsModule, CoreUiModule, MenuMatriarchUiModule],
  declarations: [
    AlertComponent,
    CardComponent,
    CheckboxComponent,
    InlineFormComponent,
    InputComponent,
    KanbanBoardColumnComponent,
    KanbanBoardComponent,
    KanbanBoardFormComponent,
    OptionsMenuComponent,
    OptionsMenuItemComponent,
    OptionsMenuTriggerDirective,
    PanelComponent,
    SafePipe,
    SearchInputComponent,
    SectionComponent,
    SmallCapsLabelComponent,
    TabComponent,
    TabsetComponent,
  ],
  exports: [
    AlertComponent,
    CardComponent,
    CheckboxComponent,
    InlineFormComponent,
    InputComponent,
    KanbanBoardColumnComponent,
    KanbanBoardComponent,
    KanbanBoardFormComponent,
    OptionsMenuComponent,
    OptionsMenuItemComponent,
    OptionsMenuTriggerDirective,
    PanelComponent,
    SafePipe,
    SearchInputComponent,
    SectionComponent,
    SmallCapsLabelComponent,
    TabComponent,
    TabsetComponent,
  ],
})
export class GenericModule {}
