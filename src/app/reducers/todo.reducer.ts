import { Action, createReducer, on } from '@ngrx/store';
import { addTodo, removeTodo } from '../actions/todo.actions';
import { Todo } from '../models/todo';

const initialTodosState: TodosState = {
  byId: {},
  allIds: new Array<string>()
};

export interface TodosState {
  byId: { [todoId: string]: Todo<string> };
  allIds: string[];
}

export const todosReducer = createReducer(
  initialTodosState,
  on(addTodo, (state, { todo }) => {
    return {
      byId: {
        ...state.byId,
        [todo.id]: todo
      },
      allIds: [...state.allIds, todo.id]
    };
  }),
  on(removeTodo, (state, { todoId }) => {
    const byIdClone = {...state.byId };
    delete byIdClone[todoId];
    return {
      byId: byIdClone,
      allIds: state.allIds.filter(id => id !== todoId)
    }
  })
);
