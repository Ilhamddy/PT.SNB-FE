import { forwardRef } from 'react'
import { Input } from 'reactstrap'

/**
 * @type {Input}
 */

const CustomInput = forwardRef(({ ...rest }, ref) => (
  <Input ref={ref} {...rest} />
))

CustomInput.displayName = 'CustomInput'

export default CustomInput
