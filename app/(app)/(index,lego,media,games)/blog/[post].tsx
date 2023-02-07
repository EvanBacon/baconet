import { Head } from "@bacons/head";
import { MDXComponents, MDXStyles } from "@bacons/mdx";
import { Stack, usePathname, useSearchParams } from "expo-router";
import * as Linking from "expo-linking";
import React from "react";
import { Image, ScrollView, Text, View } from "react-native";

const mdxctx = require.context(
  "../../../../assets/articles",
  true,
  /\.(mdx|json)$/
);

type PostInfo = {
  tags: string[];
  date: string;
  title: string;
  subtitle: string;
};

function useData(postId: string): null | {
  MarkdownComponent: any;
  info: PostInfo;
} {
  const MDKey = React.useMemo(
    () => mdxctx.keys().find((p) => p === "./" + postId + "/index.mdx"),
    [postId]
  );

  const mdinfo = React.useMemo(
    () => mdxctx.keys().find((p) => p === "./" + postId + "/index.json"),
    [postId]
  );

  const MD = MDKey ? mdxctx(MDKey).default : null;
  const Info = mdinfo ? mdxctx(mdinfo) : null;

  if (!MD || !Info) {
    return null;
  }
  return { MarkdownComponent: MD, info: Info };
}

function BlogHead({ info }: { info: PostInfo }) {
  const pathname = usePathname();
  const url = React.useMemo(() => Linking.createURL(pathname), [pathname]);
  return (
    <Head>
      <title>{info.title}</title>
      <meta name="description" content={info.subtitle} />
      {/* TODO: Dynamic */}
      <meta name="keywords" content={info.tags.join(",")} />

      <meta property="og:image" content="/images/appjs-2022.jpg" />
      <meta name="og:type" content="article" />
      <meta name="og:title" content={info.title} />
      <meta name="og:description" content={info.subtitle} />
      <meta name="og:url" content={url} />
      <meta name="og:published_time" content={info.date} />

      <meta name="twitter:card" content="summary" />
      <meta name="twitter:title" content={info.title} />
      <meta name="twitter:description" content={info.subtitle} />
    </Head>
  );
}

export default function Page() {
  const { post: postId } = useSearchParams();
  const data = useData(postId);

  if (!data) {
    return <Text>Not Found: {postId}</Text>;
  }

  const { MarkdownComponent, info } = data;

  return (
    <>
      <BlogHead info={info} />

      <Stack.Screen
        options={{
          title: info.title,
          headerTitleStyle: {
            fontFamily: "Inter_900Black",
          },
          headerLargeTitleStyle: {
            fontFamily: "Inter_900Black",
          },
        }}
      />

      <ScrollView
        style={{ backgroundColor: "white" }}
        contentInsetAdjustmentBehavior="automatic"
        contentContainerStyle={{
          paddingVertical: 24,
          maxWidth: 680,
          marginHorizontal: "auto",
        }}
      >
        <View style={{ flex: 1, paddingHorizontal: 12 }}>
          <MarkdownTheme>
            <MarkdownComponent />
          </MarkdownTheme>
        </View>
      </ScrollView>
    </>
  );
}

function MarkdownTheme({ children }: { children: React.ReactNode }) {
  return (
    <MDXStyles
      h1={{
        fontFamily: "Inter_900Black",
        fontSize: 32,
      }}
      h2={{
        fontFamily: "Inter_900Black",
        marginTop: 16,
        fontSize: 22,
        marginBottom: 0,
      }}
      code={{
        fontFamily: "SourceCodePro_400Regular",
        borderRadius: 2,
        backgroundColor: "#f2f2f2",
        padding: 20,
        fontSize: 16,
      }}
      inlineCode={{
        fontFamily: "SourceCodePro_400Regular",
        borderRadius: 2,
        fontSize: 15,
        backgroundColor: "#f2f2f2",
        paddingVertical: 2,
        paddingHorizontal: 4,
      }}
      p={{
        fontFamily: "Inter_400Regular",
        lineHeight: 30,
        fontSize: 20,
        marginBottom: 8,
      }}
      blockquote={{
        fontFamily: "Inter_400Regular",
        borderLeftWidth: 3,
        fontSize: 21,
        borderLeftColor: "#292929",
        paddingLeft: 23,
      }}
      img={{
        width: "100%",
        resizeMode: "contain",
        minWidth: "100%",
        maxWidth: "100%",
        minHeight: 180,
        maxHeight: 360,
      }}
      a={{
        fontFamily: "Inter_400Regular",
        textDecorationLine: "underline",
      }}
      li={{
        fontFamily: "Inter_400Regular",
        fontSize: 16,
        lineHeight: 30,
      }}
      hr={{
        paddingBottom: 10,
        marginBottom: 14,
        marginTop: 32,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        paddingTop: 24,
      }}
    >
      <MDXComponents
        hr={({ style }) => (
          <View style={style}>
            {["", "", ""].map((v, i) => (
              <View
                key={String(i)}
                style={{
                  marginRight: i !== 2 ? 20 : 0,
                  width: 3,
                  height: 3,
                  borderRadius: 1.5,
                  backgroundColor: "black",
                }}
              />
            ))}
          </View>
        )}
      >
        {children}
      </MDXComponents>
    </MDXStyles>
  );
}

function AutoHeightImage(props) {
  const [imgSize, setImageSize] = React.useState({});
  const [imageHeight, setImageHeight] = React.useState(100);

  React.useEffect(() => {
    Image.getSize(props.source.uri, (w, h) => {
      setImageSize({ width: w, height: h });
    });
  }, [props.source]);

  const [layoutWidth, setLayoutWidth] = React.useState(0);

  React.useEffect(() => {
    if (layoutWidth === 0) return;

    const ratio = imgSize.width / imgSize.height;
    const newHeight = layoutWidth / ratio;
    if (isNaN(newHeight)) return;
    setImageHeight(newHeight);
  }, [imgSize, layoutWidth]);

  return (
    <Image
      style={[props.style, { height: imageHeight }]}
      onLayout={(e) => {
        if (layoutWidth === e.nativeEvent.layout.width) return;
        setLayoutWidth(e.nativeEvent.layout.width);
      }}
      source={props.source}
    />
  );
}
