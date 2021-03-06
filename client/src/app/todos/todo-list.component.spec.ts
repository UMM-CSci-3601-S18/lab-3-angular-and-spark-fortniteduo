import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {Observable} from 'rxjs/Observable';
import {FormsModule} from '@angular/forms';
import {MATERIAL_COMPATIBILITY_MODE} from '@angular/material';

import 'rxjs/add/observable/of';
import 'rxjs/add/operator/do';

import {CustomModule} from '../custom.module';

import {Todo} from './todo';
import {TodoListComponent} from './todo-list.component';
import {TodoListService} from './todo-list.service';

describe('Todo list', () => {

  let todoList: TodoListComponent;
  let fixture: ComponentFixture<TodoListComponent>;

  let todoListServiceStub: {
    getTodos: () => Observable<Todo[]>
  };

  beforeEach(() => {
    // stub TodoService for test purposes
    todoListServiceStub = {
      getTodos: () => Observable.of([
        {
          "_id": "58895985a22c04e761776d54",
          "owner": "Blanche",
          "status": false,
          "body": "In sunt ex non tempor cillum commodo amet incididunt anim qui commodo quis. Cillum non labore ex sint esse.",
          "category": "software design"
        },
        {
          "_id": "58895985c1849992336c219b",
          "owner": "Fry",
          "status": false,
          "body": "Ipsum esse est ullamco magna tempor anim laborum non officia deserunt veniam commodo. Aute minim incididunt ex commodo.",
          "category": "video games"
        },
        {
          "_id": "58895985ae3b752b124e7663",
          "owner": "Fry",
          "status": true,
          "body": "Ullamco irure laborum magna dolor non. Anim occaecat adipisicing cillum eu magna in.",
          "category": "homework"
        }
      ])
    };

    TestBed.configureTestingModule({
      imports: [CustomModule],
      declarations: [TodoListComponent],
      // providers:    [ TodoListService ]  // NO! Don't provide the real service!
      // Provide a test-double instead
      providers: [{provide: TodoListService, useValue: todoListServiceStub},
        {provide: MATERIAL_COMPATIBILITY_MODE, useValue: true}]

    });
  });

  beforeEach(async(() => {
    TestBed.compileComponents().then(() => {
      fixture = TestBed.createComponent(TodoListComponent);
      todoList = fixture.componentInstance;
      fixture.detectChanges();
    });
  }));

  it('contains all the todos', () => {
    expect(todoList.todos.length).toBe(3);
  });

  it('contains a todo with owner named \'Blanche\'', () => {
    expect(todoList.todos.some((todo: Todo) => todo.owner === 'Blanche')).toBe(true);
  });

  it('contain a todo with owner named \'Fry\'', () => {
    expect(todoList.todos.some((todo: Todo) => todo.owner === 'Fry')).toBe(true);
  });

  it('doesn\'t contain a todo with owner named \'Santa\'', () => {
    expect(todoList.todos.some((todo: Todo) => todo.owner === 'Santa')).toBe(false);
  });

  it('has two todos with owner \'Fry\'', () => {
    expect(todoList.todos.filter((todo: Todo) => todo.owner === 'Fry').length).toBe(2);
  });
  it('todo list filters by owner', () => {
    expect(todoList.filteredTodos.length).toBe(3);
    todoList.todoOwner = 'a';
    const a: Observable<Todo[]> = todoList.refreshTodos();
    a.do(x => Observable.of(x))
      .subscribe(x => expect(todoList.filteredTodos.length).toBe(1));
  });

  it('todo list filters by category', () => {
    expect(todoList.filteredTodos.length).toBe(3);
    todoList.todoCategory = 'homework';
    const a: Observable<Todo[]> = todoList.refreshTodos();
    a.do(x => Observable.of(x))
      .subscribe(x => expect(todoList.filteredTodos.length).toBe(1));
  });

  it('todo list filters by owner and category', () => {
    expect(todoList.filteredTodos.length).toBe(3);
    todoList.todoCategory = 'video games';
    todoList.todoOwner = 'r';
    const a: Observable<Todo[]> = todoList.refreshTodos();
    a.do(x => Observable.of(x))
      .subscribe(x => expect(todoList.filteredTodos.length).toBe(1));
  });

  it('todo list filters by status false', () => {
    expect(todoList.filteredTodos.length).toBe(3);
    todoList.todoStatus = 'incomplete';
    const a: Observable<Todo[]> = todoList.refreshTodos();
    a.do(x => Observable.of(x))
      .subscribe(x => expect(todoList.filteredTodos.length).toBe(2));
  });

  it('todo list filters by status true', () => {
    expect(todoList.filteredTodos.length).toBe(3);
    todoList.todoStatus = 'complete';
    const a: Observable<Todo[]> = todoList.refreshTodos();
    a.do(x => Observable.of(x))
      .subscribe(x => expect(todoList.filteredTodos.length).toBe(1));
  });

  it('todo list filters by the word tempor in body', () => {
    expect(todoList.filteredTodos.length).toBe(3);
    todoList.todoBody = 'tempor';
    const a: Observable<Todo[]> = todoList.refreshTodos();
    a.do(x => Observable.of(x))
      .subscribe(x => expect(todoList.filteredTodos.length).toBe(2));
  });

  it('todo list filters by the word sunt in body', () => {
    expect(todoList.filteredTodos.length).toBe(3);
    todoList.todoBody = 'sunt';
    const a: Observable<Todo[]> = todoList.refreshTodos();
    a.do(x => Observable.of(x))
      .subscribe(x => expect(todoList.filteredTodos.length).toBe(1));
  });

  it('todo list filters by the ID of a todo', () => {
    expect(todoList.filteredTodos.length).toBe(3);
    todoList.todoId = '58895985c1849992336c219b';
    const a: Observable<Todo[]> = todoList.refreshTodos();
    a.do(x => Observable.of(x))
      .subscribe(x => expect(todoList.filteredTodos.length).toBe(1));
  });

});

describe('Misbehaving Todo List', () => {
  let todoList: TodoListComponent;
  let fixture: ComponentFixture<TodoListComponent>;

  let todoListServiceStub: {
    getTodos: () => Observable<Todo[]>
  };

  beforeEach(() => {
    // stub TodoService for test purposes
    todoListServiceStub = {
      getTodos: () => Observable.create(observer => {
        observer.error('Error-prone observable');
      })
    };

    TestBed.configureTestingModule({
      imports: [FormsModule, CustomModule],
      declarations: [TodoListComponent],
      providers: [{provide: TodoListService, useValue: todoListServiceStub},
        {provide: MATERIAL_COMPATIBILITY_MODE, useValue: true}]
    });
  });

  beforeEach(async(() => {
    TestBed.compileComponents().then(() => {
      fixture = TestBed.createComponent(TodoListComponent);
      todoList = fixture.componentInstance;
      fixture.detectChanges();
    });
  }));

  it('generates an error if we don\'t set up a TodoListService', () => {
    // Since the observer throws an error, we don't expect todos to be defined.
    expect(todoList.todos).toBeUndefined();
  });
});
