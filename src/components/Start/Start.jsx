import { setStatusBarBackgroundColor } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import {
  Image,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import AppIntroSlider from "react-native-app-intro-slider";
import fist_img from "../../assets/first_start.png";
import second_img from "../../assets/second_start.png";
// import first_svg from "../../assets/fisrt_start.svg";
// import second_svg from "../../assets/second_start.svg";
import SvgUri from "react-native-svg-uri";
const slides = [
  {
    key: 1,
    text: "Находите домашних животных по всей России!",
    image: fist_img,
  },
  {
    key: 2,
    text: "Размещайте объявления домашних животных по всей России!",
    image: second_img,
  },
];

const renderItem = ({ item }) => {
  return (
    <View style={styles.slide}>
      <Image style={styles.image} source={item.image} />
      <View style={styles.content}>
        <Text style={{ color: "white", fontSize: 18 }}>{item.text}</Text>
      </View>
    </View>
  );
};

export const Start = ({ navigation }) => {
  const onDone = () => {
    StatusBar.setBackgroundColor("white");
    navigation.navigate("Catalog");
  };

  useEffect(() => {
    StatusBar.setBackgroundColor("#F6A400");
    return () => {};
  }, []);
  const [is_first_slide, SetIsFirstSlide] = useState(true);
  return (
    <View style={{ flex: 1 }}>
      <AppIntroSlider
        renderItem={renderItem}
        data={slides}
        showDoneButton={false}
        showNextButton={false}
        onSlideChange={(index) => SetIsFirstSlide(index == 0)}
        activeDotStyle={{ display: "none" }}
        dotStyle={{ display: "none" }}
      />
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          bottom: 40,
          alignSelf: "center",

          width: "70%",
          position: "absolute",
        }}
      >
        <View style={{ flexDirection: "row" }}>
          <View
            style={{
              backgroundColor: "white",
              width: is_first_slide ? 20 : 5,
              height: 5,
              borderRadius: 10,
              opacity: is_first_slide ? 1 : 0.5,
            }}
          />
          <View
            style={{
              backgroundColor: "white",
              opacity: !is_first_slide ? 1 : 0.5,
              width: !is_first_slide ? 20 : 5,
              height: 5,
              borderRadius: 10,
              marginLeft: 10,
            }}
          />
        </View>
        <TouchableOpacity onPress={onDone}>
          <Text
            style={{
              color: "white",
              fontSize: 18,
            }}
          >
            {is_first_slide ? "Пропустить" : "Начать"}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  slide: {
    flex: 1,
    backgroundColor: "#F6A405",
  },
  content: {
    color: "white",
    fontSize: 18,
    top: "70%",
    width: "70%",
    alignSelf: "center",
    height: "30%",
    justifyContent: "space-between",
  },
  image: {
    alignSelf: "center",
    position: "absolute",
    // aspectRatio: 1,
    width: "100%",
    height: "70%",
    // backgroundColor: "red",
  },
});
