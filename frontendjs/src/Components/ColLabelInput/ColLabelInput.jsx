import { Col } from 'reactstrap'
import './ColLabelInput.scss'

const ColLabelInput = ({
  label,
  labelDecorator,
  inputId,
  children,
  ...rest
}) => {
  return (
    <Col {...rest}>
      <div className="d-flex flex-column">
        <label
          className="form-label label-min-height-col-label-input ms-2 mb-1"
          style={{ color: '#000000' }}
        >
          {labelDecorator}
          {label}
        </label>
        {children}
      </div>
    </Col>
  )
}

export default ColLabelInput
