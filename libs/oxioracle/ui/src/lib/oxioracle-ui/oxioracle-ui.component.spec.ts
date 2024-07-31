import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OxioracleUiComponent } from './oxioracle-ui.component';

describe('OxioracleUiComponent', () => {
  let component: OxioracleUiComponent;
  let fixture: ComponentFixture<OxioracleUiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OxioracleUiComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(OxioracleUiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
