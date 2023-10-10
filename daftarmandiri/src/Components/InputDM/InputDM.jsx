import { FormFeedback } from 'reactstrap'
import './InputDM.scss'

/**
 * @typedef {object} Props
 * @prop {string} [errorMsg]
 * @prop {boolean} isError
 * @prop {string} [className]
 * @prop {string} [classNameInput]
 *
 */

/**
 * @type {import('react').FC<Props & React.InputHTMLAttributes<HTMLInputElement>>}
 */
const InputDM = ({ errorMsg, isError, className, classNameInput, ...rest }) => {
  return (
    <div className={`${className || ''} input-daftar-mandiri`}>
      <input
        className={`input d-flex kontainer-input-dm ${
          isError ? 'is-invalid' : ''
        } ${classNameInput || ''} ${rest.disabled ? 'input-disabled' : ''}`}
        {...rest}
      ></input>
      {isError && <FormFeedback>{errorMsg}</FormFeedback>}
    </div>
  )
}

export default InputDM
