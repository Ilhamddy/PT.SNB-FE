import React from 'react';
import '../../../App.scss'; // Import your CSS file for styling
import { useNavigate } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { Row, Col, CardBody, Button, Container } from 'reactstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStepBackward, faHomeUser } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import lama from '../../../assets/svg/pasien-lama.svg'
import baru from '../../../assets/svg/pasien-baru.svg'
import kasir from '../../../assets/svg/antrean-kasir.svg'
import CardKiosk from '../../../components/CardKiosk/CardKiosk';
import { saveAntreanPasienKiosk } from '../../../store/action';
import "./PagesPemilihanAntrean.scss"
import HeaderKiosk from '../../../components/HeaderKiosk/HeaderKiosk';

function PagesPemilihanAntrean() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const MySwal = withReactContent(Swal)
    const handleHome = () => {
        navigate('/pages-awal');
    };
    const handlePasienBaru = () => {
        navigate('/pages-poliklinik/D');
    };
    const handlePasienLama = () => {
        navigate('/pages-penjamin');
    };
    const handleKasir = () => {
        MySwal.fire({
            customClass: {
                confirmButton: 'btn btn-success me-2',
                cancelButton: 'btn btn-danger',
              },
            buttonsStyling: false,
            title: 'Anda Akan Mencetak Bukti Pendaftaran..?',
            text: `Silahkan Pilih Tombol Dibawah!`,
            icon: 'question',
            confirmButtonText: 'Print ..!',
            cancelButtonText: 'Tidak ..!',
            showCancelButton: true,
        }).then(async (result) => {
            if (result.isConfirmed) {
                if (window.electron) {
                    let objectjenisantrean=5
                    let captionheader ='ANTREAN KASIR'  
                    const values = 
                        {
                            jenisantrean: objectjenisantrean,
                            objectunitfk:null,
                            iddoktertujuan:null,
                            namajenisantrean:'S',
                            captionheader:captionheader,
                            unittujuan:'KASIR'
                        }
                    dispatch(saveAntreanPasienKiosk(values, (data) => {
// 
                    }))
                } else {

                    console.error('Electron not available');
                }
            } else {
                console.log('tidak print')
            }
        })
    }
    

    return (
        <React.Fragment>
            <Container fluid>
                <div className="pages-awal">
                    <Row>
                        <HeaderKiosk />
                        <Col lg={12} className='kontainer-judul'>
                            {/* <img src={logo} alt='Company Logo' /> */}
                            <h1 className='teks-judul'>Pengambilan Nomor Antrean</h1>
                            <h1 className='teks-judul'>Silahkan Pilih Jenis Antrean Yang Dituju</h1>
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
                                            <img src={baru} alt="" className="gbr-btn-pasien-pilihan rounded-circle" />
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
                                            <img src={lama} alt="" className="gbr-btn-pasien-pilihan rounded-circle" />
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
                                            <img src={kasir} alt="" className="gbr-btn-pasien-pilihan rounded-circle" />
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
