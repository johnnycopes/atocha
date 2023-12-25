import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GlobetrotterLearnDataAccessComponent } from './globetrotter-learn-data-access.component';

describe('GlobetrotterLearnDataAccessComponent', () => {
  let component: GlobetrotterLearnDataAccessComponent;
  let fixture: ComponentFixture<GlobetrotterLearnDataAccessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GlobetrotterLearnDataAccessComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(GlobetrotterLearnDataAccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
