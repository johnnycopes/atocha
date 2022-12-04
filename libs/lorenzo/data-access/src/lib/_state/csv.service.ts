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
        id: this._csv.formatCsvStr(id),
        period: this._csv.formatCsvStr(period),
        deck: this._csv.formatCsvStr(deck),
        type: this._csv.formatCsvStr(type),
        cost: this._csv.formatCsvStr(cost ?? 'Free'),
        immediateEffect: this._csv.formatCsvStr(immediateEffect ?? 'None'),
        permanentEffect: this._csv.formatCsvStr(permanentEffect ?? 'None'),
      })
    ).map<string[]>(Object.values);

    const rows = [headers.map(startCase), ...cards];
    this._csv.generateCsv('lorenzo-developments', rows);
  }

  exportFamilies(): void {
    const headers: (keyof Family)[] = ['name', 'privilege'];
    const cards = FAMILIES.map<CsvFamily>(({ name, privilege }) => ({
      name: this._csv.formatCsvStr(name),
      privilege: this._csv.formatCsvStr(privilege),
    })).map(Object.values);

    const rows = [headers.map(startCase), ...cards];
    this._csv.generateCsv('lorenzo-families', rows);
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
        name: this._csv.formatCsvStr(name),
        requirement: this._csv.formatCsvStr(requirement),
        type: this._csv.formatCsvStr(type),
        ability: this._csv.formatCsvStr(ability),
      })
    ).map<string[]>(Object.values);

    const rows = [headers.map(startCase), ...cards];
    this._csv.generateCsv('lorenzo-leaders', rows);
  }
}
