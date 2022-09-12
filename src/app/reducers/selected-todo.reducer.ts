import { Action, createReducer, on } from '@ngrx/store';
import { assignTodo } from '../actions/selected-todo.actions';

const initialSelectedTodoState: string = '';

export const selectedTodoIdReducer = createReducer(
  initialSelectedTodoState,
  on(assignTodo, (state, { currentTodoId }) => state === currentTodoId ? '' : currentTodoId)
);
