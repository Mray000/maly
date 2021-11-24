import { makeAutoObservable, runInAction } from "mobx";
import { api } from "../utils/api";

class Authentication {
  email = "";
  is_auth = false;
  role = null;
  constructor() {
    makeAutoObservable(this);
  }
  SetEmail(email) {
    this.email = email;
  }
  SetIsAuth(is_auth) {
    this.is_auth = is_auth;
  }
  SetRole(role) {
    this.role = role;
  }
  async registration(email, password) {
    let data = await api.registration(email, password);
    if (data) this.SetEmail(email);
    return data;
  }
  async login(email, password) {
    let data = await api.login(email, password);
    if (data) {
      this.SetEmail(email);
      this.SetRole(data.role);
      this.SetIsAuth(true);
    }
    return data;
  }
  async change_password(verificationCode, new_password) {
    let data = await api.change_password(
      this.email,
      verificationCode,
      new_password
    );

    return data;
  }
  async confirm_email(verificationCode) {
    let data = await api.confirm_email(this.email, verificationCode);
    if (data) {
      this.SetRole(data.role);
      this.SetIsAuth(true);
    }
    return data;
  }
}

export const authentication = new Authentication();
