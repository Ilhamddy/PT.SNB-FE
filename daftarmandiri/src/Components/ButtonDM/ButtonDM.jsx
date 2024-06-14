import './ButtonDM.scss'
import LoadingDM from '../LoadingDM/LoadingDM'

/**
 * @typedef {object} OtherProps
 * @property {boolean} isLoading
 * @property {string} className
 * @property {string | number} [fixedWidth]
 * @property {string | number} [fixedHeight]
 * @property {boolean} [isFullyRounded]
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
  className = '',
  fixedWidth,
  fixedHeight,
  isFullyRounded = false,
  buttonType = 'main',
  ...rest
}) => {
  const classMainSecondary =
    buttonType === 'main' ? '' : 'button-app-daftarmandiri-secondary'
  const classFullRounded = isFullyRounded
    ? 'button-app-daftarmandiri-full-rounded'
    : ''
  const classFixed =
    fixedWidth || fixedHeight ? 'button-app-daftarmandiri-fixed-wh' : ''

  return (
    <button
      className={`${className} button-app-daftarmandiri ${classMainSecondary} ${classFullRounded} ${classFixed}`}
      style={{
        width: fixedWidth,
        height: fixedWidth || fixedHeight,
        borderRadius: fixedWidth,
      }}
      disabled={isLoading}
      {...rest}
    >
      {isLoading ? <LoadingDM width={'20'} isMargin={false} /> : children}
    </button>
  )
}

export default ButtonDM
