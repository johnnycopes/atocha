import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OxioracleDataAccessComponent } from './oxioracle-data-access.component';

describe('OxioracleDataAccessComponent', () => {
  let component: OxioracleDataAccessComponent;
  let fixture: ComponentFixture<OxioracleDataAccessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OxioracleDataAccessComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(OxioracleDataAccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
