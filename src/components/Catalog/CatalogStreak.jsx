import left from "../../assets/left.svg";
import SvgUri from "react-native-svg-uri";
import React, { useEffect, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { AnimalFrom } from "../../utils/AnimalFrom";
import { api } from "../../utils/api";
import { catalog } from "../../store/catalog";
import { set } from "mobx";
import { Loader } from "../../utils/Loader";
import { observer } from "mobx-react-lite";

export const CatalogStreak = ({ navigation }) => {
  const [breeds, SetBreeds] = useState(null);
  console.log("render strak");
  useEffect(() => {
    api.getBreeds(catalog.AnimalCategories.id).then(SetBreeds);
  }, []);
  if (breeds) {
    return (
      <ScrollView>
        <View style={styles.header}>
          <TouchableOpacity onPress={navigation.goBack}>
            <SvgUri source={left} style={{ width: 30 }} />
          </TouchableOpacity>
          <Text
            style={{
              width: "90%",
              textAlign: "center",
              fontSize: 19,
              color: "#F6A405",
            }}
            s
          >
            {catalog.AnimalCategories.name}
          </Text>
        </View>
        <View style={{ padding: 10 }}>
          <AnimalFrom from={catalog.from} SetFrom={catalog.SetFrom} type={2} />
          <View style={{ paddingLeft: 10, paddingRight: 10, marginTop: 20 }}>
            {breeds.map((breed, i) => (
              <TouchableOpacity
                key={breed.id}
                style={{
                  height: 50,
                  borderBottomColor: "#F6F4F0",
                  borderBottomWidth: 1,
                  borderTopColor: "#F6F4F0",
                  borderTopWidth: i == 0 ? 1 : 0,
                  justifyContent: "center",
                }}
                onPress={() => {
                  catalog.SetAnimalBreed(breed);
                  navigation.navigate("CatalogList");
                }}
              >
                <Text
                  style={{
                    fontSize: 17,
                    fontFamily: "LatoMedium",
                  }}
                >
                  {breed.name}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>
    );
  } else return <Loader />;
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
    width: 180,
    borderRadius: 8,
    overflow: "hidden",
    padding: 10,
    alignSelf: "center",
    backgroundColor: "#F6A405",
  },
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
