import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OxioracleFeatureDataComponent } from './oxioracle-feature-data.component';

describe('OxioracleFeatureDataComponent', () => {
  let component: OxioracleFeatureDataComponent;
  let fixture: ComponentFixture<OxioracleFeatureDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OxioracleFeatureDataComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(OxioracleFeatureDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
