import React from 'react';
import withRouter from '../../Components/Common/withRouter';

const ParticlesAuth = ({ children }) => {
    return (
        <React.Fragment>
            {children}
        </React.Fragment>
    );
};

export default withRouter(ParticlesAuth);