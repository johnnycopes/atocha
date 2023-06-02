import { Directive, Input } from '@angular/core';

export interface CardTemplateContext<T> {
  $implicit: T;
  uiCard: T;
}

@Directive({
  standalone: true,
  selector: 'ng-template[uiCard]',
})
export class CardTemplateDirective<TCard> {
  // eslint-disable-next-line @angular-eslint/no-input-rename
  @Input('uiCard') card: readonly TCard[] = [];

  static ngTemplateContextGuard<TContextItem>(
    dir: CardTemplateDirective<TContextItem>,
    ctx: unknown
  ): ctx is CardTemplateContext<TContextItem> {
    return true;
  }
}
