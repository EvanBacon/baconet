import { Head } from "@bacons/head";
import { Stack } from "expo-router";
import { ScrollView } from "react-native";

import AboutContent from "../../../components/about";
import { MarkdownTheme } from "../../../components/MarkdownTheme";

export default function About() {
  return (
    <>
      <Head>
        <title>About | Evan Bacon</title>
        <meta
          name="description"
          content="Evan Bacon is a software developer and artist"
        />
        <meta
          property="og:image"
          content="https://icogen.vercel.app/api/icon?icon=1f953"
        />
        <meta
          name="keywords"
          content="evan bacon,expo,javascript,typescript,ios,android,native,react native,react,learn"
        />
      </Head>

      <Stack.Screen options={{ title: "About" }} />

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ padding: 16 }}
        contentInsetAdjustmentBehavior="automatic"
      >
        <MarkdownTheme>
          <AboutContent />
        </MarkdownTheme>
      </ScrollView>
    </>
  );
}
