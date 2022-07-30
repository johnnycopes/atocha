import { Component } from '@angular/core';
import { faAppleAlt, IconDefinition } from '@fortawesome/free-solid-svg-icons';

import { IKitchenLocation, KanbanBoardConfig } from './kitchen-location';
import { KanbanBoard } from '@shared/generic/kanban-board/kanban-board.component';

@Component({
	selector: 'app-demo',
	templateUrl: './demo.component.html',
	styleUrls: ['./demo.component.scss']
})
export class DemoComponent {
	// AccordionComponent
	public sections: { title: string, description: string; }[] = [
		{
			title: 'Section A',
			description: 'This is section A. Content goes in this section. Additonal sentence here.'
		},
		{
			title: 'Section B',
			description: 'This is section B. Content goes in this section. Additonal sentence here.'
		},
		{
			title: 'Section C',
			description: 'This is section C. Content goes in this section. Additonal sentence here.'
		},
	];

	// ButtonComponent
	public counter = 0;

	// CheckboxComponent
	public checkboxState1 = false;
	public checkboxState2 = false;

	// FontAwesomeComponent
	public faApple: IconDefinition = faAppleAlt;

	// HoverDirective
	public hoverState = false;

	// InputComponent
	public inputModel = '';

	// KanbanBoardComponent
	public kitchenLocations: IKitchenLocation[] = [
		{
			id: '01',
			name: 'Refrigerator',
			items: [
				'Salmon',
				'Cheese',
				'Oat milk',
				'Mustard',
			]
		},
		{
			id: '02',
			name: 'Freezer',
			items: [
				'Chicken',
				'Mixed veggies',
			]
		},
		{
			id: '03',
			name: 'Pantry',
			items: [
				'Avocados',
				'Tomatoes',
				'Bell peppers',
				'Red onions',
				'Sweet pototoes',
			]
		}
	];
	public kanbanBoardConfig: KanbanBoard<IKitchenLocation, string> = new KanbanBoardConfig();

  // OptionsMenuComponent
  public isOptionsMenuOpen = false;

	public onButtonClick(): void {
		this.counter++;
	}
}
