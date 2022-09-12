import { createSelector } from '@ngrx/store';
import { Todo } from '../models/todo';
import { TodoItem } from '../models/todo-item';
import { AppState } from '../reducers/index';

const selectCurrentTodoId = (state: AppState) => state.selectedTodoId;

const selectTodos = (state: AppState) => state.todos.byId;

const selectTodoItems = (state: AppState) => state.todoItems.byId;

export const allTodos = createSelector(
    selectTodos,
    (todos: { [todoId: string]: Todo<string> }) => Object.values(todos)
);

export const currentTodo = createSelector(
    selectCurrentTodoId,
    selectTodos,
    selectTodoItems,
    (todoId: string, todos: { [todoId: string]: Todo<string> }, todoItems: { [todoItemId: string]: TodoItem }) => {
        if (!todoId || !(todoId in todos)) return null;

        return new Todo<TodoItem>({
            ...todos[todoId],
            items: todos[todoId].items.map(itemId => todoItems[itemId])
        })
    }
);

export const canCompleteTodo = createSelector(
    selectCurrentTodoId,
    selectTodoItems,
    (todoId: string, todoItems: { [todoItemId: string]: TodoItem }) => Object.values(todoItems).filter(i => i.parentId === todoId).every(i => i.isComplete)
);
