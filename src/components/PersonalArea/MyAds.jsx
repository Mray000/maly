import left from "../../assets/left.svg";
import SvgUri from "react-native-svg-uri";
import React, { useState } from "react";
import {
  Image,
  Platform,
  StyleSheet,
  Text,
  View,
  Button,
  TouchableOpacity,
} from "react-native";
export const MyAds = ({ navigation }) => {
  let ads = [
    {
      title: "Абиссинсская кошка молли",
      img: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0a/Kamee01.jpg/274px-Kamee01.jpg",
      much: 55000,
      address: "Казань, Советский район",
    },
    {
      title: "Кошко-мальчик",
      img: "https://i.pinimg.com/originals/4b/74/67/4b74678f41800387caf4a7653791128c.jpg",
      much: 10000000,
      address: "Мое сердце",
    },
  ];
  const [ads_type, SetAdsType] = useState("active");
  return (
    <View
      style={{
        backgroundColor: "white",
        flex: 1,
        paddingLeft: 10,
        paddingRight: 10,
      }}
    >
      <View style={styles.header}>
        <TouchableOpacity
          style={{
            height: "100%",
            width: "10%",
            justifyContent: "center",
            position: "absolute",
          }}
          onPress={() => navigation.push("PersonalArea")}
        >
          <SvgUri source={left} />
        </TouchableOpacity>
        <Text
          style={{
            fontSize: 18,
            textAlign: "center",
            // width: "auto",
            // width: "90%",
            // textAlign: "auto",
            marginRight: "auto",
            marginLeft: "auto",
            color: "#F6A405",
          }}
        >
          Мои объявления
        </Text>
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginTop: 10,
          width: "100%",
        }}
      >
        <TouchableOpacity
          style={ads_type == "active" ? styles.ad_type_active : styles.ad_type}
          onPress={() => SetAdsType("active")}
        >
          <Text
            style={{
              textAlign: "center",
              color: ads_type == "active" ? "white" : "#7B7B7B",
            }}
          >
            Активные 2
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={
            ads_type == "on_check" ? styles.ad_type_active : styles.ad_type
          }
          onPress={() => SetAdsType("on_check")}
        >
          <Text
            style={{
              textAlign: "center",
              color: ads_type == "on_check" ? "white" : "#7B7B7B",
            }}
          >
            На проверке 0
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={
            ads_type == "not_approved" ? styles.ad_type_active : styles.ad_type
          }
          onPress={() => SetAdsType("not_approved")}
        >
          <Text
            style={{
              textAlign: "center",
              color: ads_type == "not_approved" ? "white" : "#7B7B7B",
            }}
          >
            Архив
          </Text>
        </TouchableOpacity>
      </View>
      {ads_type == "active" ? (
        <View style={{ marginTop: 10 }}>
          {ads.map((ad) => {
            return (
              <View
                key={ad.img}
                style={{ flexDirection: "row", height: 60, marginTop: 10 }}
              >
                <Image
                  source={{ uri: ad.img }}
                  style={{ width: 60, height: 60, borderRadius: 15 }}
                />
                <View
                  style={{
                    justifyContent: "center",
                    height: 60,
                    marginLeft: 20,
                  }}
                >
                  <Text style={{ fontSize: 16, fontFamily: "LatoMedium" }}>
                    {ad.title}
                  </Text>
                  <Text
                    style={{ fontFamily: "LatoSemibold", fontWeight: "700" }}
                  >
                    {ad.much} руб.
                  </Text>
                </View>
              </View>
            );
          })}
        </View>
      ) : null}
      {/* <TouchableOpacity
        onPress={() => navigation.navigate("NewAd")}
        style={styles.button}
      >
        <Text style={{ color: "white", fontSize: 18, textAlign: "center" }}>
          Разместить объявление
        </Text>
      </TouchableOpacity> */}
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    height: 50,
    alignItems: "center",
  },
  button: {
    width: "90%",
    borderRadius: 8,
    overflow: "hidden",
    padding: 8,
    alignSelf: "center",
    marginTop: 10,
    backgroundColor: "#F6A405",
  },
  link: {
    flexDirection: "row",
    height: 50,
    borderBottomColor: "#E7E7E7",
    alignItems: "center",
    borderBottomWidth: 1,
    justifyContent: "space-between",
    padding: 15,
  },
  ad_type: {
    width: "30%",
    borderColor: "#E7E7E7",
    borderWidth: 1,
    borderRadius: 6,
    height: 30,
    paddingLeft: 5,
    paddingRight: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  ad_type_active: {
    width: "30%",
    backgroundColor: "#F6A405",
    borderRadius: 6,
    height: 30,
    paddingLeft: 5,
    paddingRight: 5,
    alignItems: "center",
    justifyContent: "center",
  },
});
