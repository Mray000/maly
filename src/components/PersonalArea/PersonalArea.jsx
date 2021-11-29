import left from "../../assets/left.svg";
import right from "../../assets/right.svg";
import SvgUri from "react-native-svg-uri";
import React from "react";
import { AntDesign } from "@expo/vector-icons";
import {
  Image,
  Platform,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView, StatusBar, PlatformOSType } from "react-native";
import { BottomNavigator } from "../../utils/BottomNavigator.jsx";
import { authentication } from "../../store/authentication";
export const PersonalArea = ({ navigation }) => {
  if (!authentication.is_auth) {
    authentication.SetRedirect("PersonalArea");
    navigation.navigate("Authentication");
  }
  return (
    <>
      <View style={{ backgroundColor: "white", flex: 1 }}>
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => navigation.navigate("Catalog")}
            style={{
              height: "100%",
              // alignItems: "center",
              paddingLeft: 10,
              justifyContent: "center",
              width: "10%",

              position: "absolute",
            }}
          >
            <SvgUri source={left} />
          </TouchableOpacity>
          <Text
            style={{
              fontSize: 18,
              textAlign: "center",
              color: "#F6A405",
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            Личный кабинет
          </Text>
        </View>
        <View style={{ paddingLeft: 10, paddingRight: 10 }}>
          <TouchableOpacity
            style={styles.link}
            onPress={() => navigation.navigate("MyAds")}
          >
            <Text style={{ fontSize: 18 }}>Мои объявления</Text>
            <SvgUri source={right} width="20" height="20" />
          </TouchableOpacity>
          <View style={{ height: 1, backgroundColor: "#E7E7E7" }} />
          <TouchableOpacity
            style={styles.link}
            onPress={() => navigation.navigate("Profile")}
          >
            <Text style={{ fontSize: 18 }}>Профиль</Text>
            <SvgUri source={right} width="20" height="20" />
          </TouchableOpacity>
          {authentication.role == 2 ? (
            <>
              <View style={{ height: 1, backgroundColor: "#E7E7E7" }} />
              <TouchableOpacity
                style={styles.link}
                onPress={() => navigation.navigate("CheckAds")}
              >
                <Text style={{ fontSize: 18 }}>Проверка объявелний</Text>
                <SvgUri source={right} width="20" height="20" />
              </TouchableOpacity>
            </>
          ) : null}

          <View style={{ height: 1, backgroundColor: "#E7E7E7" }} />
          <TouchableOpacity
            style={{ height: 60, justifyContent: "center" }}
            onPress={() => {
              authentication.SetRedirect("CatalogList");
              navigation.navigate("Authentication");
            }}
          >
            <Text style={{ fontSize: 18 }}>Выйти</Text>
          </TouchableOpacity>
        </View>
      </View>
      <BottomNavigator navigation={navigation} active="profile" />
    </>
  );
};

const styles = StyleSheet.create({
  header: {
    borderBottomColor: "#E7E7E7",
    borderBottomWidth: 1,
    flexDirection: "row",
    height: 50,
    alignItems: "center",
    padding: 5,
    paddingLeft: 10,
    justifyContent: "space-around",
  },
  link: {
    flexDirection: "row",
    height: 60,
    alignItems: "center",
    justifyContent: "space-between",
    // marginTop: 5,
    // marginBottom: 5,
  },
});
