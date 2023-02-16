import * as Device from "expo-device";
import React from "react";
import { DevSettings, Platform, TouchableOpacity } from "react-native";

export function ReloadButton() {
  if (
    process.env.NODE_ENV === "development" &&
    process.env.IS_APP_CLIP &&
    Platform.OS === "ios" &&
    Device.isDevice
  ) {
    return (
      // FAB for reloading manually

      <TouchableOpacity
        style={{
          zIndex: 999,
          position: "absolute",
          bottom: 68,
          right: 8,
          backgroundColor: "red",
          width: 50,
          height: 50,
          borderRadius: 25,
          justifyContent: "center",
          alignItems: "center",
        }}
        onPress={() => {
          DevSettings.reload();
        }}
      >
        <p style={{ color: "white" }}>Reload</p>
      </TouchableOpacity>
    );
  }
  return null;
}
