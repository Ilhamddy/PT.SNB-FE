import { useRef, useState } from 'react'
import Flatpickr, { DateTimePickerProps } from 'react-flatpickr'
import './FlatpickrDM.scss'
import { FormFeedback } from 'reactstrap'
import 'flatpickr/dist/themes/light.css'
import 'flatpickr/dist/flatpickr.css'

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
  options,
  enableTime = false,
  ...rest
}) => {
  const refItem = useRef(null)
  const refFp = useRef(null)
  const [dateNow] = useState(() => new Date().toISOString())
  const defaultOptions = {
    dateFormat: `d/m/Y ${enableTime ? 'H.i' : ''}`,
    disableMobile: true,
    time_24hr: true,
  }
  if (isError && !errorMsg)
    console.warn('FlatpickrDM: isError is true but errorMsg is not defined')
  return (
    <div className={`input d-flex kontainer-flatpickr  ${className || ''}`}>
      <div
        className={`kontainer-isi-flatpickr input ${classNameInput || ''} ${
          isError ? 'is-invalid' : ''
        }`}
        onClick={() => {
          refFp.current?.flatpickr?.open()
          refFp.current?.flatpickr?.input?.focus()
        }}
      >
        <Flatpickr
          data-enable-time={enableTime}
          options={{ ...defaultOptions, ...options }}
          value={dateNow}
          className={`fc-flatpickr`}
          ref={refFp}
          itemRef={refItem}
          {...rest}
        />
        <img className="img-flatpickr" alt="tbl-flatpickr" />
      </div>
      {isError && errorMsg && <FormFeedback>{errorMsg}</FormFeedback>}
    </div>
  )
}

export default FlatpickrDM
