import React from 'react';
import { CardHeader, Input, Label } from 'reactstrap';

const PreviewCardHeaderNew = ({ title }) => {
    return (
        <React.Fragment>
            <CardHeader className="align-items-center d-flex">
                <h4 className="card-title mb-0 flex-grow-1">{title}</h4>
                
            </CardHeader>
        </React.Fragment>
    );
}

export default PreviewCardHeaderNew;