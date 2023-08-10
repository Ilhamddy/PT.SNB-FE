import { RotatingLines } from "react-loader-spinner"

const LoadingTable = () => (
    <RotatingLines
        strokeColor='#B57602'
        strokeWidth="5"
        animationDuration="0.75"
        width="40"
        visible={true}
        />
)

export default LoadingTable;