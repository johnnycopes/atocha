import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { NestedCheckboxesComponent } from './nested-checkboxes.component';
import { CheckboxComponent } from '../checkbox/checkbox.component';
import { TreeComponent } from '../tree/tree.component';

interface Item {
  id: string;
  items?: Item[];
}

@Component({
  template: `
    <core-nested-checkboxes
      [item]="item"
      [getId]="getId"
      [getChildren]="getItems"
      [(ngModel)]="model"
    ></core-nested-checkboxes>
  `,
})
class TestHostComponent {
  item: Item = {
    id: 'Africa',
    items: [
      {
        id: 'Southern Africa',
        items: [
          { id: 'Swaziland' },
          { id: 'Namibia' },
        ],
      },
      { id: 'Central Africa' },
      {
        id: 'Northern Africa',
        items: [
          {
            id: 'Morocco',
            items: [
              { id: 'Marrakesh' },
              { id: 'Fes' },
            ],
          },
        ],
      },
    ],
  };
  model: string[] = [];

  getId = ({ id }: Item) => id;
  getItems = ({ items }: Item) => items ?? [];
}

describe('NestedCheckboxesComponent', () => {
  let hostComponent: TestHostComponent;
  let fixture: ComponentFixture<TestHostComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [
        TestHostComponent,
        NestedCheckboxesComponent,
        CheckboxComponent,
        TreeComponent
      ],
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
});
