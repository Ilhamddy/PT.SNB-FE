import { RotatingLines } from 'react-loader-spinner'
import './LoadingDM.scss'

const LoadingDM = ({ width, isMargin = true }) => (
  <div className="loading-dm" style={!isMargin ? { marginTop: 0 } : {}}>
    <RotatingLines
      strokeColor="#B57602"
      strokeWidth="5"
      animationDuration="0.75"
      width={width || '40'}
      visible={true}
    />
  </div>
)

export default LoadingDM
