import { Head } from "@bacons/head";
import { View } from "@bacons/react-views";
import {
  CommonActions,
  NavigationHelpersContext,
} from "@react-navigation/native";
import { Link, Navigator } from "expo-router";
import { QualifiedSlot, Slot } from "expo-router/build/views/Layout";
import React from "react";
import { useWindowDimensions } from "react-native";

import * as Icons from "../../components/medium";
import { Tabs } from "../../components/tab-bar/BottomTabs";
import { makeIcon } from "../../components/TabBarIcon";

function HeaderLogo() {
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

function SideBar() {
  const isLarge = useWidth(1265);

  const navigation = React.useContext(NavigationHelpersContext)!;

  const state = navigation.getState();
  const current = state.routes.find((route, i) => state.index === i);

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

          <nav>
            <SideBarTabItem
              name="index"
              selected={current.name === "(index)"}
              href="/"
              icon={makeIcon("home")}
            >
              Home
            </SideBarTabItem>
            <SideBarTabItem
              name="(media)"
              href="/media"
              selected={current.name === "(media)"}
              icon={makeIcon("mic")}
            >
              Media
            </SideBarTabItem>
            <SideBarDivider />
            <SideBarTabItem
              name="about"
              href="/about"
              selected={current.name === "(about)"}
              icon={makeIcon("person")}
            >
              Media
            </SideBarTabItem>
          </nav>

          <footer
            style={{
              justifyContent: "center",
              alignItems: "center",
              marginVertical: 16,
            }}
          >
            {false && (
              <a
                style={{ width: 32, marginVertical: 8, height: 32 }}
                href="https://github.com/evanbacon/portfolio"
                target="_blank"
              >
                <Icons.Code />
              </a>
            )}
          </footer>
        </header>
      </div>
    </div>
  );
}

function SideBarDivider() {
  const isLarge = useWidth(1265);

  return (
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
  );
}

function useContextRoute(name: string) {
  const context = Navigator.useContext();

  const { state, descriptors } = context;

  const current = state.routes.find((route, i) => {
    return route.name === name;
  });

  if (!current) {
    console.warn(
      `Could not find route with name: ${name}. Options: ${state.routes
        .map((r) => r.name)
        .join(", ")}`
    );
  }

  // const current = state.routes.find((route, i) => {
  //   return state.index === i;
  // });

  if (!current) {
    return null;
  }

  return {
    route: current,
    descriptor: descriptors[current.key],
  };
}

function TabLink({ focused, name, ...props }) {
  const { state, navigation } = Navigator.useContext();
  const ctxRoute = useContextRoute(name);
  console.log("sate:", name, ctxRoute);

  if (!ctxRoute) {
    return null;
  }

  const { route } = ctxRoute;
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

function SideBarTabItem({
  children,
  href,
  icon,
  selected,
  name,
}: {
  children: string;
  href: string;
  icon: (props: { focused?: boolean; color: string }) => JSX.Element;
  selected: boolean;
  name: string;
}) {
  const isLarge = useWidth(1265);
  // const buildLink = useLinkBuilder();

  // return null;
  // console.log("side bar:", buildLink("media"));
  return (
    <TabLink
      name={name}
      href={href}
      accessibilityHasPopup="menu"
      style={{
        paddingBottom: 35,
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
    </TabLink>
  );
}

export default function App() {
  const isRowLayout = useWidth(600);

  return (
    <>
      <GlobalHead />
      <Navigator>
        <View style={{ flex: 1, flexDirection: "row" }}>
          <SideBar />
          <Slot />
        </View>
      </Navigator>
      {false && (
        <Tabs
          customView={
            isRowLayout ? (
              <View style={{ flex: 1, flexDirection: "row" }}>
                <SideBar />
                <QualifiedSlot />
              </View>
            ) : null
          }
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
            name="(media)"
            options={{
              title: "Media",
              tabBarIcon: makeIcon("mic"),
            }}
          />

          <Tabs.Screen
            name="about"
            options={{
              title: "Evan Bacon",
              tabBarIcon: makeIcon("person"),
            }}
          />
        </Tabs>
      )}
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
