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
  AutofocusDirective,
  ButtonComponent,
  CheckboxComponent,
  trackBySelf,
} from '@atocha/core/ui';
import { DishData } from '@atocha/menu-matriarch/dishes/data-access';
import {
  InputComponent,
  ingredientTrackByFn,
} from '@atocha/menu-matriarch/shared/ui';
import {
  Dish,
  IngredientModel,
  TagModel,
  getDishTypes,
  recordToArray,
} from '@atocha/menu-matriarch/shared/util';
import {
  TagComponent,
  TagDefDirective,
  TagsListComponent,
} from '@atocha/menu-matriarch/tags/ui';
import { DishEditForm } from './dish-edit-form';

export type DishConfig = Pick<
  Dish,
  'name' | 'description' | 'link' | 'type' | 'notes'
> & { ingredientModels: IngredientModel[]; tagModels: TagModel[] };

@Component({
  selector: 'app-dish-edit-form',
  imports: [
    AutofocusDirective,
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
  readonly ingredientTrackByFn = ingredientTrackByFn;

  ngOnInit() {
    if (this.dish) {
      this.form = new DishEditForm(this.dish);
    }
  }

  async onSave(): Promise<void> {
    if (!this.form) {
      return;
    }

    const { name, description, link, type, ingredientIds, tagIds, notes } =
      this.form.getRawValue();
    this.save.emit({
      name,
      description,
      link,
      type,
      ingredientIds: recordToArray<string>(ingredientIds ?? []),
      tagIds: recordToArray<string>(tagIds ?? []),
      notes,
    });
  }
}
