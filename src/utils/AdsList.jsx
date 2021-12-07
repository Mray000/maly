import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";

export const AdsList = ({ ads, navigation }) => {
  let animals = [];
  for (let i = 0; i < ads.length; i += 2) {
    if (ads[i + 1]) animals.push([ads[i], ads[i + 1]]);
    else animals.push([ads[i]]);
  }
  return (
    <View style={{ marginTop: 5, paddingBottom: 80 }}>
      {animals.map((two_animal) => (
        <View
          style={{
            flexDirection: "row",
            justifyContent:
              two_animal.length == 2 ? "space-between" : "flex-start",
            marginTop: 15,
          }}
        >
          {two_animal.map((animal) => (
            <TouchableOpacity
              style={{
                width: "48.5%",
                // .marginLeft: two_animal.length == 2 ? 0 : "1%",
              }}
              onPress={() => {
                console.log(animal.idAd);
                navigation.push("Ad", { id: animal.idAd });
              }}
              key={animal.idAd}
            >
              <Image
                source={{ uri: animal.imagePreview }}
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
                {animal.namePet}
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
                {animal.city}
              </Text>
              <View style={{ alignItems: "flex-start", marginTop: 7 }}>
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
                  {animal.place}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      ))}
    </View>
  );
};
