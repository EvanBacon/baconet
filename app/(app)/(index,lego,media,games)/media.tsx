import { Image, Text } from "@bacons/react-views";
import {
  Inter_300Light,
  Inter_400Regular,
  Inter_700Bold,
  useFonts,
} from "@expo-google-fonts/inter";
import Ionicons from "@expo/vector-icons/Ionicons";
import { BlurView } from "expo-blur";
import { Link, Stack } from "expo-router";
import React from "react";
import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";

import MaskedView from "../../../components/mask";

function CoolBackground({ image }) {
  const src = typeof image === "number" ? image : { uri: image };
  const style = [StyleSheet.absoluteFill, { width: "100%", height: "100%" }];
  return (
    <>
      <Image style={style} source={src} />
      <BlurView intensity={40} tint="dark" style={StyleSheet.absoluteFill} />

      <MaskedView
        style={style}
        colors={["rgba(0,0,0,1)", "rgba(0,0,0,0)"]}
        locations={[0.58, 0.76]}
      >
        <Image style={style} source={src} />
      </MaskedView>
    </>
  );
}

function Tile({ image, slug, title, subtitle, themeColor }) {
  return (
    <Link href={"./watch/" + slug} asChild>
      <TouchableOpacity activeOpacity={0.8}>
        <View
          style={{
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,

            elevation: 5,

            marginVertical: 8,
            aspectRatio: 1.3,
            flex: 1,
            maxHeight: 360,
            borderRadius: 14,

            width: "90%",
          }}
        >
          <View
            style={{
              borderRadius: 14,
              overflow: "hidden",
              flex: 1,
              borderWidth: 6,
              borderColor: themeColor,
              padding: 12,
              justifyContent: "space-between",
            }}
          >
            <CoolBackground image={image} />

            <View style={{ alignItems: "flex-end" }}>
              <View
                style={{
                  aspectRatio: 1,
                  width: 48,
                  borderRadius: 48 / 2,
                  backgroundColor: "white",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Ionicons
                  style={{ marginRight: -4 }}
                  name="play"
                  size={30}
                  color="black"
                />
              </View>
            </View>
            <View>
              <Text
                style={{
                  color: "white",
                  fontSize: 10,
                  // letterSpacing: 1.5,
                  fontFamily: "Inter_300Light",
                  marginBottom: 4,
                }}
              >
                WATCH NOW
              </Text>
              <Text
                style={{
                  marginBottom: 4,
                  color: "white",
                  fontSize: 20,
                  fontFamily: "Inter_700Bold",
                }}
              >
                {title}
              </Text>
              <Text
                style={{
                  color: "white",
                  fontSize: 14,
                  fontFamily: "Inter_400Regular",
                }}
              >
                {subtitle}
              </Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </Link>
  );
}

export default function Page() {
  const [fontsLoaded] = useFonts({
    Inter_300Light,
    Inter_400Regular,
    Inter_700Bold,
  });

  if (!fontsLoaded) return null;

  return (
    <ScrollView
      style={{ flex: 1 }}
      contentInsetAdjustmentBehavior="automatic"
      contentContainerStyle={{
        alignItems: "stretch",
        paddingHorizontal: 16,
        justifyContent: "center",
      }}
    >
      <Stack.Screen
        options={{
          title: "Videos",
          headerLargeTitle: true,
          headerTitleStyle: {
            fontFamily: "Inter_700Bold",
          },

          headerLargeTitleStyle: {
            fontFamily: "Inter_700Bold",
          },
        }}
      />

      <Tile
        title="Route Once with Expo Router"
        themeColor={"#1D2025"}
        slug="router"
        subtitle="Introducing the first File System-based router for native apps"
        image="https://github.com/expo/router/blob/main/docs/static/img/og-image.png?raw=true"
      />
      <Tile
        title="Symbiotic Apps"
        slug="symbiosis"
        themeColor={"#674B39"}
        subtitle="Reimagining the mobile experience by combining web and native"
        image="http://localhost:8081/react-europe-1.jpg"
      />
      <Tile
        title="The New Expo CLI"
        themeColor={"#393229"}
        slug="expo-cli"
        subtitle="Ground up rewrite of the Expo Dev Tools"
        image={require("../../../assets/talks/appjs-2022.jpg")}
      />
      <Tile
        title="Introducing Expo for Web"
        themeColor={"#F3F3F3"}
        slug="expo-web"
        subtitle="Instant access and searchability"
        image="https://evanbacon.dev/_next/static/images/debut-expo-web-bc443a04029ef4fb4ff804ed9595fd64.jpg"
      />
      <Tile
        title="Write Once with Expo"
        themeColor={"#17171E"}
        slug="write-once"
        subtitle={"Universal React apps as a reality"}
        image="https://evanbacon.dev/_next/static/images/expo-for-web-c86e9f9487769ece7af3e7611c52313e.jpg"
      />
    </ScrollView>
  );
}
