import { StyleSheet, View } from "@bacons/react-views";
import React, { useMemo } from "react";
import { Text } from "react-native";
import ProjectCard from "../../../components/Card";

import { Lego } from "../../../components/data";
export default function Page() {
  return (
    <>
      <View style={styles.container}>
        {Lego.map((project: any) => (
          <ProjectCard key={project.title} {...project} />
        ))}
      </View>
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
    marginHorizontal: 24,
    // padding: 24,
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
