import { Injectable } from '@angular/core';
import { Development, Family, Leader } from '@atocha/lorenzo/util';
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
    const headers: (keyof Family)[] = ['name', 'privilege'];

    const cards: string[][] = [];
    for (const { name, privilege } of FAMILIES) {
      const card: string[] = [];
      card.push(this._purify(name), this._purify(privilege));
      cards.push(card);
    }

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

    const cards: string[][] = [];
    for (const { name, requirement, ability, type } of LEADERS) {
      const card: string[] = [];
      card.push(
        this._purify(name),
        this._purify(requirement),
        this._purify(type),
        this._purify(ability)
      );
      cards.push(card);
    }

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
