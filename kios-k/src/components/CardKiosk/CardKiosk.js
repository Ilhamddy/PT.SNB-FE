import { Card } from "reactstrap"
import "./CardKiosk"

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