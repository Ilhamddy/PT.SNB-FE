import React, { useEffect } from 'react'
import '../../../App.scss'; // Import your CSS file for styling
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { Row, Col, CardBody, Button, Container } from 'reactstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStepBackward, faHomeUser } from '@fortawesome/free-solid-svg-icons';
import { kioskResetForm, getComboKiosk } from '../../../store/action';
import CardKiosk from '../../../components/CardKiosk/CardKiosk';
// import asurasni from '../../../assets/svg/asuransi.svg'
// import baru from '../../../assets/svg/pasien-baru.svg'
// import kasir from '../../../assets/svg/antrean-kasir.svg'

function PagesPoliklinik() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const MySwal = withReactContent(Swal)
    const { data } = useSelector((state) => ({
        data: state.Kiosk.getComboKiosk.data || []
    }));
    useEffect(() => {
            dispatch(kioskResetForm());
    }, [dispatch])
    useEffect(() => {
            dispatch(getComboKiosk())
    }, [dispatch])
    const handleHome = () => {
        navigate('/pages-awal');
    };
    const handlePrint = () => {
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
                            <h1 style={{ fontSize: '36px', color: '#e67e22', textAlign: 'center' }}>Silahkan Pilih Poli Tujuan</h1>
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
                        <Row>
                            {(data.unit || []).map((item, key) => (<Col xl={4} md={4} sm={6} key={key}>
                                {/* <Button key={key} className="btn btn-lg">{item.label}</Button> */}
                                <div className="d-flex justify-content-center">
                                    <CardKiosk key={key} style={{marginBottom:'10px'}}
                                    onClick={handlePrint}>
                                        <CardBody>
                                            <div className="text-center" style={{ borderBottom: '1px solid', fontFamily: 'sans-serif', fontSize: '36px' }}>
                                                <p style={{ color: 'black' }}>{item.label}</p>
                                            </div>
                                        </CardBody>

                                    </CardKiosk>
                                </div>
                            </Col>))}
                        </Row>

                        
                    </Row>
                </div>
            </Container>
        </React.Fragment>
    )
}

export default PagesPoliklinik
