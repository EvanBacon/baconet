import { forwardRef } from "react"
import Svg, { Path } from "react-native-svg"

const SvgComponent = forwardRef((props, ref) => (
    <Svg ref={ref} width={24} height={24} fill="none" aria-label="Notifications" {...props}>
        <Path
            d="M15 18.5a3 3 0 1 1-6 0"
            stroke="currentColor"
            strokeLinecap="round"
        />
        <Path
            d="M5.5 10.53V9a6.5 6.5 0 0 1 13 0v1.53c0 1.42.56 2.78 1.57 3.79l.03.03c.26.26.4.6.4.97v2.93c0 .14-.11.25-.25.25H3.75a.25.25 0 0 1-.25-.25v-2.93c0-.37.14-.71.4-.97l.03-.03c1-1 1.57-2.37 1.57-3.79z"
            stroke="currentColor"
            strokeLinejoin="round"
        />
    </Svg>
))

export default SvgComponent
