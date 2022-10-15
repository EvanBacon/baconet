import { Redirect, Link, RootContainer, Tabs } from "expo-router";
import { Platform, useColorScheme } from "react-native";

import Ionicons from "@expo/vector-icons/Ionicons";
import Constants from "expo-constants";
import { StatusBar } from "expo-status-bar";

const isAuthorizedPerson = true;
//   !Constants.isDevice || /^dev\s/i.test(Constants.deviceName.toLowerCase());

import { DefaultTheme, DarkTheme } from "@react-navigation/native";
export default function AppLayout() {
  const theme = useColorScheme() === "dark" ? DarkTheme : DefaultTheme;
  return (
    <>
      <RootContainer theme={theme} />
      <Tabs
        screenOptions={{
          headerRight(props) {
            return (
              <Link
                style={{ color: "white", fontSize: 16, paddingHorizontal: 16 }}
                href="/_expo"
              >
                <Ionicons
                  name="code-outline"
                  size={24}
                  color={theme.colors.text}
                />
              </Link>
            );
          },
        }}
      >
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
      </Tabs>
      <StatusBar style="dark" />
    </>
  );
}
