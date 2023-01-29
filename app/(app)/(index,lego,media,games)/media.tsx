import { Image, StyleSheet, Text, View, Pressable } from "@bacons/react-views";
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
import { Platform, ScrollView, TouchableOpacity } from "react-native";

import MaskedView from "../../../components/mask";
import { data } from "../../../data/media";

function CoolBackground({ image, hovered }) {
  const src = typeof image === "number" ? image : { uri: image };
  const style = [
    StyleSheet.absoluteFill,
    { transitionDuration: "250ms" },
    hovered && { transform: [{ scale: "1.05" }] },
    { width: "100%", height: "100%" },
  ];
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
      <Pressable>
        {({ hovered, pressed }) => (
          <View
            style={[
              {
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
                backgroundColor: "transparent",
                width: "90%",
              },
            ]}
          >
            <View
              style={{
                borderRadius: 10,
                overflow: "hidden",
                flex: 1,
                padding: 12,
                justifyContent: "space-between",
              }}
            >
              <View style={[StyleSheet.absoluteFill]}>
                <CoolBackground hovered={hovered} image={image} />
              </View>

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
                  style={[
                    {
                      color: "white",
                      fontSize: 10,
                      // letterSpacing: 1.5,
                      fontFamily: "Inter_300Light",
                      marginBottom: 4,
                      transitionDuration: "250ms",

                      opacity: Platform.select({
                        web: hovered ? 1 : 0.0,
                        default: 1.0,
                      }),
                    },
                    Platform.OS === "web" && {
                      transform: [{ translateY: hovered ? 0 : -10 }],
                    },
                  ]}
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
        )}
      </Pressable>
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
        maxWidth: 800,
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

      {data.map((value, index) => (
        <Tile
          key={index}
          title={value.title}
          slug={value.slug}
          subtitle={value.subtitle}
          image={value.image}
        />
      ))}
    </ScrollView>
  );
}
