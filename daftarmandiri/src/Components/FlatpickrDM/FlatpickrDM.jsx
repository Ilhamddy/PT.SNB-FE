import { useRef, useState } from 'react'
import Flatpickr, { DateTimePickerProps } from 'react-flatpickr'
import './FlatpickrDM.scss'

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
  onChange,
  defaultValue,
  ...rest
}) => {
  const refFp = useRef(null)
  const [dateNow] = useState(() => new Date().toISOString())
  return (
    <div
      className={`input d-flex kontainer-flatpickr ${
        isError ? 'is-invalid' : ''
      } ${className || ''}`}
    >
      <Flatpickr
        options={{
          dateFormat: 'd-m-Y',
        }}
        className={`fc-flatpickr form-control ${classNameInput}`}
        ref={refFp}
        defaultValue={defaultValue || dateNow}
        {...rest}
      />
      {/* tambahkan image di sini */}
    </div>
  )
}

export default FlatpickrDM
