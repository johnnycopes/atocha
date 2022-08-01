import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  ViewEncapsulation,
} from '@angular/core';

@Component({
  selector: 'ui-section',
  templateUrl: './section.component.html',
  styleUrls: ['./section.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class SectionComponent {
  @HostBinding('class')
  public hostClass = 'ui-section';
}
