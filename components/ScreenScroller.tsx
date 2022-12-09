import { StyleSheet } from "@bacons/react-views";
import React from "react";
import { Platform, ScrollView } from "react-native";

export function ScreenScroller({ children }) {
  return (
    <ScrollView
      contentContainerStyle={{
        paddingTop: 24,
      }}
      style={styles.container}
    >
      {children}
    </ScrollView>
  );
}

export { ErrorBoundary } from "expo-router";

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // alignItems: "stretch",
    // alignItems: "center",
    maxWidth: 960,
    marginHorizontal: Platform.select({
      web: 24,
      default: 0,
    }),
    // padding: 24,
  },
});
