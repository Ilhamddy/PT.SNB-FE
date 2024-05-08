import { Col, Row } from 'reactstrap'
import './ColLabelInput2.scss'

const ColLabelInput2 = ({
  label,
  labelDecorator,
  inputId,
  children,
  lgLabel,
  allChildrens,
  className,
  classNameLabel,
  ...rest
}) => {
  const newLgLabel = lgLabel || 4
  return (
    <Col className={className ? className : 'mt-2'} {...rest}>
      <div className="d-flex flex-column">
        <Row>
          <Col
            lg={newLgLabel}
            className={classNameLabel ? classNameLabel : 'mt-2'}
          >
            <label
              className="form-label label-min-height-col-label-input"
              style={{ color: '#000000' }}
            >
              {labelDecorator}
              {label}
            </label>
          </Col>
          {allChildrens ? (
            allChildrens.map((c, index) => (
              <Col key={index} lg={c.lg}>
                {c.Component}
              </Col>
            ))
          ) : (
            <Col lg={12 - newLgLabel}> {children}</Col>
          )}
        </Row>
      </div>
    </Col>
  )
}

export default ColLabelInput2
