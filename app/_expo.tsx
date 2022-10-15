import { Tabs, Link } from "expo-router";
import { StatusBar } from "expo-status-bar";

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
          options={{ title: "Update", headerTitle: "EAS Update" }}
        />
        <Tabs.Screen
          name="build"
          options={{ title: "Build", headerTitle: "EAS Build" }}
        />
      </Tabs>
    </>
  );
}
