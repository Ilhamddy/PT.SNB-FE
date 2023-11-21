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
        <label className="form-label label-min-height-col-label-input">
          {labelDecorator}
          {label}
        </label>
        {children}
      </div>
    </Col>
  )
}

export default ColLabelInput
