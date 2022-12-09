import { StyleSheet, View } from "@bacons/react-views";
import { Stack } from "expo-router";
import React, { useMemo } from "react";
import { ScrollView, Text } from "react-native";
import ProjectCard from "../../../components/Card";

import { Projects } from "../../../components/data";
import { ScreenScroller } from "../../../components/ScreenScroller";
export default function Page() {
  return (
    <>
      <Stack.Screen
        options={{
          title: "Games",
        }}
      />
      <ScreenScroller>
        {Projects.map((project: any) => (
          <ProjectCard key={project.title} {...project} />
        ))}
      </ScreenScroller>
    </>
  );
}

export { ErrorBoundary } from "expo-router";

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // alignItems: "stretch",
    // alignItems: "center",
    maxWidth: 960,

    // marginHorizontal: 24,
    padding: 24,
  },
  main: {
    flex: 1,
    justifyContent: "center",
    maxWidth: 960,
    marginHorizontal: "auto",
  },
  title: {
    fontSize: 64,
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 36,
    color: "#38434D",
  },
});
