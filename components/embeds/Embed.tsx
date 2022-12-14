import { A } from "@expo/html-elements";
import { View } from "react-native";

import { Gist, GitHubRepo, GitHubProfile } from "./GitHub";
import { Snack } from "./Snack";
import { Tweet, TwitterProfile } from "./Twitter";
import { YouTube } from "./YouTube";

export function Embed({ url }: { url: string }) {
  //   if (url.match(/^https:\/\/twitter\.com\/(.*)\/status\//)) {
  //     return <Tweet url={url} />;
  //   } else if (url.match(/^https:\/\/twitter\.com\/(.*)/)) {
  //     return <TwitterProfile url={url} />;
  //   } else if (url.match(/^https:\/\/gist\.github\.com\/(.*)/)) {
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
