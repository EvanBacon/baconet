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
      fill="none"
      stroke="currentColor"
      strokeLinecap="square"
      strokeMiterlimit="10"
      strokeWidth="42"
      d="M160 368L32 256l128-112M352 368l128-112-128-112M192 288.1l64 63.9 64-63.9M256 160v176.03"
    />
  </Svg>
));

export default SvgComponent;
