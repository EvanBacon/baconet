import { Head } from "@bacons/head";
import {
  Image,
  Pressable,
  ImageProps,
  StyleSheet,
  Text,
  View,
} from "@bacons/react-views";
import { Link, useNavigation, useRouter } from "expo-router";
import React, { useMemo } from "react";
import { FlatList } from "react-native-gesture-handler";
import { BlurCard } from "../../../components/blur-card";
import { useScrollToTop } from "@react-navigation/native";
import { MetaShortcut } from "../../../components/shortcuts";

const mdxctx = require.context("../../../assets/articles", true, /\.js$/);

export default function Page() {
  return (
    <>
      <Head>
        <title>Blog | Evan Bacon</title>
        <meta name="description" content="Evan Bacon's blog" />
        <meta
          property="og:image"
          content="https://icogen.vercel.app/api/icon?icon=1f195"
        />
        <meta
          name="keywords"
          content="evan bacon,expo,javascript,typescript,ios,android,native,react native,react,learn"
        />
        {/* <SearchIn /> */}
      </Head>
      <MetaShortcut
        title="Quick Search"
        icon="search"
        subtitle="Look for bacon"
      />

      <PostsList />
    </>
  );
}

export { ErrorBoundary } from "expo-router";

function PostsList() {
  const ref = React.useRef(null);

  useScrollToTop(ref);

  const posts = React.useMemo(
    () =>
      mdxctx
        .keys()
        .map((key) => {
          return mdxctx(key);
        })
        .sort((a, b) => {
          return new Date(b.date).getTime() - new Date(a.date).getTime();
        })
        // Limit to 5
        .slice(0, 6),
    [mdxctx.keys()]
  );

  return (
    <FlatList
      style={{
        flex: 1,
      }}
      ref={ref}
      contentContainerStyle={{
        alignItems: "stretch",
        maxWidth: 800,
        paddingHorizontal: 16,
        justifyContent: "center",
      }}
      contentInsetAdjustmentBehavior="automatic"
      data={posts}
      renderItem={({ item }) => (
        <BlurCard
          href={"/blog/" + item.slug}
          image={item.featuredImage}
          subtitle={item.subtitle}
          title={item.title}
          cta={new Date(item.date).toDateString()}
          icon="book-outline"
        />
      )}
    />
  );
}
