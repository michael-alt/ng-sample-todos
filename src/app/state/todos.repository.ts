import { Injectable } from '@angular/core';
import { createState, select, Store, withProps } from '@ngneat/elf';
import { devTools } from '@ngneat/elf-devtools';
import {
  addEntities,
  selectAll,
  selectAllApply,
  updateEntities,
  withEntities,
} from '@ngneat/elf-entities';
import { localStorageStrategy, persistState } from '@ngneat/elf-persist-state';
import { map, switchMap } from 'rxjs';
import { Todo } from '../model/todo';
import { VisibilityFilter } from '../model/visibility-filter';

devTools();

const { state, config } = createState(
  withEntities<Todo>(),
  withProps<VisibilityFilter>({ filter: 'All' })
);

const store = new Store({ name: 'todos', state, config });
persistState(store, {
  key: 'todos',
  storage: localStorageStrategy,
});

const nextId = () => {
  const nextId = JSON.parse(localStorage.getItem('lastId') || '0') + 1;
  localStorage.setItem('lastId', nextId);
  return nextId;
};

@Injectable({
  providedIn: 'root',
})
export class TodosRepository {
  todos$ = store.pipe(selectAll());
  filter$ = store.pipe(select((state) => state.filter));

  filteredTodos$ = this.filter$.pipe(
    switchMap((filter) => {
      return store.pipe(
        selectAllApply({
          filterEntity({ completed }) {
            if (filter === 'All') return true;
            return filter === 'Completed' ? completed : !completed;
          },
        })
      );
    })
  );

  createTodo(title: Todo['title']) {
    store.update(addEntities({ id: nextId(), title, completed: false }));
  }

  toggleCompleted(id: Todo['id']) {
    store.update(
      updateEntities(id, (entity) => ({
        ...entity,
        completed: !entity.completed,
      }))
    );
  }

  setFilter(filter: VisibilityFilter['filter']) {
    store.update((state) => ({
      ...state,
      filter,
    }));
  }
}
