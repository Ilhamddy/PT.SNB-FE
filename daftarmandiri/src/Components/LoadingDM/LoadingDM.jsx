import { RotatingLines } from 'react-loader-spinner'
import './LoadingDM.scss'

const LoadingDM = () => (
  <div className="loading-dm">
    <RotatingLines
      strokeColor="#B57602"
      strokeWidth="5"
      animationDuration="0.75"
      width="40"
      visible={true}
    />
  </div>
)

export default LoadingDM
