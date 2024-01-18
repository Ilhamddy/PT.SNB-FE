import React, { useEffect } from 'react';
import { Col, Container, Row } from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux'
import { getLastUpdated } from '../store/logger/loggerSlice';

const Footer = () => {
    const dispatch = useDispatch ()
    const lastUpdated = useSelector(state => state.loggerSlice.getLastUpdated.lastUpdated)
    useEffect(() => {
        dispatch(getLastUpdated())
    }, [dispatch])
    const time = lastUpdated ? new Date(lastUpdated).toLocaleDateString("id-ID") 
        + " "
        + new Date(lastUpdated).toLocaleTimeString("id-ID")  : ""
    return (
        <React.Fragment>
            <footer className="footer">
                <Container fluid>
                    <Row>
                        <Col sm={6}>
                            {new Date().getFullYear()} last updated: {time}
                        </Col>
                        <Col sm={6}>
                            <div className="text-sm-end d-none d-sm-block">
                                www.snberdikari.co.id
                            </div>
                        </Col>
                    </Row>
                </Container>
            </footer>
        </React.Fragment>
    );
};

export default Footer;