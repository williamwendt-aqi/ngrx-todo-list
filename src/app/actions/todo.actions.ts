import { createAction, props } from '@ngrx/store';
import { Todo } from '../models/todo';

export const addTodo = createAction(
  '[Todos] Add Todo',
  (todo: Todo): any => ({ todo })
);

export const removeTodo = createAction(
  '[Todos] Remove Todo',
  (todoId: string): any => ({ todoId })
);

export const completeTodoItem = createAction(
  '[Todos] Complete Todo Item',
  (todoId: string, todoItemId: string, isComplete: boolean): any => ({ todoId, todoItemId, isComplete })
);
