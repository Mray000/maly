import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Image,
  Linking,
  Platform,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { AnimalFrom } from "../../utils/AnimalFrom";
import { CitiesModal } from "../../utils/CitiesModal";
import whatsapp_img from "../../assets/whatsapp.png";
import no_avatar from "../../assets/no_avatar.png";
import left from "../../assets/left.svg";
import SvgUri from "react-native-svg-uri";
import { useKeyboard } from "../../utils/KeyBoard";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { api } from "../../utils/api";
import { Feather, Entypo } from "@expo/vector-icons";
import { ad } from "../../store/ad";
import { profile } from "../../store/profile";
import { observer } from "mobx-react-lite";

export const AdInfo = observer(({ navigation, route }) => {
  const [current_index, SetCurrentIndex] = useState(0);
  const [is_visible_city_modal, SetIsVisibleCityModal] = useState(false);
  const [from, SetFrom] = useState("Приют");
  const [photos, SetPhotos] = useState([]);
  const [youtube, SetYoutube] = useState("");
  const [title, SetTitle] = useState("");
  const [description, SetDescription] = useState("");
  const [price, SetPrice] = useState(0);
  const [age, SetAge] = useState(0);
  const [sex, SetSex] = useState(null);
  const [city, SetCity] = useState({ id: 0, name: "" });
  const [name, SetName] = useState("");
  const [phone, SetPhone] = useState("");
  const [whatsapp, SetWhatsapp] = useState("");
  const [IsYoutubeLinkValid, SetIsYoutubeLinkValid] = useState(true);
  const [cities, SetCities] = useState([]);
  let titles = [
    "Внешний вид",
    "Укажите название",
    "Опишите животное",
    "Укажите цену",
    "Укажите возраст",
    "Выберите пол",
    "Укажите адрес",
    "Как с вами связаться",
  ];
  useEffect(() => {
    SetName(profile.name);
    SetName(profile.phone);
    SetName(profile.whatsapp);
  }, [profile.name, profile.phone, profile.whatsapp]);
  let keyBoradHeight = useKeyboard();
  const CheckYoutubeLink = () => {
    if (youtube) {
      let regExp =
        /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=|\?v=)([^#\&\?]*).*/;
      let match = youtube.match(regExp);
      if (match && match[2].length == 11) SetIsYoutubeLinkValid(true);
      else {
        SetIsYoutubeLinkValid(false);
      }
    } else SetIsYoutubeLinkValid(youtube == "");
  };
  useEffect(() => {
    CheckYoutubeLink();
  }, [youtube]);
  useEffect(() => {
    api.getCities().then(SetCities);
    profile.setProfile();
  }, []);

  const Continue = async () => {
    if (!is_last) SetCurrentIndex(current_index + 1);
    else {
      await profile.changeUserData();
      let ad_id = await ad.createAd(
        title,
        description,
        photos,
        from,
        youtube,
        price,
        sex,
        age,
        city.id
      );

      navigation.navigate("Ad", { id: ad_id });
    }
  };
  const CheckValid = () => {
    return (
      [
        photos.length,
        title,
        description,
        price > -1,
        age > -1,
        sex,
        city,
        name && phone,
      ][current_index] ?? true
    );
  };
  let is_last = current_index == 7;
  let is_first = current_index == 0;
  const bodys = [
    <View>
      <AnimalFrom from={from} SetFrom={SetFrom} type={1} />
      <View style={{ marginTop: 20 }}>
        <Text style={{ fontSize: 19, fontFamily: "LatoSemibold" }}>
          Фотографии:
        </Text>
        <View>
          {[5, 10].map((view) => {
            let array = view == 5 ? photos.slice(0, 5) : photos.slice(5, 10);
            return (
              <View style={{ flexDirection: "row", marginTop: 10 }}>
                {array.map((el) => (
                  <View
                    style={{
                      position: "relative",
                      width: "18%",
                      marginRight: "2%",
                    }}
                    key={el}
                  >
                    <View
                      style={{
                        backgroundColor: "white",
                        zIndex: 1000,
                        borderRadius: 100,
                        alignSelf: "flex-end",
                        top: 5,
                        right: 5,
                        width: 15,
                        height: 15,
                        position: "absolute",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Entypo
                        onPress={() =>
                          SetPhotos((prev_data) =>
                            prev_data.filter((img) => el != img)
                          )
                        }
                        name="cross"
                        size={13}
                        color="#F6A405"
                      />
                    </View>
                    <Image
                      source={{ uri: el }}
                      style={{
                        width: "100%",
                        aspectRatio: 1,
                        borderRadius: 10,
                      }}
                    />
                  </View>
                ))}
              </View>
            );
          })}
        </View>
        <TouchableOpacity
          disabled={photos.length == 10}
          style={{
            width: "100%",
            height: 50,
            justifyContent: "center",
            backgroundColor: "white",
            alignSelf: "center",
            marginTop: 20,
            borderRadius: 6,
            borderWidth: 1,
            borderColor: "#F6A405",
          }}
          onPress={async () => {
            const { status } =
              await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (status !== "granted") {
              alert("Вы должны дать разрешение доступа к галерее!");
            } else {
              let result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [1, 1],
                quality: 1,
              });
              if (!result.cancelled) {
                SetPhotos((prev) => [...prev, result.uri]);
              }
            }
          }}
        >
          <Text style={{ textAlign: "center", fontSize: 17 }}>
            Добавить фотографии
          </Text>
        </TouchableOpacity>
      </View>
      <View>
        <Text
          style={{ fontSize: 19, marginTop: 26, fontFamily: "LatoSemibold" }}
        >
          Видео с Ютуба:
        </Text>
        <TextInput
          placeholder="Ссылка на видео"
          onChangeText={(text) => SetYoutube(text.replace(/\s/g, ""))}
          value={youtube}
          style={{
            borderBottomColor: IsYoutubeLinkValid ? "#E2E2E2" : "red",
            borderBottomWidth: 1,
            paddingBottom: 15,
            marginTop: 25,
            fontSize: 15,
          }}
        />
        {!IsYoutubeLinkValid ? (
          <Text
            style={{
              color: "red",
              fontFamily: "LatoMedium",
              fontSize: 15,
              marginTop: 10,
            }}
          >
            Не верная ссылка, попробуйте еще раз.
          </Text>
        ) : null}
      </View>
    </View>,
    <TextInput
      onChangeText={SetTitle}
      style={{
        borderBottomColor: "#E2E2E2",
        borderBottomWidth: 1,
        paddingBottom: 15,
        marginTop: 5,
        fontSize: 16,
      }}
      value={title}
      placeholder="Введите название"
    />,
    <TextInput
      onChangeText={SetDescription}
      placeholder="Введите описание"
      multiline={true}
      phoneOfLines={4}
      style={{
        backgroundColor: "#F6F6F6",
        height: 180,
        textAlignVertical: "top",
        padding: 10,
        fontSize: 16,
        borderRadius: 10,
      }}
      value={description}
    />,
    <TextInput
      onChangeText={SetPrice}
      style={{
        borderBottomColor: "#E2E2E2",
        borderBottomWidth: 1,
        paddingBottom: 15,
        marginTop: 5,
        fontSize: 16,
      }}
      onChangeText={(text) => {
        if (!isNaN(text)) {
          let price = Number(text);
          if (Number.isInteger(price)) {
            if (price <= 99000000) SetPrice(price);
            else SetPrice(99000000);
          }
        }
      }}
      value={String(price)}
      placeholder="Введите цену"
      maxLength={8}
      keyboardType="numeric"
    />,
    <TextInput
      value={String(age)}
      onChangeText={(text) =>
        !isNaN(text) && Number.isInteger(Number(text)) && SetAge(Number(text))
      }
      maxLength={3}
      style={{
        borderBottomColor: "#E2E2E2",
        borderBottomWidth: 1,
        paddingBottom: 15,
        marginTop: 5,
        fontSize: 16,
      }}
      placeholder="Введите возраст"
      keyboardType="numeric"
    />,
    <View style={{ marginTop: -10 }}>
      <TouchableOpacity
        style={{
          height: 50,
          borderBottomColor: "#F6F4F0",
          borderBottomWidth: 1,
        }}
        onPress={() => {
          SetSex("Мужской");
          SetCurrentIndex(current_index + 1);
        }}
      >
        <Text
          style={{
            fontSize: 20,
            fontFamily: "LatoMedium",
            textAlignVertical: "center",
            height: 50,
          }}
        >
          Мужской
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          height: 50,
          borderBottomColor: "#F6F4F0",
          borderBottomWidth: 1,
        }}
        onPress={() => {
          SetSex("Женский");
          SetCurrentIndex(current_index + 1);
        }}
      >
        <Text
          style={{
            fontSize: 20,
            fontFamily: "LatoMedium",
            textAlignVertical: "center",
            height: 50,
          }}
        >
          Женский
        </Text>
      </TouchableOpacity>
    </View>,
    <>
      <TouchableOpacity
        onPress={() => SetIsVisibleCityModal(true)}
        style={{
          borderBottomColor: "#E2E2E2",
          borderBottomWidth: 1,
          paddingBottom: 15,
          marginTop: 10,
        }}
      >
        <Text style={{ fontSize: 16, color: "gray" }}>
          {city.name || "Область, город, населеный пункт"}
        </Text>
      </TouchableOpacity>
      <CitiesModal
        cities={cities}
        SetCity={SetCity}
        is_visible={is_visible_city_modal}
        CloseModal={() => SetIsVisibleCityModal(false)}
      />
    </>,
    <View>
      <View
        style={{
          flexDirection: "row",
          borderBottomColor: "#E2E2E2",
          borderBottomWidth: 1,
          height: 55,
        }}
      >
        <TextInput
          onChangeText={SetName}
          style={{ width: "90%", fontSize: 16 }}
          placeholder="Введите имя"
          value={name}
        />
        <Image
          source={profile.avatar || no_avatar}
          style={{
            width: 35,
            height: 35,
            alignSelf: "center",
          }}
        />
      </View>
      <TextInput
        onChangeText={SetPhone}
        style={{
          borderBottomColor: "#E2E2E2",
          borderBottomWidth: 1,
          // paddingBottom: 15,
          fontSize: 16,
          height: 55,
        }}
        placeholder="Номер телефона"
        keyboardType="phone-pad"
        value={phone}
      />
      <View
        style={{
          flexDirection: "row",
          borderBottomColor: "#E2E2E2",
          borderBottomWidth: 1,
          height: 55,
        }}
      >
        <Image
          source={whatsapp_img}
          style={{
            width: 35,
            height: 35,
            alignSelf: "center",
          }}
        />
        <TextInput
          onChangeText={SetWhatsapp}
          style={{ marginLeft: 5, fontSize: 16 }}
          value={whatsapp}
          keyboardType="phone-pad"
          placeholder="Номер whatsapp"
        />
      </View>
    </View>,
  ];
  return (
    <KeyboardAwareScrollView
      style={{ flex: 1 }}
      contentContainerStyle={{
        flexGrow: 1,
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <View>
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() =>
              !is_first
                ? SetCurrentIndex(current_index - 1)
                : navigation.navigate("NewAd")
            }
            style={{ width: 20 }}
          >
            <SvgUri source={left} style={{ width: 30 }} />
          </TouchableOpacity>
          <Text
            style={{
              width: "90%",
              textAlign: "center",
              fontSize: 18,
              color: "#F6A405",
            }}
          >
            {titles[current_index]}
          </Text>
        </View>
        <View style={{ padding: 15 }}>{bodys[current_index]}</View>
      </View>
      {current_index != 5 ? (
        <View style={{ padding: 15 }}>
          <TouchableOpacity
            disabled={!CheckValid()}
            onPress={Continue}
            style={[
              styles.button,
              {
                marginBottom:
                  current_index == 2 && Platform.OS == "ios"
                    ? keyBoradHeight
                    : 0,
                backgroundColor: CheckValid() ? "#F6A405" : "#CCCCCC",
              },
            ]}
          >
            <Text
              style={{
                color: "white",
                fontSize: 18,
                textAlign: "center",
              }}
            >
              {!is_last ? "Продолжить" : "Разместить объявелние"}
            </Text>
          </TouchableOpacity>
        </View>
      ) : null}
    </KeyboardAwareScrollView>
  );
});

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    height: 50,
    alignItems: "center",
    padding: 15,
  },
  button: {
    width: "100%",
    borderRadius: 8,
    overflow: "hidden",
    padding: 10,
    marginBottom: 10,
  },
});
