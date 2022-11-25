import { Injectable } from '@angular/core';
import { startCase } from 'lodash';

import { DEVELOPMENTS } from './_cards/developments';
import { FAMILIES } from './_cards/families';
import { LEADERS } from './_cards/leaders';

@Injectable({
  providedIn: 'root',
})
export class CsvService {
  exportDevelopments(): void {
    const rows = [
      Object.keys(DEVELOPMENTS[38]).map(startCase),
      ...DEVELOPMENTS.map(Object.values).map((values) =>
        values.map((value) =>
          typeof value === 'number' ? value.toString() : this._trim(value)
        )
      ),
    ];
    this._generateCsv(rows);
  }

  exportFamilies(): void {
    const rows = this._generateRows(FAMILIES);
    this._generateCsv(rows);
  }

  exportLeaders(): void {
    const rows = this._generateRows(LEADERS);
    this._generateCsv(rows);
  }

  private _generateRows<T extends object>(cards: readonly T[]) {
    if (!cards.length) {
      return [];
    }
    return [
      Object.keys(cards[0]).map(startCase),
      ...cards
        .map(Object.values)
        .map((values) =>
          values.map((value) =>
            typeof value === 'number' ? value.toString() : this._trim(value)
          )
        ),
    ];
  }

  private _generateCsv(rows: string[][]): void {
    const csvContent =
      'data:text/csv;charset=utf-8,' + rows.map((e) => e.join(',')).join('\n');

    const encodedUri = encodeURI(csvContent);
    window.open(encodedUri);
  }

  private _trim(str: string): string {
    return `"${str.replace(/\s+/g, ' ').trim()}"`;
  }
}
