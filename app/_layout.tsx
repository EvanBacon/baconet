import { Children, RootContainer } from "expo-router";
import { useColorScheme } from "react-native";
import { DarkTheme, DefaultTheme } from "@react-navigation/native";

export default function RootLayout() {
  //   const theme = useColorScheme() === "dark" ? DarkTheme : DefaultTheme;

  return (
    <>
      {/* <RootContainer theme={theme} /> */}
      <Children />
    </>
  );
}
