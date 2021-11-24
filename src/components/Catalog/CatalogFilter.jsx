import React, { useEffect, useRef, useState } from "react";
import { AntDesign, Entypo, Feather } from "@expo/vector-icons";
import {
  Modal,
  StyleSheet,
  Text,
  Touchable,
  TouchableOpacity,
  View,
  TextInput,
  ScrollView,
} from "react-native";
import { AnimalFrom } from "../../utils/AnimalFrom";
import { CitiesModal } from "../../utils/CitiesModal";
import SvgUri from "react-native-svg-uri";
import left from "../../assets/left.svg";
import { catalog } from "../../store/catalog";
import { api } from "../../utils/api";
import { Loader } from "../../utils/Loader";
import { observer } from "mobx-react-lite";

export const CatalogFilter = observer(({ navigation, route }) => {
  const [is_visible_price_modal, SetIsVisiblePriceModal] = useState(false);
  const [is_visible_breed_modal, SetIsVisibleBreedModal] = useState(false);
  const [is_visible_city_modal, SetIsVisibleCityModal] = useState(false);
  const [cities, SetCities] = useState([]);
  const [breeds, SetBreeds] = useState([]);
  useEffect(() => {
    api.getCities().then(SetCities);
    api.getBreeds(catalog.AnimalCategories.id).then(SetBreeds);
  }, []);
  if (!cities.length || !breeds.length) return <Loader />;
  return (
    <View style={{ flex: 1 }}>
      <View style={styles.header}>
        <TouchableOpacity onPress={navigation.goBack}>
          <SvgUri source={left} style={{ width: 30 }} />
        </TouchableOpacity>
        <Text
          style={{
            paddingLeft: 15,
            width: "80%",
            textAlign: "center",
            fontSize: 19,
            color: "#F6A405",
          }}
        >
          Параметры
        </Text>
        <TouchableOpacity>
          <Text style={{ color: "gray" }}>Сбросить</Text>
        </TouchableOpacity>
      </View>
      <View
        style={{
          justifyContent: "space-between",
          flex: 1,
          paddingLeft: 10,
          paddingRight: 10,
        }}
      >
        <View>
          <View
            style={{
              flexDirection: "row",
              borderBottomColor: "#E7E7E7",
              borderBottomWidth: 1,
              alignItems: "center",
              justifyContent: "space-between",
              height: 55,
            }}
          >
            <TouchableOpacity onPress={() => SetIsVisibleCityModal(true)}>
              <Text style={{ fontSize: 16, color: "gray" }}>
                {catalog.city.name || "Область, город, населеный пункт"}
              </Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              flexDirection: "row",
              borderBottomColor: "#E7E7E7",
              borderTopColor: "#E7E7E7",
              borderBottomWidth: 1,
              alignItems: "center",
              justifyContent: "space-between",
              height: 55,
            }}
          >
            <TouchableOpacity onPress={() => SetIsVisiblePriceModal(true)}>
              <Text style={{ color: "gray", fontSize: 13 }}>Цена, руб.</Text>
              <Text style={{ fontSize: 16 }}>
                от {catalog.price_min || 0} до&nbsp;
                {catalog.price_max || 0} руб.
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                catalog.SetPriceMax(0);
                catalog.SetPriceMin(0);
              }}
            >
              <Entypo
                name="circle-with-cross"
                size={22}
                color="#CACACA"
                style={{ textAlign: "right" }}
              />
            </TouchableOpacity>
          </View>
          <View
            style={{
              flexDirection: "row",
              borderBottomColor: "#E7E7E7",
              borderBottomWidth: 1,
              alignItems: "center",
              justifyContent: "space-between",
              height: 55,
            }}
          >
            <TouchableOpacity onPress={() => SetIsVisibleBreedModal(true)}>
              <Text style={{ fontSize: 16, color: "gray" }}>
                {catalog.AnimalBreed.name}
              </Text>
            </TouchableOpacity>
          </View>
          <View style={{ marginTop: 10 }}>
            <AnimalFrom
              from={catalog.from}
              SetFrom={catalog.SetFrom}
              type={2}
            />
          </View>
        </View>
        <View style={{ marginBottom: 10 }}>
          <TouchableOpacity
            onPress={() => navigation.navigate("CatalogList")}
            style={styles.button}
          >
            <Text style={{ color: "white", fontSize: 18, textAlign: "center" }}>
              Показать 253 объявелния
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <PriceModal
        is_visible={is_visible_price_modal}
        CloseModal={() => SetIsVisiblePriceModal(false)}
        navigation={navigation}
      />
      <BreedModal
        breeds={breeds}
        is_visible={is_visible_breed_modal}
        CloseModal={() => SetIsVisibleBreedModal(false)}
      />
      <CitiesModal
        cities={cities}
        SetCity={catalog.SetCity}
        is_visible={is_visible_city_modal}
        CloseModal={() => SetIsVisibleCityModal(false)}
      />
    </View>
  );
});

const PriceModal = ({ is_visible, CloseModal, navigation }) => {
  return (
    <Modal animated animationType="fade" visible={is_visible} transparent>
      <View style={styles.modal}>
        <View style={styles.modal_body}>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text style={{ fontSize: 19, color: "black" }}>
              Стоимость(руб.)
            </Text>
            <TouchableOpacity onPress={CloseModal}>
              <Entypo
                name="cross"
                size={26}
                color="gray"
                style={{ textAlign: "right" }}
              />
            </TouchableOpacity>
          </View>
          <View style={{ marginTop: 20 }}>
            <View style={{ flexDirection: "row" }}>
              <TextInput
                placeholder="От"
                placeholderTextColor="gray"
                style={styles.price_input}
                onChangeText={catalog.SetPriceMin}
                value={String(catalog.price_min)}
                keyboardType="number-pad"
                maxLength={7}
              />
              <TouchableOpacity
                onPress={() => catalog.SetPriceMin("")}
                style={styles.price_input_icon}
              >
                <Entypo
                  name="circle-with-cross"
                  size={21}
                  color="#CACACA"
                  style={{ textAlign: "right" }}
                />
              </TouchableOpacity>
            </View>
            <View style={{ flexDirection: "row" }}>
              <TextInput
                placeholder="До"
                placeholderTextColor="gray"
                style={styles.price_input}
                onChangeText={catalog.SetPriceMax}
                value={String(catalog.price_max)}
                keyboardType="number-pad"
                maxLength={7}
              />
              <TouchableOpacity
                onPress={() => catalog.SetPriceMax("")}
                style={styles.price_input_icon}
              >
                <Entypo
                  name="circle-with-cross"
                  size={21}
                  color="#CACACA"
                  style={{ textAlign: "right" }}
                />
              </TouchableOpacity>
            </View>
          </View>
          <TouchableOpacity
            onPress={() => navigation.navigate("CatlogList")}
            style={styles.button}
          >
            <Text style={{ color: "white", fontSize: 18, textAlign: "center" }}>
              Показать 129 объявелний
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const BreedModal = ({ breeds, is_visible, CloseModal }) => (
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
            onPress={CloseModal}
            style={{ alignItems: "flex-end", paddingRight: 10, paddingTop: 8 }}
          >
            <Feather name="x" size={22} color="#767676" />
          </TouchableOpacity>
          {breeds.map((breed, i) => (
            <TouchableOpacity
              onPress={() => {
                catalog.SetAnimalBreed(breed);
                CloseModal();
              }}
              key={breed.id}
              style={{
                borderBottomColor: "#F6F4F0",
                borderBottomWidth: i != breeds.length - 1 ? 1 : 0,
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
                  color:
                    catalog.AnimalBreed.id == breed.id ? "#F6A405" : "black",
                }}
              >
                {breed.name}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </View>
  </Modal>
);

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    height: 50,
    alignItems: "center",
    padding: 15,
    borderBottomColor: "#E7E7E7",
    borderBottomWidth: 1,
  },
  modal: {
    backgroundColor: "rgba(0,0,0,0.2)",
    flex: 1,
    justifyContent: "flex-end",
  },
  modal_body: {
    height: 270,
    backgroundColor: "white",
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    padding: 10,
    paddingTop: 20,
  },
  price_input: {
    borderBottomColor: "#E7E7E7",
    borderBottomWidth: 1,
    padding: 10,
    width: "90%",
    fontSize: 15,
    paddingLeft: 0,
  },
  price_input_icon: {
    width: "10%",
    borderBottomColor: "#E7E7E7",
    borderBottomWidth: 1,
    paddingTop: 15,
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
