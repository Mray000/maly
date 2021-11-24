import {
  AntDesign,
  Feather,
  MaterialCommunityIcons,
  Entypo,
} from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  Image,
  ScrollView,
  Linking,
} from "react-native";
import AppIntroSlider from "react-native-app-intro-slider";
import YoutubePlayer from "react-native-youtube-iframe";
import share from "../../assets/share.svg";
import map from "../../assets/map.svg";
import left from "../../assets/left.svg";
import SvgUri from "react-native-svg-uri";
import { api } from "../../utils/api";
import { Loader } from "../../utils/Loader";
export const MyAd = ({ route, navigation }) => {
  // const [data, SetData] = useState(null);
  // useEffect(() => {
  //   api.getAd(route.params.id).then(SetData);
  // }, []);
  if (data) {
    return (
      <ScrollView>
        <TouchableOpacity
          onPress={() => navigation.navigate("Catalog")}
          style={{ width: 50, padding: 10 }}
        >
          <SvgUri source={left} style={{ width: 30 }} />
        </TouchableOpacity>
        <View
          style={{
            height: 50,
            backgroundColor: "#F6A405",
            alignItems: "center",
            padding: 10,
            justifyContent: "space-between",
            flexDirection: "row",
          }}
        >
          <Text style={{ color: "white", fontSize: 17 }}>
            Объявелние на проверке
          </Text>
          <AntDesign name="check" color="white" size={20} />
        </View>
        <View
          style={{
            flexDirection: "row",
            width: "100%",
            justifyContent: "space-between",
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              width: "51%",
              height: 50,
            }}
          >
            <Feather
              name="x"
              size={22}
              color="#F6A405"
              style={{ marginRight: 4 }}
            />
            <Text style={{ fontSize: 16, fontFamily: "LatoMedium" }}>
              Снять с публикации
            </Text>
          </View>
          <View
            style={{
              height: 30,
              alignSelf: "center",
              width: 2,
              backgroundColor: "#EEEEEE",
            }}
          />
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              width: "49%",
              height: 50,
            }}
          >
            <MaterialCommunityIcons
              name="pencil-outline"
              size={22}
              color="#F6A405"
              style={{ marginRight: 4 }}
            />
            <Text style={{ fontSize: 16, fontFamily: "LatoMedium" }}>
              Редактировать
            </Text>
          </View>
        </View>
        <AppIntroSlider
          style={{ width: "100%", aspectRatio: 1 }}
          keyExtractor={(item) => item}
          renderItem={({ item, index }) => {
            let dots = Array.from(Array(ad.imagesPath.length).keys());

            return (
              <View style={{ flex: 1 }}>
                <Image
                  source={{ uri: item }}
                  style={{
                    width: "100%",
                    aspectRatio: 1,
                  }}
                />
                <LinearGradient
                  colors={["rgba(255,255,255,0.01)", "rgba(0,0,0,0.65)"]}
                  style={{
                    width: "100%",
                    aspectRatio: 2,
                    position: "absolute",
                    top: "50%",
                  }}
                />
                <View
                  style={{
                    position: "absolute",
                    top: "85%",
                    width: "100%",
                    justifyContent: "center",
                    flexDirection: "row",
                  }}
                >
                  {dots.map((el) => (
                    <View
                      key={el}
                      style={{
                        backgroundColor: "white",
                        width: index == el ? 15 : 5,
                        height: 5,
                        borderRadius: 10,
                        opacity: index == el ? 1 : 0.5,
                        marginLeft: 7,
                      }}
                    />
                  ))}
                </View>
              </View>
            );
          }}
          activeDotStyle={{ display: "none" }}
          dotStyle={{ display: "none" }}
          showDoneButton={false}
          showNextButton={false}
          data={ad.imagesPath}
        />
        <View renderToHardwareTextureAndroid={true} />
        <View style={{ marginTop: -160, left: 20 }}>
          <Text
            style={{
              fontFamily: "LatoRegular",
              fontSize: 16,
              fontWeight: "300",
              marginTop: 5,
              color: "white",
            }}
          >
            {ad.namePet}
          </Text>

          <Text
            style={{
              color: "#DFDDDA",
              fontFamily: "LatoRegular",
              marginTop: 5,
            }}
          >
            {ad.city}
          </Text>
          <View style={{ alignItems: "flex-start", marginTop: 7 }}>
            <Text
              style={{
                fontFamily: "LatoMedium",
                padding: 2,
                paddingLeft: 6,
                paddingRight: 6,
                borderColor: "white",
                borderWidth: 1,
                borderRadius: 5,
                fontSize: 14,
                color: "white",
                textAlign: "center",
              }}
            >
              {from}
            </Text>
          </View>
        </View>
        <View style={styles.main}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginTop: 10,
            }}
          >
            <View
              style={{
                alignItems: "flex-start",
                width: "30%",
                justifyContent: "center",
              }}
            >
              <Text
                style={{
                  fontFamily: "LatoSemibold",
                  fontSize: 18,
                  fontWeight: "700",
                }}
              >
                {ad.price} руб.
              </Text>
            </View>
            <TouchableOpacity
              onPress={() => Linking.openURL("tel:" + ad.phone)}
              style={{
                alignItems: "center",
                justifyContent: "center",
                padding: 10,
                borderRadius: 10,
                borderWidth: 1,
                width: "30%",
                borderColor: "#E7E7E7",
              }}
            >
              <Text style={{ textAlign: "center", fontSize: 16 }}>
                Позвонить
              </Text>
            </TouchableOpacity>
            {ad.whatsapp ? (
              <TouchableOpacity
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                  padding: 10,
                  borderRadius: 10,
                  width: "30%",
                  backgroundColor: "#F6A405",
                }}
                onPress={() =>
                  Linking.openURL(
                    "https://wa.me/" +
                      (ad.whatsapp[0] == "8"
                        ? "+7" + ad.whatsapp.slice(1, ad.whatsapp.length)
                        : ad.whatsapp)
                  )
                }
              >
                <Text style={{ color: "white" }}>Написать</Text>
              </TouchableOpacity>
            ) : null}
          </View>
          <View style={{ flexDirection: "row", marginTop: 20 }}>
            <TouchableOpacity style={{ flexDirection: "row" }}>
              <SvgUri width="20" height="20" source={map} />

              <Text
                style={{
                  fontSize: 16,
                  fontFamily: "LatoSemibold",
                  marginLeft: 5,
                }}
              >
                Посмотреть на карте
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={{ flexDirection: "row", marginLeft: 20 }}>
              <SvgUri width="20" height="20" source={share} />

              <Text
                style={{
                  fontSize: 16,
                  fontFamily: "LatoSemibold",
                  marginLeft: 5,
                }}
              >
                Поделиться
              </Text>
            </TouchableOpacity>
          </View>
          <View style={{ marginTop: 20 }}>
            {[ad.animalBreed, ad.gender, 5].map((el, i) => {
              let title;
              if (i == 0) title = "Порода";
              if (i == 1) title = "Пол";
              if (i == 2) title = "Возраст";
              return (
                <View
                  key={el}
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginTop: 20,
                  }}
                >
                  <Text
                    style={{
                      fontFamily: "LatoMedium",
                      fontSize: 16,
                      color: "gray",
                    }}
                  >
                    {title}
                  </Text>
                  <Text
                    numberOfLines={1}
                    ellipsizeMode="clip"
                    style={{
                      fontSize: 17,
                      paddingLeft: 10,
                      paddingRight: 10,
                      color: "gray",
                      textAlignVertical: "center",
                      overflow: "hidden",
                      flex: 1,
                    }}
                  >
                    - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
                    - - - - - - - - - - - - - - - - - - - - - -
                  </Text>

                  <Text
                    style={{
                      fontFamily: "LatoMedium",
                      fontSize: 16,
                      color: "black",
                    }}
                  >
                    {el}
                  </Text>
                </View>
              );
            })}
          </View>
          <View
            style={{
              width: "100%",
              backgroundColor: "#E5E5E5",
              height: 1,
              marginTop: 30,
            }}
          />
          <View style={{ marginTop: 30, marginBottom: 30 }}>
            <Text
              style={{
                fontSize: 20,
                fontFamily: "LatoSemibold",
              }}
            >
              Описание
            </Text>
            <Text
              style={{ fontFamily: "LatoMedium", fontSize: 16, marginTop: 20 }}
            >
              {ad.descriptionPet}
            </Text>
          </View>
          <View>
            {ad.youtube ? (
              <View
                style={{
                  overflow: "hidden",
                  borderRadius: 20,
                  marginTop: 10,
                  marginBottom: 20,
                }}
              >
                <YoutubePlayer
                  webViewStyle={{
                    width: "100%",
                    aspectRatio: 1.8,
                    opacity: 0.99,
                  }}
                  play={false}
                  videoId={ad.youtube.slice(-11)}
                />
              </View>
            ) : null}
          </View>
        </View>
      </ScrollView>
    );
  } else {
    return <Loader />;
  }
};

const styles = StyleSheet.create({
  main: {
    backgroundColor: "white",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 10,
    marginTop: 50,
  },
});
