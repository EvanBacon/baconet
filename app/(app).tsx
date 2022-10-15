import { Redirect, Tabs } from "expo-router";
import { Platform } from "react-native";

import Constants from "expo-constants";
import { StatusBar } from "expo-status-bar";

const isAuthorizedPerson = true;
//   !Constants.isDevice || /^dev\s/i.test(Constants.deviceName.toLowerCase());

export default function AppLayout() {
  return (
    <>
      <Tabs>
        <Tabs.Screen
          name="home"
          options={{
            href: null,
          }}
        />
        <Tabs.Screen
          name="index"
          options={{
            title: "Home",
            tabBarIcon: () => null,
          }}
        />
        <Tabs.Screen
          name="search"
          options={{
            title: "Search",
            tabBarIcon: () => null,
          }}
        />
        <Tabs.Screen
          name="market"
          options={{
            title: "Market",
            tabBarIcon: () => null,
          }}
        />
        <Tabs.Screen
          name="tools"
          options={{
            title: "Tools",
            href: Platform.select({
              web: null,
              // Only show if the device name starts with `dev `
              default: isAuthorizedPerson ? "/_expo" : null,
            }),
            tabBarIcon: () => null,
          }}
        />
      </Tabs>
      <StatusBar style="dark" />
    </>
  );
}
