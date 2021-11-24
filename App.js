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
import { getTokens } from "./src/utils/api";

const Stack = createStackNavigator();
const prefix = Linking.makeUrl("/");

function App({ navigation }) {
  const [data, SetData] = useState(null);
  const [tokens, SetTokens] = useState(null);
  function handleDeepLink(event) {
    let data = Linking.parse(event.url);
    SetData(data);
  }
  useEffect(() => {
    async function GetInitialUrl() {
      const initialURL = await Linking.getInitialURL();
      if (initialURL) SetData(Linking.parse(initialURL));
    }
    Linking.addEventListener("url", handleDeepLink);
    if (!data) GetInitialUrl();
    return () => {
      Linking.removeEventListener("url");
    };
  }, []);
  useEffect(() => {
    getTokens().then(SetTokens);
    // getTokens().then(console.log);
  }, []);
  const linking = {
    prefixes: [prefix],
    config: {
      screens: {
        Link: "link",
      },
    },
  };
  let [fontsLoaded] = useFonts({
    LatoMedium: Lato_Medium_Requier,
    LatoSemibold: Lato_Semibold_Require,
    LatoRegular: Lato_Regular_Require,
  });
  if (!fontsLoaded || !tokens) return null;
  return (
    <SafeAreaView
      style={{
        flex: 1,
        paddingTop: StatusBar.currentHeight,
      }}
    >
      <NavigationContainer linking={linking}>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
            cardStyle: { backgroundColor: "white" },
          }}
          initialRouteName={tokens ? "Catalog" : "Start"}
          // initialRouteName={"Authentication"}
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
        </Stack.Navigator>
        <ErrorModal />
      </NavigationContainer>
    </SafeAreaView>
  );
}

export default App;
