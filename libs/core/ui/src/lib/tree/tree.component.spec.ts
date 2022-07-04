import { Component } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { TreeComponent } from './tree.component';

interface Item {
  id: string;
  name: string;
  items?: Item[];
}

@Component({
  template: `
    <ui-tree
      [node]="leafItem"
      [template]="item"
      [getId]="getId"
      [getChildren]="getItems"
    ></ui-tree>
    <ui-tree
      [node]="nestedItem"
      [template]="item"
      [getId]="getId"
      [getChildren]="getItems"
    ></ui-tree>

    <ng-template #item let-item let-level="level">
      <h1>{{ item.name }} | Level {{ level }}</h1>
    </ng-template>
  `,
})
// TODO: write tests that make template null in order to test default rendering
class TestHostComponent {
  leafItem: Item = {
    id: '1',
    name: 'Item 1',
  };
  nestedItem: Item = {
    id: '2',
    name: 'Item 2',
    items: [
      {
        id: '2A',
        name: 'Item 2A',
      },
    ],
  };
  getId = ({ id }: Item) => id;
  getItems = ({ items }: Item) => items ?? [];
}

describe('TreeComponent', () => {
  let app: TestHostComponent;
  let fixture: ComponentFixture<TestHostComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [TestHostComponent, TreeComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestHostComponent);
    app = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('renders', () => {
    expect(app).toBeTruthy();
  });

  it('renders item without children', () => {
    const name = fixture.nativeElement.querySelector('h1').textContent;
    fixture.detectChanges();

    expect(name).toBe('Item 1 | Level 0');
  });

  it('renders item with children', () => {
    const name = fixture.nativeElement.querySelectorAll('h1')[1].textContent;
    const childName =
      fixture.nativeElement.querySelectorAll('h1')[2].textContent;
    fixture.detectChanges();

    expect(name).toBe('Item 2 | Level 0');
    expect(childName).toBe('Item 2A | Level 1');
  });
});
