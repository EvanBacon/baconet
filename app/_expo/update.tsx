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
        {error && (
          <View
            style={{
              padding: 16,
              borderColor: "firebrick",
              borderWidth: 1,
            }}
          >
            <Text
              style={{
                color: "white",
              }}
            >
              {">"} Error: {error.message}
            </Text>
          </View>
        )}

        <Pressable
          style={{
            marginVertical: 12,
          }}
          onPress={() => {
            reloadAsync();
          }}
        >
          {({ pressed }) => (
            <View
              style={[
                {
                  borderColor: update?.isAvailable ? "white" : "#38434D",
                  borderWidth: 1,
                  justifyContent: "center",
                  alignItems: "center",
                  padding: 16,
                  backgroundColor: update?.isAvailable
                    ? "white"
                    : "transparent",
                },
                pressed && {
                  backgroundColor: update?.isAvailable ? "white" : "#38434D",
                },
              ]}
            >
              <Text
                style={[
                  styles.subtitle,
                  { color: update?.isAvailable ? "black" : "#38434D" },
                  pressed && { color: update?.isAvailable ? "black" : "white" },
                ]}
              >
                {update?.isAvailable ? "Update" : "Reload"}
              </Text>
            </View>
          )}
        </Pressable>

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
        <KVPair k="Runtime Version" value={Updates.runtimeVersion} />

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
