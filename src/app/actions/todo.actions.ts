import { createAction, props } from '@ngrx/store';
import { Todo } from '../models/todo';

export const addTodo = createAction(
  '[Todos] Add Todo',
  (todo: Todo<string>): any => ({ todo })
);

export const removeTodo = createAction(
  '[Todos] Remove Todo',
  (todoId: string): any => ({ todoId })
);
