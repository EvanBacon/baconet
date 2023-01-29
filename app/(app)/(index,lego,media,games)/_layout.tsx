import Ionicons from "@expo/vector-icons/Ionicons";
import { DarkTheme, DefaultTheme, useRoute } from "@react-navigation/native";
import { Stack, usePathname } from "expo-router";
import {
  Platform,
  Share,
  TouchableOpacity,
  useColorScheme,
} from "react-native";

import { usePosts } from "../../../components/api";
import { OutletContext } from "../../../components/OutletContext";

function ShareButton() {
  const theme = useColorScheme() === "dark" ? DarkTheme : DefaultTheme;
  const href = usePathname();
  const link = new URL(href, "https://evanbacon.dev").toString();
  return (
    <TouchableOpacity
      style={{
        paddingHorizontal: Platform.select({ web: 16, default: 0 }),
      }}
      onPress={() => {
        Share.share({
          url: link,
          message: "Evan's cooking",
        });
      }}
    >
      <Ionicons size={24} color={theme.colors.text} name={"share-outline"} />
    </TouchableOpacity>
  );
}

export default function StackLayout({ segment }) {
  const posts = usePosts();

  const initRouteName = segment.replace(/^\(/, "").replace(/\)$/, "");
  console.log("layout route", initRouteName);

  return (
    <OutletContext.Provider value={posts}>
      <Stack
        screenOptions={{
          headerRight(props) {
            if (Platform.OS === "web") {
              return null;
            }
            return <ShareButton />;
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
                    return <ShareButton />;
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
