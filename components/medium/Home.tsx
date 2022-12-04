import { forwardRef } from "react"
import Svg, { Path } from "react-native-svg"

const SvgComponent = forwardRef((props, ref) => (
    <Svg ref={ref} width={24} height={24} fill="none" aria-label="home" {...props}>
        <Path
            d="M4.5 21.25V10.87c0-.07.04-.15.1-.2l7.25-5.43a.25.25 0 0 1 .3 0l7.25 5.44c.06.04.1.12.1.2v10.37c0 .14-.11.25-.25.25h-4.5a.25.25 0 0 1-.25-.25v-5.5a.25.25 0 0 0-.25-.25h-4.5a.25.25 0 0 0-.25.25v5.5c0 .14-.11.25-.25.25h-4.5a.25.25 0 0 1-.25-.25z"
            fill="currentColor"
            stroke="currentColor"
            strokeLinejoin="round"
        />
        <Path
            d="m22 9-9.1-6.83a1.5 1.5 0 0 0-1.8 0L2 9"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </Svg>
))

export default SvgComponent
