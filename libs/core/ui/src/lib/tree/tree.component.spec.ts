import { Component } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { TreeComponent } from './tree.component';

interface DummyItem {
  id: string;
  name: string;
  items?: DummyItem[];
}

@Component({
  template: `
    <ui-tree
      [node]="flatItem"
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
class TestHostComponent {
  public flatItem: DummyItem = {
    id: '1',
    name: 'Item 1',
  };
  public nestedItem: DummyItem = {
    id: '2',
    name: 'Item 2',
    items: [
      {
        id: '2A',
        name: 'Item 2A',
      },
    ],
  };
  public getId = (item: DummyItem) => item.id;
  public getItems = (item: DummyItem) => item?.items ?? [];
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

  it('creates', () => {
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
