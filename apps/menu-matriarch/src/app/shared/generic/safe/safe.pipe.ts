import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeResourceUrl, SafeStyle } from '@angular/platform-browser';

type SafeValue = 'html' | 'style' | 'resourceUrl';

@Pipe({
  name: 'safe'
})
export class SafePipe implements PipeTransform {
  constructor(
    protected sanitize: DomSanitizer
  ) { }

  public transform(value: string | undefined, type: SafeValue): SafeResourceUrl | SafeStyle {
    if (!value) {
      return '';
    }
    switch (type) {
      case 'html':
        return this.sanitize.bypassSecurityTrustHtml(value);
      case 'style':
        return this.sanitize.bypassSecurityTrustStyle(value);
      case 'resourceUrl':
        return this.sanitize.bypassSecurityTrustResourceUrl(value);
      default:
        throw new Error(`Invalid safe type specified: ${type}`);
    }
  }
}
