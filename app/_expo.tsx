import { Tabs, Link } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { makeIcon } from "../components/TabBarIcon";

export default function RootLayout() {
  return (
    <>
      <StatusBar style="light" />
      <Tabs
        screenOptions={{
          headerTitleAlign: "left",
          headerRight: () => (
            <Link
              style={{ color: "white", fontSize: 16, paddingHorizontal: 16 }}
              href="/"
            >
              esc
            </Link>
          ),
          headerStyle: {
            backgroundColor: "black",
          },
          headerTintColor: "white",
          headerTitleStyle: {
            fontWeight: "bold",
          },
          tabBarStyle: {
            backgroundColor: "black",
          },
          tabBarActiveTintColor: "white",
          tabBarInactiveTintColor: "gray",
        }}
      >
        <Tabs.Screen
          name="update"
          options={{
            title: "Update",
            tabBarIcon: makeIcon("cloud-download"),
            // tabBarIcon: makeIcon("code-download"),
            headerTitle: "EAS Update",
          }}
        />
        <Tabs.Screen
          name="build"
          options={{
            title: "Build",
            tabBarIcon: makeIcon("cube"),
            headerTitle: "EAS Build",
          }}
        />
      </Tabs>
    </>
  );
}
