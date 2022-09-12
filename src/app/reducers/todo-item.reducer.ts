import { Action, createReducer, on, State } from '@ngrx/store';
import { addTodoItem, addMultipleTodoItems, removeTodoItem, removeMultipleTodoItems, checkTodoItem } from '../actions/todo-item.actions';
import { TodoItem } from '../models/todo-item';

export interface TodoItemsState {
  byId: { [itemId: string]: TodoItem }
  allIds: string[];
}

const initialTodoItemsState: TodoItemsState = {
  byId: {},
  allIds: new Array<string>()
}

export const todoItemsReducer = createReducer(
  initialTodoItemsState,
  on(addTodoItem, (state, { todoItem }) => {
    return {
      byId: {
        ...state.byId,
        [todoItem.id]: todoItem
      },
      allIds: [...state.allIds, todoItem.id]
    }
  }),
  on(addMultipleTodoItems, (state, { todoItems }) => {
    const byIdAdd: { [todoItemId: string]: TodoItem } = {};
    const allIdsAdd: string[] = new Array<string>();
    for (const item of todoItems) {
      byIdAdd[item.id] = item;
      allIdsAdd.push(item.id);
    }

    return {
      byId: {
        ...state.byId,
        ...byIdAdd
      },
      allIds: [...state.allIds, ...allIdsAdd]
    }
  }),
  on(removeTodoItem, (state, { todoItemId }) => {
    const byIdClone = { ...state.byId };
    delete byIdClone[todoItemId];
    return {
      byId: byIdClone,
      allIds: state.allIds.filter(id => id !== todoItemId)
    }
  }),
  on(removeMultipleTodoItems, (state, { todoItemIds }) => {
    const byIdClone = { ...state.byId };
    for (const id of todoItemIds) delete byIdClone[id];
    return {
      byId: byIdClone,
      allIds: state.allIds.filter(id => !todoItemIds.includes(id))
    }
  }),
  on(checkTodoItem, (state, { todoItem, isComplete }) => {
    return {
      byId: {
        ...state.byId,
        [todoItem.id]: {
          ...todoItem,
          isComplete: isComplete
        }
      },
      allIds: [...state.allIds]
    }
  })
);
