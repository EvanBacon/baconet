import { TopTabs } from "@bacons/expo-router-top-tabs";
import { Stack } from "expo-router";
import { Image, Text, View } from "react-native";

import { getItem } from "../../../../../components/fetchItem";

export function ErrorBoundary({ error }) {
  return (
    <>
      <Stack.Screen
        options={{
          title: "Not Found",
        }}
      />
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Nothing here</Text>
        <Text>{error.message}</Text>
      </View>
    </>
  );
}

export default function CustomLayout({ route }) {
  console.log("route:", route);
  const item = getItem(route.params?.item);

  return (
    <>
      <Stack.Screen options={{ title: item.title }} />

      <TopTabs>
        <TopTabs.Header>
          <View pointerEvents="none" style={{ height: 300 }}>
            <Image
              source={item.image}
              style={{ width: "100%", maxHeight: 300 }}
            />
          </View>
        </TopTabs.Header>

        <TopTabs.Screen name="index" options={{ title: "Details" }} />
        <TopTabs.Screen name="related" options={{ title: "Related" }} />
      </TopTabs>
    </>
  );
}
