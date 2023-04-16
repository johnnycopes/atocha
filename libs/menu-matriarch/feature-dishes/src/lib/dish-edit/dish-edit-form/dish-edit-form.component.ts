import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { EditorComponent } from '@tinymce/tinymce-angular';

import {
  ButtonComponent,
  CheckboxComponent,
  trackBySelf,
} from '@atocha/core/ui';
import { recordToArray } from '@atocha/core/util';
import { DishData } from '@atocha/menu-matriarch/data-access';
import {
  TagComponent,
  TagDefDirective,
  TagsListComponent,
} from '@atocha/menu-matriarch/ui-domain';
import { InputComponent } from '@atocha/menu-matriarch/ui-generic';
import { Dish, TagModel, getDishTypes } from '@atocha/menu-matriarch/util';
import { DishEditForm } from './dish-edit-form';

export type DishConfig = Pick<
  Dish,
  'name' | 'description' | 'link' | 'type' | 'notes'
> & { tagModels: TagModel[] };

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
export class DishEditFormComponent implements OnInit {
  @Input() dish: DishConfig | undefined;
  @Output() save = new EventEmitter<DishData>();

  form: DishEditForm | undefined;
  readonly dishTypes = getDishTypes();
  readonly tinyMceConfig = {
    height: 300,
    menubar: false,
    plugins: ['lists', 'searchreplace', 'wordcount'],
    toolbar: `undo redo | formatselect | bold italic underline forecolor backcolor |
      bullist numlist outdent indent | removeformat | help`,
  };
  readonly tinyMceApiKey = '4yfx3pv3xaz2njb6vj43b4grlu0qfmodc0l9xvuw4elb3ijx';
  readonly typeTrackByFn = trackBySelf;

  ngOnInit() {
    if (this.dish) {
      this.form = new DishEditForm(this.dish);
    }
  }

  async onSave(): Promise<void> {
    if (!this.form) {
      return;
    }

    const { name, description, link, type, tagIds, notes } =
      this.form.getRawValue();
    this.save.emit({
      name,
      description,
      link,
      type,
      tagIds: recordToArray<string>(tagIds ?? []),
      notes,
    });
  }
}
