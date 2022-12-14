import MD from "../../../assets/articles/arkit-in-react-native-tutorial-the-basics/index.mdx";
import { MDXComponents, MDXStyles } from "@bacons/mdx";
import { Image, ScrollView, StyleSheet, View } from "react-native";
import React from "react";

import { Stack } from "expo-router";

import {
  useFonts,
  Inter_400Regular,
  Inter_900Black,
} from "@expo-google-fonts/inter";
import { SourceCodePro_400Regular } from "@expo-google-fonts/source-code-pro";

export default function Page() {
  const [fontsLoaded] = useFonts({
    Inter_900Black,
    Inter_400Regular,
    SourceCodePro_400Regular,
  });

  if (!fontsLoaded) return null;

  return (
    <ScrollView
      style={{ backgroundColor: "white" }}
      contentInsetAdjustmentBehavior="automatic"
      contentContainerStyle={{
        paddingTop: 24,
        maxWidth: 680,
        marginHorizontal: "auto",
      }}
    >
      <Stack.Screen
        options={{
          title: "Big Buck Bunwere",
          headerTitleStyle: {
            fontFamily: "Inter_900Black",
          },

          headerLargeTitleStyle: {
            fontFamily: "Inter_900Black",
          },
        }}
      />

      <View style={{ flex: 1, paddingHorizontal: 12 }}>
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
            minWidth: "100%",
            height: 180,
          }}
          a={{
            fontFamily: "Inter_400Regular",
            textDecorationLine: "underline",
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
            <MD />
          </MDXComponents>
        </MDXStyles>
      </View>
    </ScrollView>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
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
