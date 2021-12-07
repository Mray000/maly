import left from "../../assets/left.svg";
import SvgUri from "react-native-svg-uri";
import React, { useEffect, useState } from "react";
import {
  Image,
  Platform,
  StyleSheet,
  Text,
  View,
  Button,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { api } from "../../utils/api";
import { Loader } from "../../utils/Loader";
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
  const [active_ads, SetActiveAds] = useState(null);
  const [checking_ads, SetCheckingAds] = useState(null);
  const [reject_ads, SetRejectAds] = useState(null);
  const [archived_ads, SetArchivedAds] = useState(null);
  const [ads_type, SetAdsType] = useState("active");
  let ads_to_show = null;
  switch (ads_type) {
    case "active":
      ads_to_show = active_ads;
      break;
    case "on_check":
      ads_to_show = checking_ads;
      break;
    case "reject":
      ads_to_show = reject_ads;
      break;
    case "archive":
      ads_to_show = archived_ads;
      break;
  }
  useEffect(() => {
    api.getMyAds().then((data) => {
      let active_ads = [];
      let checking_ads = [];
      let reject_ads = [];
      let archived_ads = [];
      data.forEach((ad) => {
        console.log(typeof ad.idAdStatus);
        switch (ad.idAdStatus) {
          case 1:
            console.log("FFFFFFFFFFf");
            active_ads.push(ad);
            break;
          case 2:
            checking_ads.push(ad);
            break;
          case 10:
            reject_ads.push(ad);
            break;
          case 3:
            archived_ads.push(ad);
            break;
        }
      });
      SetActiveAds(active_ads);
      SetCheckingAds(checking_ads);
      SetRejectAds(reject_ads);
      SetArchivedAds(archived_ads);
    });
  }, []);
  if (!ads_to_show) return <Loader />;
  return (
    <ScrollView
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
          onPress={() => navigation.navigate("PersonalArea")}
        >
          <SvgUri source={left} />
        </TouchableOpacity>
        <Text
          style={{
            fontSize: 18,
            textAlign: "center",
            marginRight: "auto",
            marginLeft: "auto",
            color: "#F6A405",
          }}
        >
          Мои объявления
        </Text>
      </View>
      <ScrollView
        style={{
          marginTop: 10,
          width: "100%",
        }}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          flexDirection: "row",
          justifyContent: "space-between",
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
            Активные {active_ads.length}
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
            На проверке {checking_ads.length}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={ads_type == "reject" ? styles.ad_type_active : styles.ad_type}
          onPress={() => SetAdsType("reject")}
        >
          <Text
            style={{
              textAlign: "center",
              color: ads_type == "reject" ? "white" : "#7B7B7B",
            }}
          >
            Отклоненные {reject_ads.length}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={ads_type == "archive" ? styles.ad_type_active : styles.ad_type}
          onPress={() => SetAdsType("archive")}
        >
          <Text
            style={{
              textAlign: "center",
              color: ads_type == "archive" ? "white" : "#7B7B7B",
            }}
          >
            Архив
          </Text>
        </TouchableOpacity>
      </ScrollView>
      <View style={{ marginTop: 10 }}>
        {ads_to_show.map((ad) => {
          return (
            <TouchableOpacity
              onPress={() => navigation.navigate("Ad", { id: ad.idAd })}
              key={ad.imagePreview}
              style={{ flexDirection: "row", height: 60, marginTop: 10 }}
            >
              <Image
                source={{ uri: ad.imagePreview }}
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
                  {ad.namePet}
                </Text>
                <Text style={{ fontFamily: "LatoSemibold", fontWeight: "700" }}>
                  {ad.price} руб.
                </Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
      <TouchableOpacity
        onPress={() => navigation.navigate("NewAd")}
        style={styles.button}
      >
        <Text style={{ color: "white", fontSize: 18, textAlign: "center" }}>
          Разместить объявление
        </Text>
      </TouchableOpacity>
    </ScrollView>
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
    marginBottom: 10,
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
    // width: "30%",
    borderColor: "#E7E7E7",
    borderWidth: 1,
    borderRadius: 6,
    height: 30,
    paddingLeft: 10,
    paddingRight: 10,
    marginLeft: 5,
    marginRight: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  ad_type_active: {
    // width: 100,
    backgroundColor: "#F6A405",
    borderRadius: 6,
    height: 30,
    paddingLeft: 10,
    paddingRight: 10,
    marginLeft: 5,
    marginRight: 5,
    alignItems: "center",
    justifyContent: "center",
  },
});
