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
import { AdsList } from "../../utils/AdsList";
export const CatalogList = ({ route, navigation }) => {
  const [data, SetData] = useState(null);
  useEffect(() => {
    catalog.GetAds.then(SetData);
  }, []);

  if (data) {
    return (
      <>
        <ScrollView
          style={{
            padding: 10,
            backgroundColor: "#F6F4F0",
            flex: 1,
            paddingBottom: 10,
            paddingLeft: "3%",
            paddingRight: "3%",
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
          {data.length ? (
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
          ) : null}

          <View style={{ marginTop: 5, paddingBottom: 80 }}>
            <AdsList ads={data} navigation={navigation} />
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
