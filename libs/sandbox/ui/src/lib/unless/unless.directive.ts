import {
  Directive,
  Input,
  TemplateRef,
  ViewContainerRef,
  inject,
} from '@angular/core';

@Directive({
  standalone: true,
  selector: '[appUnless]',
})
export class UnlessDirective<T> {
  private _templateRef = inject<TemplateRef<T>>(TemplateRef);
  private _viewContainer = inject(ViewContainerRef);
  private _hasView = false;

  @Input()
  set appUnless(condition: boolean) {
    if (!condition && !this._hasView) {
      this._viewContainer.createEmbeddedView(this._templateRef);
      this._hasView = true;
    } else if (condition && this._hasView) {
      this._viewContainer.clear();
      this._hasView = false;
    }
  }
}
