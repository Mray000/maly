import {
  AntDesign,
  Feather,
  MaterialCommunityIcons,
  Entypo,
} from "@expo/vector-icons";
import React, { useRef, useEffect, useState } from "react";
import {
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  Image,
  ScrollView,
  Linking,
  TextInput,
  Modal,
} from "react-native";
import AppIntroSlider from "react-native-app-intro-slider";
import { LinearGradient } from "expo-linear-gradient";
import YoutubePlayer from "react-native-youtube-iframe";
import { BottomNavigator } from "../../utils/BottomNavigator";
import SvgUri from "react-native-svg-uri";
import share from "../../assets/share.svg";
import map from "../../assets/map.svg";
import left_white from "../../assets/left_white.svg";
import left from "../../assets/left.svg";
import { api } from "../../utils/api";
import { Loader } from "../../utils/Loader";
import { authentication } from "../../store/authentication";
import MapView from "react-native-maps";
import { AdsList } from "../../utils/AdsList";

export const Ad = ({
  route: {
    params: { id: id, for_check: for_check },
  },
  navigation,
}) => {
  const [is_visible_mistake_form_modal, SetIsVisibleMistakeFormModal] =
    useState(false);
  const [is_visible_reject_form_modal, SetIsVisibleRejectFormModal] =
    useState(false);
  const [ad_from_server, SetAdFromServer] = useState(null);
  const [ads_for_check, SetAdsForCheck] = useState(null);
  const [photo_index, SetPhotoIndex] = useState(0);
  const [ads, SetAds] = useState([]);
  const [is_show_map, SetIsShowMap] = useState(false);
  let is_checking_ad = for_check;
  let is_my_ad = ad_from_server?.isMine;
  let is_simple_ad = !is_my_ad && !is_checking_ad;
  let ad = null;

  const getStatusText = (statusId) => {
    switch (statusId) {
      case 1:
        return "автивно";
      case 2:
        return "на проверке";
      case 3:
        return "в архиве";
    }
  };
  const SendToArchive = async () => {
    await api.sendAdToArchive(ad.idAd);
    navigation.navigate("CatalogList");
  };
  console.log(is_checking_ad);
  useEffect(() => {
    if (is_checking_ad) api.getAdsForCheck().then(SetAdsForCheck);
    else api.getAd(id).then(SetAdFromServer);
  }, []);

  useEffect(() => {
    if (ad_from_server && is_simple_ad) {
      api.getAds(null, null, null, null, null, null, 6).then(SetAds);
    }
  }, [ad_from_server]);

  useEffect(() => {
    if (is_checking_ad && !ads_for_check) api.getAdsForCheck(SetAdsForCheck);
  }, [ads_for_check]);

  if ((ad_from_server && ads) || ads_for_check) {
    if (is_checking_ad && !ads_for_check.length)
      return (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Text>Все объявлений проверены</Text>
        </View>
      );

    if (is_checking_ad) ad = ads_for_check[0];
    else ad = ad_from_server;
    let dots = Array.from(Array(ad?.imagesPath?.length).keys());
    return (
      <>
        <ScrollView>
          <TouchableOpacity
            style={{
              position: is_simple_ad ? "absolute" : "relative",
              zIndex: 10000,
              padding: 10,
            }}
            onPress={navigation.goBack}
          >
            <SvgUri
              source={!is_checking_ad ? left_white : left}
              width="18"
              height="18"
            />
          </TouchableOpacity>
          {is_checking_ad ? (
            <View
              style={{
                flexDirection: "row",
                width: "100%",
                justifyContent: "space-between",
              }}
            >
              <TouchableOpacity
                onPress={() => SetIsVisibleRejectFormModal(true)}
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "50%",
                  height: 50,
                  backgroundColor: "#F6A405",
                }}
              >
                <Text
                  style={{
                    fontSize: 16,
                    fontFamily: "LatoMedium",
                    color: "white",
                  }}
                >
                  Отклонить
                </Text>
              </TouchableOpacity>
              <View
                style={{
                  height: 30,
                  alignSelf: "center",
                  width: 2,
                  backgroundColor: "#EEEEEE",
                }}
              />
              <TouchableOpacity
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "50%",
                  height: 50,
                  backgroundColor: "#F6A405",
                }}
              >
                <Text
                  style={{
                    fontSize: 16,
                    fontFamily: "LatoMedium",
                    color: "white",
                  }}
                >
                  Приянть
                </Text>
              </TouchableOpacity>
            </View>
          ) : null}
          {is_my_ad ? (
            <View>
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
                  Объявелние {getStatusText(ad.idAdStatus)}
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
                <TouchableOpacity
                  onPress={() =>
                    api
                      .sendAdToArchive(ad.idAd)
                      .then(() => navigation.navigate("Catalog"))
                  }
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

                  <Text
                    style={{ fontSize: 16, fontFamily: "LatoMedium" }}
                    onPress={SendToArchive}
                  >
                    Снять с публикации
                  </Text>
                </TouchableOpacity>
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
            </View>
          ) : null}
          <AppIntroSlider
            onSlideChange={SetPhotoIndex}
            style={{ width: "100%", aspectRatio: 1 }}
            keyExtractor={(item) => item}
            renderItem={({ item }) => {
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
                </View>
              );
            }}
            activeDotStyle={{ display: "none" }}
            dotStyle={{ display: "none" }}
            showDoneButton={false}
            showNextButton={false}
            data={ad.imagesPath}
          />
          <View style={{ marginTop: -150, left: 20 }}>
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
                {ad.animalPlace}
              </Text>
            </View>
          </View>
          <View
            style={{
              marginTop: 15,
              width: "100%",
              left: 20,
              justifyContent: "center",
              flexDirection: "row",
              zIndex: 100000000,
            }}
          >
            {dots.map((el) => (
              <View
                key={el}
                style={{
                  backgroundColor: "white",
                  width: photo_index == el ? 15 : 5,
                  height: 5,
                  borderRadius: 10,
                  opacity: photo_index == el ? 1 : 0.5,
                  marginLeft: 7,
                }}
              />
            ))}
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
                onPress={() => {
                  if (authentication.is_auth) {
                    Linking.openURL("tel:" + ad.whatsapp);
                  } else {
                    authentication.SetRedirect("Ad" + ad.idAd);
                    navigation.navigate("Authentication");
                  }
                }}
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
                  onPress={() => {
                    if (authentication.is_auth) {
                      Linking.openURL("https://wa.me/" + ad.whatsapp);
                    } else {
                      authentication.SetRedirect("Ad" + ad.idAd);
                      navigation.navigate("Authentication");
                    }
                  }}
                >
                  <Text style={{ color: "white" }}>Написать</Text>
                </TouchableOpacity>
              ) : null}
            </View>
            <View style={{ flexDirection: "row", marginTop: 20 }}>
              <TouchableOpacity
                style={{ flexDirection: "row" }}
                onPress={() => SetIsShowMap(true)}
              >
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
              <TouchableOpacity
                style={{ flexDirection: "row", marginLeft: 20 }}
              >
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
              {[ad.animalBreed, ad.gender, ad.age].map((el, i) => {
                let title;
                if (i == 0) title = "Порода";
                if (i == 1) title = "Пол";
                if (i == 2) title = "Возраст";
                return (
                  <View
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
                      - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
                      - - - - - - - - - - - - - - - - - - - - - - -
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

            <View style={{ marginTop: 30 }}>
              <Text
                style={{
                  fontSize: 20,
                  fontFamily: "LatoSemibold",
                }}
              >
                Описание
              </Text>

              <Text
                style={{
                  fontFamily: "LatoRegular",
                  fontSize: 16,
                  marginTop: 20,
                  textAlign: "justify",
                }}
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
                    marginTop: 15,
                    marginBottom: 10,
                  }}
                >
                  <YoutubePlayer
                    webViewStyle={{ width: "100%", aspectRatio: 1.8 }}
                    play={false}
                    videoId={ad.youtube.slice(-11)}
                  />
                </View>
              ) : null}
            </View>
            {is_simple_ad ? (
              <TouchableOpacity
                style={styles.button}
                onPress={() => SetIsVisibleMistakeFormModal(true)}
              >
                <Text
                  style={{
                    textAlign: "center",
                    color: "white",
                    fontSize: 17,
                  }}
                >
                  Нашли ошибку?
                </Text>
              </TouchableOpacity>
            ) : null}
            {is_simple_ad ? (
              <View
                style={{
                  flex: 1,
                  paddingBottom: 10,
                  marginTop: 30,
                }}
              >
                <Text
                  style={{
                    fontSize: 20,
                    color: "black",
                    marginTop: 10,
                    fontFamily: "LatoSemibold",
                  }}
                >
                  Похожие предложения
                </Text>
                <AdsList ads={ads} navigation={navigation} />
              </View>
            ) : null}
          </View>
        </ScrollView>
        {is_show_map ? (
          <MapView
            initialRegion={{
              latitude: ad.cityLatitude,
              longitude: ad.cityLongitude,
            }}
          />
        ) : null}

        <MistakeFormModal
          is_visible={is_visible_mistake_form_modal}
          SetIsVisible={SetIsVisibleMistakeFormModal}
        />
        <RejectFormModal
          is_visible={is_visible_reject_form_modal}
          SetIsVisible={SetIsVisibleRejectFormModal}
          SetAdsForCheck={SetAdsForCheck}
          id={ad.idAd}
        />
        <BottomNavigator active="catalog" navigation={navigation} />
      </>
    );
  } else return <Loader />;
};

const RejectFormModal = ({ is_visible, SetIsVisible, SetAdsForCheck, id }) => {
  const [reject_text, SetRejectText] = useState("");
  const RejectAd = async () => {
    await api.rejectAd(id, reject_text);
    SetAdsForCheck((prev_ads) => {
      let ads_for_check = prev_ads.filter((ad) => ad.idAd != id);
      return ads_for_check.length ? ads_for_check : null;
    });
    SetIsVisible(false);
  };
  return (
    <Modal animated animationType="fade" visible={is_visible} transparent>
      <View
        style={{
          backgroundColor: "rgba(0, 0, 0, 0.6)",
          justifyContent: "center",
          padding: 10,
          flex: 1,
        }}
      >
        <View
          style={{ backgroundColor: "white", borderRadius: 5, padding: 20 }}
        >
          <Feather
            onPress={() => SetIsVisible(false)}
            name="x"
            size={22}
            color="#F6A405"
            style={{ alignSelf: "flex-end" }}
          />
          <Text style={{ fontSize: 18, fontFamily: "LatoSemibold" }}>
            Причина отклонения
          </Text>
          <TextInput
            onChangeText={SetRejectText}
            placeholder="Впишите ваш вопрос"
            multiline={true}
            phoneOfLines={4}
            placeholderTextColor="gray"
            style={{
              backgroundColor: "#F6F6F6",
              height: 130,
              textAlignVertical: "top",
              padding: 10,
              marginTop: 10,
            }}
            value={reject_text}
          />
          <TouchableOpacity
            style={{
              backgroundColor: "#F6A405",
              color: "white",
              alignItems: "center",
              justifyContent: "center",
              height: 45,
              marginTop: 15,
              width: "100%",
              borderRadius: 10,
              textAlign: "center",
            }}
            onPress={RejectAd}
          >
            <Text
              style={{
                textAlign: "center",
                color: "white",
                fontSize: 16,
              }}
            >
              Отправить
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export const MistakeFormModal = ({ is_visible, SetIsVisible }) => {
  const [name, SetName] = useState("");
  const [phone, SetPhone] = useState("");
  const [warning_text, SetWarningText] = useState("");

  const PostFeedback = () => {
    api.postFeedback(name, phone, warning_text);
    SetIsVisible(false);
  };
  return (
    <Modal animated animationType="fade" visible={is_visible} transparent>
      <View
        style={{
          backgroundColor: "rgba(0, 0, 0, 0.6)",
          justifyContent: "center",
          padding: 10,
          flex: 1,
        }}
      >
        <View
          style={{ backgroundColor: "white", borderRadius: 5, padding: 20 }}
        >
          <Feather
            onPress={() => SetIsVisible(false)}
            name="x"
            size={22}
            color="#F6A405"
            style={{ alignSelf: "flex-end" }}
          />
          <Text style={{ fontSize: 18, fontFamily: "LatoSemibold" }}>
            Нашли ошибку?
          </Text>
          <TextInput
            placeholder="Впишите ваше имя"
            style={{
              height: 50,
              backgroundColor: "#FCFCFB",
              borderRadius: 10,
              padding: 5,
              paddingLeft: 10,
              marginTop: 10,
            }}
            onChangeText={SetName}
          />
          <TextInput
            placeholder="+ 7 (000) 000-00-00"
            style={{
              height: 50,
              backgroundColor: "#FCFCFB",
              borderRadius: 10,
              padding: 5,
              paddingLeft: 10,
              marginTop: 10,
            }}
            onChangeText={SetPhone}
          />
          <TextInput
            placeholder="Впишите ваш вопрос"
            multiline={true}
            phoneOfLines={4}
            style={{
              backgroundColor: "#FCFCFB",
              height: 130,
              textAlignVertical: "top",
              marginTop: 10,
              padding: 10,
              borderRadius: 10,
            }}
            onChangeText={SetWarningText}
          />

          <TouchableOpacity
            style={{
              backgroundColor: "#F6A405",
              color: "white",
              alignItems: "center",
              justifyContent: "center",
              height: 45,
              marginTop: 15,
              width: "100%",
              borderRadius: 10,
              textAlign: "center",
            }}
            onPress={PostFeedback}
          >
            <Text
              style={{
                textAlign: "center",
                color: "white",
                fontSize: 16,
              }}
            >
              Отправить
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  main: {
    backgroundColor: "white",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 10,
    marginTop: 25,
  },
  button: {
    backgroundColor: "#F6A405",
    color: "white",
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    height: 45,
    marginTop: 30,
    width: "100%",
    borderRadius: 10,
    textAlign: "center",
  },
});
