import { Stack } from "expo-router";
import React from "react";
import { Text } from "react-native";

import ProjectCard from "../../../../components/Card";
import { Lego, News, Podcasts } from "../../../../components/data";
import { ScreenScroller } from "../../../../components/ScreenScroller";

function getItem(id: string) {
  const [type, index] = id.split("-");

  switch (type) {
    case "lego":
      return Lego[parseInt(index)];
    case "media":
      return Podcasts[parseInt(index)];
    case "news":
      return News[parseInt(index)];
  }
  return null;
}
export default function Page({ route }) {
  const item = getItem(route.params?.item);
  if (!item) {
    return <Text>Nothing here: {route.params?.id}</Text>;
  }
  return (
    <>
      <Stack.Screen
        options={{
          title: item.title,
        }}
      />
      <ScreenScroller>
        <ProjectCard key={item.title} {...item} />
      </ScreenScroller>
    </>
  );
}

export { ErrorBoundary } from "expo-router";
