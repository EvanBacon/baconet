import {
  createNavigatorFactory,
  DefaultNavigatorOptions,
  ParamListBase,
  TabActionHelpers,
  TabNavigationState,
  TabRouter,
  TabRouterOptions,
  useNavigationBuilder,
} from "@react-navigation/native";
import * as React from "react";
import warnOnce from "warn-once";
import { Navigator, withLayoutContext } from "expo-router";

import type { BottomTabNavigationConfig } from "@react-navigation/bottom-tabs/src/types";

import {
  BottomTabNavigationEventMap,
  BottomTabNavigationOptions,
  BottomTabView,
} from "@react-navigation/bottom-tabs";

type Props = DefaultNavigatorOptions<
  ParamListBase,
  TabNavigationState<ParamListBase>,
  BottomTabNavigationOptions,
  BottomTabNavigationEventMap
> &
  TabRouterOptions &
  BottomTabNavigationConfig;

function BottomTabNavigator({
  id,
  initialRouteName,
  backBehavior,
  children,
  screenListeners,
  screenOptions,
  sceneContainerStyle,
  ...restWithDeprecated
}: Props) {
  const {
    // @ts-expect-error: lazy is deprecated
    lazy,
    // @ts-expect-error: tabBarOptions is deprecated
    tabBarOptions,

    customView,
    ...rest
  } = restWithDeprecated;

  let defaultScreenOptions: BottomTabNavigationOptions = {};

  if (tabBarOptions) {
    Object.assign(defaultScreenOptions, {
      tabBarHideOnKeyboard: tabBarOptions.keyboardHidesTabBar,
      tabBarActiveTintColor: tabBarOptions.activeTintColor,
      tabBarInactiveTintColor: tabBarOptions.inactiveTintColor,
      tabBarActiveBackgroundColor: tabBarOptions.activeBackgroundColor,
      tabBarInactiveBackgroundColor: tabBarOptions.inactiveBackgroundColor,
      tabBarAllowFontScaling: tabBarOptions.allowFontScaling,
      tabBarShowLabel: tabBarOptions.showLabel,
      tabBarLabelStyle: tabBarOptions.labelStyle,
      tabBarIconStyle: tabBarOptions.iconStyle,
      tabBarItemStyle: tabBarOptions.tabStyle,
      tabBarLabelPosition:
        tabBarOptions.labelPosition ??
        (tabBarOptions.adaptive === false ? "below-icon" : undefined),
      tabBarStyle: [
        { display: tabBarOptions.tabBarVisible ? "none" : "flex" },
        defaultScreenOptions.tabBarStyle,
      ],
    });

    (
      Object.keys(defaultScreenOptions) as (keyof BottomTabNavigationOptions)[]
    ).forEach((key) => {
      if (defaultScreenOptions[key] === undefined) {
        // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
        delete defaultScreenOptions[key];
      }
    });

    warnOnce(
      tabBarOptions,
      `Bottom Tab Navigator: 'tabBarOptions' is deprecated. Migrate the options to 'screenOptions' instead.\n\nPlace the following in 'screenOptions' in your code to keep current behavior:\n\n${JSON.stringify(
        defaultScreenOptions,
        null,
        2
      )}\n\nSee https://reactnavigation.org/docs/bottom-tab-navigator#options for more details.`
    );
  }

  if (typeof lazy === "boolean") {
    defaultScreenOptions.lazy = lazy;

    warnOnce(
      true,
      `Bottom Tab Navigator: 'lazy' in props is deprecated. Move it to 'screenOptions' instead.\n\nSee https://reactnavigation.org/docs/bottom-tab-navigator/#lazy for more details.`
    );
  }

  return (
    <Navigator
      id={id}
      initialRouteName={initialRouteName}
      backBehavior={backBehavior}
      screenListeners={screenListeners}
      screenOptions={screenOptions}
      defaultScreenOptions={defaultScreenOptions}
    >
      {children}

      {!!customView ? (
        customView
      ) : (
        <ContextBottomTabView
          {...rest}
          sceneContainerStyle={sceneContainerStyle}
        />
      )}
    </Navigator>
  );
}

function ContextBottomTabView(props) {
  const { state, descriptors, navigation } = Navigator.useContext();
  return (
    <BottomTabView
      {...props}
      state={state}
      navigation={navigation}
      descriptors={descriptors}
    />
  );
}

const createBottomTabNavigator = createNavigatorFactory<
  TabNavigationState<ParamListBase>,
  BottomTabNavigationOptions,
  BottomTabNavigationEventMap,
  typeof BottomTabNavigator
>(BottomTabNavigator);

const BottomTabNavigator_ = createBottomTabNavigator().Navigator;

export const Tabs = withLayoutContext<
  BottomTabNavigationOptions,
  typeof BottomTabNavigator_
>(BottomTabNavigator_);
