import { Col, Row } from 'reactstrap'
import './ColLabelInput2.scss'

const ColLabelInput2 = ({
  label,
  labelDecorator,
  inputId,
  children,
  ...rest
}) => {
  return (
    <Col {...rest}>
      <div className="d-flex flex-column">
        <Row>
          <Col lg={4}>
            <label
              className="form-label label-min-height-col-label-input"
              style={{ color: '#000000' }}
            >
              {labelDecorator}
              {label}
            </label>
          </Col>
          <Col lg={8}> {children}</Col>
        </Row>
      </div>
    </Col>
  )
}

export default ColLabelInput2
