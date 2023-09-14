import { Card } from "reactstrap"

/**
 * 
 * @type {typeof Card}
 */
const CardKiosk = ({children, ...rest}) => {
    return (
        <Card className='custom-card card-custom-background' {...rest} >
            {children}
        </Card>
    )
}

export default CardKiosk