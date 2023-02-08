import { Head } from "@bacons/head";
import { Stack } from "expo-router";
import { Image } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

export default function About() {
  return (
    <>
      <Head>
        <title>About | Evan Bacon</title>
        <meta name="description" content="About Evan Bacon" />
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
        style={{ flex: 1, padding: 16 }}
        contentInsetAdjustmentBehavior="automatic"
      >
        <Image
          source={require("../../../assets/brand/evanbacon-2022.jpg")}
          resizeMode="cover"
          style={{ width: 100, height: 100, borderRadius: 50 }}
        />
        <h1>Evan Bacon</h1>
        <p>
          I'm a software developer and artist. I started working on Expo in 2017
          with the goal to make mobile content easy to create, share, and
          discover. Previously, I worked as the sole design technologist on the
          SiriusXM (360L) in-car and mobile experiences. Before software
          development, I was an award-winning Lego artist, specializing in
          life-sized sculptures.
        </p>
      </ScrollView>
    </>
  );
}
