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
  [Property in keyof T]-?: (prop: T[Property]) => string;
};

type CsvDevelopment = CsvMapping<Development>;
type CsvFamily = CsvMapping<Family>;
type CsvLeader = CsvMapping<Leader>;

@Injectable({
  providedIn: 'root',
})
export class CsvService {
  exportDevelopments(): void {
    const csvDevelopment: CsvDevelopment = {
      id: (id) => id,
      period: (period) => period.toString(),
      deck: (deck) => deck,
      type: (type) => type,
      cost: (cost) => cost ?? 'Free',
      immediateEffect: (effect) => effect ?? 'None',
      permanentEffect: (effect) => effect ?? 'None',
    };

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
    const csvFamily: CsvFamily = {
      name: (name) => name,
      privilege: (privilege) => privilege,
    };

    const headers = Object.keys(csvFamily) as (keyof Family)[];

    const cards: string[][] = [];
    for (const family of FAMILIES) {
      const card: string[] = [];
      for (const header of headers) {
        const func = csvFamily[header];
        const prop = family[header];
        card.push(this._purify(func(prop)));
      }
      cards.push(card);
    }

    const rows = [headers.map(startCase), ...cards];
    this._generateCsv(rows);
  }

  exportLeaders(): void {
    const csvLeader: CsvLeader = {
      name: (name) => name,
      requirement: (requirement) => requirement,
      type: (type) => type,
      ability: (ability) => ability,
    };

    const headers = Object.keys(csvLeader) as (keyof Leader)[];

    const cards: string[][] = [];
    for (const leader of LEADERS) {
      const card: string[] = [];
      for (const header of headers) {
        const func = csvLeader[header];
        const prop = leader[header];
        card.push(this._purify(typeof prop === 'string' ? prop : func(prop)));
      }
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

  private _purify<T extends string>(str: T): string {
    return `"${str.replace(/\s+/g, ' ').trim()}"`;
  }
}
