import { Head } from "@bacons/head";
import { StyleSheet, View } from "@bacons/react-views";
import { H1 } from "@expo/html-elements";
import { Stack } from "expo-router";
import React from "react";
import { ScrollView, useWindowDimensions } from "react-native";
import Markdown from "react-native-markdown-renderer";

import { usePosts } from "../../../components/api";
import { useOutletContext } from "../../../components/OutletContext";

export default function Page({ route }) {
  // const route = useHref();
  const postId = route.params?.post;

  const posts = useOutletContext<ReturnType<typeof usePosts>>();
  console.log("route", route, posts);

  if (!posts?.length || !postId) {
    return null;
  }

  const post = posts.find((p) => p.fields.slug === postId);

  if (!post) {
    throw new Error("Post not found: " + postId);
  }

  const { width } = useWindowDimensions();
  return (
    <>
      <Head>
        <title>{post.fields.title} | Bacon Blog</title>
      </Head>
      <Stack.Screen options={{ title: post.fields.title }} />
      <View
        style={{
          alignItems: "center",

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
        >
          <H1 style={{}}>Post: {post.fields.title}</H1>
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
