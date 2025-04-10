import { CommonModule } from '@angular/common';
import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ButtonComponent, CheckboxComponent } from '@atocha/core/ui';
import { CountedSelectionTreeComponent } from '@atocha/tree/ui';
import {
  IconComponent,
  SmallCapsComponent,
} from '@atocha/globetrotter/shared/ui';
import { SelectService } from '@atocha/globetrotter/learn/data-access';
import { Region } from '@atocha/globetrotter/learn/util';
import {
  createPlaceRoot,
  getId,
  getChildren,
  getNumberOfCountries,
  Root,
} from './create-places-root';
import { SelectForm } from '../select-form';

@Component({
    selector: 'app-select-places',
    imports: [
        ButtonComponent,
        CheckboxComponent,
        CommonModule,
        CountedSelectionTreeComponent,
        FormsModule,
        IconComponent,
        ReactiveFormsModule,
        SmallCapsComponent,
    ],
    templateUrl: './select-places.component.html',
    styleUrls: ['./select-places.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SelectPlacesComponent {
  @Input({ required: true }) form!: SelectForm;
  @Input({ required: true })
  set regions(regions: Region[]) {
    this._allPlaces = this._selectService.mapRegionsToPlacesModel(regions);
    this.root = createPlaceRoot('Places', regions);
  }

  root: Root | undefined;
  readonly getId = getId;
  readonly getChildren = getChildren;
  readonly getNumberOfCountries = getNumberOfCountries;

  private _allPlaces: string[] = [];

  constructor(private _selectService: SelectService) {}

  selectAll(): void {
    this.form.patchValue({ places: this._allPlaces });
  }

  clearAll(): void {
    this.form.patchValue({ places: [] });
  }
}
