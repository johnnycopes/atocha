import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'atocha-nested-checkboxes',
  templateUrl: './nested-checkboxes.component.html',
  styleUrls: ['./nested-checkboxes.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NestedCheckboxesComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
