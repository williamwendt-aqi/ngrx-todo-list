import {
  ActionReducerMap,
  createReducer,
  MetaReducer,
  on
} from '@ngrx/store';
import { environment } from '../../environments/environment';
import { assignTodo } from '../actions/selected-todo.actions';
import { addTodo, completeTodoItem, removeTodo } from '../actions/todo.actions';
import { Todo } from '../models/todo';
import { TodoItem } from '../models/todo-item';

const initialSelectedTodoState: string = '';

const initialTodosState: Todo[] = new Array<Todo>();

export interface TodoState {
  selectedTodoId: string,
  todos: Todo[],
}

export const selectedTodoIdReducer = createReducer(
  initialSelectedTodoState,
  on(assignTodo, (state, { currentTodoId }) => state === currentTodoId ? '' : currentTodoId)
)

export const todosReducer = createReducer(
  initialTodosState,
  on(addTodo, (state, { todo }) => [...state, todo]),
  on(removeTodo, (state, { todoId }) => state.filter(t => t.id !== todoId )),
  on(completeTodoItem, (state, { todoId, todoItemId, isComplete }) => {
    return state;
  })
);

export const reducers: ActionReducerMap<TodoState> = {
  selectedTodoId: selectedTodoIdReducer,
  todos: todosReducer
};

export const metaReducers: MetaReducer<TodoState>[] = !environment.production ? [] : [];
