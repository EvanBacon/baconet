import { Head } from "@bacons/head";
import * as Linking from "expo-linking";
import { Stack, Tabs, useHref } from "expo-router";
import { useMemo } from "react";
import { StyleSheet, Text, View } from "react-native";

export default function Page() {
  const route = useHref();
  const def = useMemo(
    () => (route.query?.q ? decodeURIComponent(route.query?.q) : ""),
    [route.query?.q]
  );

  return (
    <>
      <Head>
        {/* <title>Search | Baconet</title> */}
        <meta name="description" content="Look around the bacoverse" />
        <meta name="keywords" content="look,search,find,bacon,discover" />
        <SearchIn />
      </Head>
      <Tabs.Screen name="../../" options={{ headerShown: false }} />
      <Stack.Screen
        options={{
          title: "Search",
          headerLargeTitle: true,
          headerSearchBarOptions: {
            placeholder: "Search",
            autoFocus: true,
          },
        }}
      />

      <View style={styles.container}>
        <View style={styles.main}>
          <Text style={styles.title}>Search</Text>
          <Text style={styles.subtitle}>
            ← <Text style={{ fontWeight: "bold" }}>TODO:</Text> Make this
            searchable →
          </Text>
          {def && <Text>Continued Search: "{def}"</Text>}
        </View>
      </View>
    </>
  );
}

function SearchIn() {
  return (
    <script type="application/ld+json">
      {JSON.stringify({
        "@context": "https://schema.org",
        "@type": "WebSite",
        url: Linking.createURL("/"),
        potentialAction: {
          "@type": "SearchAction",
          target: Linking.createURL("/search", {
            queryParams: {
              q: "{search_term_string}",
            },
          }),
          "query-input": "required name=search_term_string",
        },
      })}
    </script>
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
