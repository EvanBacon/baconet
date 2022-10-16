import { Link, Stack } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import { DarkTheme, DefaultTheme } from "@react-navigation/native";
import { Platform, Text, useColorScheme } from "react-native";
import SearchBar from "../../components/SearchBar";
import { OutletContext } from "../../components/OutletContext";
import { usePosts } from "../../components/api";

function EASButton() {
  const theme = useColorScheme() === "dark" ? DarkTheme : DefaultTheme;

  return (
    <Link
      style={{ color: "white", fontSize: 16, paddingHorizontal: 16 }}
      href="/_expo"
    >
      <Ionicons name="code-slash" size={24} color={theme.colors.text} />
    </Link>
  );
}

export default function StackLayout() {
  const posts = usePosts();

  return (
    <OutletContext.Provider value={posts}>
      <Stack
        screenOptions={{
          headerLeft() {
            return Platform.OS === "web" ? (
              <Link href="/">
                <Text style={{ backgroundColor: "white" }}>Bacon</Text>
              </Link>
            ) : null;
          },
          headerRight(props) {
            return <EASButton />;
          },
        }}
      >
        <Stack.Screen
          name="index"
          options={(nav) => ({
            title: "Bacon Blog",
            headerLargeTitle: true,
            headerRight(props) {
              // if (Platform.OS === "web") {
              //   return (
              //     <SearchBar
              //       onSubmit={() => {
              //         nav.setParams({ q: value });
              //       }}
              //       onChangeQuery={(val) => {
              //         setValue(val);
              //       }}
              //       value={value}
              //     />
              //   );
              // }
              return <EASButton />;
            },
            headerSearchBarOptions: {
              placeholder: "Search",
              autoFocus: true,
            },
          })}
        />
        <Stack.Screen name="[post]" />
      </Stack>
    </OutletContext.Provider>
  );
}
