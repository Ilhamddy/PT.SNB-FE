import { Modal, Row, FormFeedback, Col, Card } from 'reactstrap'
import ColLabelInput from '../../Components/ColLabelInput/ColLabelInput'
import { Gigi, initKondisiGigi } from './Odontogram'
import { useSelector } from 'react-redux'
import CustomSelect from '../Select/Select'

const ModalOdontogram = ({ vEditGigi, vKondisiGigi }) => {
  const allGigi = useSelector(
    (state) => state.odontogramSlice.getAllGigi.data.allGigi || []
  )

  let kondisiTemp = [...vKondisiGigi.values.kondisiGigi]
  kondisiTemp = kondisiTemp.filter(
    (f) => f.gigi !== vEditGigi.gigi && f.lokasi !== vEditGigi.lokasi
  )
  kondisiTemp = [...kondisiTemp, { ...vEditGigi.values }]

  const allLegendGigi = useSelector(
    (state) => state.odontogramSlice.getAllLegendGigi.data.allLegendGigi || []
  )
  const onClickLokasi = (e, lokasi) => {
    vEditGigi.setFieldValue('lokasi', lokasi)
  }

  const onClickKondisi = (legend) => {
    vEditGigi.setFieldValue('kondisi', legend.value)
    vEditGigi.setFieldValue('svgKondisi', legend.kdsvg)
    vEditGigi.setFieldValue('warnaKondisi', legend.warna)
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
    </Modal>
  )
}

export default ModalOdontogram
