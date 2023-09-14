import React from 'react';
import '../../../App.scss'; // Import your CSS file for styling
import { useNavigate } from 'react-router-dom';
import { Row, Col, CardBody, Button, Container } from 'reactstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStepBackward, faHomeUser } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import lama from '../../../assets/svg/pasien-lama.svg'
import baru from '../../../assets/svg/pasien-baru.svg'
import kasir from '../../../assets/svg/antrean-kasir.svg'
import CardKiosk from '../../../components/CardKiosk/CardKiosk';


function PagesPemilihanAntrean() {
    const navigate = useNavigate();
    const MySwal = withReactContent(Swal)
    const handleHome = () => {
        navigate('/pages-awal');
    };
    const handlePasienBaru = () => {
        navigate('/pages-poliklinik');
    };
    const handlePasienLama = () => {
        navigate('/pages-penjamin');
    };
    const handleKasir = () => {
        MySwal.fire({
            customClass: {
                confirmButton: 'btn btn-success',
                cancelButton: 'btn btn-danger'
              },
              buttonsStyling: false,
            title: 'Anda Akan Mencetak Antrean..?',
            text: `Silahkan Pilih Tombol Dibawah!`,
            icon: 'question',
            confirmButtonText: 'Print ..!',
            cancelButtonText: 'Tidak ..!',
            showCancelButton: true,
        })

    }
    

    return (
        <React.Fragment>
            <Container fluid>
                <div className="pages-awal">
                    <Row>
                        <Col lg={12}>
                            {/* <img src={logo} alt='Company Logo' /> */}
                            <h1 style={{ fontSize: '36px', color: '#e67e22', textAlign: 'center' }}>Pengambilan Nomor Antrean</h1>
                            <h1 style={{ fontSize: '36px', color: '#e67e22', textAlign: 'center' }}>Silahkan Pilih Jenis Antrean Yang Dituju</h1>
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
                                <CardKiosk onClick={handlePasienBaru}>
                                    <CardBody>
                                        <div className="mx-auto avatar-md mb-3">
                                            <img src={baru} alt="" className="img-fluid rounded-circle" />
                                        </div>
                                    </CardBody>
                                    <div className="text-center" style={{ borderTop: '1px solid', fontFamily: 'sans-serif', fontSize: '36px' }}>
                                        <p style={{ color: 'black' }}>Pasien Baru</p>
                                    </div>
                                </CardKiosk>
                            </div>
                        </Col>
                        <Col lg={4}>
                            <div className="d-flex justify-content-center">
                                <CardKiosk onClick={handlePasienLama}>
                                    <CardBody>
                                        <div className="mx-auto avatar-md mb-3">
                                            <img src={lama} alt="" className="img-fluid rounded-circle" />
                                        </div>
                                    </CardBody>
                                    <div className="text-center" style={{ borderTop: '1px solid', fontFamily: 'sans-serif', fontSize: '36px' }}>
                                        <p style={{ color: 'black' }}>Pasien Lama</p>
                                    </div>
                                </CardKiosk>
                            </div>
                        </Col>
                        <Col lg={4}>
                            <div className="d-flex justify-content-center">
                                <CardKiosk onClick={handleKasir}>
                                    <CardBody>
                                        <div className="mx-auto avatar-md mb-3">
                                            <img src={kasir} alt="" className="img-fluid rounded-circle" />
                                        </div>
                                    </CardBody>
                                    <div className="text-center" style={{ borderTop: '1px solid', fontFamily: 'sans-serif', fontSize: '36px' }}>
                                        <p style={{ color: 'black' }}>Antrean Kasir</p>
                                    </div>
                                </CardKiosk>
                            </div>
                        </Col>
                    </Row>
                </div>
            </Container>
        </React.Fragment>
    );
}

export default PagesPemilihanAntrean;
