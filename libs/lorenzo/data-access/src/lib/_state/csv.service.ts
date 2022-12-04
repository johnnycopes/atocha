import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';
import { startCase } from 'lodash';

import { Csv } from '@atocha/core/util';
import { Development, Family, Leader } from '@atocha/lorenzo/util';
import { DEVELOPMENTS } from './_cards/developments';
import { FAMILIES } from './_cards/families';
import { LEADERS } from './_cards/leaders';

type CsvMapping<T> = Required<{
  [Property in keyof T]: string;
}>;

type CsvDevelopment = CsvMapping<Development>;
type CsvFamily = CsvMapping<Family>;
type CsvLeader = CsvMapping<Leader>;

@Injectable({
  providedIn: 'root',
})
export class CsvService {
  private _csv: Csv;

  constructor(@Inject(DOCUMENT) private _document: Document) {
    this._csv = new Csv(this._document);
  }

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
        id: this._csv.formatValue(id),
        period: this._csv.formatValue(period),
        deck: this._csv.formatValue(deck),
        type: this._csv.formatValue(type),
        cost: this._csv.formatValue(cost ?? 'Free'),
        immediateEffect: this._csv.formatValue(immediateEffect ?? 'None'),
        permanentEffect: this._csv.formatValue(permanentEffect ?? 'None'),
      })
    ).map<string[]>(Object.values);

    this._export({ filename: 'lorenzo-developments', headers, cards });
  }

  exportFamilies(): void {
    const headers: (keyof Family)[] = ['name', 'privilege'];
    const cards = FAMILIES.map<CsvFamily>(({ name, privilege }) => ({
      name: this._csv.formatValue(name),
      privilege: this._csv.formatValue(privilege),
    })).map(Object.values);

    this._export({ filename: 'lorenzo-families', headers, cards });
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
        name: this._csv.formatValue(name),
        requirement: this._csv.formatValue(requirement),
        type: this._csv.formatValue(type),
        ability: this._csv.formatValue(ability),
      })
    ).map<string[]>(Object.values);

    this._export({ filename: 'lorenzo-leaders', headers, cards });
  }

  private _export<T extends string>({
    filename,
    headers,
    cards,
  }: {
    filename: string;
    headers: T[];
    cards: string[][];
  }): void {
    const rows = [headers.map(startCase), ...cards];
    this._csv.downloadFile(filename, rows);
  }
}
