import { Pipe, PipeTransform } from '@angular/core';

type Unit = 'km' | 'mi' | 'sqKm' | 'sqMi';

@Pipe({
  name: 'measurement',
})
export class MeasurementPipe implements PipeTransform {
  transform(value: number, fromUnit: Unit, toUnit: Unit): number {
    if (fromUnit === 'km' && toUnit === 'mi') {
      return this._convertKilometersToMiles(value);
    } else if (fromUnit === 'sqKm' && toUnit === 'sqMi') {
      return this._convertSquareKilometersToSquareMiles(value);
    }
    return value;
  }

  private _convertKilometersToMiles(kilometers: number): number {
    return kilometers / 1.609;
  }

  private _convertSquareKilometersToSquareMiles(kilometers: number): number {
    return kilometers / 2.59;
  }
}
