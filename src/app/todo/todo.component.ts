import { Component, OnInit } from '@angular/core';
import { TodoService } from './shared/todo.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css'],
  providers: [TodoService]
})
export class TodoComponent implements OnInit {

  todoListArray: any;

  constructor(private todoService: TodoService) { }

  ngOnInit() {
    this.todoService.getTodoList().snapshotChanges()
    .subscribe(item => {
        this.todoListArray = [];
        item.forEach(element => {
          const y = element.payload.toJSON();
          y['$key'] = element.key;
          this.todoListArray.push(y);
        });
        this.todoListArray.sort((a, b) => {
          return a.isChecked - b.isChecked;
        });
      });
  }

  onAdd(itemTitle) {
    this.todoService.addTitle(itemTitle.value);
    itemTitle.value = null;
  }

  alterCheck($key: string, isChecked) {
    this.todoService.checkorUncheckTitle($key, !isChecked);
  }
  onDelete($key: string) {
    this.todoService.removeTitle($key);
  }
}
