import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

import { State } from '@atocha/core/util';
import {
  QuizType,
  Selection,
  SelectionParams,
  mapRegionsToPlaceModel,
} from '@atocha/globetrotter/util';
import { PlaceService } from './place.service';

@Injectable({
  providedIn: 'root',
})
export class SelectService {
  private readonly _state = new State<Selection>({
    type: QuizType.flagsCountries,
    quantity: 5,
    model: [],
  });

  selection$ = this._state.get();

  constructor(private _placeService: PlaceService) {
    this._placeService.places$
      .pipe(map(({ regions }) => regions))
      .subscribe((regions) =>
        this.updateModel(mapRegionsToPlaceModel(regions))
      );
  }

  updateSelection(selection: Selection): void {
    this._state.update(selection);
  }

  updateType(type: QuizType): void {
    this._state.updateProp('type', type);
  }

  updateQuantity(quantity: number): void {
    this._state.updateProp('quantity', quantity);
  }

  updateModel(model: string[]): void {
    this._state.updateProp('model', model);
  }

  mapSelectionToQueryParams(selection: Selection): SelectionParams {
    const type = selection.type.toString();
    const quantity = selection.quantity.toString();
    const model = selection.model.join(',');
    return {
      type,
      quantity,
      model,
    };
  }

  mapQueryParamsToSelection(queryParams: SelectionParams): Selection {
    const type = parseInt(queryParams.type, 10) as QuizType;
    const quantity = parseInt(queryParams.quantity, 10);
    const model: string[] = queryParams.model.split(',');
    return {
      type,
      quantity,
      model,
    };
  }
}
