import React, { useEffect } from 'react'
import '../../../App.scss' // Import your CSS file for styling
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { Row, Col, CardBody, Button, Container } from 'reactstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStepBackward, faHomeUser } from '@fortawesome/free-solid-svg-icons'
import {
  kioskResetForm,
  getComboKiosk,
  saveAntreanPasienKiosk,
} from '../../../store/action'
import CardKiosk from '../../../components/CardKiosk/CardKiosk'
import { useParams } from 'react-router-dom'
import HeaderKiosk from '../../../components/HeaderKiosk/HeaderKiosk'

function PagesPoliklinik() {
  const { jenisantrean } = useParams()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const MySwal = withReactContent(Swal)
  const { data } = useSelector((state) => ({
    data: state.Kiosk.getComboKiosk.data || [],
  }))
  useEffect(() => {
    dispatch(kioskResetForm())
  }, [dispatch])
  useEffect(() => {
    dispatch(getComboKiosk())
  }, [dispatch])
  const handleHome = () => {
    navigate('/pages-awal')
  }
  const handlePrint = async (item) => {
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
          let objectjenisantrean = 1
          let captionheader = 'ANTREAN PASIEN LAMA'
          if (jenisantrean === 'D') {
            objectjenisantrean = 4
            captionheader = 'ANTREAN PASIEN BARU'
          } else if (jenisantrean === 'A') {
            objectjenisantrean = 1
          } else if (jenisantrean === 'B') {
            objectjenisantrean = 2
          } else if (jenisantrean === 'C') {
            objectjenisantrean = 3
          }

          const values = {
            jenisantrean: objectjenisantrean,
            objectunitfk: item.value,
            iddoktertujuan: null,
            namajenisantrean: jenisantrean,
            captionheader: captionheader,
            unittujuan: item.label,
          }
          dispatch(
            saveAntreanPasienKiosk(values, (data) => {
              //
            })
          )
        } else {
          console.error('Electron not available')
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
            <Col lg={12}>
              {/* <img src={logo} alt='Company Logo' /> */}
              <h1 className="teks-judul">Pengambilan Nomor Antrean</h1>
              <h1 className="teks-judul">Silahkan Pilih Poli Tujuan</h1>
            </Col>
            <Col lg={12} className="mr-2">
              <div className="d-flex justify-content-end gap-2">
                <Button
                  color="danger"
                  style={{ width: '100px' }}
                  className="m-2 mr-2"
                  onClick={() => navigate(-1)}
                >
                  <FontAwesomeIcon icon={faStepBackward} />
                </Button>
                <Button
                  style={{ width: '100px', backgroundColor: '#7084c7' }}
                  className="m-2 mr-2"
                  onClick={handleHome}
                >
                  <FontAwesomeIcon icon={faHomeUser} />
                </Button>
              </div>
            </Col>
            <Row>
              {(data.unit || []).map((item, key) => (
                <Col xl={4} md={4} sm={6} key={key}>
                  {/* <Button key={key} className="btn btn-lg">{item.label}</Button> */}
                  <div className="d-flex justify-content-center">
                    <CardKiosk
                      key={key}
                      style={{ marginBottom: '10px' }}
                      onClick={() => handlePrint(item)}
                    >
                      <CardBody>
                        <div
                          className="text-center"
                          style={{
                            borderBottom: '1px solid',
                            fontFamily: 'sans-serif',
                            fontSize: '30px',
                            minHeight: '180px',
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}
                        >
                          <p style={{ color: 'black' }}>{item.label}</p>
                        </div>
                      </CardBody>
                    </CardKiosk>
                  </div>
                </Col>
              ))}
            </Row>
          </Row>
        </div>
      </Container>
    </React.Fragment>
  )
}

export default PagesPoliklinik
