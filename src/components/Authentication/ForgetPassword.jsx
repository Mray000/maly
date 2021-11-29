import left from "../../assets/left.svg";
import SvgUri from "react-native-svg-uri";
import React, { useState } from "react";
import {
  Button,
  Image,
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
} from "react-native";
import { api } from "../../utils/api";
export const ForgetPassword = ({ navigation }) => {
  const [is_email_screen, SetIsEmailScreen] = useState(true);
  const [email, SetEmail] = useState("");
  const [verification_code, SetVerificationCode] = useState("");
  const [new_password, SetNewPassword] = useState("");
  const [new_password_repeat, SetNewPasswordRepeat] = useState("");

  const ChangePassword = () => {
    if (is_email_screen) {
      api.password_change_request(email);
      SetIsEmailScreen(false);
    } else {
      let is_ok = api.change_password(email, new_password, verification_code);
      if (is_ok) navigation.navigate("Authentication");
    }
  };

  let is_button_disabled = is_email_screen
    ? email
    : verification_code && new_password && new_password == new_password_repeat;
  return (
    <View style={styles.container}>
      <View style={styles.main}>
        <TouchableOpacity
          style={{ marginTop: 15 }}
          onPress={() =>
            is_email_screen
              ? navigation.navigate("Authentication")
              : SetIsEmailScreen(true)
          }
        >
          <SvgUri source={left} style={{ width: 30 }} />
        </TouchableOpacity>
        {is_email_screen ? (
          <Text
            style={{
              width: "80%",
              fontSize: 18,
              marginTop: 30,
            }}
          >
            Смените свой пароль
          </Text>
        ) : null}
        {!is_email_screen ? (
          <View>
            <View style={{ marginTop: 20 }}>
              <Text
                style={{
                  alignSelf: "center",
                  fontSize: 14,
                  color: "gray",
                  marginTop: 20,
                }}
              >
                Введите новый пароль
              </Text>
              <TextInput
                placeholder="Введите новый пароль"
                style={styles.input}
                value={new_password}
                onPress={SetNewPassword}
              />
            </View>
            <View style={{ marginTop: 20 }}>
              <Text
                style={{
                  alignSelf: "center",
                  fontSize: 14,
                  color: "gray",
                  marginTop: 20,
                }}
              >
                Повторите новый пароль
              </Text>
              <TextInput
                placeholder="Повторите новый пароль"
                style={styles.input}
                value={new_password_repeat}
                onPress={SetNewPasswordRepeat}
              />
            </View>
            <View style={{ marginTop: 20 }}>
              <Text
                style={{
                  alignSelf: "center",
                  fontSize: 14,
                  color: "gray",
                  marginTop: 20,
                }}
              >
                Введите код, который мы вам отправили на указанную почту
              </Text>
              <TextInput
                placeholder="Введите код"
                style={styles.input}
                value={verification_code}
                onPress={SetVerificationCode}
              />
            </View>
          </View>
        ) : (
          <View style={{ marginTop: 20 }}>
            <Text
              style={{
                alignSelf: "center",
                fontSize: 14,
                color: "gray",
                marginTop: 20,
              }}
            >
              Введите в поле адрес электронной почты. Мы отправим вам сообщение
              по электронной почте с инструкциеями по созданию нового пароля.
            </Text>
            <TextInput
              placeholder="Введите e-mail"
              style={styles.input}
              value={email}
              onPress={SetEmail}
            />
          </View>
        )}

        <TouchableOpacity
          onPress={ChangePassword}
          style={styles.button}
          disabled={is_button_disabled}
        >
          <Text style={{ color: "white", fontSize: 18, textAlign: "center" }}>
            {is_email_screen ? "Отправить код" : "Восстановить пароль"}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "gray",
    justifyContent: "flex-end",
  },
  main: {
    flex: 0.9,
    padding: 15,
    backgroundColor: "white",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  but_registration: {
    backgroundColor: "#E7E7E7",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    width: "50%",
    textAlign: "center",
  },
  but_registration_active: {
    backgroundColor: "#202020",
    color: "white",
    height: "auto",
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    width: "50%",
    textAlign: "center",
  },
  link_aut: {
    flexDirection: "row",
    marginTop: 12,
    marginLeft: 5,
  },
  input: {
    borderBottomColor: "#E7E7E7",
    borderBottomWidth: 1,
    padding: 3,
    height: 50,
    marginTop: 15,
  },
  button: {
    width: "100%",
    borderRadius: 8,
    overflow: "hidden",
    padding: 8,
    alignSelf: "center",
    marginTop: 30,
    backgroundColor: "#F6A405",
  },
});
