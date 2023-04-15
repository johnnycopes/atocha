import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { FormsModule, NgForm, ReactiveFormsModule } from '@angular/forms';
import { EditorComponent } from '@tinymce/tinymce-angular';

import {
  ButtonComponent,
  CheckboxComponent,
  trackBySelf,
} from '@atocha/core/ui';
import {
  InputComponent,
  TagComponent,
  TagDefDirective,
  TagsListComponent,
} from '@atocha/menu-matriarch/ui';
import { Dish, DishType, getDishTypes } from '@atocha/menu-matriarch/util';
import { recordToArray } from '@atocha/core/util';
import { RouterLink } from '@angular/router';

export type AppData = Pick<
  Dish,
  'name' | 'description' | 'link' | 'type' | 'tags' | 'notes'
>;

export interface DishEditDetails {
  name: string;
  description: string;
  link: string;
  type: DishType;
  tagIds: string[];
  notes: string;
}

@Component({
  standalone: true,
  selector: 'app-dish-edit-form',
  imports: [
    ButtonComponent,
    CheckboxComponent,
    CommonModule,
    EditorComponent,
    FormsModule,
    InputComponent,
    ReactiveFormsModule,
    RouterLink,
    TagComponent,
    TagDefDirective,
    TagsListComponent,
  ],
  templateUrl: './dish-edit-form.component.html',
  styleUrls: ['./dish-edit-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DishEditFormComponent {
  @Input() vm: AppData | undefined;
  @Output() save = new EventEmitter<DishEditDetails>();

  readonly dishTypes = getDishTypes();
  readonly tinyMceConfig = {
    height: 300,
    menubar: false,
    plugins: ['lists', 'searchreplace', 'wordcount'],
    toolbar: `undo redo | formatselect | bold italic underline forecolor backcolor |
      bullist numlist outdent indent | removeformat | help`,
  };
  readonly typeTrackByFn = trackBySelf;

  async onSave(form: NgForm): Promise<void> {
    this.save.emit({
      name: form.value.name,
      description: form.value.description,
      link: form.value.link,
      type: form.value.type,
      tagIds: recordToArray<string>(form.value?.tags ?? []),
      notes: form.value.notes,
    });
  }
}
