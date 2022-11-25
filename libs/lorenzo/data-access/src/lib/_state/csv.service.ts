import { Injectable } from '@angular/core';
import { Development, Family, Leader } from '@atocha/lorenzo/util';
import { startCase } from 'lodash';

import { DEVELOPMENTS } from './_cards/developments';
import { FAMILIES } from './_cards/families';
import { LEADERS } from './_cards/leaders';

/**
 * Generic type mapping that maintains the shape of the passed-in
 * type, but makes all properties non-nullable and requires that
 * the values be callback functions that accept the original value
 * as an argument and instead return a string
 */
type CsvMapping<T> = {
  [Property in keyof T]-?: string;
};

type CsvDevelopment = CsvMapping<Development>;
type CsvFamily = CsvMapping<Family>;
type CsvLeader = CsvMapping<Leader>;

type CsvExceptions<T> = {
  [Property in keyof T]-?: (prop: T[Property]) => string;
};
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
    const cards = DEVELOPMENTS.map<CsvDevelopment>(
      ({ id, period, deck, type, cost, immediateEffect, permanentEffect }) => ({
        id: this._purify(id),
        period: this._purify(period.toString()),
        deck: this._purify(deck),
        type: this._purify(type),
        cost: this._purify(cost ?? 'Free'),
        immediateEffect: this._purify(immediateEffect ?? 'None'),
        permanentEffect: this._purify(permanentEffect ?? 'None'),
      })
    ).map<string[]>(Object.values);

    // const exceptions: CsvExceptions<Development> = {
    //   id: (id) => id,
    //   deck: (deck) => deck,
    //   type: (type) => type,
    //   period: (period) => period.toString(),
    //   cost: (cost) => cost ?? 'Free',
    //   immediateEffect: (effect) => effect ?? 'None',
    //   permanentEffect: (effect) => effect ?? 'None',
    // };
    // const cards = DEVELOPMENTS.map((development) =>
    //   headers.map((header) => {
    //     if (exceptions[header]) {
    //       return exceptions[header](development[header]);
    //     }
    //     return development[header];
    //   })
    // );

    const rows = [headers.map(startCase), ...cards];
    this._generateCsv(rows);
  }

  exportFamilies(): void {
    const headers: (keyof Family)[] = ['name', 'privilege'];
    const cards = FAMILIES.map((family) =>
      headers.map((header) => this._purify(family[header]))
    );

    const rows = [headers.map(startCase), ...cards];
    this._generateCsv(rows);
  }

  exportLeaders(): void {
    const headers: (keyof Leader)[] = [
      'name',
      'requirement',
      'type',
      'ability',
    ];
    const cards = LEADERS.map((leader) =>
      headers.map((header) => this._purify(leader[header]))
    ).map<string[]>(Object.values);

    const rows = [headers.map(startCase), ...cards];
    this._generateCsv(rows);
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
