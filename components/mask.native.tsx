import { StyleSheet } from "react-native";
import MaskedView from "@react-native-masked-view/masked-view";
import { LinearGradient } from "expo-linear-gradient";

export default function Mask({ children, style, colors, locations }) {
  return (
    <MaskedView
      style={style}
      maskElement={
        <LinearGradient
          colors={colors}
          locations={locations}
          style={StyleSheet.absoluteFill}
        />
      }
    >
      {children}
    </MaskedView>
  );
}
