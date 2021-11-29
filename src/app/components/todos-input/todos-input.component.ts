import { Component } from '@angular/core';
import { TodosRepository } from 'src/app/state/todos.repository';

@Component({
  selector: 'todos-input',
  templateUrl: './todos-input.component.html',
  styles: [],
})
export class TodosInputComponent {
  constructor(private todosRepo: TodosRepository) {}

  createTodo(title: string) {
    title = title.trim();
    if (title) {
      this.todosRepo.createTodo(title);
    }
  }
}
