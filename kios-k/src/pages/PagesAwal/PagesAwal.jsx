import React from 'react'
import '../../App.scss' // Import your CSS file for styling
import { useNavigate } from 'react-router-dom'
import { Row, Col, CardBody, Container } from 'reactstrap'
import logo from '../../assets/svg/snb.svg'
import antrean from '../../assets/svg/pengambilan-antrean.svg'
import daftar from '../../assets/svg/pendaftaran-mandiri.svg'
import CardKiosk from '../../components/CardKiosk/CardKiosk'
import HeaderKiosk from '../../components/HeaderKiosk/HeaderKiosk'

function PagesAwal() {
  const navigate = useNavigate()

  const handleCardClickAntrean = () => {
    navigate('/pages-pemilihan-antrean')
  }

  const handleCardClickAPM = () => {
    navigate('/pages-penjamin-pendaftaran')
  }
  return (
    <Container fluid>
      <div className="pages-awal">
        <Row>
          <HeaderKiosk />
          <Col lg={6} className="mt-5">
            <div className="d-flex justify-content-center">
              <CardKiosk onClick={handleCardClickAntrean}>
                <CardBody>
                  <div className="mx-auto avatar-md mb-3">
                    <img
                      src={antrean}
                      alt=""
                      className="gbr-btn-pasien-pilihan rounded-circle"
                    />
                  </div>
                </CardBody>
                <div
                  className="text-center"
                  style={{
                    borderTop: '1px solid',
                    fontFamily: 'sans-serif',
                    fontSize: '36px',
                  }}
                >
                  <p style={{ color: 'black' }}>Pengambilan Antrean</p>
                </div>
              </CardKiosk>
            </div>
          </Col>
          <Col lg={6} className="mt-5">
            <div className="d-flex justify-content-center">
              <CardKiosk onClick={handleCardClickAPM}>
                <CardBody>
                  <div className="mx-auto avatar-md mb-3">
                    <img
                      src={daftar}
                      alt=""
                      className="gbr-btn-pasien-pilihan rounded-circle"
                    />
                  </div>
                </CardBody>
                <div
                  className="text-center"
                  style={{
                    borderTop: '1px solid',
                    fontFamily: 'sans-serif',
                    fontSize: '36px',
                  }}
                >
                  <p style={{ color: 'black' }}>Pendaftaran Mandiri</p>
                </div>
              </CardKiosk>
            </div>
          </Col>
        </Row>
      </div>
    </Container>
  )
}

export default PagesAwal
