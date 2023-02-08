import { Head } from "@bacons/head";
import { View } from "@bacons/react-views";
import { NavigationHelpersContext } from "@react-navigation/native";
import { Link } from "expo-router";
import React from "react";
import {
  Platform,
  Pressable,
  useWindowDimensions,
  ViewStyle,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import * as Icons from "../../components/medium";
import { makeIcon, TabBarIcon } from "../../components/TabBarIcon";
import { TabbedNavigator } from "../../components/TabbedSlot";

function HeaderLogo() {
  return (
    <Link style={{ paddingVertical: 40 }} href="/" replace>
      <h1
        style={{
          margin: 0,
          display: "flex",
          flex: 1,
          alignItems: "center",
          maxHeight: 23,
          marginVertical: 2,
        }}
      >
        <Icons.Logo fill={DARK} style={{ height: 30 }} />
      </h1>
    </Link>
  );
}

function useWidth(size) {
  const { width } = useWindowDimensions();
  return width >= size && Platform.OS === "web";
}

function SideBar({ visible }) {
  const isLarge = useWidth(1265);

  return (
    <div
      style={[
        !visible && {
          display: "none",
        },
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
            position: Platform.select({ web: "fixed", default: "absolute" }),
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

          <nav>
            <SideBarTabItem name="(index)" icon={makeIcon("home")}>
              Home
            </SideBarTabItem>
            <SideBarTabItem name="(media)" icon={makeIcon("mic")}>
              Media
            </SideBarTabItem>
            <SideBarDivider />
            <SideBarTabItem name="about" icon={makeIcon("information-circle")}>
              About
            </SideBarTabItem>
          </nav>
          <div />
        </header>
      </div>
    </div>
  );
}

function TabBar({ visible }) {
  return (
    <div
      style={{
        paddingBottom: 0,
        display: visible ? "flex" : "none",
      }}
    >
      <nav
        style={{
          flexDirection: "row",
          borderTopWidth: 1,
          borderTopColor: "rgba(230, 230, 230, 1)",
          justifyContent: "space-around",
          alignItems: "center",
          height: 49,
          paddingHorizontal: 16,
        }}
      >
        {[
          { name: "(index)", icon: "home" },
          { name: "(media)", icon: "mic" },
          { name: "about", icon: "information-circle" },
        ].map((tab, i) => (
          <TabBarItem key={i} name={tab.name}>
            {({ focused, pressed, hovered }) => (
              <TabBarIcon
                color="black"
                style={[
                  {
                    paddingHorizontal: 8,
                  },
                  Platform.select({
                    web: {
                      transitionDuration: "100ms",
                      transform: hovered ? [{ scale: 1.1 }] : [],
                    },
                  }),
                  pressed && {
                    transform: [{ scale: 0.9 }],
                    opacity: 0.8,
                  },
                ]}
                name={tab.icon}
                focused={focused}
              />
            )}
          </TabBarItem>
        ))}
      </nav>
    </div>
  );
}

function SideBarDivider() {
  const isLarge = useWidth(1265);

  return (
    <div style={{ paddingBottom: 35 }}>
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
  );
}

function useIsTabSelected(name: string): boolean {
  const navigation = React.useContext(NavigationHelpersContext)!;

  const state = navigation.getState();
  const current = state.routes.find((route, i) => state.index === i);

  return current.name === name;
}

function TabBarItem({
  children,
  name,
  style,
  hoverStyle,
}: {
  children?: any;
  name: string;
  style?: ViewStyle;
  hoverStyle?: ViewStyle;
}) {
  const focused = useIsTabSelected(name);

  return (
    <TabbedNavigator.Link
      hoverStyle={hoverStyle}
      name={name}
      asChild
      style={style}
    >
      <Pressable>{(props) => children({ ...props, focused })}</Pressable>
    </TabbedNavigator.Link>
  );
}

function SideBarTabItem({
  children,
  icon,
  name,
}: {
  children: string;
  icon: (props: { focused?: boolean; color: string }) => JSX.Element;
  name: string;
}) {
  const isLarge = useWidth(1265);

  return (
    <div style={{ paddingBottom: 35 }}>
      <TabBarItem
        name={name}
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
        {({ focused }) => (
          <div
            style={{
              padding: 12,
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            {icon({ focused, color: "#000" })}

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
                  focused && {
                    fontWeight: "bold",
                  },
                ]}
              >
                {children}
              </span>
            )}
          </div>
        )}
      </TabBarItem>
    </div>
  );
}

export default function App() {
  const isRowLayout = useWidth(600);

  return (
    <>
      <GlobalHead />
      {/* <Tabs /> */}
      <TabbedNavigator
        screenOptions={{
          tabBarShowLabel: false,
          headerShown: false,
          tabBarActiveTintColor: "black",
        }}
      >
        <View
          style={{
            flex: 1,
            flexDirection: isRowLayout ? "row" : "column",
          }}
        >
          <SideBar visible={isRowLayout} />
          <TabbedNavigator.Slot />
          <TabBar visible={!isRowLayout} />
        </View>

        <TabbedNavigator.Screen
          name="(index)"
          options={{
            title: "Feed",
            tabBarIcon: makeIcon("home"),
          }}
        />

        <TabbedNavigator.Screen
          name="(media)"
          options={{
            title: "Media",
            tabBarIcon: makeIcon("mic"),
          }}
        />

        <TabbedNavigator.Screen
          name="about"
          options={{
            title: "Evan Bacon",
            tabBarIcon: makeIcon("person"),
          }}
        />
      </TabbedNavigator>
    </>
  );
}

function GlobalHead() {
  return (
    <Head>
      {/* favicon */}
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/apple-touch-icon.png"
      />
      <link rel="manifest" href="/manifest.json" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32.png" />
      <link rel="shortcut icon" href="/favicon.ico" />
      <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#4630eb" />

      <meta name="robots" content="index, follow" />
      <meta
        name="googlebot"
        content="index, follow, max-video-preview:-1, max-image-preview:large, max-snippet:-1"
      />
    </Head>
  );
}

const DARK = "rgba(41, 41, 41, 1)";
