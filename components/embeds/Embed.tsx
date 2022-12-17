import { A } from "@expo/html-elements";
import { ActivityIndicator, TouchableOpacity, View } from "react-native";
import React from "react";
import { Text, Image } from "@bacons/react-views";
import { Gist, GitHubRepo, GitHubProfile } from "./GitHub";
import { Snack } from "./Snack";
import { Tweet, TwitterProfile } from "./Twitter";
import { YouTube } from "./YouTube";
import * as WebBrowser from "expo-web-browser";

function TweetEmbedWebView({ url }: { url: string }) {
  return (
    <WebView
      source={{ uri: url }}
      style={{ flex: 1, minHeight: 256 }}
      javaScriptEnabled={true}
      domStorageEnabled={true}
      startInLoadingState={true}
      scrollEnabled={false}
      renderLoading={() => <ActivityIndicator />}
      renderError={() => <Text>Error loading page</Text>}
    />
  );
}

function useBio(url) {
  const [bio, setBio] = React.useState(null);
  React.useEffect(() => {
    fetch(url)
      .then((res) => res.text())
      .then((html) => {
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, "text/html");
        const bio = doc.querySelector(".ProfileHeaderCard-bio");
        setBio(bio?.textContent);
      });
  }, [url]);
  return bio;
}

export function Embed({ url }: { url: string }) {
  if (url.match(/^https:\/\/twitter\.com\/(.*)\/status\//)) {
    return <Tweet url={url} />;
  } else if (url.match(/^https:\/\/twitter\.com\/(.*)/)) {
    const [username] = url.split("/").slice(-1);
    const bio = useBio(url);
    return (
      <ExternalLink href={url} asChild style={{ marginTop: 32 }}>
        <TouchableOpacity style={{ height: 96, flex: 1 }}>
          <View
            style={{
              borderColor: "#e6e6e6",
              borderWidth: 1,

              flexDirection: "row",
            }}
          >
            <View
              style={{
                flex: 1,
                paddingVertical: 16,
                paddingHorizontal: 12,
              }}
            >
              <View style={{ flex: 1 }}>
                <Text style={{ fontSize: 16, fontWeight: "bold" }}>
                  @{username}
                </Text>
                {bio && <Text>{bio}</Text>}
              </View>

              <Text style={{ color: "#1da1f2" }}>View on Twitter</Text>
            </View>
            <Image
              source={{
                uri: `https://abs.twimg.com/sticky/default_profile_images/default_profile_normal.png`,
              }}
              style={{
                height: 96,

                aspectRatio: 1,
              }}
            />
          </View>
        </TouchableOpacity>
      </ExternalLink>
    );
  } else if (url.match(/^https:\/\/snack\.expo\.io\/(.*)/)) {
    return <Snack url={url} />;
  }
  //  else if (url.match(/^https:\/\/gist\.github\.com\/(.*)/)) {
  //     return <Gist url={url} />;
  //   } else if (url.match(/^https:\/\/snack\.expo\.io\/(.*)/)) {
  //     return <Snack url={url} />;
  //   } else if (url.match(/^https:\/\/www\.youtube\.com\/watch\?v=(.*)/)) {
  //     return <YouTube url={url} />;
  //   } else if (url.match(/^https:\/\/youtu\.be\/(.*)/)) {
  //     return <YouTube url={url} />;
  //   } else if (url.match(/^https:\/\/github\.com\/(.*)\/(.*)/)) {
  //     return <GitHubRepo url={url} />;
  //   } else if (url.match(/^https:\/\/github\.com\/(.*)/)) {
  //     return <GitHubProfile url={url} />;
  //   }
  return (
    <View
      style={{
        marginTop: 32,
        paddingVertical: 16,
        paddingHorizontal: 12,
        justifyContent: "center",
        alignItems: "center",
        borderColor: "#e6e6e6",
        borderWidth: 1,
      }}
    >
      <A hrefAttrs={{ target: "_blank" }} href={url}>
        Embed not implemented: {url}
      </A>
    </View>
  );
}

import { ProfileHeader } from "react-native-twitter-embed";
import WebView from "react-native-webview";
import { Link } from "expo-router";
import { ExternalLink } from "../ExternalLink";
