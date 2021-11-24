import React from "react";
import {
  TextInput,
  View,
  StyleSheet,
  Image,
  Text,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { SimpleLineIcons } from "@expo/vector-icons";
import cat from "../../assets/cat.png";
import dog from "../../assets/dog.png";
import bird from "../../assets/bird.png";
import fish from "../../assets/fish.png";
import rabbit from "../../assets/rabbit.png";
import dog_other from "../../assets/dog_other.png";
import magnifier from "../../assets/magnifier.svg";

import { Feather } from "@expo/vector-icons";
import { BottomNavigator } from "../../utils/BottomNavigator";
import SvgUri from "react-native-svg-uri";
import { catalog } from "../../store/catalog";
import { set } from "mobx";
export const Catalog = ({ navigation }) => {
  return (
    <>
      <ScrollView style={{ backgroundColor: "#F6F4F0" }}>
        <View style={{ padding: 15 }}>
          <View style={styles.input_container}>
            <TextInput
              style={styles.input}
              placeholder="Поиск"
              placeholderTextColor="black"
            />
            <SvgUri width="20" height="20" source={magnifier} />
          </View>
          <View>
            <View style={styles.amimal_picker_container}>
              <AnimalTypePicker
                navigation={navigation}
                text="Кошки"
                image={cat}
                id={1}
                to="CatalogStreak"
              />
              <AnimalTypePicker
                navigation={navigation}
                text="Собаки"
                image={dog}
                id={2}
                to="CatalogStreak"
              />
            </View>
            <View style={styles.amimal_picker_container}>
              <AnimalTypePicker
                navigation={navigation}
                text="Птицы"
                image={bird}
                id={3}
                to="CatalogStreak"
              />
              <AnimalTypePicker
                navigation={navigation}
                text="Аквариум"
                image={fish}
                id={4}
                to="CatalogStreak"
              />
            </View>
            <View style={styles.amimal_picker_container}>
              <AnimalTypePicker
                navigation={navigation}
                text="Другие животные"
                image={rabbit}
                id={5}
                to="CatalogStreak"
              />
              <AnimalTypePicker
                navigation={navigation}
                text="Перевозка животных"
                image={dog_other}
                id={6}
                to="AnimalTransportation"
              />
            </View>
          </View>
        </View>
        <View
          style={{
            padding: 15,
            marginBottom: 70,
          }}
        >
          <View
            style={{
              alignItems: "center",
              height: 220,
              backgroundColor: "white",
              borderRadius: 10,
              padding: 15,
              justifyContent: "space-around",
            }}
          >
            <View
              style={{
                width: 40,
                height: 40,
                borderRadius: 100,
                backgroundColor: "white",
                borderColor: "#F6F4F0",
                borderWidth: 1,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Feather name="mail" color="#F6A405" size={22} />
            </View>
            <Text style={{ textAlign: "center", fontSize: 20 }}>
              Возник вопрос?
            </Text>
            <Text
              style={{
                color: "#999999",
                textAlign: "center",
                paddingLeft: 20,
                paddingRight: 20,
              }}
            >
              Напишите нам и мы ответим вам в ближайшее время.
            </Text>
            <TouchableOpacity
              onPress={() => navigation.navigate("NewAd")}
              style={styles.button}
            >
              <Text
                style={{ color: "white", fontSize: 18, textAlign: "center" }}
              >
                Написать
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
      <BottomNavigator active="catalog" navigation={navigation} />
    </>
  );
};

const AnimalTypePicker = ({ image, text, to, navigation, id }) => {
  return (
    <TouchableOpacity
      onPress={() => {
        catalog.SetAnimalCategories(id, text);
        navigation.navigate(to);
      }}
      style={{ width: "50%", alignItems: "center" }}
    >
      <Image source={image} style={{ width: "95%", borderRadius: 20 }} />
      <Text
        style={{
          position: "absolute",
          top: "80%",
          left: "10%",
          color: "white",
          fontSize: 14,
        }}
      >
        {text}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  input_container: {
    width: "100%",
    borderRadius: 10,
    overflow: "hidden",
    flexDirection: "row",
    backgroundColor: "white",
    padding: 5,
    alignItems: "center",
  },
  amimal_picker_container: {
    marginTop: 15,
    flexDirection: "row",
    justifyContent: "space-around",
  },
  input: {
    width: "90%",
    padding: 5,
    backgroundColor: "white",
    fontSize: 18,
  },
  button: {
    width: "100%",
    borderRadius: 8,
    overflow: "hidden",
    padding: 8,
    alignSelf: "center",
    marginTop: 10,
    backgroundColor: "#F6A405",
  },
});
