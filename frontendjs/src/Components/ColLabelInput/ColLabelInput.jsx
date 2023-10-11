import { Col } from 'reactstrap'

const ColLabelInput = ({ label, inputId, children, ...rest }) => {
  return (
    <Col {...rest}>
      <div className="d-flex flex-column">
        <label className="form-label">{label}</label>
        {children}
      </div>
    </Col>
  )
}

export default ColLabelInput
