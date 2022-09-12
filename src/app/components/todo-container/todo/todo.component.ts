import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Todo } from 'src/app/models/todo';
import { TodoItem } from 'src/app/models/todo-item';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit {
  @Input() todo: Todo<TodoItem> | null = null;

  @Input() canCompleteTodo: boolean | null = null;

  @Output() onSaveTodo: EventEmitter<Todo<TodoItem>> = new EventEmitter<Todo<TodoItem>>();
  
  @Output() onCompleteTodo: EventEmitter<Todo<TodoItem>> = new EventEmitter<Todo<TodoItem>>();

  @Output() onCheckTodoItem: EventEmitter<TodoItem> = new EventEmitter<TodoItem>();

  newTodo: Todo<TodoItem> = new Todo<TodoItem>();

  newItem: TodoItem = new TodoItem();

  // Matches if text has at least one capital letter and one number
  regExp: RegExp = new RegExp('^(?=.*?[A-Z])(?=.*?[0-9]).*$');

  get canSaveTodo(): boolean {
    const { name, items } = this.newTodo;
    if (!name || !items || !items.length) return false;
    return this.regExp.test(name)
  }

  constructor() { }

  ngOnInit(): void {
  }

  saveTodo(todo?: Todo<TodoItem>): void {
    if (!todo) return;
    this.onSaveTodo?.emit(todo);
    this.clearNewObjects();
  }

  completeTodo(todo?: Todo<TodoItem>): void {
    if (!todo) return;
    this.onCompleteTodo?.emit(todo);
    this.clearNewObjects();
  }

  saveTodoItem(item?: TodoItem): void {
    if (!item || !item.text || !this.newTodo) return;
    this.newTodo.items?.push(item);
    this.newItem = new TodoItem();
  }

  checkTodoItem(item?: TodoItem): void {
    if (!item) return;
    this.onCheckTodoItem?.emit(item);
  }

  private clearNewObjects(): void {
    this.newTodo = new Todo<TodoItem>();
    this.newItem = new TodoItem();
  }
}
