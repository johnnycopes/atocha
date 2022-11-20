import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { SnakeCasePipe } from '@atocha/core/ui';
import {
  Board,
  MapName,
  ThematicBoardName,
} from '@atocha/spirit-islander/util';
import { EmblemComponent } from '../emblem/emblem.component';

@Component({
  selector: 'ui-board-emblem',
  standalone: true,
  imports: [CommonModule, EmblemComponent, SnakeCasePipe],
  templateUrl: './board-emblem.component.html',
  styleUrls: ['./board-emblem.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BoardEmblemComponent {
  @Input() board: Board | undefined;

  @Input()
  get mapName() {
    return this._map;
  }
  set mapName(name) {
    if (!this.board) {
      return;
    }

    let boardName = '';
    if (name === 'Balanced') {
      boardName = this.board.name;
    } else if (name === 'Thematic') {
      boardName = this._abbreviations[this.board.thematicName];
    }

    this.boardName = boardName;
    this._map = name;
  }

  boardName = '';
  private _map: MapName = 'Balanced';
  private _abbreviations: Record<ThematicBoardName, string> = {
    East: 'E',
    Northeast: 'NE',
    Northwest: 'NW',
    Southeast: 'SE',
    Southwest: 'SW',
    West: 'W',
  };
}
