import { Directive, HostBinding } from '@angular/core';

@Directive({
  standalone: true,
	selector: 'a[coreExternalLink]',
})
export class ExternalLinkDirective {
	@HostBinding('target')
	linkTarget = '_blank';

	@HostBinding('rel')
	linkRel = 'noreferrer noopener';
}
