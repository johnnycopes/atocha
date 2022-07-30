import { ChangeDetectionStrategy, Component, HostBinding, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-small-caps-label',
  templateUrl: './small-caps-label.component.html',
  styleUrls: ['./small-caps-label.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class SmallCapsLabelComponent {
  @HostBinding('class')
  public hostClass = 'app-small-caps-label';
}
