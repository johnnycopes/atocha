import { KanbanBoard } from "@shared/generic/kanban-board/kanban-board.component";

export interface IKitchenLocation {
	id: string;
	name: string;
	items: string[];
}

export class KanbanBoardConfig implements KanbanBoard<IKitchenLocation, string> {
	getColumnId = (node: IKitchenLocation): string => node.id;
	getColumnName = (node: IKitchenLocation): string => node.name;
	getColumnItems = (node: IKitchenLocation): string[] => node.items;
	getItemId = (node: string): string => node;
}
