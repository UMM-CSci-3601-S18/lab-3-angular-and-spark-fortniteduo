import {Component, OnInit} from '@angular/core';
import {TodoListService} from './todo-list.service';
import {Todo} from './todo';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'app-todo-list-component',
  templateUrl: 'todo-list.component.html',
  styleUrls: ['./todo-list.component.css'],
  providers: []
})

export class TodoListComponent implements OnInit {
  // These are public so that tests can reference them (.spec.ts)
  public todos: Todo[];
  public filteredTodos: Todo[];

  public todoOwner: string;
  public todoCategory: string;
  public todoStatus: string;
  public todoBody: string;


  // Inject the TodoListService into this component.
  // That's what happens in the following constructor.
  //
  // We can call upon the service for interacting
  // with the server.

  constructor(private todoListService: TodoListService) {

  }

  public filterTodos(searchOwner: string, searchCategory: string, searchStatus: string, searchBody: string): Todo[] {

    this.filteredTodos = this.todos;

    // Filter by owner
    if (searchOwner != null) {
      searchOwner = searchOwner.toLocaleLowerCase();

      this.filteredTodos = this.filteredTodos.filter(todo => {
        return !searchOwner || todo.owner.toLowerCase().indexOf(searchOwner) !== -1;
      });
    }

    // Filter by category
    if (searchCategory != null) {
      this.filteredTodos = this.filteredTodos.filter((todo: Todo) => {
        return !searchCategory || (todo.category === String(searchCategory));
      });
    }

  // Filter by status
    if (searchStatus != null) {

      let status: boolean;

      if (searchStatus === "complete" ) {
        status = true;
      } else if (searchStatus === "incomplete" ) {
        status = false;
      }

      this.filteredTodos = this.filteredTodos.filter((todo: Todo) => {
        return !searchStatus || (todo.status === Boolean(status));
      });
    }

    // Filter by phrase in body
    if (searchBody != null) {
      this.filteredTodos = this.filteredTodos.filter((todo: Todo) => {
        return !searchBody || (todo.body.toLowerCase().includes(searchBody.toLowerCase()));
      });
    }
/*if (searchBody != null) {
      searchBody = searchBody.toLowerCase();
      this.filteredTodos = this.filteredTodos.filter((todo: Todo) => {
        return (todo.body.toLowerCase().includes(searchBody));
      });
    }*/
    return this.filteredTodos;
  }

  /**
   * Starts an asynchronous operation to update the todos list
   *
   */
  refreshTodos(): Observable<Todo[]> {
    // Get Todos returns an Observable, basically a "promise" that
    // we will get the data from the server.
    //
    // Subscribe waits until the data is fully downloaded, then
    // performs an action on it (the first lambda)

    const todos: Observable<Todo[]> = this.todoListService.getTodos();
    todos.subscribe(
      returnedTodos => {
        this.todos = returnedTodos;
        this.filterTodos(this.todoOwner, this.todoCategory, this.todoStatus, this.todoBody);
      },
      err => {
        console.log(err);
      });
    return todos;
  }


  ngOnInit(): void {
    this.refreshTodos();
  }
}
