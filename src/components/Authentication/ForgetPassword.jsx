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
export const ForgetPassword = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.main}>
        <TouchableOpacity
          style={{ marginTop: 15 }}
          onPress={() => navigation.navigate("Authentication")}
        >
          <SvgUri source={left} style={{ width: 30 }} />
        </TouchableOpacity>
        <Text
          style={{
            width: "80%",
            fontSize: 18,
            marginTop: 30,
          }}
        >
          Смените свой пароль
        </Text>
        <Text
          style={{
            alignSelf: "center",
            fontSize: 14,
            color: "gray",
            marginTop: 20,
          }}
        >
          Введите в поле адрес электронной почты. Мы отправим вам сообщение по
          электронной почте с инструкциеями по созданию нового пароля.
        </Text>
        <View style={{ marginTop: 15 }}>
          <TextInput placeholder="Введите e-mail" style={styles.input} />
        </View>

        <TouchableOpacity
          onPress={() => navigation.navigate("NewAd")}
          style={styles.button}
        >
          <Text style={{ color: "white", fontSize: 18, textAlign: "center" }}>
            Восстоновить пароль
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
    // alignItems: "center",
    justifyContent: "flex-end",
  },
  main: {
    flex: 0.9,
    // alignSelf: "flex-end",
    // width: "100%",
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
