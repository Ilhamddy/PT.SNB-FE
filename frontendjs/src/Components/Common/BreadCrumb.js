import React from 'react';
import { Link } from 'react-router-dom';
import { Col, Row } from 'reactstrap';
import "./BreadCrumb.scss"

const BreadCrumb = ({ title, pageTitle, className }) => {
    let cFinal = className || ''
    return (
        <React.Fragment>
            <Row className='w-100 custom-breadcrumb-row'>
                <Col className='p-0' xs={12}>
                    <div className={"page-title-box d-sm-flex align-items-center justify-content-between " + cFinal}>
                        <h4 className="mb-sm-0">{title}</h4>
                        <div className="page-title-right">
                            <ol className="breadcrumb m-0">
                                <li className="breadcrumb-item"><Link to="#">{pageTitle}</Link></li>
                                <li className="breadcrumb-item active">{title}</li>
                            </ol>
                        </div>

                    </div>
                </Col>
            </Row>
        </React.Fragment>
    );
};

export default BreadCrumb;