import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { addMultipleTodoItems, checkTodoItem, removeMultipleTodoItems } from 'src/app/actions/todo-item.actions';
import { addTodo, removeTodo } from 'src/app/actions/todo.actions';
import { Todo } from 'src/app/models/todo';
import { TodoItem } from 'src/app/models/todo-item';
import { AppState } from 'src/app/reducers';
import { canCompleteTodo, currentTodo } from 'src/app/selectors/todo.selectors';
import { v4 as uuid } from 'uuid';

@Component({
  selector: 'app-todo-container',
  templateUrl: './todo-container.component.html',
  styleUrls: ['./todo-container.component.scss']
})
export class TodoContainerComponent implements OnInit {
  todo$: Observable<Todo<TodoItem> | null>;

  canCompleteTodo$: Observable<boolean>;

  constructor(private store: Store<AppState>) {
    this.todo$ = this.store.pipe(select(currentTodo));
    this.canCompleteTodo$ = this.store.pipe(select(canCompleteTodo));
  }

  ngOnInit(): void {
  }
  
  saveTodo(todo: Todo<TodoItem>): void {
    if (!todo) return;
    todo.id = uuid();
    todo.items.forEach(i => {
      i.id = uuid();
      i.parentId = todo.id
    });

    this.store.dispatch(addTodo(new Todo<string>({
      ...todo,
      items: todo.items.map(i => i.id)
    })));
    this.store.dispatch(addMultipleTodoItems(todo.items));
  }

  completeTodo(todo: Todo<TodoItem>): void {
    if (!todo) return;
    this.store.dispatch(removeTodo(todo.id));
    this.store.dispatch(removeMultipleTodoItems(todo.items.map(i => i.id)));
  }

  checkTodoItem(todoItem: TodoItem): void {
    if (!todoItem) return;
    this.store.dispatch(checkTodoItem(todoItem, !todoItem.isComplete));
  }
}
