import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'ui-separator',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './separator.component.html',
  styleUrls: ['./separator.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
})
export class SeparatorComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
