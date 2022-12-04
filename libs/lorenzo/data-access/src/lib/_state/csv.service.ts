import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';
import { startCase } from 'lodash';

import { APP_NAME_TOKEN } from '@atocha/core/data-access';
import { Csv } from '@atocha/core/util';
import { Card, Development, Family, Leader } from '@atocha/lorenzo/util';
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

  constructor(
    @Inject(DOCUMENT) private _document: Document,
    @Inject(APP_NAME_TOKEN) private _appName: string
  ) {
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

    this._export({ type: 'development', headers, cards });
  }

  exportFamilies(): void {
    const headers: (keyof Family)[] = ['name', 'privilege'];
    const cards = FAMILIES.map<CsvFamily>(({ name, privilege }) => ({
      name: this._csv.formatValue(name),
      privilege: this._csv.formatValue(privilege),
    })).map(Object.values);

    this._export({ type: 'family', headers, cards });
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

    this._export({ type: 'leader', headers, cards });
  }

  private _export<T extends string>({
    type,
    headers,
    cards,
  }: {
    type: Card;
    headers: T[];
    cards: string[][];
  }): void {
    const filename = this._createFilename(type);
    const rows = [headers.map(startCase), ...cards];
    this._csv.downloadFile(filename, rows);
  }

  private _createFilename(type: Card): string {
    let plural = '';

    if (type === 'development') {
      plural = 'developments';
    } else if (type === 'family') {
      plural = 'families';
    } else if (type === 'leader') {
      plural = 'leaders';
    }

    return `${this._appName.toLowerCase()}-${plural}`;
  }
}
