import { CommonModule } from '@angular/common';
import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { combineLatest, first, map } from 'rxjs';

import { ButtonComponent } from '@atocha/core/ui';
import { ROUTES } from '@atocha/globetrotter/shared/data-access';
import { fadeIn } from '@atocha/globetrotter/shared/ui';
import {
  PlaceService,
  SelectService,
} from '@atocha/globetrotter/learn/data-access';
import { ErrorsComponent } from './errors/errors.component';
import { SelectForm } from './select-form';
import { SelectTypeComponent } from './select-type/select-type.component';
import { SelectQuantityComponent } from './select-quantity/select-quantity.component';
import { SelectPlacesComponent } from './select-places/select-places.component';

@Component({
  standalone: true,
  selector: 'app-select',
  imports: [
    ButtonComponent,
    CommonModule,
    ErrorsComponent,
    ReactiveFormsModule,
    SelectPlacesComponent,
    SelectQuantityComponent,
    SelectTypeComponent,
  ],
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [fadeIn],
})
export class SelectComponent {
  vm$ = combineLatest([
    this._placeService.places$,
    this._selectService.selection$,
  ]).pipe(
    first(),
    map(([{ regions, countriesBySubregion }, selection]) => ({
      regions,
      form: new SelectForm(
        selection,
        (subregionName: string) => countriesBySubregion[subregionName].length
      ),
    }))
  );

  constructor(
    private _placeService: PlaceService,
    private _selectService: SelectService,
    private _router: Router
  ) {}

  async launch(form: SelectForm): Promise<void> {
    const queryParams = this._selectService.mapSelectionToQueryParams(
      form.getRawValue()
    );
    await this._router.navigate([`${ROUTES.learn}/${ROUTES.quiz}`], {
      queryParams,
    });
  }
}
