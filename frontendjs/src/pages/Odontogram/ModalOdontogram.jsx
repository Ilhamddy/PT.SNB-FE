import { Modal, Row, FormFeedback, Col, Button } from 'reactstrap'
import ColLabelInput from '../../Components/ColLabelInput/ColLabelInput'
import { Gigi, initKondisiGigi, varGUtuh } from './Odontogram'
import { useSelector } from 'react-redux'
import CustomSelect from '../Select/Select'
import BtnSpinner from '../../Components/Common/BtnSpinner'
import { useState } from 'react'

const ModalOdontogram = ({ vEditGigi, vKondisiGigi }) => {
  const allGigi = useSelector(
    (state) => state.odontogramSlice.getAllGigi.data.allGigi || []
  )
  const isUtuh = vEditGigi.values.lokasi === varGUtuh
  const isWarna = vEditGigi.values.warnaKondisi !== null

  let kondisiTemp = [...vKondisiGigi.values.kondisiGigi]
  kondisiTemp = kondisiTemp.filter((f) => {
    const isBedaLokasiGigi =
      f.gigi !== vEditGigi.values.gigi && f.lokasi !== vEditGigi.values.lokasi
    const isBedaLokasi =
      f.gigi === vEditGigi.values.gigi && f.lokasi !== vEditGigi.values.lokasi
    const isGigiUtuh = f.lokasi === varGUtuh
    return isBedaLokasiGigi || isBedaLokasi || isGigiUtuh
  })

  if (isUtuh) {
    // kalau utuh, hapus utuh lainnya, kalo bisa ditumpuk jangan hapus
    kondisiTemp = kondisiTemp.filter((kondisi) => {
      const allBisaTumpuk = kondisi.isTumpuk && vEditGigi.values.isTumpuk
      return (
        kondisi.gigi !== vEditGigi.values.gigi ||
        kondisi.lokasi !== varGUtuh ||
        allBisaTumpuk
      )
    })
  }
  if (isUtuh && isWarna) {
    // kalau memasukkan yang warna utuh, filter warna sebagian lainnya
    kondisiTemp = kondisiTemp.filter(
      (kondisi) =>
        kondisi.gigi !== vEditGigi.values.gigi || kondisi.warnaKondisi === null
    )
  } else if (isWarna) {
    // kalau memasukkan yang warna sebagian, filter utuh yang warna
    kondisiTemp = kondisiTemp.filter(
      (kondisi) =>
        kondisi.gigi !== vEditGigi.values.gigi ||
        kondisi.lokasi !== varGUtuh ||
        (kondisi.lokasi === varGUtuh && kondisi.warnaKondisi === null)
    )
  }
  kondisiTemp = [...kondisiTemp, { ...vEditGigi.values }]

  const allLegendGigi = useSelector(
    (state) => state.odontogramSlice.getAllLegendGigi.data.allLegendGigi || []
  )
  const onClickLokasi = (e, lokasi) => {
    vEditGigi.setFieldValue('lokasi', lokasi)
    vEditGigi.setFieldValue('lokasitemp', lokasi)
  }

  const onClickKondisi = (legend) => {
    if (legend.isfull) {
      vEditGigi.setFieldValue('lokasi', varGUtuh)
    } else if (vEditGigi.values.lokasitemp) {
      vEditGigi.setFieldValue('lokasi', vEditGigi.values.lokasitemp)
    }
    vEditGigi.setFieldValue('kondisi', legend.value)
    vEditGigi.setFieldValue('isFull', legend.isfull || null)
    vEditGigi.setFieldValue('svgKondisi', legend.kdsvg || null)

    vEditGigi.setFieldValue('warnaKondisi', legend.warna || null)
    vEditGigi.setFieldValue('teksKondisi', legend.tekskondisi || null)

    vEditGigi.setFieldValue('isTumpuk', legend.istumpuk || false)
    vEditGigi.setFieldValue('isJembatan', legend.isjembatan || false)
  }

  const gigi = allGigi.find((f) => vEditGigi.values.gigi === f.value)

  return (
    <Modal
      centered={true}
      size="xl"
      isOpen={!!vEditGigi.values.gigi}
      toggle={() => {
        vEditGigi.resetForm()
      }}
      className="page-odontogram"
    >
      <Row className="p-2">
        <div className="kontainer-all-gigi">
          <Gigi
            gigi={gigi}
            chosenLokasi={vEditGigi.values.lokasi}
            chosenGigi={vEditGigi.values.gigi}
            kondisiGigi={kondisiTemp}
            onClickLokasi={onClickLokasi}
          />
        </div>
        <ColLabelInput label="Nomor Gigi" lg={3}>
          <CustomSelect
            id="gigi"
            name="gigi"
            options={allGigi}
            onChange={(e) => {
              vEditGigi.setFieldValue('gigi', e?.value || '')
            }}
            value={vEditGigi.values.gigi}
            onBlur={vEditGigi.handleBlur}
            className={`input row-header ${
              !!vEditGigi?.errors.gigi ? 'is-invalid' : ''
            }`}
            isClearEmpty
          />
          {vEditGigi.touched.gigi && !!vEditGigi.errors.gigi && (
            <FormFeedback type="invalid">
              <div>{vEditGigi.errors.gigi}</div>
            </FormFeedback>
          )}
        </ColLabelInput>
        {vEditGigi.values.isJembatan && (
          <ColLabelInput label="Gigi Tujuan" lg={3}>
            <CustomSelect
              id="gigiTujuan"
              name="gigiTujuan"
              options={allGigi}
              onChange={(e) => {
                vEditGigi.setFieldValue('gigiTujuan', e?.value || null)
              }}
              value={vEditGigi.values.gigiTujuan}
              onBlur={vEditGigi.handleBlur}
              className={`input row-header ${
                !!vEditGigi?.errors.gigiTujuan ? 'is-invalid' : ''
              }`}
              isClearEmpty
            />
            {vEditGigi.touched.gigiTujuan && !!vEditGigi.errors.gigiTujuan && (
              <FormFeedback type="invalid">
                <div>{vEditGigi.errors.gigiTujuan}</div>
              </FormFeedback>
            )}
          </ColLabelInput>
        )}
      </Row>
      <Row className="p-4">
        {allLegendGigi.map((legend, index) => (
          <Col key={index} lg={4}>
            <div
              className="card-pilihan"
              onClick={() => onClickKondisi(legend)}
              style={{
                backgroundColor:
                  vEditGigi.values.kondisi === legend.value
                    ? '#5ec4de'
                    : undefined,
              }}
            >
              <p className="isi-label">{legend.label}</p>
              <div
                className="isi-gbr"
                style={{ backgroundColor: legend.warna }}
              />
            </div>
          </Col>
        ))}
      </Row>
      <div className="d-flex gap-2 justify-content-center mt-4 mb-2">
        <BtnSpinner
          type="button"
          color="danger"
          placement="top"
          id="tooltipTop"
          onClick={vEditGigi.resetForm}
        >
          Batal
        </BtnSpinner>
        <BtnSpinner
          type="button"
          color="success"
          placement="top"
          id="tooltipTop"
          onClick={vEditGigi.handleSubmit}
        >
          Simpan
        </BtnSpinner>
      </div>
    </Modal>
  )
}

export default ModalOdontogram
