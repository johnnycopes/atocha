import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnChanges,
} from '@angular/core';

import { SnakeCasePipe } from '@atocha/core/ui';
import {
  BOARDS,
  BalancedBoardName,
  Board,
  MapName,
  ThematicBoardName,
} from '@atocha/spirit-islander/util';
import { EmblemComponent } from '../emblem/emblem.component';

type ThematicBoardNameAbberviation = 'E' | 'NE' | 'NW' | 'SE' | 'SW' | 'W';

@Component({
  selector: 'ui-board-emblem',
  standalone: true,
  imports: [CommonModule, EmblemComponent, SnakeCasePipe],
  templateUrl: './board-emblem.component.html',
  styleUrls: ['./board-emblem.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BoardEmblemComponent implements OnChanges {
  @Input() mapName: MapName = 'Balanced';
  @Input() board: Board = BOARDS[0];

  boardName: BalancedBoardName | ThematicBoardNameAbberviation =
    this.board.name;

  private readonly _abbreviations: Record<
    ThematicBoardName,
    ThematicBoardNameAbberviation
  > = {
    East: 'E',
    Northeast: 'NE',
    Northwest: 'NW',
    Southeast: 'SE',
    Southwest: 'SW',
    West: 'W',
  };

  ngOnChanges(): void {
    const { name, thematicName } = this.board;

    if (this.mapName === 'Balanced') {
      this.boardName = name;
    } else if (this.mapName === 'Thematic') {
      this.boardName = this._abbreviations[thematicName];
    }
  }
}
