import { Injectable } from '@angular/core';
import { startCase } from 'lodash';

import { DEVELOPMENTS } from './_cards/developments';
import { FAMILIES } from './_cards/families';
import { LEADERS } from './_cards/leaders';

@Injectable({
  providedIn: 'root',
})
export class CsvService {
  exportFamilies() {
    const rows = [
      Object.keys(FAMILIES[0]).map(startCase),
      ...FAMILIES.map(Object.values).map(([name, privilege]) => [
        name,
        this._trim(privilege),
      ]),
    ];

    const csvContent =
      'data:text/csv;charset=utf-8,' + rows.map((e) => e.join(',')).join('\n');

    const encodedUri = encodeURI(csvContent);
    window.open(encodedUri);
  }

  private _trim(str: string): string {
    return `"${str.replace(/\s+/g, ' ').trim()}"`;
  }
}
