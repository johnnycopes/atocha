import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuMatriarchUiGenericComponent } from './menu-matriarch-ui-generic.component';

describe('MenuMatriarchUiGenericComponent', () => {
  let component: MenuMatriarchUiGenericComponent;
  let fixture: ComponentFixture<MenuMatriarchUiGenericComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MenuMatriarchUiGenericComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MenuMatriarchUiGenericComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
