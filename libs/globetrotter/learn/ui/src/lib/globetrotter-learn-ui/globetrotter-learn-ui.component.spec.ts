import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GlobetrotterLearnUiComponent } from './globetrotter-learn-ui.component';

describe('GlobetrotterLearnUiComponent', () => {
  let component: GlobetrotterLearnUiComponent;
  let fixture: ComponentFixture<GlobetrotterLearnUiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GlobetrotterLearnUiComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(GlobetrotterLearnUiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
