import { StyleSheet, Text, View } from "@bacons/react-views";

import * as Updates from "expo-updates";
import React, { useEffect } from "react";
import {
  DevSettings,
  Pressable,
  RefreshControl,
  ScrollView,
} from "react-native";

async function reloadAsync() {
  try {
    await Updates.reloadAsync();
  } catch {
    await DevSettings.reload();
  }
}

import { getDevServer } from "expo-router/build/getDevServer";

// expo-updates doesn't work in dev mode cuz why would
// anyone want to test anything... so here we just create
// a fake date based on when the bundle was loaded.
const FAKE_CREATED_AT = new Date();

function useTimer(callback: () => void, interval: number) {
  React.useEffect(() => {
    const timer = setInterval(callback, interval);
    return () => clearInterval(timer);
  }, [callback, interval]);
}

type State = {
  error: null | Error;
  lastUpdatedAt: Date | null;
  update: null | Updates.UpdateCheckResult;
  loading: boolean;
};

export default function Page() {
  const [{ update, loading, error, lastUpdatedAt }, setState] =
    React.useReducer<React.Reducer<State, Partial<State>>>(
      (state, newState) => ({ ...state, ...newState }),
      {
        error: null,
        lastUpdatedAt: null,
        update: null,
        loading: false,
      }
    );

  const checkForUpdates = async () => {
    setState({ loading: true });
    try {
      const update = await Updates.checkForUpdateAsync();

      setState({
        error: null,
        loading: false,
        update,
        lastUpdatedAt: new Date(),
      });
    } catch (error) {
      setState({
        error,
        loading: false,
        update: null,
        lastUpdatedAt: new Date(),
      });
    }
  };

  const checkInterval = React.useCallback(() => {
    if (!error) {
      checkForUpdates();
    }
  }, [error]);

  //   useTimer(checkInterval, 1000);
  useEffect(() => {
    checkInterval();
  }, []);

  //   TODO: Show preview info from the new update using the manifest
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{
        alignItems: "stretch",
        paddingBottom: 48,
      }}
      refreshControl={
        <RefreshControl
          tintColor={"white"}
          refreshing={loading}
          onRefresh={checkForUpdates}
        />
      }
    >
      <View style={styles.main}>
        {error && <ErrorView error={error} retry={checkForUpdates} />}

        <RefreshButton update={update} />

        <View
          style={{
            borderWidth: 0.5,
            borderColor: "white",
            marginBottom: 12,
          }}
        />

        <KVPair
          k="Created"
          value={dateToString(Updates.createdAt ?? FAKE_CREATED_AT)}
        />
        <KVPair
          k="URL"
          value={
            Updates.manifest?.bundleUrl ?? getDevServer()?.url ?? "unknown"
          }
        />
        <KVPair k="Emergency Launched" value={Updates.isEmergencyLaunch} />
        <KVPair k="ID" value={Updates.updateId} />
        <KVPair k="Runtime Version" value={Updates.runtimeVersion || "N/A"} />

        <KVPair k="Release Channel" value={Updates.releaseChannel} />
        <KVPair k="Channel" value={Updates.channel} />
        <KVPair
          k="Manifest"
          value={"\n" + JSON.stringify(Updates.manifest, null, 2)}
        />
        {Updates.isUsingEmbeddedAssets && (
          <>
            <View
              style={{
                borderWidth: 0.5,
                borderColor: "white",
                marginVertical: 12,
              }}
            />
            <Text style={[styles.subtitle]}>Assets</Text>
            {Object.entries(Updates.localAssets).map(([k, v]) => (
              <KVPair k={k} value={v} />
            ))}
          </>
        )}
      </View>
    </ScrollView>
  );
}

type ButtonState = {
  update: null | Updates.UpdateFetchResult;
  loading: boolean;
  error: Error | null;
};

function fetchUpdateAsync(): Promise<Updates.UpdateFetchResult> {
  if (process.env.NODE_ENV === "development") {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // reject(new Error("Not supported in dev mode"));
        resolve({
          isNew: true,
          manifest: {
            id: Date.now().toString(),
            createdAt: new Date().toISOString(),
            bundleUrl: "https://acme.com",
            extra: {
              bacon: "🥓",
            },
          },
        });
      }, 3000);
    });
  }

  return Updates.fetchUpdateAsync();
}

function ErrorView({
  error,
  retry,
  style,
}: {
  error: Error;
  retry: () => void;
  style?: any;
}) {
  return (
    <View
      style={[
        {
          padding: 16,
          borderColor: "firebrick",
          borderWidth: 1,
        },
        style,
      ]}
    >
      <Text
        style={{
          color: "white",
        }}
      >
        {">"} Error: {error.message}
      </Text>
      <Pressable onPress={retry}>
        <Text
          style={{
            color: "white",
            marginTop: 8,
          }}
        >
          Retry
        </Text>
      </Pressable>
    </View>
  );
}

const BUTTON_STYLES = {
  launch: {
    backgroundColor: "#454758",
    color: "white",
    borderColor: "transparent",
    selected: {
      backgroundColor: "#6e718c",
    },
  },
  download: {
    backgroundColor: "transparent",
    color: "white",
    borderColor: "white",
    selected: {
      backgroundColor: "#6e718c",
      borderColor: "#6e718c",
    },
  },
  reload: {
    backgroundColor: "transparent",
    color: "#38434D",
    borderColor: "#38434D",
    selected: {
      backgroundColor: "#38434D",
      color: "white",
    },
  },
  downloading: {
    backgroundColor: "#21222B",
    color: "white",
    borderColor: "transparent",
    selected: {},
  },
};
function RefreshButton({}) {
  const update = { isAvailable: true };
  const [{ loading, error, ...state }, setState] = React.useReducer<
    React.Reducer<ButtonState, Partial<ButtonState>>
  >((state, newState) => ({ ...state, ...newState }), {
    error: null,

    update: null,
    loading: false,
  });

  const isLaunchNew = !!state.update?.isNew;

  const canDownload = !loading && update && !state.update;

  const style = loading
    ? BUTTON_STYLES.downloading
    : isLaunchNew
    ? BUTTON_STYLES.launch
    : canDownload
    ? BUTTON_STYLES.download
    : BUTTON_STYLES.reload;

  const selectedStyle = { ...style, ...style.selected };

  function download() {
    setState({ loading: true, error: null });

    fetchUpdateAsync()
      .then((update) => {
        setState({ update, loading: false, error: null });
      })
      .catch((e) => {
        setState({ update: null, loading: false, error: e });
      });
  }

  return (
    <>
      <Pressable
        style={{
          marginVertical: 12,
        }}
        disabled={loading}
        onPress={() => {
          if (canDownload) {
            download();
          } else {
            if (process.env.NODE_ENV === "development") {
              setState({ update: null, loading: false, error: null });
            } else {
              reloadAsync();
            }
          }
        }}
      >
        {({ pressed }) => {
          const _style = pressed ? selectedStyle : style;
          return (
            <View
              style={{
                borderColor: _style.borderColor,
                borderWidth: 1,
                justifyContent: "center",
                alignItems: "center",
                padding: 16,
                backgroundColor: _style.backgroundColor,
              }}
            >
              <Text style={[styles.subtitle, { color: _style.color }]}>
                {loading
                  ? "Downloading..."
                  : isLaunchNew
                  ? "Launch"
                  : update?.isAvailable
                  ? "Update"
                  : "Reload"}
              </Text>
            </View>
          );
        }}
      </Pressable>
      {error && (
        <ErrorView
          error={error}
          retry={download}
          style={{ marginBottom: 12 }}
        />
      )}
    </>
  );
}

// Show day and time hours and minutes
function dateToString(date: Date) {
  return date.toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  });
}

function KVPair({ k, value }) {
  return (
    <Text style={styles.subtitle}>
      {k}
      <Text
        style={{
          color: "#EE82C3",
        }}
      >
        :
      </Text>{" "}
      <Text style={{ color: "#E6EB93" }}>{String(value ?? "undefined")}</Text>
    </Text>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    padding: 12,
  },
  main: {
    flex: 1,
  },
  title: {
    fontSize: 64,
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 18,
    color: "#fff",
  },
});
