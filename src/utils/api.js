import React from "react";
import { Alert, Modal } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { error } from "../store/error";
import { authentication } from "../store/authentication";
const URL = "https://MALI.DEPRA.RU/api";

const getJson = async (responce) => {
  try {
    return await responce.json();
  } catch (e) {
    return null;
  }
};
const middleware = async (responce) => {
  let status = String(responce.status);
  let data = await getJson(responce);
  console.log(status, data?.message);
  if (status == "401") return "try_again";
  if (status[0] == "4") error.SetError(data?.message);
  if (status[0] == "5") error.SetError("Ошибка сервера, попробуйте чуть позже");
  if (status[0] == "2") return data;
};
export const SetAuthData = async (accessToken, refreshToken, role, email) => {
  console.log("dgkljfdkg");
  await AsyncStorage.multiSet([
    ["accessToken", accessToken],
    ["refreshToken", refreshToken],
    ["role", String(role)],
    ["email", email],
  ]);
  authentication.SetAccessToken(accessToken);
  authentication.SetRefreshToken(refreshToken);
  authentication.SetRole(role);
  authentication.SetEmail(email);
  authentication.SetIsAuth(true);
};
export const getAsyncData = async () => {
  let storage_data = await AsyncStorage.multiGet([
    "accessToken",
    "refreshToken",
    "role",
    "email",
  ]);

  return storage_data[0] && storage_data[0][1]
    ? {
        accessToken: storage_data[0][1],
        refreshToken: storage_data[1][1],
        role: storage_data[2][1],
        email: storage_data[3][1],
      }
    : null;
};
export const getEmail = async () => {
  return await AsyncStorage.getItem("email");
};
const request = {
  post: async (url, body) => {
    let responce = await fetch(URL + url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authentication.accessToken}`,
      },
      body: JSON.stringify(body),
    });
    let data = await middleware(responce);
    if (data == "try_again") {
      return request.post(url, body);
    } else return data;
  },
  post_form_data: async (url, body) => {
    console.log(url, URL);
    let responce = await fetch(URL + url, {
      method: "POST",
      headers: {
        "Content-Type": " multipart/form-data",
        Authorization: `Bearer ${authentication.accessToken}`,
      },
      body: body,
    });
    let data = await middleware(responce);
    if (data == "try_again") {
      return request.post_form_data(url, body);
    } else return data;
  },

  get: async (url) => {
    let responce = await fetch(URL + url, {
      method: "GET",
      headers: { Authorization: `Bearer ${authentication.accessToken}` },
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
    if (data) {
      await SetAuthData(data.accessToken, data.refreshToken, data.role, email);
    }
    return data;
  },
  verificate_code: async (email, verificationCode) => {
    let data = await request.post("/authentication/check_verification_code", {
      email,
      verificationCode,
    });
    if (data) {
      await SetAuthData(data.accessToken, data.refreshToken, data.role, email);
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
    let email = authentication.email;
    let refreshToken = authentication.refreshToken;
    let data = await request.post("/authentication/refresh_token", {
      email,
      refreshToken,
    });
    if (data) {
      await SetAuthData(data.accessToken, data.refreshToken, data.role, email);
    }

    return data;
  },
  getProfile: async () => {
    let data = await request.get("/user/profile");
    return data;
  },
  getMyAds: async () => {
    let data = await request.get("/user/user_ads");
    return data.ads;
  },
  getCities: async () => {
    let data = await request.get("/ads/towns");
    return data;
  },
  getAds: async (
    idAnimalCategories,
    idAnimalBreed,
    from,
    idCity,
    price_min,
    price_max,
    limit
  ) => {
    let data;
    if (idAnimalCategories) {
      data = await request.get(
        `/ads/cards?idAnimalBreed=${idAnimalBreed}&idAnimalCategories=${idAnimalCategories}${
          idCity ? `&idCity=${idCity}` : ``
        }&priceMin=${price_min}&priceMax=${price_max}&idAnimalPlace=${JSON.stringify(
          from
        )}`
      );
      console.log(
        `/ads/cards?idAnimalBreed=${idAnimalBreed}&idAnimalCategories=${idAnimalCategories}&idCity=${idCity}&priceMin=${price_min}&priceMax=${price_max}&idAnimalPlace=${JSON.stringify(
          from
        )}`
      );
    } else
      data = await request.get(
        `/ads/cards${limit ? `?&numberAds=${limit}` : ``}`
      );
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
  postFeedback: async (name, phoneNumber, message) => {
    let data = await request.post("/user/feedback", {
      name,
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
      if (key == "imgs") {
        body.imgs.forEach((el) => {
          form_data.append("imgs[]", el);
        });
      } else form_data.append(key, form_data[key]);
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
  getAdsForCheck: async () => {
    let data = await request.get("/admin/ads_need_approved?limit=5");
    console.log(data);
    return data.cards;
  },
};
