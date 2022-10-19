import React from "react";
import { Button, Platform, StyleSheet, TextInput, View } from "react-native";

const binder = {
  username: "username",
  password: "current-password",
};

const AutoFillTextInput = React.forwardRef((props, ref) => {
  const [value, onChangeText] = React.useState("");

  return (
    <TextInput
      ref={ref}
      autoComplete={binder[props.textContentType] || "on"}
      style={{
        height: 40,
        paddingHorizontal: 8,
        marginBottom: 12,
        borderColor: "gray",
        borderWidth: 1,
      }}
      onSubmitEditing={props.onSubmitEditing}
      autoCorrect={props.textContentType === "username"}
      clearTextOnFocus={false}
      containerStyle={{ marginTop: 5 }}
      keyboard={Platform.OS === "ios" ? "ascii-capable" : "default"}
      placeholder={props.textContentType}
      placeholderTextColor={"gray"}
      onChangeText={(text) => onChangeText(text)}
      value={value}
      {...props}
    />
  );
});

export default function App() {
  return (
    <View style={styles.container}>
      <AutoFillTextInput
        maxLength={128}
        tabIndex={1}
        keyboardType="email-address"
        textContentType="username"
        onSubmitEditing={() => {
          console.log("submit");
        }}
      />
      <AutoFillTextInput
        secureTextEntry
        tabIndex={2}
        textContentType="password"
        onSubmitEditing={() => {
          console.log("submit password");
        }}
      />

      <Button
        title={"Reload"}
        onPress={() => {
          if (global.location && global.location.reload) {
            // @ts-ignore
            location.reload();
          } else {
          }
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: "5%",
    backgroundColor: "#fff",
    alignItems: "stretch",
    justifyContent: "center",
  },
});
