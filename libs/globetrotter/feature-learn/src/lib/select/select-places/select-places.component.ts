import { CommonModule } from '@angular/common';
import {
  Component,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';
import { FormsModule } from '@angular/forms';

import { IconComponent, SmallCapsComponent } from '@atocha/globetrotter/ui';
import { ButtonComponent, CheckboxComponent } from '@atocha/core/ui';
import { CountedSelectionTreeComponent } from '@atocha/tree/ui';
import { Region, mapRegionsToPlacesModel } from '@atocha/globetrotter/util';
import {
  createPlaceRoot,
  getId,
  getChildren,
  getNumberOfCountries,
  Root,
} from './create-places-tree';

@Component({
  standalone: true,
  selector: 'app-select-places',
  imports: [
    ButtonComponent,
    CheckboxComponent,
    CommonModule,
    CountedSelectionTreeComponent,
    FormsModule,
    IconComponent,
    SmallCapsComponent,
  ],
  templateUrl: './select-places.component.html',
  styleUrls: ['./select-places.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectPlacesComponent {
  @Input()
  set regions(regions: Region[]) {
    this._allPlaces = mapRegionsToPlacesModel(regions);
    this.root = createPlaceRoot('Places', regions);
  }
  @Input() places: string[] = [];
  @Output() placesChange = new EventEmitter<string[]>();

  root: Root | undefined;
  getId = getId;
  getChildren = getChildren;
  getNumberOfCountries = getNumberOfCountries;
  private _allPlaces: string[] = [];

  onPlacesChange(places: string[]): void {
    this.placesChange.emit(places);
  }

  onSelectAll(): void {
    this.placesChange.emit(this._allPlaces);
  }

  onClearAll(): void {
    this.placesChange.emit([]);
  }
}
