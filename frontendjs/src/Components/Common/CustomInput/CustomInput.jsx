import { forwardRef, FC } from 'react'
import { FormFeedback, Input } from 'reactstrap'
/**
 * @typedef {object} Props
 */
/**
 * @type {FC<import('reactstrap').InputProps & Props>}
 */

const CustomInput = forwardRef(
  (
    { isFormFeedback = false, isTouched = false, errorMessage = null, ...rest },
    ref
  ) => <Input ref={ref} {...rest} />
)

CustomInput.displayName = 'CustomInput'

export default CustomInput
