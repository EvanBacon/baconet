import { Head } from "@bacons/head";
import { Stack } from "expo-router";
import React from "react";

import ProjectCard from "../../../components/Card";
import { Lego } from "../../../components/data";
import { ScreenScroller } from "../../../components/ScreenScroller";

export default function Page() {
  return (
    <>
      <Head>
        <title>Lego | Bacon Blog</title>
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
          title: "Lego",
        }}
      />
      <ScreenScroller>
        {Lego.map((project: any) => (
          <ProjectCard key={project.title} {...project} />
        ))}
      </ScreenScroller>
    </>
  );
}

export { ErrorBoundary } from "expo-router";

// export { default } from "./mdx-test";
