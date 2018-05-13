import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';

@Injectable()
export class TodoService {

  todoList: AngularFireList<any>;

  constructor(private firebasedb: AngularFireDatabase) { }

  getTodoList() {

    this.todoList = this.firebasedb.list('title');
    return this.todoList;
  }

  addTitle(title: string) {
    this.todoList.push({
      title: title,
      isChecked: false
    });
  }

  checkorUncheckTitle($key: string, flag: boolean) {
    this.todoList.update($key, {isChecked: flag});
  }

  removeTitle($key) {
    this.todoList.remove($key);
  }

}
