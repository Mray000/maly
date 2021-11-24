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
export const Ad = ({ route, navigation }) => {
  const [is_visible_mistake_form_modal, SetIsVisibletMistakeFormModal] =
    useState(false);
  const [is_visible_reject_form_modal, SetIsVisibletRejectFormModal] =
    useState(false);
  const [is_checking_ad, SetIsCheckingAd] = useState(false);

  const data = [
    {
      title: "Абиссинская кошка Моли",
      price: 5000,
      address: "Казань, Пушкина",
      from: "Частное объявление",
      photo:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0a/Kamee01.jpg/274px-Kamee01.jpg",
    },
    {
      title: "Абиссинская кошка в добрые руки",
      price: 0,
      address: "Мосвка, Ленина",
      from: "Питомник",
      photo:
        "https://house-animals.ru/sites/default/files/porody-koshek/abyssinian_cat_600_0.jpg",
    },
    {
      title: "Абиссинские кошки Ванесса и Лиза",
      price: 2000,
      address: "Питер, Рорина",
      from: "Магазин",
      photo:
        "https://litbro.ru/wp-content/uploads/2020/05/Uhod-za-abissinskim-kotenkom-1.jpg",
    },
    {
      title: "Абиссинская кошка Кристина",
      price: 3000,
      address: "Питер, Рорина",
      from: "Магазин",
      photo:
        "https://petstory.ru/resize/800x800x80/upload/images/articles/breeds/abissinskaya-koshka/abisin_cat_3.jpg",
    },
  ];
  let animals = [];
  for (let i = 0; i < data.length; i += 2) {
    animals.push([data[i], data[i + 1]]);
  }
  const [ad, SetAd] = useState(null);
  const [photo_index, SetPhotoIndex] = useState(0);
  let dots = Array.from(Array(ad?.imagesPath?.length).keys());
  useEffect(() => {
    api.getAd(route.params.id).then(SetAd);
  }, []);

  if (ad) {
    return (
      <>
        <ScrollView>
          <TouchableOpacity
            style={{
              position: !is_checking_ad ? "absolute" : "relative",
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
                onPress={() => SetIsVisibletRejectFormModal(true)}
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
                    Linking.openURL("https://wa.me/" + ad.whatsapp)
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
            <TouchableOpacity
              style={styles.button}
              onPress={() => SetIsVisibletMistakeFormModal(true)}
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
              <View style={{ marginTop: 5, paddingBottom: 80 }}>
                {animals.map((two_animal) => (
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-around",
                      marginTop: 15,
                    }}
                  >
                    {two_animal.map((animal) => (
                      <TouchableOpacity
                        style={{ width: "45%" }}
                        onPress={() => navigation.navigate("Ad")}
                      >
                        <Image
                          source={{ uri: animal.photo }}
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
                          {animal.title}
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
                          {animal.address}
                        </Text>
                        <View
                          style={{ alignItems: "flex-start", marginTop: 7 }}
                        >
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
                            {animal.from}
                          </Text>
                        </View>
                      </TouchableOpacity>
                    ))}
                  </View>
                ))}
              </View>
            </View>
          </View>
          <TouchableOpacity onPress={() => SetIsCheckingAd(!is_checking_ad)}>
            <Text>
              Так видит
              {!is_checking_ad
                ? "обычный пользователь"
                : "админ, если заявка для рассмотрения"}
              (чтобы переключить, нажмите на текст)
            </Text>
          </TouchableOpacity>
        </ScrollView>
        <MistakeFormModal
          is_visible={is_visible_mistake_form_modal}
          SetIsVisible={SetIsVisibletMistakeFormModal}
        />
        <RejectFormModal
          is_visible={is_visible_reject_form_modal}
          SetIsVisible={SetIsVisibletRejectFormModal}
        />
        <BottomNavigator active="catalog" navigation={navigation} />
      </>
    );
  } else return <Loader />;
};

const RejectFormModal = ({ is_visible, SetIsVisible }) => {
  const [reject_text, SetRejectText] = useState("");
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
            onPress={api.postFeedback}
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
