import {Directive, Input, OnInit, TemplateRef, ViewContainerRef} from '@angular/core';

interface LetContext<T> {
  appLet: T | null;
}

@Directive({
  selector: '[appLet]'
})
export class LetDirective<T> implements OnInit {
  private _context: LetContext<T> = { appLet: null };

  constructor(
    private _viewContainer: ViewContainerRef,
    private _templateRef: TemplateRef<LetContext<T>>
  ) {

  }

  public ngOnInit(): void {
    this._viewContainer.createEmbeddedView(this._templateRef, this._context);
  }

  @Input()
  set appLet(value: T) {
    this._context.appLet = value;
  }
}
