import left from "../../assets/left.svg";
import SvgUri from "react-native-svg-uri";
import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { AntDesign } from "@expo/vector-icons";

export const AnimalTransportation = ({ navigation }) => {
  return (
    <View>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <SvgUri source={left} style={{ width: 30 }} />
        </TouchableOpacity>
        <Text
          style={{
            width: "90%",
            textAlign: "center",
            fontSize: 19,
            color: "#F6A405",
          }}
        >
          Перевозка животных
        </Text>
      </View>
      <View style={{ padding: 15, marginTop: 10 }}>
        <Text style={{ fontSize: 19, fontWeight: "700" }}>
          Перевозка животных по всей России.
        </Text>
        <Text
          style={{
            fontSize: 17,
            marginTop: 20,
            fontFamily: "LatoMedium",
          }}
        >
          В нашей компании&nbsp;
          <Text
            onPress={() => console.log(123)}
            style={{
              color: "#F6A405",
              textDecorationColor: "#F6A405",
              textDecorationLine: "underline",
            }}
          >
            MALI
          </Text>
          &nbsp;есть перевозчики, которые сами имеют животных и очень их любят.
          Они накормят, выгуляют и приласкают ваших драгоценных любимцев. Помимо
          обычного не специализированного транспорта для домашних животных, вы
          можете заказать на нашем сайте профессиональную коневозку для
          перевозки лошадей или специальный скотовоз для перевозки свиней или
          овец. Для этого вам нужно просто разместить запрос, а все остальное мы
          сделаем за вас.
        </Text>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginTop: 30,
          }}
        >
          <TouchableOpacity style={styles.button}>
            <Text style={{ color: "white", fontSize: 18, textAlign: "center" }}>
              Позвонить
            </Text>
          </TouchableOpacity>
          <View
            style={{
              height: 45,
              width: 45,
              borderRadius: 100,
              alignItems: "center",
              justifyContent: "center",
              borderColor: "#F6F4F0",
              borderWidth: 1,
              marginLeft: 20,
            }}
          >
            <AntDesign name="instagram" color="#F6A405" size={24} />
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    height: 50,
    alignItems: "center",
    padding: 15,
    borderBottomColor: "#E7E7E7",
    borderBottomWidth: 1,
  },
  button: {
    width: 200,
    borderRadius: 8,
    overflow: "hidden",
    padding: 10,
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F6A405",
    height: 45,
  },
});
