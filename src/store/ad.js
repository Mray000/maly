import { makeAutoObservable } from "mobx";
import { api } from "../utils/api";
import { ConvertImage } from "../utils/ConvertImage";
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

  createAd = (
    title,
    description,
    photos,
    from,
    youtube,
    price,
    sex,
    age,
    city,
    name,
    phone,
    whatsapp
  ) => {
    let new_ad = {
      preview: ConvertImage(photos[0]),
      idAnimalCategories: this.category_id,
      idAnimalBreed: this.idAnimalBreed,
      imgs: photos.map(ConvertImage),
      idAnimalPlace: from,
      idGender: sex,
      idCity: city.id,
      namePet: title,
      price,
      age,
      youtubeVideo: youtube,
      descriptionPet: description,
    };
    api.createAd(new_ad);
  };
}

export const ad = new Ad();
