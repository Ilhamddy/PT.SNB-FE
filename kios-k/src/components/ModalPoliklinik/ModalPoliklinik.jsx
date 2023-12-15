import PropTypes from 'prop-types'
import React, { useState } from 'react'
import { Col, Modal, ModalHeader, ModalBody, Row, CardBody } from 'reactstrap'
import CardKiosk from '../CardKiosk/CardKiosk'
const ModalPoliklinik = ({ onDokterChange, open, toggle, data }) => {
  const [namaPoliCard, setnamaPoliCard] = useState('Pilih Poliklinik Tujuan')
  const [namaPoli, setnamaPoli] = useState('Pilih Poliklinik Tujuan')
  const [namaPoliId, setnamaPoliId] = useState('')
  const [cardPoli, setcardPoli] = useState(true)
  const [dataDokter, setdataDokter] = useState([])
  const handlePilihPoli = (selected) => {
    var newArray = data.dokter.filter(function (item) {
      if (item.objectunitfk === selected.value) return true
      return false
    })
    setnamaPoliCard(selected.label + ' => Pilih Dokter Tujuan')
    setnamaPoli(selected.label)
    setdataDokter(newArray)
    setcardPoli(false)
    setnamaPoliId(selected.value)
  }
  const handlePilihDokter = (selected) => {
    toggle()
    setcardPoli(true)
    setnamaPoliCard('Pilih Poliklinik Tujuan')
  }
  return (
    <div>
      <Modal isOpen={open} toggle={() => toggle()} centered={true} size="xl">
        <ModalHeader>{namaPoliCard}</ModalHeader>
        <ModalBody>
          <Row>
            {cardPoli ? (
              <>
                {(data.unit || []).map((item, key) => (
                  <Col xl={4} md={4} sm={6} key={key}>
                    {/* <Button key={key} className="btn btn-lg">{item.label}</Button> */}
                    <div className="d-flex justify-content-center">
                      <CardKiosk
                        key={key}
                        style={{ marginBottom: '10px' }}
                        onClick={() => handlePilihPoli(item)}
                      >
                        <CardBody>
                          <div
                            className="text-center"
                            style={{
                              borderBottom: '1px solid',
                              fontFamily: 'sans-serif',
                              fontSize: '30px',
                              minHeight: '170px',
                              alignItems: 'center',
                              justifyContent: 'center',
                              display: 'flex',
                            }}
                          >
                            <p style={{ color: 'black' }}>{item.label}</p>
                          </div>
                        </CardBody>
                      </CardKiosk>
                    </div>
                  </Col>
                ))}
              </>
            ) : (
              <>
                <div>
                  {(dataDokter || []).map((item, key) => (
                    <Col xl={4} md={4} sm={6} key={key}>
                      {/* <Button key={key} className="btn btn-lg">{item.label}</Button> */}
                      <div className="d-flex justify-content-center">
                        <CardKiosk
                          key={key}
                          style={{ marginBottom: '10px' }}
                          onClick={() => {
                            handlePilihDokter(item)
                            onDokterChange(
                              namaPoli,
                              item.label,
                              namaPoliId,
                              item.value
                            )
                          }}
                        >
                          <CardBody>
                            <div
                              className="text-center"
                              style={{
                                borderBottom: '1px solid',
                                fontFamily: 'sans-serif',
                                fontSize: '30px',
                                minHeight: '170px',
                                alignItems: 'center',
                                justifyContent: 'center',
                                display: 'flex',
                              }}
                            >
                              <p style={{ color: 'black' }}>{item.label}</p>
                            </div>
                          </CardBody>
                        </CardKiosk>
                      </div>
                    </Col>
                  ))}
                </div>
              </>
            )}
          </Row>
        </ModalBody>
        {/* <ModalFooter>
        <Button color="primary" onClick={toggle}>
          Do Something
        </Button>{' '}
        <Button color="secondary" onClick={toggle}>
          Cancel
        </Button>
      </ModalFooter> */}
      </Modal>
    </div>
  )
}

ModalPoliklinik.propTypes = {
  // onCloseClick: PropTypes.func,
  handlePilihPoli: PropTypes.func,
  open: PropTypes.any,
  namapoli: PropTypes.any,
}

export default ModalPoliklinik
