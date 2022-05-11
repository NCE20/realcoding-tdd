import { makeObservable, observable } from "mobx";

class TodoList {
  /*
    items: TodoItem[] (할 일 리스트)
    date: Date (오늘 날짜)
  */
  _items = [];
  _date = "";

  constructor(items, date) {
    makeObservable(this, {
      _items: observable,
    });
    this._items = items;
    this._date = date;
  }

  removeTodoItem = (todoId) => {
    const targetTodoItemIndex = this._items.findIndex(
      (todo) => todo.id === todoId
    );
    if (targetTodoItemIndex === - 1) return;
    this._items.splice(targetTodoItemIndex, 1);
  }

  pushTodoItem = (todoItem) => {
    this._items.push(todoItem);
  }

  isPrevItem = (todoId) => {
    const targetTodoItemIndex = this._items.findIndex(
      (todo) => todo.id === todoId
    );
    if (targetTodoItemIndex === - 1) return;

  }

  get items() {
    return this._items;
  }

  _equalsDayFilter = (todoItem) => todoItem.equalsDayOfCreateAt(this._date);
  _notEqualsDayFilter = (todoItem) => !todoItem.equalsDayOfCreateAt(this._date);

  _completedFilter = (todoItem) => todoItem._completed;
  _notCompletedFilter = (todoItem) => !todoItem._completed;


  get equalsDayItems() {
    return this._items.filter(this._equalsDayFilter);
  }

  get equalsDayAndCompletedItems() {
    return this.equalsDayItems.filter(this._completedFilter);
  }

  get equalsDayAndNotCompletedItems() {
    return this.equalsDayItems.filter(this._notCompletedFilter);
  }

  get notEqualsDayItems() {
    return this._items.filter(this._notEqualsDayFilter);
  }
}

export default TodoList;
