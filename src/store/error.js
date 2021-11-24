import { makeAutoObservable } from "mobx";
class Error {
  error = "";
  constructor() {
    makeAutoObservable(this);
  }
  SetError(text) {
    this.error = text;
  }
}

export const error = new Error();
