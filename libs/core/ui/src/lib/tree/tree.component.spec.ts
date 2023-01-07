import { Component, TemplateRef, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { TreeComponent } from './tree.component';

interface Item {
  id: string;
  name: string;
  items?: Item[];
}

@Component({
  template: `
    <core-tree
      [tree]="leafItem"
      [template]="itemTemplate"
      [getId]="getId"
      [getChildren]="getItems"
    ></core-tree>
    <core-tree
      [tree]="nestedItem"
      [template]="itemTemplate"
      [getId]="getId"
      [getChildren]="getItems"
    ></core-tree>

    <ng-template #item let-item let-level="level">
      <h1 data-test="ui-tree-test-item">{{ item.name }} | Level {{ level }}</h1>
    </ng-template>
  `,
})
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

  @ViewChild('item', { static: true })
  itemTemplate: TemplateRef<unknown> | undefined;

  getId = ({ id }: Item) => id;
  getItems = ({ items }: Item) => items ?? [];
}

describe('TreeComponent', () => {
  let hostComponent: TestHostComponent;
  let fixture: ComponentFixture<TestHostComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [TreeComponent],
      declarations: [TestHostComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestHostComponent);
    hostComponent = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('renders', () => {
    expect(hostComponent).toBeTruthy();
  });

  it('renders leaf item', () => {
    hostComponent.itemTemplate = undefined;
    fixture.detectChanges();

    const name = fixture.nativeElement
      .querySelector('[data-test="core-tree-default-item"]')
      .textContent.trim();
    expect(name).toBe('1');
  });

  it('renders leaf item with custom template', () => {
    const name = fixture.nativeElement
      .querySelector('[data-test="ui-tree-test-item"]')
      .textContent.trim();
    expect(name).toBe('Item 1 | Level 0');
  });

  it('renders nested item', () => {
    hostComponent.itemTemplate = undefined;
    fixture.detectChanges();

    const items = fixture.nativeElement.querySelectorAll(
      '[data-test="core-tree-default-item"]'
    );
    const name = items[1].textContent.trim();
    const childName = items[2].textContent.trim();

    expect(name).toBe('2');
    expect(childName).toBe('2A');
  });

  it('renders nested item with custom template', () => {
    const items = fixture.nativeElement.querySelectorAll(
      '[data-test="ui-tree-test-item"]'
    );
    const name = items[1].textContent.trim();
    const childName = items[2].textContent.trim();
    fixture.detectChanges();

    expect(name).toBe('Item 2 | Level 0');
    expect(childName).toBe('Item 2A | Level 1');
  });
});
