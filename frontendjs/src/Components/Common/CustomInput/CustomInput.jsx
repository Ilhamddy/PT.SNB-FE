import { forwardRef, FC } from 'react'
import { FormFeedback, Input } from 'reactstrap'
/**
 * @typedef {object} Props
 * @prop {boolean} [isFormFeedback]
 * @prop {boolean} [isTouched]
 * @prop {string} errorMessage
 */
/**
 * @type {FC<import('reactstrap').InputProps & Props>}
 */

const CustomInput = forwardRef(
  (
    { isFormFeedback = false, isTouched = false, errorMessage = null, ...rest },
    ref
  ) =>
    isFormFeedback ? (
      <Input ref={ref} {...rest} />
    ) : (
      <>
        <Input ref={ref} invalid={isTouched && !!errorMessage} {...rest} />
        {isTouched && !!errorMessage && (
          <FormFeedback type="invalid">
            <div>{errorMessage}</div>
          </FormFeedback>
        )}
      </>
    )
)

CustomInput.displayName = 'CustomInput'

export default CustomInput
