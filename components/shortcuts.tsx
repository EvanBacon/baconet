import { requireNativeModule } from "expo-modules-core";
import { usePathname } from "expo-router";
import { useEffect } from "react";
import { StyleSheet, Platform } from "react-native";

export type Shortcut = {
  id?: string;
  title: string;
  subtitle?: string;
  icon?:
    | "compose"
    | "play"
    | "pause"
    | "add"
    | "location"
    | "search"
    | "share"
    | "prohibit"
    | "contact"
    | "home"
    | "markLocation"
    | "favorite"
    | "love"
    | "cloud"
    | "invitation"
    | "confirmation"
    | "mail"
    | "message"
    | "date"
    | "time"
    | "capturePhoto"
    | "captureVideo"
    | "task"
    | "taskCompleted"
    | "alarm"
    | "bookmark"
    | "shuffle"
    | "audio"
    | "update";
  info: {
    href: string;
  };
};

function urlToId(url) {
  return url.replace(/[^a-zA-Z0-9]/g, "-");
}

export function defineShortcuts(shortcuts: Shortcut[]) {
  // It loads the native module object from the JSI or falls back to
  // the bridge module (from NativeModulesProxy) if the remote debugger is on.
  const ExpoHead = requireNativeModule("ExpoHead");
  if (!ExpoHead.defineShortcuts) {
    return;
  }
  ExpoHead.defineShortcuts(
    shortcuts.map((value) => ({
      id: String(Date.now() + Math.random()),
      ...value,
    }))
  );
}

let shortcuts: Shortcut[] = [];

export function MetaShortcut(props: Omit<Shortcut, "info">) {
  if (Platform.OS !== "ios") {
    return null;
  }
  const href = usePathname();

  useEffect(() => {
    shortcuts = shortcuts.filter((value) => value.info.href !== href);
    shortcuts.push({
      id: urlToId(href) + "-shortcut",
      ...props,
      info: {
        href,
      },
    });
    defineShortcuts(shortcuts);
  }, [props]);

  return null;
}

export function ShortcutBanner() {
  const { query } = useHref();

  if (query.ref !== "shortcut") {
    return null;
  }
  return (
    <div style={{ padding: 8, marginVertical: 8, borderWidth: 1 }}>
      <span style={styles.subtitle}>Shortcut:</span>
      <span>Title: {decodeURIComponent(query.title)}</span>
      <span>ID: {query.id}</span>
      {query.subtitle && (
        <span>Subtitle: {decodeURIComponent(query.subtitle)}</span>
      )}
    </div>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 24,
  },
  main: {
    flex: 1,
    justifyContent: "center",
    maxWidth: 960,
    marginHorizontal: "auto",
  },
  title: {
    fontSize: 64,
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 36,
    color: "#38434D",
  },
});
