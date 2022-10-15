import { Head } from "@bacons/head";
import { StyleSheet, Text, View } from "react-native";

import { ShortcutBanner } from "../../components/shortcuts";

export default function Page() {
  return (
    <>
      <Head>
        <title>Welcome | Baconet</title>
        <meta name="description" content="Welcome to Baconet" />
        <meta
          property="og:image"
          content="https://icogen.vercel.app/api/icon?icon=1f195"
        />
        <meta
          name="keywords"
          content="look,market,search,find,bacon,discover"
        />
      </Head>
      <View style={styles.container}>
        <View style={styles.main}>
          <Text style={styles.title}>Hello World</Text>
          <Text style={styles.subtitle}>
            ← <Text style={{ fontWeight: "bold" }}>TODO:</Text> Make this house
            a home →
          </Text>
          <ShortcutBanner />
        </View>
      </View>
    </>
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
