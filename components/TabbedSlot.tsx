import { Navigator } from "expo-router";
import * as React from "react";
import { StyleSheet, ViewStyle } from "react-native";
import { Screen, ScreenContainer } from "react-native-screens";

function useNavigatorContext() {
  const context = Navigator.useContext();

  console.log("useNavigatorContext", context);
  if (
    !(
      context.router.name === "TabRouter" || context.router instanceof TabRouter
    )
  ) {
    throw new Error(
      "useTabbedSlot must be used inside a Navigator with a tab router: <Navigator route={TabRouter} />"
    );
  }

  return context;
}

import { TabRouter } from "@react-navigation/routers";

export function TabbedNavigator(props: React.ComponentProps<typeof Navigator>) {
  return <Navigator {...props} router={TabRouter} />;
}

export default function TabbedSlot({
  detachInactiveScreens = true,
  style,
}: {
  detachInactiveScreens?: boolean;
  style?: ViewStyle;
}) {
  const { state, descriptors } = useNavigatorContext();
  const focusedRouteKey = state.routes[state.index].key;
  const [loaded, setLoaded] = React.useState([focusedRouteKey]);

  if (!loaded.includes(focusedRouteKey)) {
    setLoaded([...loaded, focusedRouteKey]);
  }

  const { routes } = state;

  return (
    <ScreenContainer
      enabled={detachInactiveScreens}
      hasTwoStates
      style={styles.container}
    >
      {routes.map((route, index) => {
        const descriptor = descriptors[route.key];
        const { lazy = true, unmountOnBlur } = descriptor.options;
        const isFocused = state.index === index;

        if (unmountOnBlur && !isFocused) {
          return null;
        }

        if (lazy && !loaded.includes(route.key) && !isFocused) {
          // Don't render a lazy screen if we've never navigated to it
          return null;
        }

        return (
          <Screen
            activityState={isFocused ? 2 : 0}
            key={route.key}
            style={[
              StyleSheet.absoluteFill,
              { overflow: "hidden", zIndex: isFocused ? 0 : -1 },
              style,
            ]}
            accessibilityElementsHidden={!isFocused}
            importantForAccessibility={
              isFocused ? "auto" : "no-hide-descendants"
            }
            enabled={detachInactiveScreens}
            freezeOnBlur={descriptor.options.freezeOnBlur}
          >
            {descriptor.render()}
          </Screen>
        );
      })}
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    overflow: "hidden",
  },
});
