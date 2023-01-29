import React from "react";

import { StyleSheet } from "react-native";
import ProjectCard from "../../../components/Card";
import { Podcasts } from "../../../components/data";
import { Stack } from "expo-router";
import { ScreenScroller } from "../../../components/ScreenScroller";

export default function Media({ navigation }) {
  return (
    <>
      <Stack.Screen
        options={{
          title: "Media",
        }}
      />
      <ScreenScroller>
        {Podcasts.map(({ authors, ...project }) => (
          <ProjectCard
            key={project.title}
            {...project}
            renderDescription={() => (
              <div style={styles.aWrapper}>
                {authors.map((author, index) => (
                  <a
                    key={author}
                    href={`https://twitter.com/${author}`}
                    style={styles.a}
                  >
                    {`@${author}${index !== authors.length - 1 ? " | " : ""}`}
                  </a>
                ))}
              </div>
            )}
          />
        ))}
      </ScreenScroller>
    </>
  );
}

const styles = StyleSheet.create({
  aWrapper: { flexDirection: "row" },
  a: {
    marginVertical: 0,
    color: "white",
    marginBottom: 4,
  },
});
