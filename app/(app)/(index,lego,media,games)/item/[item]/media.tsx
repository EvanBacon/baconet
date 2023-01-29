import { useScrollProps } from "@bacons/expo-router-top-tabs";
import React from "react";

import { Lego, Podcasts, Projects } from "../../../../../components/data";
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
  const props = useScrollProps();
  // getItem();
  return (
    <ScreenScroller {...props}>
      <div style={{ paddingHorizontal: 12 }}></div>
    </ScreenScroller>
  );
}
