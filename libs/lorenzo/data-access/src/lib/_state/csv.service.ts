import { Injectable } from '@angular/core';
import { Development } from '@atocha/lorenzo/util';
import { startCase } from 'lodash';

import { DEVELOPMENTS } from './_cards/developments';
import { FAMILIES } from './_cards/families';
import { LEADERS } from './_cards/leaders';

@Injectable({
  providedIn: 'root',
})
export class CsvService {
  exportDevelopments(): void {
    const headers: (keyof Development)[] = [
      'id',
      'period',
      'deck',
      'type',
      'cost',
      'immediateEffect',
      'permanentEffect',
    ];

    const cards: string[][] = [];
    for (const {
      id,
      period,
      deck,
      type,
      cost,
      immediateEffect,
      permanentEffect,
    } of DEVELOPMENTS) {
      const card: string[] = [];
      card.push(
        id,
        period.toString(),
        deck,
        type,
        cost ? this._purify(cost) : 'Free',
        immediateEffect ? this._purify(immediateEffect) : 'None',
        permanentEffect ? this._purify(permanentEffect) : 'None'
      );
      cards.push(card);
    }

    const rows = [headers.map(startCase), ...cards];
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
            typeof value === 'number' ? value.toString() : this._purify(value)
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

  private _purify(str: string): string {
    return `"${str.replace(/\s+/g, ' ').trim()}"`;
  }
}
