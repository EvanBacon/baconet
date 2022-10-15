import { StyleSheet, Text, View } from "react-native";
import { Head } from "@bacons/head";
export default function Page() {
  return (
    <>
      <Head>
        {/* <title>Market | Baconet</title> */}
        <meta name="description" content="Come to the bacon market!" />
      </Head>
      <View style={styles.container}>
        <View style={styles.main}>
          <Text style={styles.title}>Market</Text>
          <Text style={styles.subtitle}>
            ← <Text style={{ fontWeight: "bold" }}>TODO:</Text> Profit →
          </Text>
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
