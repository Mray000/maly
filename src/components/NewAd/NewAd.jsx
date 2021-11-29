import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { AntDesign, Entypo, Feather } from "@expo/vector-icons";
import left from "../../assets/left.svg";
import SvgUri from "react-native-svg-uri";
import YoutubePlayer from "react-native-youtube-iframe";
import { set } from "mobx";
import { ad } from "../../store/ad";
import { Loader } from "../../utils/Loader";
import { api } from "../../utils/api";
import { observer } from "mobx-react-lite";
import { authentication } from "../../store/authentication";
import { Authentication } from "../Authentication/Authentication";

export const NewAd = observer(({ navigation }) => {
  const [is_animals, SetIsAnimals] = useState(true);
  let animals = [
    { id: 1, name: "Кошки" },
    { id: 2, name: "Собаки" },
    { id: 3, name: "Птицы" },
    { id: 4, name: "Аквариум" },
    { id: 5, name: "Другие животные" },
  ];
  const [breeds, SetBreeds] = useState([]);
  const [is_load, SetIsLoad] = useState(false);
  let array_for_vision = is_animals ? animals : breeds;
  useEffect(() => {
    if (ad.category_id) {
      console.log(ad.category_id);
      api
        .getBreeds(ad.category_id)
        .then(SetBreeds)
        .finally(() => SetIsLoad(false));
    }
  }, [ad.category_id]);
  // console.log(breeds, "99999999");
  if (!authentication.is_auth) {
    authentication.SetRedirect("NewAd");
    navigation.navigate("Authentication");
    return null;
  }
  if (is_load) return <Loader />;
  return (
    <View>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => {
            if (is_animals) navigation.navigate("Catalog");
            else SetIsAnimals(true);
          }}
        >
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
          {is_animals ? "Новое объявление" : "Выберите подкатегорию"}
        </Text>
      </View>
      <ScrollView style={{ paddingLeft: 10, paddingRight: 10 }}>
        {array_for_vision.map((element_for_vision) => (
          <TouchableOpacity
            style={{
              height: 60,
              borderBottomColor: "#F6F4F0",
              borderBottomWidth: 1,
              justifyContent: "center",
            }}
            onPress={() => {
              if (is_animals) {
                ad.SetCategoryId(element_for_vision.id);
                SetIsLoad(true);
                SetIsAnimals(false);
              } else {
                ad.SetBreedId(element_for_vision.id);
                navigation.navigate("AdInfo");
                SetIsAnimals(true);
              }
            }}
          >
            <Text
              style={{
                fontSize: 18,
                fontFamily: "LatoMedium",
              }}
            >
              {element_for_vision.name}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
});

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    height: 50,
    alignItems: "center",
    padding: 15,
    borderBottomColor: "#E7E7E7",
    borderBottomWidth: 1,
  },
});
