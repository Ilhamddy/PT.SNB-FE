import React from 'react';
import '../../App.scss'; // Import your CSS file for styling
import { useNavigate } from 'react-router-dom';
import { Row, Col, CardBody } from 'reactstrap'
import logo from '../../assets/svg/snb.svg'
import antrean from '../../assets/svg/pengambilan-antrean.svg'
import daftar from '../../assets/svg/pendaftaran-mandiri.svg'
import CardKiosk from '../../components/CardKiosk/CardKiosk';

function PagesAwal() {
    const navigate = useNavigate();

  const handleCardClickAntrean = () => {
    navigate('/pages-pemilihan-antrean');
  };

  const handleCardClickAPM = () => {
    navigate('/pages-penjamin-pendaftaran');
  };
    return (
        <div className="pages-awal">
            {/* <h1 style={{ fontSize: '36px', color: '#FFCB46', textAlign: 'center' }}>Welcome to the Kiosk App</h1> */}

            <Row>
                <Col lg={12}>
                    <img src={logo} alt='Company Logo' />

                </Col>
                <Col lg={6}>
                    <div className="d-flex justify-content-center">
                        <CardKiosk onClick={handleCardClickAntrean}>
                            <CardBody>
                                <div className="mx-auto avatar-md mb-3">
                                    <img src={antrean} alt="" className="img-fluid rounded-circle" />
                                </div>
                            </CardBody>
                            <div className="text-center" style={{ borderTop: '1px solid', fontFamily: 'sans-serif', fontSize: '36px' }}>
                                <p style={{color:'black'}}>Pengambilan Antrean</p>
                            </div>
                        </CardKiosk>
                    </div>
                </Col>
                <Col lg={6}>
                    <div className="d-flex justify-content-center">
                        <CardKiosk onClick={handleCardClickAPM}>
                            <CardBody>
                                <div className="mx-auto avatar-md mb-3">
                                    <img src={daftar} alt="" className="img-fluid rounded-circle" />
                                </div>
                            </CardBody>
                            <div className="text-center" style={{ borderTop: '1px solid', fontFamily: 'sans-serif', fontSize: '36px' }}>
                                <p style={{color:'black'}}>Pendaftaran Mandiri</p>
                            </div>
                        </CardKiosk>
                    </div>
                </Col>

            </Row>
        </div>
    );
}



export default PagesAwal;
