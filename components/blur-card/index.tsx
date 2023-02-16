import { Image, Pressable, StyleSheet } from "@bacons/react-views";
import { BlurView } from "expo-blur";
import { Link } from "expo-router";
import React from "react";
import { Platform, useWindowDimensions } from "react-native";
import { Icon } from "../icon";

import MaskedView from "../mask";
import { Text } from "../useFont";

export function BlurCard({
  image,
  href,
  title,
  subtitle,
  icon = "play-outline",
  cta = "Watch Now",
  blank,
}: {
  cta?: string;
  icon?: string;
  image: any;
  href: string;
  title: string;
  subtitle: string;
  blank?: boolean;
}) {
  const { width } = useWindowDimensions();
  const row = (width || 900) >= 600;

  return (
    <Link
      href={href}
      hrefAttrs={{ target: blank ? "_blank" : undefined }}
      asChild
    >
      <Pressable>
        {({ hovered, pressed }) => (
          <article
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
              },
              // TODO: Media queries
              !row && {
                width: "100%",
              },
              row && {
                width: "90%",
                aspectRatio: 1.3,
              },
            ]}
          >
            <div
              style={{
                borderRadius: 10,
                overflow: "hidden",
                flex: 1,
                padding: 12,
                justifyContent: "space-between",
              }}
            >
              <div style={StyleSheet.absoluteFill}>
                <CoolBackground hovered={hovered} image={image} />
              </div>

              <div style={{ alignItems: "flex-end" }}>
                <div
                  style={{
                    aspectRatio: 1,
                    width: 48,
                    borderRadius: 48 / 2,
                    backgroundColor: "white",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Icon
                    style={{ marginRight: -4 }}
                    name={icon}
                    width={30}
                    height={30}
                    fill="black"
                  />
                </div>
              </div>
              <div>
                <Text
                  style={[
                    {
                      textTransform: "uppercase",
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
                  {cta}
                </Text>
                <h2
                  style={{
                    marginTop: 0,
                    marginBottom: 4,
                    color: "white",
                    fontSize: 20,
                    fontFamily: "Inter_700Bold",
                  }}
                >
                  {title}
                </h2>
                <h3
                  style={{
                    marginTop: 0,
                    color: "white",
                    fontSize: 14,
                    fontFamily: "Inter_400Regular",
                  }}
                >
                  {subtitle}
                </h3>
              </div>
            </div>
          </article>
        )}
      </Pressable>
    </Link>
  );
}

function CoolBackground({ image, hovered }) {
  const src = typeof image === "number" ? image : image;
  const style = [
    StyleSheet.absoluteFill,
    { transitionDuration: "250ms" },
    hovered && { transform: [{ scale: "1.05" }] },
    { width: "100%", height: "100%" },
  ];
  // Disable to hide react-native-web style errors.
  const isCool = true; //Platform.OS !== "web";
  // const isCool = true; //Platform.OS !== "web";

  return (
    <>
      <Image style={style} source={src} />
      {isCool && (
        <BlurView intensity={40} tint="dark" style={StyleSheet.absoluteFill} />
      )}

      {isCool && (
        <MaskedView
          style={style}
          colors={["rgba(0,0,0,1)", "rgba(0,0,0,0)"]}
          locations={[0.58, 0.76]}
        >
          <Image style={style} source={src} />
        </MaskedView>
      )}
    </>
  );
}
