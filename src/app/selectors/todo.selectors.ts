import { createSelector } from '@ngrx/store';
import { Todo } from '../models/todo';
import { TodoState } from '../reducers/index';

const selectCurrentTodoId = (state: TodoState): string => state.selectedTodoId;

const selectTodos = (state: TodoState): Todo[] => state.todos;

export const allTodos = createSelector(
    selectTodos,
    (todos: Todo[]) => todos
);

export const currentTodo = createSelector(
    selectCurrentTodoId,
    selectTodos,
    (todoId: string, todos: Todo[]) => todos?.find(t => t?.id == todoId)
);
