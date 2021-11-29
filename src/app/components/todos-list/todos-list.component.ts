import { Component } from '@angular/core';
import { Todo } from 'src/app/model/todo';
import { TodosRepository } from 'src/app/state/todos.repository';

@Component({
  selector: 'todos-list',
  templateUrl: './todos-list.component.html',
  styles: [],
})
export class TodosListComponent {
  todos$ = this.todosRepo.filteredTodos$;

  constructor(private todosRepo: TodosRepository) {}

  trackById(ix: number, todo: Todo) {
    return todo.id;
  }
}
