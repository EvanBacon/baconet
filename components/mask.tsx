import { View } from "react-native";

export default function Mask({ children, style, colors, locations }) {
  const gradient = `linear-gradient(to bottom, ${colors[0]} ${
    locations[0] * 100
  }%, ${colors[1]} ${locations[1] * 100}%)`;
  return (
    <View
      style={[
        style,
        {
          "-webkit-mask-image": gradient,
          "mask-image": gradient,
        },
      ]}
    >
      {children}
    </View>
  );
}
