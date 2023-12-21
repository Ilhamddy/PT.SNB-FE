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
  UncontrolledTooltip,
} from 'reactstrap'
import KontainerFlatpickr from '../../Components/KontainerFlatpickr/KontainerFlatpickr'
import DataTable from 'react-data-table-component'
import { useEffect } from 'react'
import {
  getComboJadwal,
  getJadwalDokterSDM,
  upsertJadwal,
} from '../../store/sumberDayaManusia/action'
import { useDispatch, useSelector } from 'react-redux'
import LoadingTable from '../../Components/Table/LoadingTable'
import NoDataTable from '../../Components/Table/NoDataTable'
import { dateTimeLocal, timeLocal } from '../../utils/format'
import * as Yup from 'yup'
import { tableCustomStyles } from '../../Components/Table/tableCustomStyles'

const MasterJadwalDokter = () => {
  const { comboJadwal, jadwal } = useSelector((state) => ({
    comboJadwal: state.sumberDayaManusia.getComboJadwal.data || null,
    jadwal: state.sumberDayaManusia.getJadwalDokterSDM.data.jadwal || [],
  }))
  const vJadwal = useFormik({
    initialValues: {
      idjadwal: '',
      dokter: '',
      ruangrawat: '',
      nip: '',
      hari: '',
      unit: '',
      jamkerjastart: '',
      jamkerjaend: '',
    },
    validationSchema: Yup.object({
      dokter: Yup.string().required('Dokter harus diisi'),
      ruangrawat: Yup.string().required('Ruang Rawat harus diisi'),
      nip: Yup.string().required('NIP harus diisi'),
      hari: Yup.string().required('Hari harus diisi'),
      unit: Yup.string().required('Unit harus diisi'),
      jamkerjastart: Yup.string().required('Jam Kerja Start harus diisi'),
      jamkerjaend: Yup.string().required('Jam Kerja End harus diisi'),
    }),
    onSubmit: async (values, { resetForm }) => {
      dispatch(
        upsertJadwal(values, () => {
          dispatch(getJadwalDokterSDM())
          resetForm()
        })
      )
    },
  })
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getComboJadwal())
    dispatch(getJadwalDokterSDM())
  }, [dispatch])

  const setJadwalNow = (row) => {
    vJadwal.setFieldValue('idjadwal', row.id)
    vJadwal.setFieldValue('dokter', row.objectpegawaifk)
    vJadwal.setFieldValue('ruangrawat', row.objectkamarfk)
    vJadwal.setFieldValue('nip', row.nip)
    vJadwal.setFieldValue('hari', row.objectharifk)
    vJadwal.setFieldValue('unit', row.objectunitfk)
    vJadwal.setFieldValue('jamkerjastart', row.jam_mulai)
    vJadwal.setFieldValue('jamkerjaend', row.jam_selesai)
  }

  const columns = [
    {
      name: <span className="font-weight-bold fs-13">Detail</span>,
      sortable: false,
      cell: (row) => {
        return (
          <div className="hstack gap-3 flex-wrap">
            <UncontrolledTooltip placement="top" target="tooltipTop2">
              {' '}
              Pengkajian Pasien{' '}
            </UncontrolledTooltip>
            <UncontrolledDropdown className="dropdown d-inline-block">
              <DropdownToggle
                className="btn btn-soft-secondary btn-sm"
                tag="button"
                id="tooltipTop2"
              >
                <i className="ri-apps-2-line"></i>
              </DropdownToggle>
              <DropdownMenu className="dropdown-menu-end">
                <DropdownItem onClick={() => setJadwalNow(row)}>
                  <i className="ri-mail-send-fill align-bottom me-2 text-muted"></i>
                  Edit
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </div>
        )
      },
      width: '50px',
    },
    {
      name: <span className="font-weight-bold fs-13">NIP</span>,
      sortable: true,
      selector: (row) => row.nip,
      width: '120px',
    },
    {
      name: <span className="font-weight-bold fs-13">Nama Lengkap</span>,
      sortable: true,
      selector: (row) => row.namalengkap,
      width: '250px',
    },
    {
      name: <span className="font-weight-bold fs-13">Hari</span>,
      sortable: true,
      selector: (row) => row.namahari,
      width: '100px',
    },
    {
      name: <span className="font-weight-bold fs-13">Jam Mulai</span>,
      sortable: true,
      selector: (row) => timeLocal(row.jam_mulai),
      width: '100px',
    },
    {
      name: <span className="font-weight-bold fs-13">Jam Selesai</span>,
      sortable: true,
      selector: (row) => timeLocal(row.jam_selesai),
      width: '100px',
    },
    {
      name: <span className="font-weight-bold fs-13">Unit</span>,
      sortable: true,
      selector: (row) => row.namaunit,
      width: '160px',
    },
    {
      name: <span className="font-weight-bold fs-13">Aktif</span>,
      sortable: true,
      selector: (row) => (row.statusenabled ? 'Aktif' : 'Tidak Aktif'),
      width: '120px',
    },
  ]

  return (
    <div className="page-content page-penerimaan-barang">
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
                id="dokter"
                name="dokter"
                options={comboJadwal?.dokter || []}
                isClearEmpty
                onChange={(e) => {
                  vJadwal.setFieldValue('nip', e?.nip || '')
                  vJadwal.setFieldValue('dokter', e?.value || '')
                }}
                value={vJadwal.values.dokter}
                className={`input row-header ${
                  !!vJadwal?.errors.dokter ? 'is-invalid' : ''
                }`}
              />
              {vJadwal.touched.dokter && !!vJadwal.errors.dokter && (
                <FormFeedback type="invalid">
                  <div>{vJadwal.errors.dokter}</div>
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
                options={comboJadwal?.kamar || []}
                isClearEmpty
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
                disabled
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
                options={comboJadwal?.hari || []}
                isClearEmpty
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
                isClearEmpty
                options={comboJadwal?.poliklinik || []}
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
            <Col className="d-flex" lg="auto">
              <Button
                color="success"
                onClick={() => {
                  vJadwal.handleSubmit()
                }}
              >
                {vJadwal.values.idjadwal ? 'Edit' : 'Tambah'}
              </Button>
            </Col>
            <Col lg="auto">
              <Button
                color="danger"
                className="ms-2"
                onClick={() => {
                  vJadwal.resetForm()
                }}
              >
                Batal
              </Button>
            </Col>
          </Row>
          <DataTable
            className="mt-3"
            fixedHeader
            fixedHeaderScrollHeight="700px"
            columns={columns}
            pagination
            data={jadwal}
            progressPending={false}
            customStyles={tableCustomStyles}
            progressComponent={<LoadingTable />}
            noDataComponent={<NoDataTable dataName={'jadwal'} />}
          />
        </Card>
      </Container>
    </div>
  )
}

export default MasterJadwalDokter
