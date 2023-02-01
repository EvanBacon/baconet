import { Head } from "@bacons/head";
import {
  Link,
  usePathname,
  useRouter,
  useNavigation,
  useSearchParams,
} from "expo-router";
import React, { useMemo } from "react";
import {
  FlatList,
  Platform,
  PlatformColor,
  TouchableOpacity,
} from "react-native";
import { StyleSheet, ImageProps, Image, Text, View } from "@bacons/react-views";

import { usePosts } from "../../../components/api";
import { MetaShortcut } from "../../../components/shortcuts";
import { useOutletContext } from "../../../components/OutletContext";

export default function Page() {
  const route = usePathname();
  const params = useSearchParams();
  const def = useMemo(
    () => (params?.q ? decodeURIComponent(params?.q) : ""),
    [params?.q]
  );

  const navigation = useNavigation("../../");
  const link = useRouter();
  React.useEffect(() => {
    console.log("setup");
    const unsubscribe = navigation.addListener("tabLongPress", (e) => {
      console.log("long");
      // Do something
      link.replace("/_expo");
    });

    return unsubscribe;
  }, [navigation, link]);

  const [value, setValue] = React.useState(def);

  React.useEffect(() => {
    if (def) {
      setValue(def);
    }
  }, [def]);

  return (
    <>
      <Head>
        <title>Feed | Bacon Blog</title>
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

      <View style={styles.container}>
        <PostsList />
      </View>
    </>
  );
}

export { ErrorBoundary } from "expo-router";

function PostsList() {
  const posts = useOutletContext<ReturnType<typeof usePosts>>();
  // console.log("posts", posts);
  return (
    <FlatList
      style={{
        flex: 1,
      }}
      contentContainerStyle={{}}
      contentInsetAdjustmentBehavior="automatic"
      data={posts}
      renderItem={({ item }) => {
        // console.log("item", item);
        const { author, created } = item.fields;
        return (
          <Link
            href={{
              pathname: "/blog/[post]",
              params: {
                post: item.fields.slug,
              },
            }}
            style={{
              flex: 1,
            }}
            asChild
          >
            <TouchableOpacity>
              <View
                style={{ margin: 12, backgroundColor: "white", padding: 12 }}
              >
                {author && (
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      paddingBottom: 8,
                      justifyContent: "space-between",
                    }}
                  >
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                      }}
                    >
                      <ProfileImage style={{ marginRight: 8 }} />
                      <Text style={{ fontSize: 16 }}>{author.name}</Text>
                    </View>
                    <Text
                      style={{
                        color: "#38434D",
                      }}
                    >
                      {new Date(created).toDateString()}
                    </Text>
                  </View>
                )}
                <Text style={{ fontWeight: "bold", fontSize: 20 }}>
                  {item.fields.title}
                </Text>

                <Text
                  numberOfLines={3}
                  lineBreakMode="tail"
                  style={{ fontSize: 16, marginTop: 8, color: "#38434D" }}
                >
                  {item.fields.body}
                </Text>

                <Tags tags={item.fields.tags} />
              </View>
            </TouchableOpacity>
          </Link>
        );
      }}
    />
  );
}

function Tags({ tags }: { tags?: string[] }) {
  if (!tags?.length) {
    return null;
  }

  return (
    <View style={{ paddingTop: 12, flexDirection: "row", flexWrap: "wrap" }}>
      {tags.map((tag) => (
        <View
          key={tag}
          style={{
            backgroundColor: "rgba(0,0,0,0.08)",
            padding: 4,
            borderRadius: 4,
            marginRight: 8,
            marginBottom: 8,
          }}
        >
          <Text>{tag}</Text>
        </View>
      ))}
    </View>
  );
}

export function cupertinoColor(iosName, fallback) {
  if (Platform.OS === "ios") {
    return PlatformColor(iosName);
  } else {
    return fallback;
  }
}

export function CupertinoItemSeparatorComponent() {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: cupertinoColor(
          "secondarySystemGroupedBackground",
          "rgba(0,0,0,0.1)"
        ),
      }}
    >
      <View
        style={{
          height: StyleSheet.hairlineWidth,
          backgroundColor: cupertinoColor("separator", "#C6C6C8"),
        }}
      />
    </View>
  );
}

function ProfileImage({ style, ...props }: Partial<ImageProps>) {
  return (
    <Image
      {...props}
      // @ts-expect-error
      alt="Evan Bacon"
      source={{
        uri: "https://avatars.githubusercontent.com/u/9664363?v=4",
        // uri: "https://miro.medium.com/fit/c/48/48/0*7hpwPqrKW-8i1C3u.jpg",
      }}
      style={[
        {
          backgroundColor: "#71767b",
          width: 32,
          height: 32,
          borderRadius: 999,
          boxShadow: "rgb(0 0 0 / 5%) 0px 0px 0px 1px inset",
        },
        style,
      ]}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: "stretch",
    alignItems: "center",
    maxWidth: 960,
    marginHorizontal: "auto",
    // padding: 24,
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
