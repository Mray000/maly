import React, { useState } from "react";
import {
  Button,
  Image,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { api } from "../../utils/api.js";
import google from "../../assets/Google__G__Logo.svg.png";
import apple from "../../assets/1200px-Apple_Computer_Logo_rainbow.png";
import facebook from "../../assets/1200px-Facebook_circle_pictogram.png";
import { Dimensions } from "react-native";
import { authentication } from "../../store/authentication.js";
import { observer } from "mobx-react-lite";
export const Authentication = observer(({ navigation }) => {
  console.log("AUTHLFLKG");
  const [email, SetEmail] = useState("");
  const [password, SetPassword] = useState("");
  const [repeat_password, SetRepeatPassword] = useState("");
  const [is_registration, SetIsRegistration] = useState(true);
  const [is_load, SetIsLoad] = useState(false);
  let height = Dimensions.get("window").height;

  const Authenticate = async () => {
    SetIsLoad(true);
    let is_ok = is_registration
      ? await authentication.registration(email, password)
      : await authentication.login(email, password);
    if (is_ok) {
      navigation.navigate(is_registration ? "EmailConfirm" : "Catalog");
    }
    SetIsLoad(false);
  };

  let is_button_disabled = !(
    !is_load &&
    password &&
    email &&
    (is_registration ? password == repeat_password : true)
  );
  return (
    <KeyboardAwareScrollView style={{ flex: 1, backgroundColor: "#7B7B7B" }}>
      <View style={{ height: height, justifyContent: "flex-end" }}>
        <View style={styles.main}>
          <View
            style={{ height: height * 0.25, justifyContent: "space-between" }}
          >
            <View style={styles.header_switching}>
              <TouchableOpacity
                style={
                  is_registration
                    ? styles.but_registration_active
                    : styles.but_registration
                }
                onPress={() => SetIsRegistration(true)}
              >
                <Text
                  style={{
                    textAlign: "center",
                    color: is_registration ? "white" : "#7D7D7D",
                  }}
                >
                  Регистрация
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={
                  !is_registration
                    ? styles.but_registration_active
                    : styles.but_registration
                }
                onPress={() => SetIsRegistration(false)}
              >
                <Text
                  style={{
                    textAlign: "center",
                    color: !is_registration ? "white" : "#7D7D7D",
                  }}
                >
                  Войти
                </Text>
              </TouchableOpacity>
            </View>
            <Text
              style={{
                width: "100%",
                fontSize: 17,
                fontWeight: "700",
              }}
            >
              {is_registration ? "Зарегистрироваться" : "Войти"} через:
            </Text>
            <View style={{ flexDirection: "row" }}>
              <View>
                <View style={{ flexDirection: "row" }}>
                  <Image source={google} style={{ width: 25, height: 25 }} />
                  <Text
                    style={{
                      textAlignVertical: "center",
                      color: "#808080",
                      fontSize: 17,
                      marginLeft: 5,
                    }}
                  >
                    Google
                  </Text>
                </View>

                <View style={{ flexDirection: "row", marginTop: 15 }}>
                  <Image source={facebook} style={{ width: 25, height: 25 }} />
                  <Text
                    style={{
                      textAlignVertical: "center",
                      color: "#808080",
                      fontSize: 17,
                      marginLeft: 5,
                    }}
                  >
                    Facebook
                  </Text>
                </View>
              </View>
              <View>
                <View style={{ flexDirection: "row", marginLeft: 15 }}>
                  <View>
                    <Image source={apple} style={{ width: 25, height: 25 }} />
                  </View>
                  <Text
                    style={{
                      textAlignVertical: "center",
                      color: "#808080",
                      fontSize: 17,
                      marginLeft: 5,
                    }}
                  >
                    Apple
                  </Text>
                </View>
              </View>
            </View>
          </View>
          <View
            style={{
              height: height * 0.6,
              marginTop: "5%",
            }}
          >
            <View
              style={{
                height: is_registration ? height * 0.6 : height * 0.45,
                justifyContent: "space-around",
              }}
            >
              <Text
                style={{
                  width: "100%",
                  fontSize: 18,
                  fontWeight: "700",
                }}
              >
                Или {is_registration ? "зарегистрируйтесь" : "войдите"} с
                помощью электронной почты
              </Text>
              <View>
                <TextInput
                  placeholder="Введите e-mail"
                  style={styles.input}
                  onChangeText={(text) => SetEmail(text.replace(/\s/g, ""))}
                  value={email}
                />
                <TextInput
                  placeholder={is_registration ? "Придумайте пароль" : "Пароль"}
                  style={styles.input}
                  onChangeText={SetPassword}
                  value={password}
                  textContentType="password"
                  secureTextEntry={true}
                />
                {is_registration ? (
                  <TextInput
                    placeholder="Повторите пароль"
                    style={styles.input}
                    onChangeText={SetRepeatPassword}
                    textContentType="password"
                    secureTextEntry={true}
                    value={repeat_password}
                  />
                ) : null}
              </View>

              <TouchableOpacity
                onPress={Authenticate}
                style={[
                  styles.button,
                  {
                    backgroundColor: !is_button_disabled
                      ? "#F6A405"
                      : "#CCCCCC",
                  },
                ]}
                disabled={is_button_disabled}
              >
                <Text
                  style={{ color: "white", fontSize: 18, textAlign: "center" }}
                >
                  {is_registration ? "Зарегистрироваться" : "Войти"}
                </Text>
              </TouchableOpacity>
              <View>
                <View>
                  <Text style={styles.mini_text}>
                    Создавая личный кабинет вы соглашаетесь с нашими
                  </Text>
                </View>
                <View style={{ flexDirection: "row" }}>
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate("PoliticConfidentiality")
                    }
                  >
                    <Text style={styles.mini_text_with_line}>
                      условиями использования
                    </Text>
                  </TouchableOpacity>
                  <Text style={styles.mini_text}>&nbsp; и &nbsp;</Text>
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate("PoliticConfidentiality")
                    }
                  >
                    <Text style={styles.mini_text_with_line}>
                      политикой конфедициальности
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
              <View style={{ flexDirection: "row" }}>
                <TouchableOpacity
                  onPress={() => navigation.navigate("ForgetPassword")}
                >
                  <Text
                    style={{
                      textAlign: "center",
                      alignSelf: "center",
                      fontSize: 14,
                      color: "gray",
                    }}
                  >
                    Забыли пароль?
                  </Text>
                </TouchableOpacity>
                <Text
                  style={{
                    textAlign: "center",
                    alignSelf: "center",
                    fontSize: 14,
                    color: "gray",
                  }}
                >
                  &nbsp; | &nbsp;
                </Text>
                <TouchableOpacity
                  onPress={() => navigation.navigate("ForgetPassword")}
                >
                  <Text
                    style={{
                      textAlign: "center",
                      alignSelf: "center",
                      fontSize: 14,
                      color: "gray",
                    }}
                  >
                    Нужна помощь?
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
});

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#7B7B7B",
    justifyContent: "flex-end",
  },
  main: {
    padding: 10,
    paddingBottom: 30,
    paddingTop: 30,
    backgroundColor: "white",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  mini_text_with_line: {
    fontSize: 12,
    color: "gray",
    borderBottomWidth: 1,
    borderBottomColor: "gray",
  },
  mini_text: {
    fontSize: 12,
    color: "gray",
  },
  header_switching: {
    flexDirection: "row",
    width: "80%",
    alignSelf: "center",

    borderRadius: 10,
    height: 50,
    overflow: "hidden",
  },
  but_registration: {
    backgroundColor: "#FAFAFA",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    width: "50%",
    textAlign: "center",
  },
  but_registration_active: {
    backgroundColor: "#F6A405",
    color: "white",
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    width: "50%",
    textAlign: "center",
  },
  link_aut: {
    flexDirection: "row",
    // marginTop: 12,
  },
  input: {
    borderBottomColor: "#E7E7E7",
    borderBottomWidth: 1,
    padding: 3,
    height: 60,
  },
  button: {
    width: "100%",
    borderRadius: 8,
    overflow: "hidden",
    padding: 10,
    alignSelf: "center",
  },
});
