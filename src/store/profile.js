import { makeAutoObservable, runInAction } from "mobx";
import { api } from "../utils/api";
const numberPhoneInvalid = (phone) => {
  let regex = /^\d[\d\(\)\ -]{4,14}\d$/;
  return !phone.match(regex);
};
class Profile {
  is_profile_load = false;
  name = "";
  surname = "";
  email = "";
  phone = "";
  avatar = "";
  whatsapp = "";
  constructor() {
    makeAutoObservable(this);
  }

  async getProfile() {
    let { nameUser, surname, email, numberPhone, whatsappPhone, iconPath } =
      await api.getProfile();
    runInAction(() => {
      this.name = nameUser || "";
      this.surname = surname || "";
      this.email = email || "";
      this.phone = numberPhone || "";
      this.whatsapp = whatsappPhone || "";
      this.avatar = iconPath || "";
      this.is_profile_load = true;
    });
  }
  changePhone = (value) => {
    this.phone = value;
  };
  changeName = (value) => {
    this.name = value;
  };
  changeWhatsapp = (value) => {
    this.whatsapp = value;
  };

  changeUserData = async (e, uri) => {
    let body = {
      name: this.name,
      surname: this.surname,
      numberPhone: !numberPhoneInvalid(this.phone) ? this.phone : "",
      numberWhatsApp: !numberPhoneInvalid(this.whatsapp) ? this.whatsapp : "",
    };
    if (uri) body["icon"] = ConvertImage(uri);
    this.avatar = uri;
    api.changeUserData(body);
  };
}

export const profile = new Profile();
