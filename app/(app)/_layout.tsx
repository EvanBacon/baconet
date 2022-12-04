import Ionicons from "@expo/vector-icons/Ionicons";
import { DarkTheme, DefaultTheme } from "@react-navigation/native";
import { Link, RootContainer, Tabs } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useColorScheme } from "react-native";

import { makeIcon } from "../../components/TabBarIcon";

export default function AppLayout() {
  const theme = useColorScheme() === "dark" ? DarkTheme : DefaultTheme;
  return (
    <>
      <RootContainer theme={theme} />
      <Tabs
        screenOptions={{
          headerShown: false,
        }}
      >
        <Tabs.Screen
          name="home"
          options={{
            href: null,
          }}
        />
        <Tabs.Screen
          name="(stack)"
          options={{
            href: "/",
            title: "Home",
            tabBarIcon: makeIcon("planet"),
          }}
        />
        <Tabs.Screen
          name="sign-in"
          options={{
            href: null,
            title: "Sign In",
            tabBarIcon: makeIcon("person"),
          }}
        />
        {/* <Tabs.Screen
          name="search"
          options={{
            title: "Search",
            tabBarIcon: makeIcon("search"),
          }}
        />
        <Tabs.Screen
          name="market"
          options={{
            title: "Market",
            tabBarIcon: makeIcon("card"),
          }}
        /> */}
      </Tabs>
      <StatusBar style="dark" />
    </>
  );
}
