import { Head } from "@bacons/head";
import { Stack, useSearchParams } from "expo-router";
import { data } from "../../../../data/media";

export default function Page() {
  const { video } = useSearchParams();

  const item = data.find((item) => item.slug === video);

  if (!item) {
    return (
      <div
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <h2>Not found: {video}</h2>
      </div>
    );
  }
  return (
    <>
      <Stack.Screen
        options={{
          title: item.title,
        }}
      />
      <Head>
        <title>Watch: {item.title} | Evan Bacon</title>
        <meta name="description" content="Evan Bacon's blog" />
        <meta property="og:image" content={item.image.uri} />
        <meta
          name="keywords"
          content="evan bacon,expo,javascript,typescript,ios,android,native,react native,react,learn"
        />
      </Head>
      <ScrollView
        style={{ flex: 1 }}
        contentInsetAdjustmentBehavior={Platform.select({
          ios: "automatic",
        })}
        contentContainerStyle={[
          {
            alignItems: "stretch",
            maxWidth: 800,

            paddingTop: 16,
            paddingHorizontal: 16,
            justifyContent: "center",
          },
        ]}
      >
        <PrettyVideoPlayer {...item} />

        <div style={{ flex: 1, alignItems: "stretch" }}>
          <h2>{item.title}</h2>
          <h4>{item.subtitle}</h4>
        </div>
      </ScrollView>
    </>
  );
}

import { ResizeMode, Video } from "expo-av";
import * as React from "react";
import { Platform, Pressable, ScrollView, StyleSheet } from "react-native";

function PrettyVideoPlayer({ video, image }) {
  const videoRef = React.useRef<Video>();
  const isPlaying = React.useRef(false);

  return (
    <div>
      <Video
        source={video}
        shouldPlay
        posterSource={image}
        style={[
          {
            width: "100%",
            aspectRatio: 16 / 9,
            minHeight: 300,
          },
        ]}
        videoStyle={{
          borderRadius: 12,
          overflow: "hidden",
          width: "100%",
          height: "100%",
        }}
        resizeMode={ResizeMode.CONTAIN}
        onPlaybackStatusUpdate={(status) => {
          isPlaying.current = status.isLoaded && status.isPlaying;
        }}
        ref={videoRef}
      />

      <Pressable
        onPress={() => {
          if (isPlaying.current) {
            videoRef.current?.pauseAsync();
          } else {
            videoRef.current?.playAsync();
          }
        }}
      >
        <h2>Play</h2>
      </Pressable>
    </div>
  );
}
