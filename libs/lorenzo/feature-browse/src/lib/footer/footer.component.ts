import { ChangeDetectionStrategy, Component } from '@angular/core';

import { ExternalLinkDirective } from '@atocha/core/ui';

@Component({
    // eslint-disable-next-line @angular-eslint/component-selector
    selector: 'footer[app-footer]',
    imports: [ExternalLinkDirective],
    templateUrl: './footer.component.html',
    styleUrls: ['./footer.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class FooterComponent {}
