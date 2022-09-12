import { createAction, props } from '@ngrx/store';
import { TodoItem } from '../models/todo-item';

export const addTodoItem = createAction(
  '[TodoItems] Add Todo Item',
  (todoItem: TodoItem): any => ({ todoItem })
);

export const addMultipleTodoItems = createAction(
  '[TodoItems] Add Multiple Todo Items',
  (todoItems: TodoItem[]): any => ({ todoItems })
);

export const removeTodoItem = createAction(
  '[TodoItems] Remove Todo Item',
  (todoItemId: string): any => ({ todoItemId })
);

export const removeMultipleTodoItems = createAction(
  '[TodoItems] Remove Multiple Items',
  (todoItemIds: string[]): any => ({ todoItemIds })
)

export const checkTodoItem = createAction(
  '[TodoItems] Complete Todo Item',
  (todoItem: TodoItem, isComplete: boolean): any => ({ todoItem, isComplete })
);
