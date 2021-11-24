import React, { useRef, useState } from "react";
import { AntDesign, Entypo, Feather } from "@expo/vector-icons";
import {
  Modal,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  ScrollView,
} from "react-native";
export const CitiesModal = ({ cities, SetCity, is_visible, CloseModal }) => {
  const [filter, SetFilter] = useState("");
  return (
    <Modal animated animationType="fade" visible={is_visible} transparent>
      <View
        style={{
          backgroundColor: "rgba(0,0,0,0.2)",
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <View style={{ height: 400, alignItems: "center", width: "90%" }}>
          <ScrollView
            style={{
              backgroundColor: "white",
              paddingBottom: 10,
              borderRadius: 10,
              width: "100%",
              padding: 1,
            }}
          >
            <TouchableOpacity
              onPress={() => {
                SetFilter("");
                CloseModal();
              }}
              style={{
                alignItems: "flex-end",
                paddingRight: 10,
                paddingTop: 8,
              }}
            >
              <Feather name="x" size={22} color="#767676" />
            </TouchableOpacity>
            <View
              style={{
                paddingLeft: 10,
              }}
            >
              <TextInput
                placeholder="Поиск"
                style={{
                  borderBottomColor: "#F6F4F0",
                  borderBottomWidth: 1,
                  textAlignVertical: "center",
                  paddingTop: 1,
                  height: 50,
                  fontSize: 15,
                }}
                onChangeText={SetFilter}
              />
            </View>
            {cities
              .filter((el) => el.name.includes(filter))
              .map((city, i) => (
                <TouchableOpacity
                  key={city.id}
                  onPress={() => {
                    SetCity(city);
                    CloseModal();
                    SetFilter("");
                  }}
                  style={{
                    borderBottomColor: "#F6F4F0",
                    borderBottomWidth: i != cities.length - 1 ? 1 : 0,
                    height: 40,
                    justifyContent: "center",
                  }}
                >
                  <Text
                    style={{
                      textAlign: "left",
                      fontFamily: "LatoMedium",
                      fontSize: 17,
                      padding: 8,
                      textAlignVertical: "center",
                      // color: curent_value == el.title ? "#F6A405" : "black",
                    }}
                  >
                    {city.name}
                  </Text>
                </TouchableOpacity>
              ))}
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};
