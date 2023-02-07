import { Head } from "@bacons/head";
import { StyleSheet } from "@bacons/react-views";
import { Stack } from "expo-router";
import React from "react";

import ProjectCard from "../../../components/Card";
import { Projects } from "../../../components/data";
import { ScreenScroller } from "../../../components/ScreenScroller";

export default function Page() {
  return (
    <>
      <Head>
        <title>Games | Bacon Blog</title>
        <meta name="description" content="Evan Bacon's blog" />
        <meta
          property="og:image"
          content="https://icogen.vercel.app/api/icon?icon=1f195"
        />
        <meta
          name="keywords"
          content="evan bacon,expo,javascript,typescript,ios,android,native,react native,react,learn"
        />
      </Head>
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
