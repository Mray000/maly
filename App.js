import React, { useState, useEffect } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { Authentication } from "./src/components/Authentication/Authentication";
import { NavigationContainer } from "@react-navigation/native";
import { ForgetPassword } from "./src/components/Authentication/ForgetPassword";
import { PersonalArea } from "./src/components/PersonalArea/PersonalArea";
import { SafeAreaView, StatusBar, Platform, View, Text } from "react-native";
import { MyAds } from "./src/components/PersonalArea/MyAds";
import { NewAd } from "./src/components/NewAd/NewAd";
import { AdInfo } from "./src/components/NewAd/AdInfo";
import { PoliticConfidentiality } from "./src/components/Authentication/PoliticConfidentiality";
import { Catalog } from "./src/components/Catalog/Catalog";
import { Start } from "./src/components/Start/Start";
import { AnimalTransportation } from "./src/components/Catalog/AnimalTransportation";
import { CatalogStreak } from "./src/components/Catalog/CatalogStreak";
import { CatalogList } from "./src/components/Catalog/CatalogList";
import { useFonts } from "expo-font";
import Lato_Medium_Requier from "./src/assets/fonts/Lato-Medium.ttf";
import Lato_Semibold_Require from "./src/assets/fonts/Lato-Semibold.ttf";
import Lato_Regular_Require from "./src/assets/fonts/Lato-Regular.ttf";
import { CatalogFilter } from "./src/components/Catalog/CatalogFilter";
import { MyAd } from "./src/components/Ad/MyAd";
import * as Linking from "expo-linking";
import { Ad } from "./src/components/Ad/Ad";
import { Profile } from "./src/components/PersonalArea/Profile";
import { ErrorModal } from "./src/utils/ErrorModal";
import { getAsyncData, SetAuthData } from "./src/utils/api";
import { authentication } from "./src/store/authentication";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Stack = createStackNavigator();
const prefix = Linking.makeUrl("/");

function App() {
  const [ad_id, SetAdId] = useState(0);
  const [tokens, SetTokens] = useState(null);
  const [is_data_load, SetIsDataLoad] = useState(false);
  const [is_link_load, SetIsLinkLoad] = useState(false);
  function handleDeepLink(event) {
    let id = Linking.parse(event.url)?.path;
    if (id) SetAdId(id);

    SetIsLinkLoad(true);
  }
  const LinkToAd = ({ navigation }) => {
    navigation.navigate("Ad", { id: ad_id });
    return null;
  };
  useEffect(() => {
    async function GetInitialUrl() {
      const initialURL = await Linking.getInitialURL();
      let token = Linking.parse(initialURL).path;
      if (initialURL) SetAdId(token);
      SetIsLinkLoad(true);
    }
    Linking.addEventListener("url", handleDeepLink);
    if (!ad_id) GetInitialUrl();
    return () => {
      Linking.removeEventListener("url");
    };
  }, []);
  useEffect(() => {
    (async () => {
      // let a = await AsyncStorage.multiRemove([
      //   "accessToken",
      //   "refreshToken",
      //   "role",
      //   "email",

      // ]);
      await AsyncStorage.clear();
      let data = await getAsyncData();

      if (data) {
        await SetAuthData(
          data.accessToken,
          data.refreshToken,
          data.role,
          data.email
        );
      }
      SetIsDataLoad(true);
    })();
  }, []);
  const linking = {
    prefixes: [prefix],
  };
  let [fontsLoaded] = useFonts({
    LatoMedium: Lato_Medium_Requier,
    LatoSemibold: Lato_Semibold_Require,
    LatoRegular: Lato_Regular_Require,
  });
  if (!fontsLoaded || !is_data_load || !is_link_load) return null;
  return (
    <SafeAreaView
      style={{
        flex: 1,
        paddingTop: StatusBar.currentHeight,
      }}
    >
      {console.log(ad_id, "7657567")}
      <NavigationContainer linking={linking}>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
            cardStyle: { backgroundColor: "white" },
          }}
          initialRouteName={
            ad_id ? "LinkToAd" : authentication.is_auth ? "Catalog" : "Start"
          }
        >
          <Stack.Screen name="Catalog" component={Catalog} />
          <Stack.Screen name="CatalogList" component={CatalogList} />
          <Stack.Screen name="Link" component={Ad} />
          <Stack.Screen name="CatalogFilter" component={CatalogFilter} />
          <Stack.Screen name="Start" component={Start} />
          <Stack.Screen
            name="AnimalTransportation"
            component={AnimalTransportation}
          />
          <Stack.Screen name="Authentication" component={Authentication} />
          <Stack.Screen name="NewAd" component={NewAd} />
          <Stack.Screen name="MyAd" component={MyAd} />
          <Stack.Screen name="Ad" component={Ad} />
          <Stack.Screen
            name="PoliticConfidentiality"
            component={PoliticConfidentiality}
          />
          <Stack.Screen name="AdInfo" component={AdInfo} />
          <Stack.Screen name="PersonalArea" component={PersonalArea} />
          <Stack.Screen name="Profile" component={Profile} />
          <Stack.Screen name="MyAds" component={MyAds} />
          <Stack.Screen name="CatalogStreak" component={CatalogStreak} />
          <Stack.Screen name="ForgetPassword" component={ForgetPassword} />
          <Stack.Screen name="LinkToAd" component={LinkToAd} />
        </Stack.Navigator>
        <ErrorModal />
      </NavigationContainer>
    </SafeAreaView>
  );
}

export default App;
