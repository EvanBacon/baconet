import { StyleSheet, Text, View } from "@bacons/react-views";
import Constants from "expo-constants";
import { createURL } from "expo-linking";
import * as Updates from "expo-updates";
import React from "react";
import { DevSettings, ScrollView } from "react-native";

async function reloadAsync() {
  try {
    await Updates.reloadAsync();
  } catch {
    await DevSettings.reload();
  }
}

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
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{
        alignItems: "stretch",
      }}
    >
      <View style={styles.main}>
        <KVPair k="App Version" value={Constants.nativeAppVersion} />
        <KVPair k="Build Version" value={Constants.nativeBuildVersion} />
        <KVPair k="URI" value={createURL("")} />
      </View>
    </ScrollView>
  );
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
