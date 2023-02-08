import "./components/fetch";
// import "expo-router/entry";

import "@expo/metro-runtime";

import { ExpoRoot } from "expo-router";
import Head from "expo-router/head";

import { renderRootComponent } from "expo-router/build/renderRootComponent";

// We add this elsewhere for rendering
const HeadProvider =
  typeof window === "undefined" ? React.Fragment : Head.Provider;

const ctx = require.context("./app");

// Must be exported or Fast Refresh won't update the context >:[
export function App(props) {
  process.env.IS_APP_CLIP = props.isClip;
  return (
    <HeadProvider>
      <ExpoRoot context={ctx} />
    </HeadProvider>
  );
}

renderRootComponent(App);
