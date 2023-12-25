import { CommonModule } from '@angular/common';
import {
  Component,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';
import { FormsModule } from '@angular/forms';

import { ButtonComponent, CheckboxComponent } from '@atocha/core/ui';
import { CountedSelectionTreeComponent } from '@atocha/tree/ui';
import { SelectService } from '@atocha/globetrotter/data-access';
import {
  IconComponent,
  SmallCapsComponent,
} from '@atocha/globetrotter/shared/ui';
import { Region } from '@atocha/globetrotter/util';
import {
  createPlaceRoot,
  getId,
  getChildren,
  getNumberOfCountries,
  Root,
} from './create-places-root';

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
    this._allPlaces = this._selectService.mapRegionsToPlacesModel(regions);
    this.root = createPlaceRoot('Places', regions);
  }
  @Input() places: string[] = [];
  @Output() placesChange = new EventEmitter<string[]>();

  root: Root | undefined;
  getId = getId;
  getChildren = getChildren;
  getNumberOfCountries = getNumberOfCountries;
  private _allPlaces: string[] = [];

  constructor(private _selectService: SelectService) {}

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
