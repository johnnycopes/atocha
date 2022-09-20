import { Directive, HostBinding, Input } from '@angular/core';

@Directive({
  standalone: true,
	selector: 'a[coreExternalLink]',
})
export class ExternalLinkDirective {
  // eslint-disable-next-line @angular-eslint/no-input-rename
  @Input('coreExternalLink')
  @HostBinding('href')
  link = '';

	@HostBinding('target')
	linkTarget = '_blank';

	@HostBinding('rel')
	linkRel = 'noreferrer noopener';
}
