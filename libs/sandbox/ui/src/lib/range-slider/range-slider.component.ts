import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnInit,
  ViewChild,
  ElementRef,
  ChangeDetectionStrategy,
  TemplateRef,
} from '@angular/core';
import { CdkDragMove, DragDropModule, Point } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';

export interface Position<T> {
  start: T;
  end: T;
}

type Marker<T> = keyof Position<T>;

@Component({
  standalone: true,
  selector: 'app-range-slider',
  imports: [CommonModule, DragDropModule],
  templateUrl: './range-slider.component.html',
  styleUrls: ['./range-slider.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RangeSliderComponent<T> implements OnInit {
  @Input() steps: T[] = [];
  @Input() labelTemplate: TemplateRef<{ myValue: T }> | undefined;
  @Input()
  set position(position: Position<T>) {
    this.startIndex = this.steps.indexOf(position.start);
    this.endIndex = this.steps.indexOf(position.end);
    this.currentPosition = position;
    this.elevatedMarker = this.endIndex < 10 ? 'end' : 'start';
  }
  @Output() positionChange: EventEmitter<Position<T>> = new EventEmitter();
  @ViewChild('container', { static: true }) container: ElementRef | undefined;
  startIndex = 0;
  endIndex = 0;
  baseDragPosition: Point = { x: 0, y: 0 };
  currentPosition: Position<T> | undefined;
  elevatedMarker: Marker<T> = 'start';
  private _containerWidth = 100;

  ngOnInit(): void {
    this._containerWidth = this.container?.nativeElement.offsetWidth;
  }

  onDragRelease(): void {
    this.positionChange.emit(this.currentPosition);
    this.baseDragPosition = { x: 0, y: 0 };
  }

  updateStart(dragEvent: CdkDragMove<T>): void {
    const indexChange = this._calculateIndexChange(dragEvent);
    const newStartIndex = this._calculateNewIndex(this.startIndex, indexChange);
    const start =
      newStartIndex < this.endIndex
        ? this.steps[newStartIndex]
        : this.steps[this.endIndex];

    if (this.currentPosition) {
      this.currentPosition = {
        start,
        end: this.currentPosition.end,
      };
    }
  }

  updateEnd(dragEvent: CdkDragMove<T>): void {
    const indexChange = this._calculateIndexChange(dragEvent);
    const newEndIndex = this._calculateNewIndex(this.endIndex, indexChange);
    const end =
      newEndIndex > this.startIndex
        ? this.steps[newEndIndex]
        : this.steps[this.startIndex];
    if (this.currentPosition) {
      this.currentPosition = {
        start: this.currentPosition.start,
        end,
      };
    }
  }

  private _calculateIndexChange(dragEvent: CdkDragMove<T>): number {
    const stepSize = this._containerWidth / this.steps.length;
    return Math.round(dragEvent.distance.x / stepSize);
  }

  private _calculateNewIndex(index: number, indexChange: number): number {
    let newIndex = index + indexChange;
    if (newIndex > this.steps.length - 1) {
      newIndex = this.steps.length - 1;
    } else if (newIndex < 0) {
      newIndex = 0;
    }
    return newIndex;
  }
}
