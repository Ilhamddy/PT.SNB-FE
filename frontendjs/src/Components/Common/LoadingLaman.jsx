import { RotatingLines } from 'react-loader-spinner'

const LoadingLaman = () => (
  <div className="page-content w-100 d-flex justify-content-center">
    <RotatingLines
      strokeColor="#B57602"
      strokeWidth="5"
      animationDuration="0.75"
      width="40"
      visible={true}
    />
  </div>
)

export default LoadingLaman
