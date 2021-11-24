import { makeAutoObservable } from "mobx";
class Ad {
  category_id = 0;
  breed_id = 0;
  from = [];
  constructor() {
    makeAutoObservable(this);
  }
  SetCategoryId(id) {
    this.category_id = id;
  }
  SetBreedId(id) {
    this.breed_id = id;
  }
}

export const ad = new Ad();
