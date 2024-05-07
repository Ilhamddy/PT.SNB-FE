import { Modal, Row, FormFeedback, Col, Button } from 'reactstrap'
import ColLabelInput from '../../Components/ColLabelInput/ColLabelInput'
import { Gigi, varGUtuh } from './Odontogram'
import { useSelector } from 'react-redux'
import CustomSelect from '../Select/Select'
import BtnSpinner from '../../Components/Common/BtnSpinner'
import { useState } from 'react'
import LeaderLine from 'leader-line-new'

const ModalOdontogram = ({
  vEditGigi,
  vKondisiGigi,
  refKontainerGigi,
  refGigiAtas,
}) => {
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

  const setLine = (indexAsal, indexTujuan, isJembatan) => {
    if (!isJembatan) return
    vEditGigi.values.line && vEditGigi.values.line.remove()
    const asalNotNull = indexAsal !== null && indexTujuan !== undefined
    const tujuanNotNull = indexTujuan !== null && indexTujuan !== undefined
    if (asalNotNull) {
      vEditGigi.setFieldValue('indexGigi', indexAsal)
    }
    if (tujuanNotNull) {
      vEditGigi.setFieldValue('indexGigiTujuan', indexTujuan)
    }
    if (asalNotNull && tujuanNotNull) {
      const start = LeaderLine.pointAnchor(
        refGigiAtas.current[indexAsal].current,
        { x: 14 }
      )
      const end = LeaderLine.pointAnchor(
        refGigiAtas.current[indexTujuan].current,
        { x: 14 }
      )

      const line = new LeaderLine(start, end, {
        startSocket: 'top',
        endSocket: 'top',
        endPlug: 'behind',
        path: 'grid',
      })
      vEditGigi.setFieldValue('line', line)
    } else {
      vEditGigi.setFieldValue('line', null)
    }
  }
  const gigi = allGigi.find((f) => vEditGigi.values.gigi === f.value)

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
    setLine(
      gigi.indexkondisi,
      vEditGigi.values.indexGigiTujuan,
      legend.isjembatan
    )
  }

  const handleReset = (e) => {
    if (vEditGigi.values.line) {
      vEditGigi.values.line.remove()
    }
    vEditGigi.resetForm(e)
  }

  return (
    <Modal
      centered={true}
      size="xl"
      isOpen={!!vEditGigi.values.gigi}
      toggle={handleReset}
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
                setLine(
                  vEditGigi.values.indexGigi,
                  e ? e.indexkondisi : null,
                  vEditGigi.values.isJembatan || false
                )
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
          onClick={handleReset}
        >
          Batal
        </BtnSpinner>
        <BtnSpinner
          type="button"
          color="success"
          placement="top"
          id="tooltipTop"
          onClick={(e) => {
            console.error(vEditGigi.errors)
            vEditGigi.handleSubmit(e)
          }}
        >
          Simpan
        </BtnSpinner>
      </div>
    </Modal>
  )
}

export default ModalOdontogram
