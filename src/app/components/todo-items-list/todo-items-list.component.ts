import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Todo } from 'src/app/models/todo';
import { TodoItem } from 'src/app/models/todo-item';
import { currentTodo } from 'src/app/selectors/todo.selectors';
import { TodoState } from '../../reducers/index';
import { addTodo, completeTodoItem, removeTodo } from 'src/app/actions/todo.actions';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-todo-items-list',
  templateUrl: './todo-items-list.component.html',
  styleUrls: ['./todo-items-list.component.scss']
})
export class TodoItemsListComponent implements OnInit {

  todo$: Observable<Todo | undefined>;

  newTodo: Todo;

  newItem: TodoItem;

  get canSaveTodo(): boolean {
    if (!this.newTodo) return false;

    const { name, items } = this.newTodo;
    return !!(name && items && items.length > 1);
  }

  constructor(private store: Store<TodoState>) {
    this.newTodo = new Todo();
    this.newItem = new TodoItem();
    this.todo$ = this.store.pipe(select(currentTodo));
  }

  ngOnInit(): void {
  }

  onChecked(todo: Todo, todoItem: TodoItem): void {
    if (!todo || !todoItem) return;
    this.store.dispatch(completeTodoItem(todo.id, todoItem.id, !todoItem.isComplete));
  }

  onSaveTodoItem(): void {
    this.newItem.id = uuidv4();
    this.newTodo.items.push(this.newItem);
    this.newItem = new TodoItem();
  }

  onSaveTodo(): void {
    this.newTodo.id = uuidv4()
    this.store.dispatch(addTodo(this.newTodo));
    this.clearNewTodo();
  }

  onRemoveTodo(todoId?: string): void {
    if (!todoId) return;
    this.store.dispatch(removeTodo(todoId));
    this.clearNewTodo();
  }

  private clearNewTodo(): void {
    this.newTodo = new Todo();
    this.newItem = new TodoItem();
  }
}
