import { Injectable } from '@angular/core';

import { Dish } from '@models/dish.interface';
import { DishType } from '@models/dish-type.type';
import { Menu } from '@models/menu.interface';
import { MenuEntry } from '@models/menu-entry.interface';
import { Orientation } from '@models/orientation.type';
import { getDishTypes } from '@utility/domain/get-dish-types';

type PrintMenu = Pick<Menu,
  'name' | 'entries' | 'fallbackText' | 'orientation'
>;

@Injectable({
  providedIn: 'root'
})
export class PrintService {
  private _popupWindow: Window | null = null;

  public printMenu(menu: PrintMenu): void {
    if (this._popupWindow == null || this._popupWindow.closed) {
      this._popupWindow = window.open(undefined, '_blank', 'resizable,scrollbars,status');
      this._popupWindow?.document.open();
      this._popupWindow?.document.write(this._createDocument(menu));
      this._popupWindow?.document.close();
    } else {
      this._popupWindow.focus();
    }
  }

  private _createDocument({ name, entries, fallbackText, orientation }: PrintMenu): string {
    return `
      <html>
        <head>
          <title>Menu Matriarch | ${name}</title>
          <style>
            ${this._createStyles()}
          </style>
        </head>
        <body onload="window.print()">
          <h1 class="menu-name">${name}</h1>
          ${entries
            .map(entry => this._createEntry({
              entry,
              fallbackText,
              orientation,
            }))
            .join('')
          }
        </body>
      </html>
    `;
  }

  private _createEntry({ entry, fallbackText, orientation }:
    { entry: MenuEntry, fallbackText: string, orientation: Orientation }
  ): string {
    const content = entry.dishes.length
      ? this._createDishesList(entry.dishes, orientation)
      : `<p class="fallback">${fallbackText}</p>`;
    return `<li class="entry">
      <h2 class="day">${entry.day}</h2>
      <div class="meal">
        ${content}
      </div>
    </li>`;
  }

  private _createDishesList(dishes: Dish[], orientation: Orientation) {
    return getDishTypes()
      .map(type =>
        `<ul class="dishes ${type} ${orientation}">
          ${this._createDishes(dishes, type, orientation)}
        </ul>`)
      .join('');
  }

  private _createDishes(dishes: Dish[], type: DishType, orientation: Orientation): string {
    return dishes
      .filter(dish => dish.type === type)
      .map((dish, index) => (orientation === 'vertical' || index === 0 ? '' : '&nbsp') + `<li>${dish.name}</li>`)
      .join(orientation === 'vertical' ? '' : ',');
  }

  private _createStyles(): string {
    return `
      * {
        box-sizing: border-box;
        -webkit-print-color-adjust: exact;
      }

      body {
        margin: 16pt;
        line-height: 1.5;
        color: #222;
      }

      @media print {
        body {
          margin: 0;
          margin-top: 8pt;
        }
      }

      h1, h2, h3, h4, h5, h6, ul, ol, p {
        margin: 0;
        padding: 0;
        font-weight: normal;
      }

      ul, li {
        list-style: none;
      }

      body {
        font-family: 'Georgia';
      }

      .menu-name {
        margin-bottom: 8pt;
        font-size: 14pt;
      }

      .entry {
        margin-bottom: 8pt;
      }

      .meal {
        max-width: 256pt;
        margin-left: 4pt;
      }

      .day {
        max-width: 256pt;
        font-size: 9pt;
        letter-spacing: 0.5pt;
        text-transform: uppercase;
        border-bottom: 1px solid #e2e2e2;
      }

      .dishes {
        display: flex;
        font-size: 12pt;
      }

      .horizontal {
        flex-wrap: wrap;
      }

      .vertical {
        flex-direction: column;
      }

      .main {
        font-weight: bold;
      }

      .dessert {
        font-style: italic;
      }

      .fallback {
        min-height: 18pt;
        font-style: italic;
      }
    `;
  }
}
