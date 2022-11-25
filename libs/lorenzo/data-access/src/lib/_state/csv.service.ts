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

    const rows = [headers.map(startCase), ...cards];
    this._generateCsv(rows);
  }

  exportFamilies(): void {
    const headers: (keyof Family)[] = ['name', 'privilege'];
    const cards = FAMILIES.map<CsvFamily>(({ name, privilege }) => ({
      name: this._purify(name),
      privilege: this._purify(privilege),
    })).map<string[]>(Object.values);

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
    const cards = LEADERS.map<CsvLeader>(
      ({ name, requirement, type, ability }) => ({
        name: this._purify(name),
        requirement: this._purify(requirement),
        type: this._purify(type),
        ability: this._purify(ability),
      })
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
