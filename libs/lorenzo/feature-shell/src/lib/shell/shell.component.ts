import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterModule } from '@angular/router';

import { NavigationComponent } from '../navigation/navigation.component';

@Component({
  standalone: true,
  selector: 'app-shell',
  imports: [CommonModule, NavigationComponent, RouterModule],
  templateUrl: './shell.component.html',
  styleUrls: ['./shell.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShellComponent {}
