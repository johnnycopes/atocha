import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-meal-placeholder',
  templateUrl: './meal-placeholder.component.html',
  styleUrls: ['./meal-placeholder.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MealPlaceholderComponent {}
