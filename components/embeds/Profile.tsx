import { Image, Pressable, Text, View } from "@bacons/react-views";
import { Link } from "expo-router";
import React from "react";
import { ExternalLink } from "../ExternalLink";

export function ProfileCard({
  url,
  title,
  subtitle,
  website,
  image,
}: {
  url: string;
  title: string;
  subtitle: string;
  website: string;
  image: string;
}) {
  return (
    <ExternalCard url={url}>
      <View
        style={{
          flex: 1,
          justifyContent: "space-around",
          flexWrap: "wrap",
          gap: 8,
          padding: 12,
        }}
      >
        <Text
          style={{
            fontSize: 16,
            fontWeight: "bold",
          }}
        >
          {title} – Overview
        </Text>
        <Text
          style={{
            fontSize: 16,

            // light gray
            color: "#6a737d",
          }}
        >
          {subtitle ?? "No bio available"}
        </Text>
        <Text
          style={{
            fontSize: 14,
            color: "#6a737d",
          }}
        >
          Follow on {website}
        </Text>
      </View>

      <Image
        source={{ uri: image }}
        resizeMode="cover"
        style={{
          minHeight: 100,
          height: "100%",
          aspectRatio: 1,
        }}
      />
    </ExternalCard>
  );
}

export function ExternalCard({
  url,
  children,
}: {
  url: string;
  children: React.ReactNode;
}) {
  return (
    <ExternalLink asChild href={url} style={{ flex: 1 }}>
      <Pressable>
        {({ hovered }) => (
          <View
            style={{
              marginTop: 8,
              borderColor: "#e6e6e6",
              borderWidth: 1,
              transitionDuration: "200ms",
              backgroundColor: hovered ? "#f6f8fa" : "white",

              flexDirection: "row",
              alignItems: "center",
            }}
          >
            {children}
          </View>
        )}
      </Pressable>
    </ExternalLink>
  );
}
