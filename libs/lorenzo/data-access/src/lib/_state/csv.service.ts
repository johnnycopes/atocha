import { Injectable } from '@angular/core';
import { startCase } from 'lodash';

import { removeWhitespace } from '@atocha/core/util';
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
        id: this._formatCsvStr(id),
        period: this._formatCsvStr(period.toString()),
        deck: this._formatCsvStr(deck),
        type: this._formatCsvStr(type),
        cost: this._formatCsvStr(cost ?? 'Free'),
        immediateEffect: this._formatCsvStr(immediateEffect ?? 'None'),
        permanentEffect: this._formatCsvStr(permanentEffect ?? 'None'),
      })
    ).map<string[]>(Object.values);

    const rows = [headers.map(startCase), ...cards];
    this._generateCsv('lorenzo-developments', rows);
  }

  exportFamilies(): void {
    const headers: (keyof Family)[] = ['name', 'privilege'];
    const cards = FAMILIES.map<CsvFamily>(({ name, privilege }) => ({
      name: this._formatCsvStr(name),
      privilege: this._formatCsvStr(privilege),
    })).map(Object.values);

    const rows = [headers.map(startCase), ...cards];
    this._generateCsv('lorenzo-families', rows);
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
        name: this._formatCsvStr(name),
        requirement: this._formatCsvStr(requirement),
        type: this._formatCsvStr(type),
        ability: this._formatCsvStr(ability),
      })
    ).map<string[]>(Object.values);

    const rows = [headers.map(startCase), ...cards];
    this._generateCsv('lorenzo-leaders', rows);
  }

  private _generateCsv(filename: string, rows: string[][]): void {
    const csvContent = rows.map((e) => e.join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', filename);
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  }

  private _formatCsvStr(str: string): string {
    return `"${removeWhitespace(str)}"`;
  }
}
