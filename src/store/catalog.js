import { makeAutoObservable } from "mobx";
import { api } from "../utils/api";
class Catalog {
  AnimalCategories = { id: 0, name: "" };
  AnimalBreed = { id: 0, name: "" };
  from = ["Приют"];
  city = { id: 0, name: "" };
  price_min = 0;
  price_max = 10000;
  constructor() {
    makeAutoObservable(this, null);
  }
  get GetAds() {
    return api.getAds(
      this.AnimalCategories.id,
      this.AnimalBreed.id,
      this.from,
      this.city.id,
      this.price_min,
      this.price_max
    );
  }
  SetFrom = (name) => {
    if (this.from.includes(name)) {
      this.from.replace(this.from.filter((el) => el != name));
    } else this.from.push(name);
  };
  SetAnimalCategories = (id, name) => {
    this.AnimalCategories = { id, name };
  };
  SetAnimalBreed = (breed) => {
    this.AnimalBreed = breed;
  };
  SetPriceMin = (value) => {
    let number = Number(value);
    console.log(number < this.price_max);
    if (!value.includes(".") && number <= this.price_max) {
      this.price_min = number;
    } else this.price_min = this.price_min;
  };
  SetPriceMax = (value) => {
    let number = Number(value);
    console.log(
      !value.includes(".") && number >= this.price_min && number <= 99000001
    );
    if (
      !value.includes(".") &&
      number >= this.price_min &&
      number <= 99000001
    ) {
      this.price_max = number;
    } else this.price_max = this.price_max;
  };
  SetCity = (city) => {
    this.city = city;
  };
}

export const catalog = new Catalog();
