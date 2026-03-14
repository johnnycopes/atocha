import { Directive, Input, ViewContainerRef, TemplateRef, inject } from '@angular/core';

type Range = [number, number];

@Directive({
  selector: '[appRange]',
})
export class RangeDirective {
  private _viewContainerRef = inject(ViewContainerRef);
  private _template = inject<TemplateRef<unknown>>(TemplateRef);
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

  private _generateRange([from, to]: Range): number[] {
    const range = [];
    for (let i = from; i <= to; i++) {
      range.push(i);
    }
    return range;
  }
}
