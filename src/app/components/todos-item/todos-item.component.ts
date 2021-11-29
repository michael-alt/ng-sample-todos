import { Component, Input } from '@angular/core';
import { Todo } from 'src/app/model/todo';
import { TodosRepository } from 'src/app/state/todos.repository';

@Component({
  selector: 'todos-item',
  templateUrl: './todos-item.component.html',
})
export class TodosItemComponent {
  @Input()
  todo!: Todo;

  editMode = false;
  editText = '';

  constructor(private todosRepo: TodosRepository) {}

  toggleCompleted() {
    this.todosRepo.toggleCompleted(this.todo.id);
  }

  beginEdit() {
    this.editMode = true;
    this.editText = this.todo.title;
  }

  commitEdit() {
    this.editMode = false;
  }

  cancelEdit() {
    this.editMode = false;
  }
}
