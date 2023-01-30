import * as React from "react";
import * as WebBrowser from "expo-web-browser";
import * as Facebook from "expo-auth-session/providers/facebook";
import { Button, View } from "react-native";

WebBrowser.maybeCompleteAuthSession();

export default function App() {
  const [request, response, promptAsync] = Facebook.useAuthRequest(
    {
      clientId: "3465543810342089",
      redirectUri: "https://bacon-baconnet.ngrok.io",
    },
    {
      useProxy: false,
    }
  );

  console.log("req", request);

  React.useEffect(() => {
    console.log("update", response);
    if (response?.type === "success") {
      const { authentication } = response;
      console.log("authentication", authentication);
      alert("Logged in!: " + authentication.accessToken);
    }
  }, [response]);

  return (
    <View style={{ flex: 1, justifyContent: "center" }}>
      <Button
        disabled={!request}
        title="Login"
        onPress={() => {
          promptAsync();
        }}
      />
    </View>
  );
}
