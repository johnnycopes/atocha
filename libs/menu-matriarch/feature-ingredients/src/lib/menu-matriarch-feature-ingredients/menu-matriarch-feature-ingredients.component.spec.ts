import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuMatriarchFeatureIngredientsComponent } from './menu-matriarch-feature-ingredients.component';

describe('MenuMatriarchFeatureIngredientsComponent', () => {
  let component: MenuMatriarchFeatureIngredientsComponent;
  let fixture: ComponentFixture<MenuMatriarchFeatureIngredientsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MenuMatriarchFeatureIngredientsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MenuMatriarchFeatureIngredientsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
