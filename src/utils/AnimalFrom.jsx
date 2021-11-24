import { observer } from "mobx-react-lite";
import React from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { catalog } from "../store/catalog.js";

export const AnimalFrom = observer(({ from, SetFrom, type }) => {
  const IsActiveCheck = (name) => {
    if (type == 1) return from == name;
    else return from.includes(name);
  };
  return (
    <View>
      <Text>Откуда животное:</Text>
      <View style={{ flexDirection: "row", marginTop: 5 }}>
        <TouchableOpacity
          onPress={() => SetFrom("Приют")}
          style={
            IsActiveCheck("Приют")
              ? styles.select_button_active
              : styles.select_button
          }
        >
          <Text
            style={
              IsActiveCheck("Приют")
                ? styles.select_text_active
                : styles.select_text
            }
          >
            Приют
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => SetFrom("Питомник")}
          style={
            IsActiveCheck("Питомник")
              ? styles.select_button_active_m_l
              : styles.select_button_m_l
          }
        >
          <Text
            style={
              IsActiveCheck("Питомник")
                ? styles.select_text_active
                : styles.select_text
            }
          >
            Питомник
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => SetFrom("Магазин")}
          style={
            IsActiveCheck("Магазин")
              ? styles.select_button_active_m_l
              : styles.select_button_m_l
          }
        >
          <Text
            style={
              IsActiveCheck("Магазин")
                ? styles.select_text_active
                : styles.select_text
            }
          >
            Магазин
          </Text>
        </TouchableOpacity>
      </View>
      <View style={{ flexDirection: "row" }}>
        <TouchableOpacity
          onPress={() => SetFrom("Частное объявление")}
          style={
            IsActiveCheck("Частное объявление")
              ? styles.select_button_active
              : styles.select_button
          }
        >
          <Text
            style={
              IsActiveCheck("Частное объявление")
                ? styles.select_text_active
                : styles.select_text
            }
          >
            Частное объявление
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => SetFrom("Передержка")}
          style={
            IsActiveCheck("Передержка")
              ? styles.select_button_active_m_l
              : styles.select_button_m_l
          }
        >
          <Text
            style={
              IsActiveCheck("Передержка")
                ? styles.select_text_active
                : styles.select_text
            }
          >
            Передержка
          </Text>
        </TouchableOpacity>
      </View>
      <View style={{ flexDirection: "row" }}>
        <TouchableOpacity
          onPress={() => SetFrom("Зоогостиница")}
          style={
            IsActiveCheck("Зоогостиница")
              ? styles.select_button_active
              : styles.select_button
          }
        >
          <Text
            style={
              IsActiveCheck("Зоогостиница")
                ? styles.select_text_active
                : styles.select_text
            }
          >
            Зоогостиница
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  select_button: {
    borderColor: "#E7E7E7",
    borderWidth: 1,
    padding: 5,
    borderRadius: 5,
    marginTop: 10,
  },
  select_button_m_l: {
    borderColor: "#E7E7E7",
    borderWidth: 1,
    padding: 5,
    borderRadius: 5,
    marginTop: 10,
    marginLeft: 10,
  },
  select_button_active: {
    borderColor: "#E7E7E7",
    borderWidth: 1,
    padding: 5,
    borderRadius: 5,
    marginTop: 10,
    backgroundColor: "#E7E7E7",
  },
  select_button_active_m_l: {
    borderColor: "#E7E7E7",
    borderWidth: 1,
    padding: 5,
    borderRadius: 5,
    marginTop: 10,
    marginLeft: 10,
    backgroundColor: "#E7E7E7",
  },
  select_text: {
    textAlign: "center",
    color: "#808080",
    fontSize: 16,
  },
  select_text_active: {
    color: "#747474",
    fontSize: 16,
    textAlign: "center",
  },
});
