import {
  Component,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';

import { Region, mapRegionsToPlaceModel } from '@atocha/globetrotter/util';
import {
  createPlaceTree,
  getId,
  getChildren,
  getNumberOfCountries,
  PlaceTree,
} from './create-places-tree';

@Component({
  selector: 'app-select-places',
  templateUrl: './select-places.component.html',
  styleUrls: ['./select-places.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectPlacesComponent {
  @Input()
  set regions(value: Region[]) {
    this._allSelectedModel = mapRegionsToPlaceModel(value);
    this.tree = createPlaceTree({ root: 'Places', regions: value });
  }
  @Input() model: string[] = [];
  @Output() modelChange = new EventEmitter<string[]>();

  tree: PlaceTree | undefined;
  getId = getId;
  getChildren = getChildren;
  getNumberOfCountries = getNumberOfCountries;
  private _allSelectedModel: string[] = [];

  onModelChange(model: string[]): void {
    this.modelChange.emit(model);
  }

  onSelectAll(): void {
    this.modelChange.emit(this._allSelectedModel);
  }

  onClearAll(): void {
    this.modelChange.emit([]);
  }
}
