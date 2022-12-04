import { Footer, H1, A, Header, Nav } from "@expo/html-elements";
import React from "react";
import {
  Image,
  Platform,
  SafeAreaView,
  useWindowDimensions,
} from "react-native";

// import { A } from "../Anchor";
import * as Icons from "../../components/medium";
import { View } from "@bacons/react-views";

import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { Children, Link, Stack, Tabs } from "expo-router";
function HeaderLogo() {
  return (
    <A style={{ paddingVertical: 40 }}>
      <H1
        style={{
          margin: 0,
          display: "flex",
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          maxHeight: 23,
        }}
      >
        <Icons.Logo fill={DARK} style={{ height: 30 }} />
      </H1>
    </A>
  );
}

function useWidth(size) {
  const { width } = useWindowDimensions();
  return width >= size;
}

function VerticalTabBar({ children }) {
  const childrenArray = React.Children.toArray(children);

  const newChildren = childrenArray.map((child, index) => {
    return (
      <View
        key={String(index)}
        asChild
        center
        style={{ display: "flex", paddingBottom: 35 }}
      >
        {child}
      </View>
    );
  });

  return <Nav>{newChildren}</Nav>;
}

function SideBar() {
  const isLarge = useWidth(1265);
  const isMedSideBar = useWidth(600);
  return (
    <View
      style={[
        { alignItems: "flex-end", minWidth: 60 },

        !isLarge && {
          width: "16%",
        },
        !isMedSideBar && {
          width: 60,
        },
        isMedSideBar && {
          minWidth: 88,
        },
      ]}
    >
      <Header
        zIndex={3}
        style={[
          {
            //   position: "fixed",
            //   left: 0,
            //   top: 0,
            //   bottom: 0,

            //   height: "100%",
            //   justifyContent: "space-between",
            alignItems: "stretch",
            //   width: 80,
            borderRightWidth: 1,
            borderRightColor: "rgb(230, 230, 230)",
          },

          {
            width: 60,
            paddingHorizontal: 4,

            height: "100%",
            justifyContent: "space-between",
          },
          isMedSideBar && {
            width: 88,
            paddingHorizontal: 12,
          },
          !isLarge && {
            alignItems: "center",
          },
          isLarge && {
            width: 275,
          },
        ]}
      >
        <HeaderLogo />

        <VerticalTabBar>
          <Link href="/">
            <Icons.Home />
          </Link>
          <Link href="/lego">
            <Icons.Lego />
          </Link>
          <Link href="/games">
            <Icons.Game />
          </Link>
          <Link href="/media">
            <Icons.Listen />
          </Link>
          <View>
            <View
              style={{
                width: "33%",
                backgroundColor: "rgba(230, 230, 230, 1)",
                maxHeight: 1,
                height: 1,
              }}
            />
          </View>
          <Link href="#">
            <Icons.Link />
          </Link>
        </VerticalTabBar>

        <Footer
          style={{
            justifyContent: "center",
            alignItems: "center",
            marginVertical: 16,
          }}
        >
          <A
            style={{ width: 32, marginVertical: 8, height: 32 }}
            href="https://github.com/evanbacon/portfolio"
            hrefAttrs={{ target: "_blank" }}
            target="_blank"
          >
            <Icons.Code />
          </A>
        </Footer>
      </Header>
    </View>
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

function App({ children }) {
  const isRowLayout = useWidth(600);
  const { top, bottom } = useSafeAreaInsets();

  if (!isRowLayout) {
    return <Tabs />;
  }

  return (
    <View
      style={[{ flex: 1 }, isRowLayout && { flexDirection: "row-reverse" }]}
    >
      {!isRowLayout && <CustomHeader />}
      <View style={{ flex: 1 }}>{children}</View>
      {isRowLayout ? <SideBar /> : <CustomTabBar />}
    </View>
  );
}

export default function VirtualApp() {
  return (
    <SafeAreaProvider>
      <App>
        <Children />
      </App>
    </SafeAreaProvider>
  );
}

const DARK = "rgba(41, 41, 41, 1)";
const GOLD = "#A8A8A8";

function CustomTabBar() {
  return (
    <TabBar>
      <A href="#">
        <Icons.Home style={{ color: DARK }} />
      </A>
      <A href="#">
        <Icons.Search style={{ color: GOLD }} />
      </A>
      <A href="#">
        <Icons.Lists style={{ color: GOLD }} />
      </A>
      <A href="#">
        <ProfileImage
          style={{
            width: 24,
            height: 24,
          }}
        />
      </A>
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
      <Header>
        <A href="#">
          <View
            center
            style={{
              padding: 5,
              borderWidth: 1,
              borderRadius: 100,
              borderColor: "rgba(230, 230, 230, 1)",
            }}
          >
            <Icons.Notifications
              style={{ width: 25, height: 25, color: GOLD }}
            />
          </View>
        </A>
      </Header>
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
      <Nav>{newChildren}</Nav>
    </View>
  );
}
