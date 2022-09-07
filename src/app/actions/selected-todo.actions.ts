import { createAction, props } from '@ngrx/store';
import { Todo } from '../models/todo';
import { TodoItem } from '../models/todo-item';

export const assignTodo = createAction(
  '[SelectedTodo] Assign Current Todo',
  (currentTodoId: string): any => ({ currentTodoId })
);
