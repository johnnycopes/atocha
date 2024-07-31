import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OxioracleFeatureShellComponent } from './oxioracle-feature-shell.component';

describe('OxioracleFeatureShellComponent', () => {
  let component: OxioracleFeatureShellComponent;
  let fixture: ComponentFixture<OxioracleFeatureShellComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OxioracleFeatureShellComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(OxioracleFeatureShellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
