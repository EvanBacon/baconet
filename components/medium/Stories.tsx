import { forwardRef } from "react"
import Svg, { Path } from "react-native-svg"

const SvgComponent = forwardRef((props, ref) => (
    <Svg ref={ref} width={24} height={24} fill="none" aria-label="Stories" {...props}>
        <Path
            d="M4.75 21.5h14.5c.14 0 .25-.11.25-.25V2.75a.25.25 0 0 0-.25-.25H4.75a.25.25 0 0 0-.25.25v18.5c0 .14.11.25.25.25z"
            stroke="currentColor"
        />
        <Path
            d="M8 8.5h8m-8 7h5M8 12h8"
            stroke="currentColor"
            strokeLinecap="round"
        />
    </Svg>
))

export default SvgComponent
