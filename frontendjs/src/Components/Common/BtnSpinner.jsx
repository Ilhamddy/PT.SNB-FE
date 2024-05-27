import { Button, Spinner, ButtonProps } from 'reactstrap'

/**
 * @typedef {object} BtnProps
 * @prop {boolean} [loading]
 *
 */

/**
 * @type {import('react').FC<BtnProps & ButtonProps}
 */
const BtnSpinner = ({ children, loading = false, ...rest }) => {
  return (
    <Button {...rest} disabled={rest.disabled || loading}>
      {loading && (
        <Spinner size="sm" className="me-2">
          Loading...
        </Spinner>
      )}
      {children}
    </Button>
  )
}

export default BtnSpinner
