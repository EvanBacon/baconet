import { forwardRef } from "react";
import Svg, { Path } from "react-native-svg";

const SvgComponent = forwardRef((props, ref) => (
  <Svg
    ref={ref}
    width={24}
    height={24}
    viewBox="0 0 48 48"
    fill="none"
    aria-label="home"
    {...props}
  >
    <Path
      d="M16.9212 34.8802L4.28125 25.0402L16.9613 15.2402L18.4412 17.1202L8.00125 25.0002L18.4412 32.9602L16.9212 34.8802Z"
      fill="black"
    />
    <Path
      d="M31.0656 15.2402L43.7056 25.0802L31.0256 34.8802L29.5456 33.0002L39.9856 25.1202L29.5456 17.1602L31.0656 15.2402Z"
      fill="black"
    />
  </Svg>
));

export default SvgComponent;
