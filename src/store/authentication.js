import { makeAutoObservable, runInAction } from "mobx";
import { api } from "../utils/api";

class Authentication {
  email = "";
  is_auth = false;
  role = null;
  accessToken = "";
  refreshToken = "";
  redirect = "";

  constructor() {
    makeAutoObservable(this);
  }
  SetAccessToken(token) {
    this.accessToken = token;
  }
  SetRefreshToken(token) {
    this.refreshToken = token;
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
  SetRedirect(to) {
    this.redirect = to;
  }
  async registration(email, password) {
    let data = await api.registration(email, password);
    if (data) this.SetEmail(email);
    return data;
  }
  async login(email, password) {
    let data = await api.login(email, password);
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
    return data;
  }
}

export const authentication = new Authentication();
