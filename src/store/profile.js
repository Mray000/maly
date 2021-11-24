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
    if (uri) {
      let file_name = uri
        .split("")
        .reverse()
        .join("")
        .split("/")[0]
        .split("")
        .reverse()
        .join("");
      body["icon"] = {
        name: file_name,
        uri: uri, //  file:///data/user/0/com.cookingrn/cache/rn_image_picker_lib_temp_5f6898ee-a8d4-48c9-b265-142efb11ec3f.jpg
        type: "image/" + file_name.split(".")[1], // video/mp4 for videos..or image/png etc...
      };
    }
    this.avatar = uri;
    api.changeUserData(body);
  };
}

export const profile = new Profile();
