import { forwardRef } from "react"
import Svg, { Path } from "react-native-svg"

const SvgComponent = forwardRef((props, ref) => (
    <Svg ref={ref} width={24} height={24} fill="none" aria-label="Write" {...props}>
        <Path
            d="M14 4a.5.5 0 0 0 0-1v1zm7 6a.5.5 0 0 0-1 0h1zm-7-7H4v1h10V3zM3 4v16h1V4H3zm1 17h16v-1H4v1zm17-1V10h-1v10h1zm-1 1a1 1 0 0 0 1-1h-1v1zM3 20a1 1 0 0 0 1 1v-1H3zM4 3a1 1 0 0 0-1 1h1V3z"
            fill="currentColor"
        />
        <Path
            d="m17.5 4.5-8.46 8.46a.25.25 0 0 0-.06.1l-.82 2.47c-.07.2.12.38.31.31l2.47-.82a.25.25 0 0 0 .1-.06L19.5 6.5m-2-2 2.32-2.32c.1-.1.26-.1.36 0l1.64 1.64c.1.1.1.26 0 .36L19.5 6.5m-2-2 2 2"
            stroke="currentColor"
        />
    </Svg>
))

export default SvgComponent
