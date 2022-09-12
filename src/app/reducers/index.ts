import {
  ActionReducerMap,
  createReducer,
  MetaReducer,
  on
} from '@ngrx/store';
import { environment } from '../../environments/environment';
import { selectedTodoIdReducer } from './selected-todo.reducer';
import { todoItemsReducer, TodoItemsState } from './todo-item.reducer';
import { todosReducer, TodosState } from './todo.reducer';

export interface AppState {
  selectedTodoId: string,
  todos: TodosState
  todoItems: TodoItemsState;
}

export const reducers: ActionReducerMap<AppState> = {
  selectedTodoId: selectedTodoIdReducer,
  todos: todosReducer,
  todoItems: todoItemsReducer
};

export const metaReducers: MetaReducer<AppState>[] = !environment.production ? [] : [];
