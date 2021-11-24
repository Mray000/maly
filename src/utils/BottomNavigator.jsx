import React, { useEffect, useRef } from "react";
import {
  Dimensions,
  Image,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import SvgUri from "react-native-svg-uri";
import home_i from "../assets/home.svg";
import home_active from "../assets/home_active.svg";
import new_ad_i from "../assets/new_ad.png";
import new_ad_active from "../assets/new_ad_active.png";
import profile_i from "../assets/profile.svg";
import profile_active from "../assets/profile_active.svg";
export const BottomNavigator = ({ active, navigation }) => {
  let bottom_navigator = useRef();
  useEffect(() => {
    bottom_navigator.current.measure((fx, fy, width, height, px, py) => {
      console.log("Component width is: " + width);
      console.log("Component height is: " + height);
      console.log("X offset to frame: " + fx);
      console.log("Y offset to frame: " + fy);
      console.log("X offset to page: " + px);
      console.log("Y offset to page: " + py);
      // bottom_navigator.current.style.windowHei
    });
  }, []);
  let catalog = active == "catalog";
  let new_ad = active == "new_ad";
  let profile = active == "profile";
  return (
    <View style={styles.main} ref={bottom_navigator}>
      <TouchableOpacity
        onPress={() => navigation.navigate("Catalog")}
        style={styles.element}
      >
        <SvgUri
          width="20"
          height="20"
          source={catalog ? home_active : home_i}
        />
        <Text style={{ color: catalog ? "#F6A405" : "#A1A1A1" }}>Каталог</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate("NewAd")}
        style={styles.element_center}
      >
        <Image
          style={{ width: 20, height: 20 }}
          source={new_ad ? new_ad_active : new_ad_i}
        />
        <Text style={{ color: new_ad ? "#F6A405" : "#A1A1A1" }}>
          Разместить
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate("PersonalArea")}
        style={styles.element}
      >
        <SvgUri
          width="20"
          height="20"
          source={profile ? profile_active : profile_i}
        />
        <Text style={{ color: profile ? "#F6A405" : "#A1A1A1" }}>Профиль</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    flexDirection: "row",
    justifyContent: "space-around",
    position: "absolute",
    // top: "94%",
    // top: Dimensions.get("screen").height ,
    flex: 1,
    bottom: -1,
    // top: Dimensions.get("window").height - 60,
    right: 0,
    left: 0,
    zIndex: 100,
    backgroundColor: "white",
    height: 60,
    paddingTop: 10,
    paddingBottom: 10,
    borderTopColor: "#EFEFEF",
    borderTopWidth: 1,
  },
  element: {
    justifyContent: "center",
    alignItems: "center",
    width: "33%",
    // paddingTop: 5,
    // paddingBottom: 5,
  },
  element_center: {
    justifyContent: "center",
    alignItems: "center",
    borderLeftColor: "#EFEFEF",
    borderRightColor: "#EFEFEF",
    borderLeftWidth: 1,
    borderRightWidth: 1,
    // padding: 5,
    width: "33%",
    lineHeight: 10,
  },
});
