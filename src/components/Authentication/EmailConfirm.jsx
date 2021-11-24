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
import arrow_left from "../../assets/arrow-left.png";
import { authentication } from "../../store/authentication";
export const EmailConfirm = ({ navigation }) => {
  const [confirm_code, SetConfirmCode] = useState("");
  const ConfirmEmail = () => {
    let is_ok = await authentication.confirm_email(confirm_code);
    if (is_ok) navigation.navigate("Catalog");
  };
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
          Введите код, который мы отправили вам на почту
        </Text>
        <View style={{ marginTop: 15 }}>
          <TextInput
            placeholder="Введите код"
            style={styles.input}
            value={confirm_code}
            onChangeText={SetConfirmCode}
          />
        </View>
        <TouchableOpacity onPress={ConfirmEmail} style={styles.button}>
          <Text style={{ color: "white", fontSize: 18, textAlign: "center" }}>
            Подтвердить почту
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
