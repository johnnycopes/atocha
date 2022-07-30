import { Directive, Input, ViewContainerRef, TemplateRef } from '@angular/core';

interface RangeContext {
  $implicit: number;
}

@Directive({
  selector: '[appRange]'
})
export class RangeDirective {
  private _range: number[] = [];

  @Input('appRange')
  set range(value: number[]) {
    this.vcr.clear();
    this._range = this._generateRange(value[0], value[1]);
    this._range.forEach(num => {
      this.vcr.createEmbeddedView(this.tpl, {
        $implicit: num
      });
    });
  }

  constructor(private vcr: ViewContainerRef, private tpl: TemplateRef<RangeContext>) { }

  private _generateRange(from: number, to: number): number[] {
    const arr = [];
    for (let i = from; i <= to; i++) {
      arr.push(i);
    }
    return arr;
  }
}
