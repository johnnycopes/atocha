import { CommonModule } from '@angular/common';
import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';
import { combineLatest } from 'rxjs';
import { first, map } from 'rxjs/operators';

import { ButtonComponent } from '@atocha/core/ui';
import {
  PlaceService,
  ROUTES,
  SelectService,
} from '@atocha/globetrotter/shared/data-access';
import { fadeInAnimation } from '@atocha/globetrotter/shared/ui';
import { QuizType } from '@atocha/globetrotter/shared/util';
import { SelectTypeComponent } from './select-type/select-type.component';
import { SelectQuantityComponent } from './select-quantity/select-quantity.component';
import { SelectPlacesComponent } from './select-places/select-places.component';

@Component({
  standalone: true,
  selector: 'app-select',
  imports: [
    ButtonComponent,
    CommonModule,
    SelectPlacesComponent,
    SelectQuantityComponent,
    SelectTypeComponent,
  ],
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [fadeInAnimation],
})
export class SelectComponent {
  vm$ = combineLatest([
    this._placeService.places$,
    this._selectService.selection$,
  ]).pipe(
    map(([{ regions, countriesBySubregion }, { places, type, quantity }]) => {
      if (!regions.length) {
        return undefined;
      }
      const selectedCountriesQuantity = places.reduce(
        (total, name) =>
          countriesBySubregion[name]
            ? total + countriesBySubregion[name].length
            : total,
        0
      );
      return {
        regions,
        places,
        type,
        quantity,
        invalidQuantity:
          selectedCountriesQuantity < 2 ||
          quantity < 2 ||
          quantity > selectedCountriesQuantity,
      };
    })
  );

  constructor(
    private _placeService: PlaceService,
    private _selectService: SelectService,
    private _router: Router
  ) {}

  onTypeChange(type: QuizType): void {
    this._selectService.updateType(type);
  }

  onQuantityChange(quantity: number): void {
    this._selectService.updateQuantity(quantity);
  }

  onPlacesChange(places: string[]): void {
    this._selectService.updatePlaces(places);
  }

  async onLaunch(): Promise<void> {
    this._selectService.selection$
      .pipe(first())
      .subscribe(async (selection) => {
        if (!selection) {
          return;
        }
        const queryParams =
          this._selectService.mapSelectionToQueryParams(selection);
        await this._router.navigate([`${ROUTES.learn}/${ROUTES.quiz}`], {
          queryParams,
        });
      });
  }
}
