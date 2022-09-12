import { TodoItem } from "./todo-item";

export class Todo<T> {
    id: string = '';
    name: string = '';
    items: T[] = new Array<T>();

    public constructor(init?: Partial<Todo<T>>) {
        Object.assign(this, init);
    }
}