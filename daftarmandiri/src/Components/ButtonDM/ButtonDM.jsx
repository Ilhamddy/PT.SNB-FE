import './ButtonDM.scss'
import LoadingDM from '../LoadingDM/LoadingDM'

/**
 * @typedef {object} OtherProps
 * @property {boolean} isLoading
 * @property {string} className
 * @property {React.ReactNode} children
 * @property {"main" | "secondary"} buttonType
 * @property {string}
 */

/**
 *
 * @type {React.FC<React.ButtonHTMLAttributes & OtherProps>} OtherProps
 *
 */
const ButtonDM = ({
  isLoading,
  children,
  className,
  buttonType = 'main',
  ...rest
}) => {
  return (
    <button
      className={`${className} ${
        buttonType === 'main'
          ? 'button-app-daftarmandiri'
          : 'button-app-daftarmandiri-secondary'
      }`}
      disabled={isLoading}
      {...rest}
    >
      {isLoading ? <LoadingDM width={'20'} isMargin={false} /> : children}
    </button>
  )
}

export default ButtonDM
