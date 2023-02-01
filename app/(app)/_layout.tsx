import { Image, View } from "@bacons/react-views";
import {
  CommonActions,
  NavigationHelpersContext,
} from "@react-navigation/native";
import { TabRouter } from "@react-navigation/routers";
import { Link, Navigator, Slot, Tabs } from "expo-router";
import React from "react";
import { useWindowDimensions } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import * as Icons from "../../components/medium";
import { makeIcon } from "../../components/TabBarIcon";

function HeaderLogo() {
  const isLarge = useWidth(1265);

  return (
    <Link style={{ paddingVertical: 40 }} href="/" replace>
      <h1
        style={[
          {
            margin: 0,
            display: "flex",
            flex: 1,
            alignItems: "center",
            maxHeight: 23,
            marginVertical: 2,
          },
        ]}
      >
        <Icons.Logo fill={DARK} style={{ height: 30 }} />
      </h1>
    </Link>
  );
}

function useWidth(size) {
  const { width } = useWindowDimensions();
  return width >= size;
}

function VerticalTabBar({ children, style }) {
  const childrenArray = React.Children.toArray(children);

  const newChildren = childrenArray.map((child, index) => {
    return (
      <View
        key={String(index)}
        asChild
        style={{ display: "flex", paddingBottom: 35 }}
      >
        {child}
      </View>
    );
  });

  return <nav style={style}>{newChildren}</nav>;
}

function SideBar() {
  const isLarge = useWidth(1265);
  // const isMedSideBar = useWidth(600);

  const navigation = React.useContext(NavigationHelpersContext)!;

  const state = navigation.getState();
  const current = state.routes.find((route, i) => {
    return state.index === i;
  });

  console.log("current", current);
  return (
    <div
      style={[
        {
          alignItems: "flex-end",
          minWidth: 60,
        },
        isLarge && {
          minWidth: 275,
        },
        !isLarge && {
          width: "16%",
        },
      ]}
    >
      <div
        style={[
          {
            position: "fixed",
            height: "100%",
            paddingHorizontal: 4,
            borderRightWidth: 1,
            borderRightColor: "rgb(230, 230, 230)",
          },

          isLarge && {
            alignItems: "flex-end",
          },
          !isLarge && {
            paddingHorizontal: 16,
          },
        ]}
      >
        <header
          zIndex={3}
          style={[
            {
              alignItems: "stretch",
              height: "100%",
              justifyContent: "space-between",
            },

            !isLarge && {
              alignItems: "center",
            },
            isLarge && {
              width: 180,
            },
          ]}
        >
          <HeaderLogo />

          <VerticalTabBar style={{}}>
            <SideBarTabItem
              name="index"
              selected={current.name === "(index)"}
              href="/"
              icon={makeIcon("home")}
            >
              Home
            </SideBarTabItem>
            {false && (
              <SideBarTabItem
                href="/lego"
                selected={current.name === "(lego)"}
                icon={makeIcon("build")}
              >
                Lego
              </SideBarTabItem>
            )}
            {false && (
              <SideBarTabItem
                href="/games"
                selected={current.name === "(games)"}
                icon={makeIcon("game-controller")}
              >
                Games
              </SideBarTabItem>
            )}
            <SideBarTabItem
              href="/media"
              selected={current.name === "(media)"}
              icon={makeIcon("mic")}
            >
              Media
            </SideBarTabItem>
            <div>
              <div
                style={{
                  marginHorizontal: isLarge ? 0 : "auto",
                  width: isLarge ? "80%" : "33%",
                  backgroundColor: "rgba(230, 230, 230, 1)",
                  maxHeight: 1,
                  height: 1,
                }}
              />
            </div>
            <SideBarTabItem
              href="/about"
              selected={current.name === "(about)"}
              icon={makeIcon("person")}
            >
              Media
            </SideBarTabItem>
          </VerticalTabBar>

          <footer
            style={{
              justifyContent: "center",
              alignItems: "center",
              marginVertical: 16,
            }}
          >
            <a
              style={{ width: 32, marginVertical: 8, height: 32 }}
              href="https://github.com/evanbacon/portfolio"
              target="_blank"
            >
              <Icons.Code />
            </a>
          </footer>
        </header>
      </div>
    </div>
  );
}

function TabLink({ focused, name, ...props }) {
  const { state, navigation } = Navigator.useContext();
  const route = state.routes.find((route, i) => {
    return route.name === name;
  });

  if (!route) {
    throw new Error(
      `Could not find route with name: ${name}. Options: ${state.routes
        .map((r) => r.name)
        .join(", ")}`
    );
  }

  // const navigation = useNavigation();

  const onPress = () => {
    const event = navigation.emit({
      type: "tabPress",
      target: route.key,
      canPreventDefault: true,
    });

    if (!focused && !event.defaultPrevented) {
      navigation.dispatch({
        ...CommonActions.navigate({ name: route.name, merge: true }),
        target: state.key,
      });
    }
  };

  const onLongPress = () => {
    navigation.emit({
      type: "tabLongPress",
      target: route.key,
    });
  };

  return <Link onPress={onPress} onLongPress={onLongPress} {...props} />;
}

function SideBarTabItem({ children, href, icon, selected, name }) {
  const isLarge = useWidth(1265);
  // const buildLink = useLinkBuilder();

  // return null;
  // console.log("side bar:", buildLink("media"));
  return (
    <Link
      name={name}
      href={href}
      accessibilityHasPopup="menu"
      style={{
        paddingVertical: 4,
        display: "flex",
        width: "100%",
        borderRadius: 999,
        transitionProperty: ["background-color", "box-shadow"],
        transitionDuration: "200ms",
      }}
      hoverStyle={{
        backgroundColor: "rgba(0, 0, 0, 0.1)",
        //   backgroundColor: "rgba(231, 233, 234, 0.1)",
      }}
    >
      <div
        style={{
          padding: 12,
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        {icon({ focused: selected, color: "#000" })}

        {isLarge && (
          <span
            style={[
              {
                color: "#000",
                // color: "#e7e9ea",
                fontSize: 20,
                marginLeft: 20,
                marginRight: 16,
                lineHeight: 24,
              },
              selected && {
                fontWeight: "bold",
              },
            ]}
          >
            {children}
          </span>
        )}
      </div>
    </Link>
  );
}

function ProfileImage({ style, ...props }) {
  return (
    <Image
      {...props}
      alt="Evan Bacon"
      source={{
        uri: "https://pbs.twimg.com/profile_images/1452152950810234886/-1PK6cNp_bigger.jpg",
        // uri: "https://miro.medium.com/fit/c/48/48/0*7hpwPqrKW-8i1C3u.jpg",
      }}
      style={[
        {
          backgroundColor: "#71767b",
          width: 24,
          height: 24,
          borderRadius: 999,
          boxShadow: "rgb(0 0 0 / 5%) 0px 0px 0px 1px inset",
        },
        style,
      ]}
    />
  );
}

// import { createContext } from '@radix-ui/react-context';

export default function App({ children }) {
  const isRowLayout = useWidth(600);

  if (!isRowLayout) {
    return (
      <Tabs
        screenOptions={{
          tabBarShowLabel: false,
          headerShown: false,
          tabBarActiveTintColor: "black",
        }}
      >
        <Tabs.Screen
          name="(index)"
          options={{
            title: "Feed",
            tabBarIcon: makeIcon("home"),
          }}
        />

        <Tabs.Screen
          name="(games)"
          options={{
            // TODO:
            href: null,

            title: "Games",
            tabBarIcon: makeIcon("game-controller"),
          }}
        />
        <Tabs.Screen
          name="(media)"
          options={{
            title: "Media",
            tabBarIcon: makeIcon("mic"),
          }}
        />

        <Tabs.Screen
          name="(lego)"
          options={{
            // TODO:
            href: null,
            title: "Lego",
            tabBarIcon: makeIcon("build"),
          }}
        />

        <Tabs.Screen
          name="(about)"
          options={{
            title: "Evan Bacon",
            tabBarIcon: makeIcon("person"),
          }}
        />
      </Tabs>
    );
  }

  return (
    <View
      style={[{ flex: 1 }, isRowLayout && { flexDirection: "row-reverse" }]}
    >
      {!isRowLayout && <CustomHeader />}
      <Navigator router={TabRouter}>
        <View style={{ flex: 1 }}>
          <Slot />
        </View>
        {isRowLayout ? <SideBar /> : <CustomTabBar />}
      </Navigator>
    </View>
  );
}

const DARK = "rgba(41, 41, 41, 1)";
const GOLD = "#A8A8A8";

function CustomTabBar() {
  return (
    <TabBar>
      <a href="#">
        <Icons.Home style={{ color: DARK }} />
      </a>
      <a href="#">
        <Icons.Search style={{ color: GOLD }} />
      </a>
      <a href="#">
        <Icons.Lists style={{ color: GOLD }} />
      </a>
      <a href="#">
        <ProfileImage
          style={{
            width: 24,
            height: 24,
          }}
        />
      </a>
    </TabBar>
  );
}

function CustomHeader() {
  const { top } = useSafeAreaInsets();
  return (
    <View
      asChild
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,

        zIndex: 100,
        height: 56 + top,
        paddingTop: top,

        // FML -- Shadows in RN suck
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 2,
        shadowOpacity: 0.15,
        shadowColor: "black",

        boxShadow: "0px -2px 10px rgb(0 0 0 / 15%)",
        flexDirection: "row",
        flex: 1,
        paddingHorizontal: 24,
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: "white",
      }}
    >
      <header>
        <a href="#">
          <div
            style={{
              justifyContent: "center",
              alignItems: "center",
              padding: 5,
              borderWidth: 1,
              borderRadius: 100,
              borderColor: "rgba(230, 230, 230, 1)",
            }}
          >
            <Icons.Notifications
              style={{ width: 25, height: 25, color: GOLD }}
            />
          </div>
        </a>
      </header>
    </View>
  );
}

function TabBar({ children, style }) {
  const { bottom } = useSafeAreaInsets();
  const childrenArray = React.Children.toArray(children);

  const newChildren = childrenArray.map((child, index) => {
    return (
      <View
        key={String(index)}
        asChild
        center
        style={{
          display: "flex",
          flex: 1,
        }}
      >
        {child}
      </View>
    );
  });

  return (
    <View
      asChild
      style={[
        {
          maxHeight: 56 + bottom,
          height: 56 + bottom,

          shadowOffset: { width: 0, height: -2 },
          shadowRadius: 2,
          shadowOpacity: 0.15,
          shadowColor: "black",

          boxShadow: "0px 2px 10px rgb(0 0 0 / 15%)",
          flexDirection: "row",
          flex: 1,
          alignItems: "stretch",
          backgroundColor: "white",

          paddingBottom: bottom,
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
        },
        style,
      ]}
    >
      <nav>{newChildren}</nav>
    </View>
  );
}
