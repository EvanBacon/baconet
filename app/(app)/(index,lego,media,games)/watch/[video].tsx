import { View, Text } from "@bacons/react-views";
import { Stack, useSearchParams } from "expo-router";
import { data } from "../../../../data/media";
export default function Page() {
  const { video } = useSearchParams();

  const item = data.find((item) => item.slug === video);

  if (!item) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text>Not found: {video}</Text>
      </View>
    );
  }
  return (
    <>
      <Stack.Screen
        options={{
          title: item.title,
        }}
      />
      <View
        style={{ flex: 1, alignItems: "stretch", justifyContent: "center" }}
      >
        <Text>{item.title}</Text>
        <Text>{item.subtitle}</Text>
      </View>
    </>
  );
}
