import { Link, Stack } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import { DarkTheme, DefaultTheme } from "@react-navigation/native";
import { Platform, Text, useColorScheme } from "react-native";
import SearchBar from "../../../components/SearchBar";
import { OutletContext } from "../../../components/OutletContext";
import { usePosts } from "../../../components/api";
import { useRoute } from "@react-navigation/native";
import { Services } from "../../../components/medium";

function EASButton() {
  const theme = useColorScheme() === "dark" ? DarkTheme : DefaultTheme;

  return (
    <Link
      style={{ color: "black", fontSize: 16, paddingHorizontal: 16 }}
      href="/_expo"
    >
      <Services />
    </Link>
  );
}

export default function StackLayout({ segment }) {
  const posts = usePosts();

  const route = useRoute();

  const initRouteName = segment.replace(/^\(/, "").replace(/\)$/, "");
  console.log("layout route", route, initRouteName);

  return (
    <OutletContext.Provider value={posts}>
      <Stack
        screenOptions={{
          // headerLeft() {
          //   return Platform.OS === "web" ? (
          //     <Link href="/">
          //       <Text style={{ backgroundColor: "white" }}>Bacon</Text>
          //     </Link>
          //   ) : null;
          // },
          headerRight(props) {
            return <EASButton />;
          },
        }}
      >
        <Stack.Screen
          name={initRouteName}
          // @ts-ignore
          options={
            initRouteName === "index"
              ? (nav) => ({
                  title: "Home",
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
                })
              : undefined
          }
        />

        <Stack.Screen name="blog/[post]" />
      </Stack>
    </OutletContext.Provider>
  );
}
