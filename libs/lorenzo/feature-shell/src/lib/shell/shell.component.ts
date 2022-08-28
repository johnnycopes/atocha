import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BrowseComponent } from '@atocha/lorenzo/feature-browse';

@Component({
  standalone: true,
  selector: 'app-shell',
  imports: [
    BrowseComponent,
    CommonModule,
    RouterModule,
  ],
  templateUrl: './shell.component.html',
  styleUrls: ['./shell.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShellComponent {}
