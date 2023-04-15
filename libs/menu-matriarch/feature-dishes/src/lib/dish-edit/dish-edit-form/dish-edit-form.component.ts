import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'app-dish-edit-form',
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './dish-edit-form.component.html',
  styleUrls: ['./dish-edit-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DishEditFormComponent {}
