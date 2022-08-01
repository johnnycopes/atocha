import { Pipe, PipeTransform } from '@angular/core';
import {
  DomSanitizer,
  SafeResourceUrl,
  SafeStyle,
} from '@angular/platform-browser';

type SafeValue = 'html' | 'style' | 'resourceUrl';

@Pipe({
  name: 'coreSafe',
})
export class SafePipe implements PipeTransform {
  constructor(private _sanitizer: DomSanitizer) {}

  public transform(
    value: string | undefined,
    type: SafeValue
  ): SafeResourceUrl | SafeStyle {
    if (!value) {
      return '';
    }
    switch (type) {
      case 'html':
        return this._sanitizer.bypassSecurityTrustHtml(value);
      case 'style':
        return this._sanitizer.bypassSecurityTrustStyle(value);
      case 'resourceUrl':
        return this._sanitizer.bypassSecurityTrustResourceUrl(value);
      default:
        throw new Error(`Invalid safe type specified: ${type}`);
    }
  }
}
