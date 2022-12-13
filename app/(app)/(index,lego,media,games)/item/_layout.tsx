import { StyleSheet, Text, View } from "react-native";
import { TopTabs } from "@bacons/expo-router-top-tabs";

export default function CustomLayout() {
  return (
    <TopTabs>
      <TopTabs.Header>
        <View pointerEvents="none" style={{}}>
          <Text>Header</Text>
        </View>
      </TopTabs.Header>

      <TopTabs.Screen name="[item]" />
    </TopTabs>
  );
}
