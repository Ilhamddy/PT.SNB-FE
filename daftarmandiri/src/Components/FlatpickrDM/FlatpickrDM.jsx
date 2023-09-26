import { useRef, useState } from 'react'
import Flatpickr, { DateTimePickerProps } from 'react-flatpickr'
import './FlatpickrDM.scss'
import { FormFeedback } from 'reactstrap'

/**
 * @typedef {object} Props
 * @prop {string} [errorMsg]
 * @prop {boolean} isError
 * @prop {string} [className]
 * @prop {string} [classNameInput]
 *
 */

/**
 * @type {import('react').FC<Props & DateTimePickerProps}
 */
const FlatpickrDM = ({
  errorMsg,
  isError = false,
  className,
  classNameInput,
  defaultValue,
  ...rest
}) => {
  const refFp = useRef(null)
  const [dateNow] = useState(() => new Date().toISOString())
  return (
    <div className={`input d-flex kontainer-flatpickr  ${className || ''}`}>
      <Flatpickr
        options={{
          dateFormat: 'd-m-Y',
        }}
        className={`input fc-flatpickr form-control ${classNameInput} ${
          isError ? 'is-invalid' : ''
        }`}
        ref={refFp}
        defaultValue={defaultValue || dateNow}
        {...rest}
      />
      <FormFeedback>{errorMsg}</FormFeedback>
      {/* tambahkan image di sini */}
    </div>
  )
}

export default FlatpickrDM
