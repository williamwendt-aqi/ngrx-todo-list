import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { assignTodo } from 'src/app/actions/selected-todo.actions';
import { Todo } from 'src/app/models/todo';
import { allTodos } from 'src/app/selectors/todo.selectors';
import { AppState } from '../../reducers/index';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit {

  todoList$: Observable<Todo<string>[]>;

  constructor(private store: Store<AppState>) {
    this.todoList$ = this.store.pipe(select(allTodos))
  }

  ngOnInit(): void {
  }

  onTodoSelected(todoId?: string): void {
    if (!todoId) return;
    this.store.dispatch(assignTodo(todoId));
  }
}
