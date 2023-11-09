import { useRef } from "react"
import Flatpickr,  { DateTimePickerProps } from "react-flatpickr"
import "./KontainerFlatpickr.scss"

/**
 * @typedef {object} Props
 * @prop {string} [className]
 * @prop {boolean} isError
 *
 */

/**
 * @type {import('react').FC<Props & DateTimePickerProps}
 */
const KontainerFlatpickr = ({
    className = "",
    isError = false,
    ...rest
}) => {
    const refFp = useRef(null)
    return (
        <div
            className={`input d-flex kontainer-flatpickr ${
                isError
                  ? 'is-invalid'
                  : ''
            } ${className}`}
        >
            <Flatpickr 
                className="fc-flatpickr form-control"
                ref={refFp}                
                {...rest} />
            <div className="input-group-text img-flatpickr bg-info text-white img-flatpickr"
                onClick={() => {
                    refFp.current?.flatpickr?.open();
                }}>
                <i className="ri-calendar-2-line"></i>
            </div>
        </div>
    )
}

export default KontainerFlatpickr