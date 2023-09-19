import { FormFeedback } from 'reactstrap'
import './InputDM.scss'

const InputDM = ({ errorMsg, isError, className, ...rest }) => {
  return (
    <div className={`${className} input-daftar-mandiri`}>
      <input
        className={`input d-flex kontainer-input-dm ${
          isError ? 'is-invalid' : ''
        }`}
        {...rest}
      ></input>
      {isError && <FormFeedback>{errorMsg}</FormFeedback>}
    </div>
  )
}

export default InputDM
