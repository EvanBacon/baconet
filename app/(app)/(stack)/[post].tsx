import { StyleSheet, View } from "@bacons/react-views";
import { Stack, useHref } from "expo-router";
import React from "react";
import { ScrollView, useWindowDimensions } from "react-native";
import Markdown from "react-native-markdown-renderer";

import { usePosts } from "../../../components/api";
import { useOutletContext } from "../../../components/OutletContext";

export default function Page({ route }) {
  const href = useHref();
  console.log("!!route!!", href, route);
  const { width } = useWindowDimensions();

  const postId = route.params?.post;

  const posts = useOutletContext<ReturnType<typeof usePosts>>();
  // console.log("route", route, posts);

  if (!posts?.length || !postId) {
    return null;
  }

  const post = posts.find((p) => p.fields.slug === postId);

  if (!post) {
    throw new Error("Post not found: " + postId);
  }

  return (
    <>
      {/* <Head>
        <title>{post.fields.title} | Bacon Blog</title>
      </Head> */}
      <Stack.Screen
        options={{ headerLargeTitle: true, title: post.fields.title }}
      />
      <View
        style={{
          alignItems: "center",
          flex: 1,
          maxWidth: 960,
          marginHorizontal: "auto",
        }}
      >
        <ScrollView
          style={[
            styles.container,
            {
              width: Math.min(width, 960),
            },
          ]}
          contentInsetAdjustmentBehavior="automatic"
        >
          {/* @ts-expect-error */}
          <Markdown>{post.fields.body}</Markdown>
        </ScrollView>
      </View>
    </>
  );
}

export { ErrorBoundary } from "expo-router";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
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
