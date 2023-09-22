import React from 'react'
import '../../../App.scss'; // Import your CSS file for styling
import { useNavigate } from 'react-router-dom';
import { Row, Col, CardBody, Button, Container } from 'reactstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStepBackward, faHomeUser } from '@fortawesome/free-solid-svg-icons';
import asurasni from '../../../assets/svg/asuransi.svg'
import umum from '../../../assets/svg/umum.svg'
import bpjs from '../../../assets/svg/bpjs-kesehatan.svg'
import CardKiosk from '../../../components/CardKiosk/CardKiosk';
function PagesPenjamin() {
    const navigate = useNavigate();
    const handleHome = () => {
        navigate('/pages-awal');
    };
    const handleCardClick = (e) => {
        navigate(`/pages-poliklinik/${e}`);
    };
    return (
        <React.Fragment>
            <Container fluid>
                <div className="pages-awal">
                    <Row>
                        <Col lg={12}>
                            {/* <img src={logo} alt='Company Logo' /> */}
                            <h1 style={{ fontSize: '36px', color: '#e67e22', textAlign: 'center' }}>Pengambilan Nomor Antrean</h1>
                            <h1 style={{ fontSize: '36px', color: '#e67e22', textAlign: 'center' }}>Silahkan Pilih Penjamin Pasien</h1>
                        </Col>
                        <Col lg={12} className='mr-2'>
                            <div className="d-flex justify-content-end gap-2">
                                <Button color="danger" style={{ width: '100px' }} className="m-2 mr-2" onClick={() => navigate(-1)}>
                                    <FontAwesomeIcon icon={faStepBackward} />
                                </Button>
                                <Button style={{ width: '100px', backgroundColor: '#7084c7' }} className="m-2 mr-2" onClick={handleHome}>
                                    <FontAwesomeIcon icon={faHomeUser} />
                                </Button>
                            </div>
                        </Col>
                        <Col lg={4}>
                            <div className="d-flex justify-content-center">
                                <CardKiosk onClick={() => handleCardClick('A')}>
                                    <CardBody>
                                        <div className="mx-auto avatar-md mb-3">
                                            <img src={umum} alt="" className="img-fluid" />
                                        </div>
                                    </CardBody>
                                    <div className="text-center" style={{ borderTop: '1px solid', fontFamily: 'sans-serif', fontSize: '36px' }}>
                                        <p style={{ color: 'black' }}>Umum</p>
                                    </div>
                                </CardKiosk>
                            </div>
                        </Col>
                        <Col lg={4}>
                            <div className="d-flex justify-content-center">
                                <CardKiosk onClick={() => handleCardClick('B')}>
                                    <CardBody>
                                        <div className="mx-auto avatar-md mb-3">
                                            <img src={asurasni} alt="" className="img-fluid" />
                                        </div>
                                    </CardBody>
                                    <div className="text-center" style={{ borderTop: '1px solid', fontFamily: 'sans-serif', fontSize: '36px' }}>
                                        <p style={{ color: 'black' }}>Asuransi</p>
                                    </div>
                                </CardKiosk>
                            </div>
                        </Col>
                        <Col lg={4}>
                            <div className="d-flex justify-content-center">
                                <CardKiosk onClick={() => handleCardClick('C')}>
                                    <CardBody>
                                        <div className="mx-auto avatar-md mb-3">
                                            <img src={bpjs} alt="" className="img-fluid" />
                                        </div>
                                    </CardBody>
                                    <div className="text-center" style={{ borderTop: '1px solid', fontFamily: 'sans-serif', fontSize: '36px' }}>
                                        <p style={{ color: 'black' }}>BPJS Kesehatan</p>
                                    </div>
                                </CardKiosk>
                            </div>
                        </Col>
                    </Row>
                </div>
            </Container>
        </React.Fragment>
    )
}

export default PagesPenjamin
