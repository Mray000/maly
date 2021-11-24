import { AntDesign, SimpleLineIcons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import {
  Dimensions,
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { BottomNavigator } from "../../utils/BottomNavigator";
import magnifier from "../../assets/magnifier.svg";
import left from "../../assets/left.svg";
import SvgUri from "react-native-svg-uri";
import { catalog } from "../../store/catalog";
import { api } from "../../utils/api";
import { Loader } from "../../utils/Loader";
export const CatalogList = ({ route, navigation }) => {
  const [data, SetData] = useState(null);
  useEffect(() => {
    catalog.GetAds.then(SetData);
  }, []);

  let animals = [];
  if (data) {
    for (let i = 0; i < data.length; i += 2) {
      animals.push([data[i], data[i + 1]]);
    }
  }

  if (data) {
    return (
      <>
        <ScrollView
          style={{
            padding: 10,
            backgroundColor: "#F6F4F0",
            flex: 1,
            paddingBottom: 10,
          }}
        >
          <View style={styles.header}>
            <TouchableOpacity onPress={navigation.goBack}>
              <SvgUri source={left} style={{ width: 30 }} />
            </TouchableOpacity>
            <View style={styles.input_container}>
              <TextInput
                style={styles.input}
                placeholder="Поиск"
                placeholderTextColor="black"
              />
              <SvgUri width="20" height="20" source={magnifier} />
            </View>
          </View>
          <Text
            style={{
              marginTop: 20,
              textAlign: "center",
              fontSize: 19,
              fontFamily: "LatoSemibold",
            }}
          >
            {catalog.AnimalBreed.name}
          </Text>
          <Text
            style={{
              textAlign: "center",
              fontSize: 16,
              color: "gray",
              marginTop: 3,
              fontFamily: "LatoMedium",
            }}
          >
            {data.length} предложений
          </Text>
          <View style={{ marginTop: 5, paddingBottom: 80 }}>
            {animals.map((two_animal) => (
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-around",
                  marginTop: 15,
                }}
                key={two_animal[0].idAd}
              >
                {two_animal.map((animal) => (
                  <TouchableOpacity
                    style={{ width: "45%" }}
                    onPress={() =>
                      navigation.navigate("Ad", { id: animal.idAd })
                    }
                    key={animal.idAd}
                  >
                    <Image
                      source={{ uri: animal.imagePreview }}
                      style={{
                        width: "100%",
                        aspectRatio: 1,
                        borderRadius: 20,
                      }}
                    />
                    <Text
                      style={{
                        fontFamily: "LatoRegular",
                        fontSize: 15,
                        marginTop: 10,
                      }}
                    >
                      {animal.namePet}
                    </Text>
                    <Text
                      style={{
                        fontFamily: "LatoSemibold",
                        fontSize: 15,
                        marginTop: 5,
                      }}
                    >
                      {animal.price} руб.
                    </Text>
                    <Text
                      style={{
                        color: "gray",
                        fontFamily: "LatoRegular",
                        marginTop: 5,
                      }}
                    >
                      {animal.city}
                    </Text>
                    <View style={{ alignItems: "flex-start", marginTop: 7 }}>
                      <Text
                        style={{
                          fontFamily: "LatoMedium",
                          padding: 2,
                          paddingLeft: 6,
                          paddingRight: 6,
                          borderColor: "#F6A405",
                          borderWidth: 1,
                          borderRadius: 5,
                          fontSize: 14,
                          textAlign: "center",
                        }}
                      >
                        {animal.place}
                      </Text>
                    </View>
                  </TouchableOpacity>
                ))}
              </View>
            ))}
          </View>
        </ScrollView>
        <TouchableOpacity
          style={styles.params}
          onPress={() => navigation.navigate("CatalogFilter", route.params)}
        >
          <Text style={{ color: "white", fontSize: 18 }}>Параметры</Text>
        </TouchableOpacity>
        <BottomNavigator active="catalog" navigation={navigation} />
      </>
    );
  } else {
    return <Loader />;
  }
};

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  params: {
    flexDirection: "row",
    justifyContent: "space-around",
    position: "absolute",
    top: Dimensions.get("window").height - StatusBar.currentHeight - 120,
    flex: 1,
    right: 0,
    left: "20%",
    color: "white",
    backgroundColor: "#F6A405",
    height: 40,
    width: "60%",
    borderRadius: 10,
    alignItems: "center",
  },
  input_container: {
    width: "90%",
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
    justifyContent: "space-between",
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
