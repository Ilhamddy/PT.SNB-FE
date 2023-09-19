import './ButtonDM.scss'

/**
 * @typedef {object} OtherProps
 * @property {string} isLoading
 * @property {string}
 */

/**
 *
 * @type {React.FC<React.ButtonHTMLAttributes & OtherProps>} OtherProps
 *
 */
const ButtonDM = ({ isLoading, children, className, ...rest }) => {
  return (
    <button className={`${className} button-app-daftarmandiri`} {...rest}>
      {children}
    </button>
  )
}

export default ButtonDM
