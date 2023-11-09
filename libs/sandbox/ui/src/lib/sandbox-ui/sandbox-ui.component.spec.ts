import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SandboxUiComponent } from './sandbox-ui.component';

describe('SandboxUiComponent', () => {
  let component: SandboxUiComponent;
  let fixture: ComponentFixture<SandboxUiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SandboxUiComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SandboxUiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
