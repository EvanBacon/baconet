import { useScrollProps } from "@bacons/expo-router-top-tabs";
import { Link, useHref } from "expo-router";
import React from "react";
import { Image, ScrollView, Text, View } from "react-native";

import {
  Lego,
  Podcasts,
  Project,
  Projects,
} from "../../../../../components/data";
import { getItem } from "../../../../../components/fetchItem";
import { ScreenScroller } from "../../../../../components/ScreenScroller";

function getRelated(index: number) {
  return [
    Projects[index % Projects.length],
    Lego[index % Lego.length],
    Podcasts[index % Podcasts.length],
  ];
}

export { ErrorBoundary } from "expo-router";

export default function Page() {
  const route = useHref();
  const props = useScrollProps();

  // getItem();
  return (
    <ScreenScroller {...props}>
      <View style={{ paddingHorizontal: 12 }}></View>
    </ScreenScroller>
  );
}
