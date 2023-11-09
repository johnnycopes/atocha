import { Directive, Input, ViewContainerRef, TemplateRef } from '@angular/core';

type Range = [number, number];

@Directive({
  selector: '[appRange]',
})
export class RangeDirective {
  private _appRange: number[] = [];

  @Input()
  set appRange(range: Range) {
    this._viewContainerRef.clear();
    this._appRange = this._generateRange(range);

    this._appRange.forEach((num) => {
      this._viewContainerRef.createEmbeddedView(this._template, {
        $implicit: num,
      });
    });
  }

  constructor(
    private _viewContainerRef: ViewContainerRef,
    private _template: TemplateRef<unknown>
  ) {}

  private _generateRange([from, to]: Range): number[] {
    const range = [];
    for (let i = from; i <= to; i++) {
      range.push(i);
    }
    return range;
  }
}
