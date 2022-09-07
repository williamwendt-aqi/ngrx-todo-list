import { TodoItem } from "./todo-item";

export class Todo {
    id: string = '';
    name: string = '';
    items: TodoItem[] = new Array<TodoItem>();

    get canComplete(): boolean {
        return this.items?.every(i => i.isComplete);
    }
}