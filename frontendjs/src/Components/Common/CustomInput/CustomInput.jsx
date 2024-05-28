import { forwardRef, FC } from 'react'
import { Input } from 'reactstrap'

/**
 * @type {FC<import('reactstrap').InputProps>}
 */

const CustomInput = forwardRef(({ ...rest }, ref) => (
  <Input ref={ref} {...rest} />
))

CustomInput.displayName = 'CustomInput'

export default CustomInput
