import { Directive, Input, TemplateRef } from '@angular/core';

interface CardTemplateContext<T> {
  $implicit: T;
  uiCard: T;
}

@Directive({
  standalone: true,
  selector: '[uiCard]',
})
export class CardTemplateDirective<TCard> {
  // eslint-disable-next-line @angular-eslint/no-input-rename
  @Input('uiCard') card: TCard[] = [];

  constructor(public template: TemplateRef<TCard>) {}

  static ngTemplateContextGuard<TContextItem>(
    dir: CardTemplateDirective<TContextItem>,
    ctx: unknown
  ): ctx is CardTemplateContext<TContextItem> {
    return true;
  }
}
