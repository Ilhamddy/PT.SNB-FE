import Flatpickr from "react-flatpickr"

/**
 * @type {typeof Flatpickr}
 */
const KontainerFlatpickr = ({
    isError = false,
    children,
    ...rest
}) => {
    return (
        <div
            className={`input d-flex ${
                isError
                  ? 'is-invalid'
                  : ''
            }`}
        >
            <Flatpickr 
                className="form-control fc-flatpickr"
                {...rest} />
            <div className="input-group-text img-flatpickr bg-info text-white img-flatpickr">
                <i className="ri-calendar-2-line"></i>
            </div>
        </div>
    )
}

export default KontainerFlatpickr