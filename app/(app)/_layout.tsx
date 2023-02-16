import { Head } from "@bacons/head";
import { NavigationHelpersContext } from "@react-navigation/native";
import { Link } from "expo-router";
import React from "react";
import { Platform, useWindowDimensions, ViewStyle } from "react-native";
import { Pressable } from "@bacons/react-views";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { Icon } from "../../components/icon";
import { ReloadButton } from "../../components/reload-button";
import { makeIcon, TabBarIcon } from "../../components/TabBarIcon";
import { TabbedNavigator } from "../../components/TabbedSlot";
import { LD_EVAN_BACON } from "../../data/structured";

const DARK = "rgba(41, 41, 41, 1)";

function HeaderLogo() {
  return (
    <Link
      style={{ paddingVertical: 20, alignItems: "flex-start" }}
      href="/"
      asChild
    >
      <Pressable>
        {({ hovered }) => (
          <h1
            style={{
              margin: 0,
              display: "flex",
              flex: 1,
              alignItems: "center",
              padding: 8,
              borderRadius: 4,
              transitionProperty: ["background-color", "box-shadow"],
              transitionDuration: "200ms",
              backgroundColor: hovered ? "rgba(0, 0, 0, 0.1)" : "transparent",
            }}
          >
            <Icon name="logo" fill={DARK} height={30} width={30} />
          </h1>
        )}
      </Pressable>
    </Link>
  );
}

function useWidth(size) {
  if (typeof window === "undefined") {
    return true;
  }
  const { width } = useWindowDimensions();
  if (Platform.OS === "ios" || Platform.OS === "android") {
    return false;
  }
  return width >= size;
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
            {/* Divider */}
            <div
              style={{
                marginHorizontal: isLarge ? 0 : "auto",
                width: isLarge ? "80%" : "33%",
                backgroundColor: "rgba(230, 230, 230, 1)",
                maxHeight: 1,
                height: 1,
                marginBottom: 35,
              }}
            />

            <SideBarTabItem
              name="(about)"
              icon={makeIcon("information-circle")}
            >
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
        paddingBottom: useSafeAreaInsets().bottom,
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
          { name: "(about)", icon: "information-circle" },
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
}: {
  children?: any;
  name: string;
  style?: ViewStyle;
}) {
  const focused = useIsTabSelected(name);

  return (
    <TabbedNavigator.Link name={name} asChild style={style}>
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
          width: "100%",
        }}
      >
        {({ focused, hovered }) => (
          <div
            style={[
              {
                padding: 12,
                flexDirection: "row",
                alignItems: "center",
                borderRadius: 999,
                transitionProperty: ["background-color", "box-shadow"],
                transitionDuration: "200ms",
              },
              hovered && {
                backgroundColor: "rgba(0, 0, 0, 0.1)",
              },
            ]}
          >
            {icon({ focused, color: "#000" })}

            <span
              style={[
                {
                  display: isLarge ? "flex" : "none",
                  color: "#000",
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
      <ReloadButton />
      <GlobalHead />
      {/* <Tabs /> */}
      <TabbedNavigator
        screenOptions={{
          tabBarShowLabel: false,
          headerShown: false,
          tabBarActiveTintColor: "black",
        }}
      >
        <div
          style={{
            flex: 1,
            flexDirection: isRowLayout ? "row" : "column",
          }}
        >
          <SideBar visible={isRowLayout} />
          <TabbedNavigator.Slot />
          <TabBar visible={!isRowLayout} />
        </div>
      </TabbedNavigator>
    </>
  );
}

function GlobalHead() {
  return (
    <Head>
      <meta property="og:image" content={"/bacon.jpg"} />

      <link
        rel="apple-touch-icon"
        sizes="144x144"
        href="/apple-touch-icon.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="/favicon-32x32.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="/favicon-16x16.png"
      />
      <link rel="manifest" href="/site.webmanifest" />
      <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#000000" />
      <meta name="msapplication-TileColor" content="#000" />
      <meta name="theme-color" content="#ffffff" />

      <meta name="robots" content="index, follow" />
      <meta
        name="googlebot"
        content="index, follow, max-video-preview:-1, max-image-preview:large, max-snippet:-1"
      />
      {/* App Clip */}
      <meta name="apple-itunes-app" content="app-id=6443850777" />
      {/* <meta
        name="apple-itunes-app"
        content="app-id=6443850777, app-clip-bundle-id=app.baconet.Clip, app-clip-display=card"
      /> */}

      <script id="ld+website" type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebSite",
          name: "Evan Bacon",
          alternateName: "everywhere.run",
          url: "https://everywhere.run",
        })}
      </script>

      <script id="ld+person" type="application/ld+json">
        {JSON.stringify(LD_EVAN_BACON)}
      </script>
    </Head>
  );
}
