import { ToastContainer } from 'react-toastify'
import BreadCrumb from '../../Components/Common/BreadCrumb'
import { useFormik } from 'formik'
import CustomSelect from '../Select/Select'
import {
  Card,
  CardBody,
  Col,
  Container,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Input,
  Label,
  Row,
  UncontrolledDropdown,
  FormFeedback,
  Button,
} from 'reactstrap'
import KontainerFlatpickr from '../../Components/KontainerFlatpickr/KontainerFlatpickr'
import DataTable from 'react-data-table-component'

const MasterJadwalDokter = () => {
  const vJadwal = useFormik({
    initialValues: {
      namadokter: '',
      ruangrawat: '',
      nip: '',
      hari: '',
      unit: '',
      jamkerjastart: '',
      jamkerjaend: '',
    },
  })
  return (
    <div className="page-content page-penerimaan-barang">
      <ToastContainer closeButton={false} />
      <Container fluid>
        <BreadCrumb title="Jadwal Dokter" pageTitle="Jadwal Dokter" />
        <Card className="p-5">
          <Row className="mb-2">
            <Col lg={2}>
              <Label
                style={{ color: 'black' }}
                htmlFor={`tanggalorder`}
                className="form-label mt-2"
              >
                Nama Dokter
              </Label>
            </Col>
            <Col lg={4} className="mb-2">
              <CustomSelect
                id="namadokter"
                name="namadokter"
                options={[]}
                onChange={(e) => {
                  vJadwal.setFieldValue('namadokter', e?.value || '')
                }}
                value={vJadwal.values.namadokter}
                className={`input row-header ${
                  !!vJadwal?.errors.namadokter ? 'is-invalid' : ''
                }`}
              />
              {vJadwal.touched.namadokter && !!vJadwal.errors.namadokter && (
                <FormFeedback type="invalid">
                  <div>{vJadwal.errors.namadokter}</div>
                </FormFeedback>
              )}
            </Col>
            <Col lg={2}>
              <Label
                style={{ color: 'black' }}
                htmlFor={`tanggalorder`}
                className="form-label mt-2"
              >
                Ruang Rawat
              </Label>
            </Col>
            <Col lg={4} className="mb-2">
              <CustomSelect
                id="ruangrawat"
                name="ruangrawat"
                options={[]}
                onChange={(e) => {
                  vJadwal.setFieldValue('ruangrawat', e?.value || '')
                }}
                value={vJadwal.values.ruangrawat}
                className={`input row-header ${
                  !!vJadwal?.errors.ruangrawat ? 'is-invalid' : ''
                }`}
              />
              {vJadwal.touched.ruangrawat && !!vJadwal.errors.ruangrawat && (
                <FormFeedback type="invalid">
                  <div>{vJadwal.errors.ruangrawat}</div>
                </FormFeedback>
              )}
            </Col>
            <Col lg={2}>
              <Label
                style={{ color: 'black' }}
                htmlFor={`tanggalorder`}
                className="form-label mt-2"
              >
                NIP
              </Label>
            </Col>
            <Col lg={4} className="mb-2">
              <Input
                id="nip"
                name="nip"
                type="text"
                value={vJadwal.values.nip}
                onChange={(e) => {
                  vJadwal.setFieldValue('nip', e.target.value)
                }}
                invalid={vJadwal.touched?.nip && !!vJadwal.errors?.nip}
              />
              {vJadwal.touched?.nip && !!vJadwal.errors.nip && (
                <FormFeedback type="invalid">
                  <div>{vJadwal.errors.nip}</div>
                </FormFeedback>
              )}
            </Col>
            <Col lg={2}>
              <Label
                style={{ color: 'black' }}
                htmlFor={`tanggalorder`}
                className="form-label mt-2"
              >
                Hari
              </Label>
            </Col>
            <Col lg={4} className="mb-2">
              <CustomSelect
                id="hari"
                name="hari"
                options={[]}
                onChange={(e) => {
                  vJadwal.setFieldValue('hari', e?.value || '')
                }}
                value={vJadwal.values.hari}
                className={`input row-header ${
                  !!vJadwal?.errors.hari ? 'is-invalid' : ''
                }`}
              />
              {vJadwal.touched.hari && !!vJadwal.errors.hari && (
                <FormFeedback type="invalid">
                  <div>{vJadwal.errors.hari}</div>
                </FormFeedback>
              )}
            </Col>
            <Col lg={2}>
              <Label
                style={{ color: 'black' }}
                htmlFor={`tanggalorder`}
                className="form-label mt-2"
              >
                Unit
              </Label>
            </Col>
            <Col lg={4} className="mb-2">
              <CustomSelect
                id="unit"
                name="unit"
                options={[]}
                onChange={(e) => {
                  vJadwal.setFieldValue('unit', e?.value || '')
                }}
                value={vJadwal.values.unit}
                className={`input row-header ${
                  !!vJadwal?.errors.unit ? 'is-invalid' : ''
                }`}
              />
              {vJadwal.touched.unit && !!vJadwal.errors.unit && (
                <FormFeedback type="invalid">
                  <div>{vJadwal.errors.unit}</div>
                </FormFeedback>
              )}
            </Col>
            <Col lg={2}>
              <Label
                style={{ color: 'black' }}
                htmlFor={`tanggalorder`}
                className="form-label mt-2"
              >
                Jam Kerja
              </Label>
            </Col>
            <Col lg={2} className="mb-2">
              <KontainerFlatpickr
                isError={
                  vJadwal.touched?.jamkerjastart &&
                  !!vJadwal.errors?.jamkerjastart
                }
                id="jamkerjastart"
                options={{
                  dateFormat: 'H:i',
                  defaultDate: 'today',
                  time_24hr: true,
                  enableTime: true,
                  noCalendar: true,
                }}
                value={vJadwal.values.jamkerjastart}
                onChange={([newDate]) => {
                  vJadwal.setFieldValue('jamkerjastart', newDate.toISOString())
                }}
              />
              {vJadwal.touched?.jamkerjastart &&
                !!vJadwal.errors.jamkerjastart && (
                  <FormFeedback type="invalid">
                    <div>{vJadwal.errors.jamkerjastart}</div>
                  </FormFeedback>
                )}
            </Col>
            <Col lg={2} className="mb-2">
              <KontainerFlatpickr
                isError={
                  vJadwal.touched?.jamkerjaend && !!vJadwal.errors?.jamkerjaend
                }
                id="jamkerjaend"
                options={{
                  dateFormat: 'H:i',
                  defaultDate: 'today',
                  time_24hr: true,
                  enableTime: true,
                  noCalendar: true,
                }}
                value={vJadwal.values.jamkerjaend}
                onChange={([newDate]) => {
                  vJadwal.setFieldValue('jamkerjaend', newDate.toISOString())
                }}
              />
              {vJadwal.touched?.jamkerjaend && !!vJadwal.errors.jamkerjaend && (
                <FormFeedback type="invalid">
                  <div>{vJadwal.errors.jamkerjaend}</div>
                </FormFeedback>
              )}
            </Col>
          </Row>
          <Row className="d-flex justify-content-center">
            <Col className="d-flex" lg={3}>
              <Button color="success">Tambah / Edit</Button>
              <Button color="danger ms-3">Hapus</Button>
            </Col>
          </Row>
          <DataTable />
        </Card>
      </Container>
    </div>
  )
}

export default MasterJadwalDokter
