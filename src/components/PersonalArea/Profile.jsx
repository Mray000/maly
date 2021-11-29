import { Feather } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import {
  Image,
  Modal,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Platform,
} from "react-native";
import SvgUri from "react-native-svg-uri";
import no_avatar from "../../assets/no_avatar.png";
import pen from "../../assets/pen.svg";
import * as ImagePicker from "expo-image-picker";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { observer } from "mobx-react-lite";
import { profile } from "../../store/profile.js";
import { authentication } from "../../store/authentication";
import { Loader } from "../../utils/Loader";
import { error } from "../../store/error";
import { api } from "../../utils/api";
export const Profile = observer(({ navigation }) => {
  const [is_vivble_change_password_modal, SetIsVisibleChangePasswordModal] =
    useState(false);
  useEffect(() => {
    if (!profile.is_profile_load) profile.getProfile();
  }, []);
  const numberPhoneInvalid = (phone) => {
    let regex = /^\d[\d\(\)\ -]{4,14}\d$/;
    return !phone.match(regex);
  };
  if (!profile.is_profile_load) return <Loader />;
  return (
    <KeyboardAwareScrollView style={{ flex: 1, marginTop: 8 }}>
      <Feather
        name="x"
        onPress={() => {
          if (
            profile.name &&
            !numberPhoneInvalid(profile.phone) &&
            (!numberPhoneInvalid(profile.whatsapp) || !profile.whatsapp)
          ) {
            navigation.navigate("PersonalArea");
          } else error.SetError("Заполните данные");
        }}
        size={22}
        color="#F6A405"
        style={{ marginLeft: 10, marginTop: 10 }}
      />
      <View style={{ alignItems: "center" }}>
        <View>
          <Image
            source={profile.avatar ? { uri: profile.avatar } : no_avatar}
            style={{ height: 100, width: 100, borderRadius: 100 }}
          />
          <TouchableOpacity
            style={{
              width: 20,
              height: 20,
              borderRadius: 100,
              backgroundColor: "#F6A405",
              position: "absolute",
              right: 0,
              top: 70,
              justifyContent: "center",
              alignItems: "center",
            }}
            onPress={async () => {
              const { status } =
                await ImagePicker.requestMediaLibraryPermissionsAsync();
              if (status !== "granted") {
                alert("Разрешите доступ к камере!");
              } else {
                let result = await ImagePicker.launchImageLibraryAsync({
                  mediaTypes: ImagePicker.MediaTypeOptions.Images,
                  allowsEditing: true,
                  aspect: [1, 1],
                  quality: 1,
                });
                if (!result.cancelled) profile.changeUserData(null, result.uri);
                else error.SetError("Произошла ошибка");
              }
            }}
          >
            <SvgUri source={pen} width="10" height="10" />
          </TouchableOpacity>
        </View>
      </View>
      <View style={{ padding: 15 }}>
        <View style={{ marginTop: 8 }}>
          <Text
            style={{ fontSize: 14, fontFamily: "LatoMedium", color: "gray" }}
          >
            Имя
          </Text>
          <TextInput
            placeholder="Введите имя"
            value={profile.name}
            onChangeText={profile.changeName}
            onBlur={profile.changeUserData}
            style={{
              borderColor: !profile.name ? "red" : "#E7E7E7",
              borderBottomWidth: 1,
              paddingBottom: 5,
              paddingTop: Platform.OS == "ios" ? 5 : 0,
            }}
          />
          {!profile.name ? (
            <Text style={{ color: "red", fontSize: 14 }}>
              Имя не может быть пустым
            </Text>
          ) : null}
        </View>

        <View style={{ marginTop: 8 }}>
          <Text
            style={{ fontSize: 14, fontFamily: "LatoMedium", color: "gray" }}
          >
            E-mail
          </Text>
          <Text
            style={{
              borderColor: "#E7E7E7",
              borderBottomWidth: 1,
              paddingBottom: 5,
              paddingTop: Platform.OS == "ios" ? 5 : 0,
            }}
          >
            {profile.email}
          </Text>
        </View>
        <View style={{ marginTop: 8 }}>
          <Text
            style={{ fontSize: 14, fontFamily: "LatoMedium", color: "gray" }}
          >
            Телефон
          </Text>
          <TextInput
            placeholder="Введите телефон"
            value={profile.phone}
            keyboardType="phone-pad"
            onChangeText={profile.changePhone}
            onBlur={profile.changeUserData}
            style={{
              borderColor: numberPhoneInvalid(profile.phone)
                ? "red"
                : "#E7E7E7",
              borderBottomWidth: 1,
              paddingBottom: 5,
              paddingTop: Platform.OS == "ios" ? 5 : 0,
            }}
          />
          {numberPhoneInvalid(profile.phone) ? (
            <Text style={{ color: "red", fontSize: 14 }}>
              Номер не валидный
            </Text>
          ) : null}
        </View>
        <View style={{ marginTop: 8 }}>
          <Text
            style={{ fontSize: 14, fontFamily: "LatoMedium", color: "gray" }}
          >
            Номер whatsapp
          </Text>
          <TextInput
            placeholder="Введите номер"
            value={profile.whatsapp}
            keyboardType="phone-pad"
            onChangeText={profile.changeWhatsapp}
            onBlur={profile.changeUserData}
            style={{
              borderColor:
                numberPhoneInvalid(profile.whatsapp) && profile.whatsapp
                  ? "red"
                  : "#E7E7E7",
              borderBottomWidth: 1,
              paddingBottom: 5,
              paddingTop: Platform.OS == "ios" ? 5 : 0,
            }}
          />
        </View>
        {numberPhoneInvalid(profile.whatsapp) && profile.whatsapp ? (
          <Text style={{ color: "red", fontSize: 14 }}>Номер не валидный</Text>
        ) : null}

        <TouchableOpacity
          style={{ marginTop: 10 }}
          onPress={() => SetIsVisibleChangePasswordModal(true)}
        >
          <View>
            <Text
              style={{
                fontSize: 14,
                fontFamily: "LatoRegular",
                color: "gray",
                paddingBottom: 4,
              }}
            >
              Сбросить пароль
            </Text>
          </View>
        </TouchableOpacity>
      </View>
      <ChangePasswordModal
        is_visible={is_vivble_change_password_modal}
        SetIsVisible={SetIsVisibleChangePasswordModal}
      />
    </KeyboardAwareScrollView>
  );
});

const ChangePasswordModal = ({ is_visible, SetIsVisible }) => {
  const [verification_code, SetVerificationCode] = useState("");
  const [new_password, SetNewPassword] = useState("");
  const [new_password_repeat, SetNewPasswordRepeat] = useState("");
  useEffect(() => {
    if (is_visible) api.password_change_request(authentication.email);
  }, [is_visible]);
  let is_button_disabled =
    verification_code && new_password && new_password == new_password_repeat;
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
          style={{ backgroundColor: "white", padding: 15, borderRadius: 10 }}
        >
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text style={{ fontFamily: "LatoSemibold", fontSize: 18 }}>
              Изменить пароль
            </Text>
            <Feather
              name="x"
              size={20}
              color="gray"
              onPress={() => SetIsVisible(false)}
            />
          </View>
          <TextInput
            placeholder="Введите код с почты"
            onChangeText={SetVerificationCode}
            style={{
              borderBottomColor: "#E7E7E7",
              borderBottomWidth: 1,
              padding: 1,
              marginTop: 20,
            }}
          />
          <TextInput
            placeholder="Введите новый пароль"
            onChangeText={SetNewPassword}
            style={{
              borderBottomColor: "#E7E7E7",
              borderBottomWidth: 1,
              padding: 1,
              marginTop: 20,
            }}
          />
          <TextInput
            placeholder="Повторите новый пароль"
            onChangeText={SetNewPasswordRepeat}
            style={{
              borderBottomColor: "#E7E7E7",
              borderBottomWidth: 1,
              padding: 1,
              marginTop: 20,
            }}
          />
          <TouchableOpacity
            style={{
              backgroundColor: !is_button_disabled ? "#F6A405" : "#CCCCCC",
              color: "white",
              alignItems: "center",
              justifyContent: "center",
              height: 40,
              marginTop: 15,
              width: "100%",
              borderRadius: 10,
              textAlign: "center",
            }}
            disabled={is_button_disabled}
            onPress={() =>
              authentication.change_password(verification_code, new_password)
            }
          >
            <Text
              style={{
                textAlign: "center",
                color: "white",
                fontSize: 16,
              }}
            >
              Сохранить
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};
