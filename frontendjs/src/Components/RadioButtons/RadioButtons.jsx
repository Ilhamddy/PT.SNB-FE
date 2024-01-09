import { useState } from 'react'
import { Input, Label, Row } from 'reactstrap'

const RadioButtons = ({ values, value, radioname, ...rest }) => {
  if (!radioname) throw new Error('radionameharus ada')
  if (!values) throw new Error('values ada')
  const [checkedVal, setCheckedVal] = useState()
  return (
    <div {...rest}>
      {values.map((data, index) => (
        <RadioButton
          key={index}
          checked={data.value === checkedVal}
          label={data.label}
          onClick={(e) => {
            setCheckedVal(data.value)
          }}
        />
      ))}
    </div>
  )
}

export const RadioButton = ({
  checked,
  label,
  radioname,
  index,
  onClick,
  ...rest
}) => {
  if (!radioname) throw new Error('radionameharus ada')
  if (index === null || index === undefined) throw new Error('index harus ada')

  return (
    <div className="d-flex">
      <Input
        className="form-check-input"
        type="radio"
        id={`radio-snb-${radioname}-${index || 0}`}
        checked={checked !== undefined && checked}
        readOnly
        onClick={() => {
          onClick && onClick()
        }}
        {...rest}
      />
      <Label
        className="form-check-label ms-2"
        htmlFor={`radio-payment-${radioname}-${index || 0}`}
        style={{ color: 'black' }}
      >
        {label}
      </Label>
    </div>
  )
}

export default RadioButtons
