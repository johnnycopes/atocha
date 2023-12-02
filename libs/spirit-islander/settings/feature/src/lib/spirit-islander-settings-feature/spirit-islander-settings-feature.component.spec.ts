import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SpiritIslanderSettingsFeatureComponent } from './spirit-islander-settings-feature.component';

describe('SpiritIslanderSettingsFeatureComponent', () => {
  let component: SpiritIslanderSettingsFeatureComponent;
  let fixture: ComponentFixture<SpiritIslanderSettingsFeatureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SpiritIslanderSettingsFeatureComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SpiritIslanderSettingsFeatureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
