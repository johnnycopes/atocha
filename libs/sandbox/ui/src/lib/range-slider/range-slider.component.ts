import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnInit,
  ViewChild,
  AfterViewInit,
  ElementRef,
  ChangeDetectionStrategy,
  TemplateRef,
} from '@angular/core';
import { CdkDragMove, DragDropModule } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';

export interface IRangeSliderModel<T> {
  start: T;
  end: T;
}

enum EMarker {
  start = 'start',
  end = 'end',
}

@Component({
  standalone: true,
  selector: 'app-range-slider',
  imports: [CommonModule, DragDropModule],
  templateUrl: './range-slider.component.html',
  styleUrls: ['./range-slider.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RangeSliderComponent<T> implements OnInit, AfterViewInit {
  @Input() steps: T[] = [];
  @Input() labelTemplate: TemplateRef<{ myValue: T }> | undefined;
  @Input()
  set model(model: IRangeSliderModel<T>) {
    this.startIndex = this.steps.indexOf(model.start);
    this.endIndex = this.steps.indexOf(model.end);
    this.currentModel = model;
    this.elevatedMarker = this.endIndex < 10 ? EMarker.end : EMarker.start;
  }
  @Output() modelChange: EventEmitter<IRangeSliderModel<T>> =
    new EventEmitter();
  @ViewChild('container') container: ElementRef | undefined;
  startIndex = 0;
  endIndex = 100;
  baseDragPosition: { x: number; y: number } = { x: 0, y: 0 };
  currentModel: IRangeSliderModel<T> | undefined;
  markerEnum: typeof EMarker = EMarker;
  elevatedMarker: EMarker = EMarker.start;
  private _containerWidth = 100;

  ngOnInit(): void {
    this.resetDragPositions();
  }

  ngAfterViewInit(): void {
    this._containerWidth = this.container?.nativeElement.offsetWidth;
  }

  onDragRelease(): void {
    this.modelChange.emit(this.currentModel);
    this.resetDragPositions();
  }

  private resetDragPositions(): void {
    this.baseDragPosition = { x: 0, y: 0 };
  }

  updateStart(dragEvent: CdkDragMove<T>): void {
    const indexChange = this._calculateIndexChange(dragEvent);
    const newStartIndex = this._calculateNewIndex(this.startIndex, indexChange);
    let start: T;
    if (newStartIndex < this.endIndex) {
      start = this.steps[newStartIndex];
    } else {
      start = this.steps[this.endIndex];
    }

    if (this.currentModel) {
      this.currentModel = {
        start,
        end: this.currentModel.end,
      };
    }
  }

  updateEnd(dragEvent: CdkDragMove<T>): void {
    const indexChange = this._calculateIndexChange(dragEvent);
    const newEndIndex = this._calculateNewIndex(this.endIndex, indexChange);
    let end: T;
    if (newEndIndex > this.startIndex) {
      end = this.steps[newEndIndex];
    } else {
      end = this.steps[this.startIndex];
    }
    if (this.currentModel) {
      this.currentModel = {
        start: this.currentModel.start,
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
