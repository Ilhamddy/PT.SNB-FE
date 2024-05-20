import { Modal, Row, FormFeedback, Col, Button } from 'reactstrap'
import ColLabelInput from '../../Components/ColLabelInput/ColLabelInput'
import { filterKondisi, findKondisiGigi, Gigi, varGUtuh } from './Odontogram'
import { useSelector } from 'react-redux'
import CustomSelect from '../../Components/Common/CustomSelect/CustomSelect'
import BtnSpinner from '../../Components/Common/BtnSpinner'
import { useState } from 'react'
import LeaderLine from 'leader-line-new'
import { useSelectorRoot } from '../../store/reducers'

const ModalOdontogram = ({ vEditGigi, vKondisiGigi, allGigi, refGigiAtas }) => {
  const gigiKuadranSama = allGigi.filter(
    (g) =>
      g.idkuadran === vEditGigi.values.idkuadran &&
      g.value !== vEditGigi.values.gigi
  )
  const gigi = allGigi.find((f) => vEditGigi.values.gigi === f.value)

  let newKondisiGigi = filterKondisi(
    vKondisiGigi.values.kondisiGigi,
    vEditGigi.values,
    allGigi
  )
  newKondisiGigi = [...newKondisiGigi, { ...vEditGigi.values }]

  const allLegendGigi = useSelectorRoot(
    (state) => state.odontogramSlice.getAllLegendGigi.data.allLegendGigi || []
  )
  const onClickLokasi = (e, lokasi, idgigi, idkuadran, labelgigi, gigi) => {
    const foundKondisi = findKondisiGigi(
      gigi,
      lokasi,
      vKondisiGigi.values.kondisiGigi
    )
    let newLokasi =
      vEditGigi.values.lokasi === varGUtuh
        ? varGUtuh
        : vEditGigi.values.lokasitemp
    newLokasi = newLokasi || lokasi
    if (foundKondisi) {
      vEditGigi.setValues({
        ...vEditGigi.initialValues,
        ...foundKondisi,
        gigi: idgigi,
        lokasi: newLokasi,
        lokasitemp: lokasi,
      })
    } else {
      vEditGigi.setFieldValue('gigi', idgigi)
      vEditGigi.setFieldValue('lokasi', newLokasi)
      vEditGigi.setFieldValue('lokasitemp', lokasi)
      vEditGigi.setFieldValue('idkuadran', idkuadran)
      vEditGigi.setFieldValue('labelgigi', labelgigi)
    }
  }

  const setLine = (indexAsal, indexTujuan, isJembatan, labelGigiTujuan) => {
    if (!isJembatan) return
    const asalNotNull = indexAsal !== null && indexTujuan !== undefined
    const tujuanNotNull = indexTujuan !== null && indexTujuan !== undefined
    if (asalNotNull) {
      vEditGigi.setFieldValue('indexGigi', indexAsal)
    }
    if (tujuanNotNull) {
      vEditGigi.setFieldValue('indexGigiTujuan', indexTujuan)
    }
    if (labelGigiTujuan) {
      vEditGigi.setFieldValue('labelgigitujuan', labelGigiTujuan)
    }
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
    vEditGigi.setFieldValue('reportDisplay', legend.reportdisplay || false)

    vEditGigi.setFieldValue('isJembatan', legend.isjembatan || false)
    if (legend.isjembatan) {
      setLine(
        gigi.indexkondisi,
        vEditGigi.values.indexGigiTujuan,
        legend.isjembatan,
        vEditGigi.values.labelgigitujuan
      )
    } else {
      vEditGigi.setFieldValue('indexGigiTujuan', null)
      vEditGigi.setFieldValue('labelgigitujuan', null)
      vEditGigi.setFieldValue('gigiTujuan', null)
    }
  }

  const onClearKondisi = () => {
    vEditGigi.setValues({
      ...vEditGigi.initialValues,
      gigi: vEditGigi.values.gigi,
      lokasi: vEditGigi.values.lokasi,
      lokasitemp: vEditGigi.values.lokasitemp,
    })
  }

  const handleReset = (e) => {
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
            kondisiGigi={newKondisiGigi}
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
              options={gigiKuadranSama}
              onChange={(e) => {
                vEditGigi.setFieldValue('gigiTujuan', e?.value || null)
                setLine(
                  vEditGigi.values.indexGigi,
                  e ? e.indexkondisi : null,
                  vEditGigi.values.isJembatan || false,
                  e ? e.label : null
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
              {legend.warna ? (
                <div
                  className="isi-gbr"
                  style={{ backgroundColor: legend.warna }}
                />
              ) : legend.kdsvg ? (
                <img
                  alt=""
                  className="isi-gbr"
                  src={`data:image/svg+xml;utf8,${encodeURIComponent(
                    legend.kdsvg
                  )}`}
                />
              ) : legend.tekskondisi ? (
                <p className="isi-gbr">{legend.tekskondisi}</p>
              ) : (
                <></>
              )}
            </div>
          </Col>
        ))}
        <Col lg={4}>
          <div
            className="card-pilihan"
            onClick={() => onClearKondisi()}
            style={{
              backgroundColor:
                vEditGigi.values.kondisi === null ? '#5ec4de' : undefined,
            }}
          >
            <p className="isi-label">Kosong</p>
            <div className="isi-gbr" />
          </div>
        </Col>
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
