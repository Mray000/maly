import { observer } from "mobx-react-lite";
import React from "react";
import { Modal, Text, TouchableOpacity, View } from "react-native";
import { error } from "../store/error";

export const ErrorModal = observer(() => {
  console.log(error.error);
  if (error.error) {
    return (
      <Modal animationType="fade" transparent>
        <View
          style={{
            backgroundColor: "rgba(0,0,0,0.2)",
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <View
            style={{
              backgroundColor: "white",
              padding: 17,
              borderRadius: 10,
              width: "70%",
            }}
          >
            <Text
              style={{
                fontFamily: "LatoSemibold",
                fontSize: 15,
              }}
            >
              Ошибка
            </Text>
            <Text
              style={{
                fontFamily: "LatoMedium",
                fontSize: 15,
                color: "gray",
                marginTop: 10,
              }}
            >
              {error.error}
            </Text>
            <TouchableOpacity onPress={() => error.SetError("")}>
              <Text
                style={{
                  fontFamily: "LatoMedium",
                  fontSize: 15,
                  color: "#F6A405",
                  textAlign: "right",
                  marginTop: 10,
                }}
              >
                Ок
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );
  } else return null;
});
