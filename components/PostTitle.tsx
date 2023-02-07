import React from "react";
import { Text, View } from "react-native";

export function Title({ children, date: dateString }) {
  // Format date
  const date = new Date(dateString);
  const month = date.toLocaleString("default", { month: "long" });
  const day = date.getDate();
  const year = date.getFullYear();

  const dateFormatted = `${month} ${day}, ${year}`;
  return (
    <>
      <Text
        style={{ fontFamily: "Inter_900Black", fontSize: 32, marginBottom: 8 }}
      >
        {children}
      </Text>
      <View style={{ alignItems: "center", flexDirection: "row" }}>
        <View
          style={{
            flex: 1,
            backgroundColor: "black",
            height: 2,
            borderRadius: 2,
            marginRight: 16,
          }}
        />
        <Text
          style={{
            fontFamily: "Inter_400Regular",
            fontSize: 16,

            backgroundColor: "black",
            borderRadius: 8,
            paddingVertical: 4,
            paddingHorizontal: 8,
            color: "white",
          }}
        >
          {dateFormatted}
        </Text>
      </View>
    </>
  );
}
