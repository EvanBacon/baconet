import { Head } from "@bacons/head";
import { Stack } from "expo-router";
import React from "react";
import { ScrollView } from "react-native";

import { BlurCard } from "../../../components/blur-card";
import { useFont } from "../../../components/useFont";
import { data } from "../../../data/media";
import { useScrollToTop } from "@react-navigation/native";

export default function Page() {
  const ref = React.useRef(null);

  useScrollToTop(ref);

  return (
    <>
      <Head>
        <title>Media | Evan Bacon</title>
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
      <ScrollView
        ref={ref}
        style={{ flex: 1 }}
        contentInsetAdjustmentBehavior="automatic"
        contentContainerStyle={{
          alignItems: "stretch",
          maxWidth: 800,
          paddingHorizontal: 16,
          justifyContent: "center",
        }}
      >
        <Stack.Screen
          options={{
            title: "Videos",
            headerLargeTitle: true,
            headerTitleStyle: {
              fontFamily: useFont("Inter_700Bold"),
            },

            headerLargeTitleStyle: {
              fontFamily: useFont("Inter_700Bold"),
            },
          }}
        />

        {data.map((value, index) => (
          <BlurCard
            key={index}
            title={value.title}
            href={value.url}
            // href={"./watch/" + value.slug}
            subtitle={value.subtitle}
            image={value.image}
            blank
          />
        ))}
      </ScrollView>
    </>
  );
}
