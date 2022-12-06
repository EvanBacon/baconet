import { forwardRef } from "react";
import Svg, { Path } from "react-native-svg";

const SvgComponent = forwardRef((props, ref) => (
  <Svg
    ref={ref}
    width={24}
    height={24}
    viewBox="0 0 512 512"
    fill="none"
    aria-label="home"
    {...props}
  >
    <Path
      d="M400 240c-8.89-89.54-71-144-144-144-69 0-113.44 48.2-128 96-60 6-112 43.59-112 112 0 66 54 112 120 112h260c55 0 100-27.44 100-88 0-59.82-53-85.76-96-88z"
      fill="none"
      stroke="currentColor"
      stroke-linejoin="round"
      stroke-width="32"
    />
    <Path
      fill="none"
      stroke="currentColor"
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="32"
      d="M317 208L209.2 336 163 284.8"
    />
  </Svg>
));

export default SvgComponent;
