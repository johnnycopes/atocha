import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { ClickOutsideDirective } from './click-outside.directive';

describe('ClickOutsideDirective', () => {
  @Component({
    standalone: true,
    imports: [ClickOutsideDirective],
    template: `
      <div class="zone">
        Clicking outside the target will fire the print function
      </div>
      <p class="target" (coreClickOutside)="doLogic()">Target</p>
    `,
  })
  class TestComponent {
    doLogic(): void {
      // do something
    }
  }

  let fixture: ComponentFixture<TestComponent>;
  let component: TestComponent;
  let target: DebugElement;

  beforeEach(() => {
    fixture = TestBed.configureTestingModule({
      imports: [TestComponent],
    }).createComponent(TestComponent);
    fixture.detectChanges();

    component = fixture.componentInstance;
    target = fixture.debugElement.query(By.directive(ClickOutsideDirective));

    jest
      .spyOn(window, 'requestAnimationFrame')
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .mockImplementation((cb) => cb(0) as any);
  });

  it('should create', () => {
    expect(fixture).toBeTruthy();
  });

  it('should have directive attached', () => {
    const elements = fixture.debugElement.queryAll(
      By.directive(ClickOutsideDirective)
    );
    expect(elements.length).toBe(1);
  });

  it('should not fire when the directive host', () => {
    jest.spyOn(component, 'doLogic');
    fixture.detectChanges();
    target.nativeElement.click();
    expect(component.doLogic).toBeCalledTimes(0);
  });

  it('should fire clicking anywhere outside the directive host', () => {
    jest.spyOn(component, 'doLogic');
    fixture.detectChanges();
    document.dispatchEvent(new MouseEvent('click'));
    expect(component.doLogic).toBeCalledTimes(1);
  });

  it('should fire when pressing escape (but not any other key)', () => {
    jest.spyOn(component, 'doLogic');
    fixture.detectChanges();
    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));
    expect(component.doLogic).toBeCalledTimes(1);
  });
});
