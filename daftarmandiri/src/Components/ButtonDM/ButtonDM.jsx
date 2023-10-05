import './ButtonDM.scss'
import LoadingDM from '../LoadingDM/LoadingDM'

/**
 * @typedef {object} OtherProps
 * @property {boolean} isLoading
 * @property {string}
 */

/**
 *
 * @type {React.FC<React.ButtonHTMLAttributes & OtherProps>} OtherProps
 *
 */
const ButtonDM = ({ isLoading, children, className, ...rest }) => {
  return (
    <button
      className={`${className} button-app-daftarmandiri`}
      disabled={isLoading}
      {...rest}
    >
      {isLoading ? <LoadingDM width={'20'} isMargin={false} /> : children}
    </button>
  )
}

export default ButtonDM
