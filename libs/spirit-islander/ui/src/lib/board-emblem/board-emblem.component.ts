import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { snakeCase } from '@atocha/core/util';
import {
  Board,
  MapName,
  ThematicBoardName,
} from '@atocha/spirit-islander/util';
import { EmblemComponent } from '../emblem/emblem.component';

@Component({
  selector: 'ui-board-emblem',
  standalone: true,
  imports: [CommonModule, EmblemComponent],
  templateUrl: './board-emblem.component.html',
  styleUrls: ['./board-emblem.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  // eslint-disable-next-line @angular-eslint/no-host-metadata-property
  host: {
    class: 'ui-board-emblem',
  },
})
export class BoardEmblemComponent {
  @Input() board: Board | undefined;

  @Input()
  set mapName(name: MapName) {
    if (!this.board) {
      return;
    }
    this.map = snakeCase(name);
    if (name === 'Balanced') {
      this.boardName = this.board.name;
    } else if (name === 'Thematic') {
      this.boardName = this._getAbbreviation(this.board.thematicName);
    }
  }

  map = '';
  boardName: string | undefined;

  private _getAbbreviation(name: ThematicBoardName): string {
    switch (name) {
      case 'East':
        return 'E';
      case 'Northeast':
        return 'NE';
      case 'Northwest':
        return 'NW';
      case 'Southeast':
        return 'SE';
      case 'Southwest':
        return 'SW';
      case 'West':
        return 'W';
    }
  }
}
