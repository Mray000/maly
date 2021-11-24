import React from "react";
import { Alert, Modal } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { error } from "../store/error";
import { authentication } from "../store/authentication";
const URL = "https://MALI.DEPRA.RU/api";
const middleware = async (responce) => {
  let data = responce.status != 401 ? await responce.json() : null;
  console.log(responce.status, 7657567);
  switch (responce.status) {
    case 400:
      error.SetError(data.message);
      break;
    case 401:
      await api.refresh_token();
      return "try_again";
    case 500:
      error.SetError("Ошибка сервера, попробуйте чуть позже");
      break;
    default:
      return data;
  }
};
export const getTokens = async () => {
  let storage_tokens = await AsyncStorage.multiGet([
    "accessToken",
    "refreshToken",
  ]);
  return storage_tokens
    ? {
        accessToken: storage_tokens[0][1],
        refreshToken: storage_tokens[1][1],
      }
    : null;
};
export const getEmail = async () => {
  return await AsyncStorage.getItem("email");
};
const request = {
  post: async (url, body) => {
    let tokens = await getTokens();
    let responce = await fetch(URL + url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: tokens ? `Bearer ${tokens.accessToken}` : ``,
      },
      body: JSON.stringify(body),
    });
    let data = await middleware(responce);
    if (data == "try_again") {
      return request.post(url, body);
    } else return data;
  },
  post_form_data: async (url, body) => {
    let tokens = await getTokens();
    let responce = await fetch(URL + url, {
      method: "POST",
      headers: {
        "Content-Type": " multipart/form-data",
        Authorization: tokens ? `Bearer ${tokens.accessToken}` : ``,
      },
      body: body,
    });
    let data = await middleware(responce);
    if (data == "try_again") {
      return request.post_form_data(url, body);
    } else return data;
  },
  get: async (url) => {
    let tokens = await getTokens();
    let responce = await fetch(URL + url, {
      method: "GET",
      headers: tokens ? { Authorization: `Bearer ${tokens.accessToken}` } : {},
    });
    let data = await middleware(responce);
    if (data == "try_again") {
      return request.get(url);
    } else return data;
  },
};

export const api = {
  registration: async (email, password) => {
    let data = await request.post("/authentication/registration", {
      email,
      password,
    });
    return data;
  },
  login: async (email, password) => {
    let data = await request.post("/authentication/login", {
      email,
      password,
    });
    console.log(data);
    if (data) {
      await AsyncStorage.multiSet([
        ["accessToken", data.accessToken],
        ["refreshToken", data.refreshToken],
        ["role", String(data.role)],
        ["email", email],
      ]);
    }
    return data;
  },
  verificate_code: async (email, verificationCode) => {
    let data = await request.post("/authentication/check_verification_code", {
      email,
      verificationCode,
    });
    if (data) {
      await AsyncStorage.multiSet([
        ["accessToken", data.accessToken],
        ["refreshToken", data.refreshToken],
        ["role", String(data.role)],
        ["email", email],
      ]);
    }
    return data;
  },
  password_change_request: async (email) => {
    let data = await request.post("/user/password_change_request", {
      email,
    });
    return data;
  },
  change_password: async (email, password, verificationCode) => {
    let data = await request.post("/user/change_password", {
      email,
      password,
      verificationCode,
    });
    return data;
  },
  refresh_token: async () => {
    let email = authentication.email || (await getEmail());
    let refreshToken = (await getTokens()).refreshToken;
    let data = await request.post("/authentication/refresh_token", {
      email,
      refreshToken,
    });
    console.log("REFRESH", data);
    if (data) {
      await AsyncStorage.multiSet([
        ["accessToken", data.accessToken],
        ["refreshToken", data.refreshToken],
        ["role", String(data.role)],
        ["email", email],
      ]);
      authentication.SetRole(data.role);
      authentication.SetEmail(email);
      authentication.SetIsAuth(true);
    }

    return data;
  },
  getProfile: async () => {
    let data = await request.get("/user/profile");
    return data;
  },
  getMyAds: async () => {
    let data = await request.get("user/user_ads/");
    return data;
  },
  getCities: async () => {
    let data = await request.get("/ads/towns");
    return data;
  },
  getAds: async (idAnimalCategories, idAnimalBreed) => {
    let data = await request.get(
      `/ads/cards?idAnimalBreed=${idAnimalBreed}&idAnimalCategories=${idAnimalCategories}`
    );
    console.log(data.cards);
    return data.cards;
  },
  getBreeds: async (idAnimalCategories) => {
    let data = await request.get(
      "/ads/breed?idAnimalCategories=" + idAnimalCategories
    );
    return data;
  },
  getAd: async (id) => {
    let data = await request.get("/ads/card?idAd=" + id);
    return data;
  },
  postFeedback: async (phoneNumber, message) => {
    let data = await request.post("/user/feedback", {
      phoneNumber,
      message,
    });
    return data;
  },
  changeUserData: async (body) => {
    let form_data = new FormData();
    Object.keys(body).forEach((key) => {
      form_data.append(key, body[key]);
    });
    console.log(form_data);
    let data = await request.post_form_data(
      "/user/change_user_data",
      form_data
    );
    return data;
  },
  createAd: async (body) => {
    let form_data = new FormData();
    Object.keys(body).forEach((key) => {
      form_data.append(key, form_data[key]);
    });
    let data = await request.post_form_data("/user/create_ad", form_data);
    return data;
  },
  sendAdToArchive: async (idAd) => {
    let data = await request.post("/user/send_ad_to_archive", { idAd });
    return data;
  },
  approveAd: async (idAd) => {
    let data = await request.post("/admin/approve_ad", { idAd });

    return data;
  },
  rejectAd: async (idAd, reasonReject) => {
    let data = await request.post("/admin/reject_ad", { idAd, reasonReject });
    return data;
  },
};
