import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GlobetrotterExploreDataAccessComponent } from './globetrotter-explore-data-access.component';

describe('GlobetrotterExploreDataAccessComponent', () => {
  let component: GlobetrotterExploreDataAccessComponent;
  let fixture: ComponentFixture<GlobetrotterExploreDataAccessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GlobetrotterExploreDataAccessComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(GlobetrotterExploreDataAccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
