import { RotatingLines } from "react-loader-spinner"

const LoadingTable = () => (
    <div className="mt-3">
        <RotatingLines
            strokeColor='#B57602'
            strokeWidth="5"
            animationDuration="0.75"
            width="40"
            visible={true}
            
            />
    </div>
)

export default LoadingTable;