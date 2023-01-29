import { Image, Text } from "@bacons/react-views";
import {
  Inter_300Light,
  Inter_400Regular,
  Inter_700Bold,
  useFonts,
} from "@expo-google-fonts/inter";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaskedView from "../../../components/mask";
import { BlurView } from "expo-blur";
import { LinearGradient } from "expo-linear-gradient";
import { Link, Stack } from "expo-router";
import React from "react";
import {
  Platform,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";

function GradientMask({ colors, children, style, ...props }) {
  if (Platform.OS === "web") {
    return (
      <>
        <View
          {...props}
          style={[
            style,
            {
              maskImage: `linear-gradient(${colors.join(",")})`,
            },
          ]}
        />

        {children}
      </>
    );
  }

  return (
    <MaskedView
      style={style}
      maskElement={
        <LinearGradient colors={colors} style={StyleSheet.absoluteFill} />
      }
    >
      {children}
    </MaskedView>
  );
}

function CoolBackground({ image }) {
  return (
    <>
      <Image
        style={StyleSheet.absoluteFill}
        source={{
          uri: image,
        }}
      />
      <BlurView intensity={40} tint="dark" style={StyleSheet.absoluteFill} />

      <MaskedView
        style={StyleSheet.absoluteFill}
        colors={["rgba(0,0,0,1)", "rgba(0,0,0,0)"]}
        locations={[0.58, 0.76]}
      >
        <Image
          style={StyleSheet.absoluteFill}
          source={{
            uri: image,
          }}
        />
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
        alignItems: "center",
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
        image="https://scontent-dfw5-1.cdninstagram.com/v/t51.2885-15/290662534_5202774666496949_3606581906019361043_n.jpg?stp=dst-jpg_e35_p1080x1080&_nc_ht=scontent-dfw5-1.cdninstagram.com&_nc_cat=105&_nc_ohc=cY0USjZUkyAAX_a8crB&edm=ALQROFkBAAAA&ccb=7-5&ig_cache_key=Mjg3MTM2MzA1ODg5MzkwNjE1Ng%3D%3D.2-ccb7-5&oh=00_AfASYsHvUlBXmggx3J9lopJYb0k4Si6hA4r_-bHAry1CKA&oe=639F7C45&_nc_sid=30a2ef"
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
