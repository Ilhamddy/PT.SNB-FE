import { ToastContainer } from 'react-toastify'
import BreadCrumb from '../../Components/Common/BreadCrumb'
import {
  Button,
  Card,
  Col,
  Container,
  FormFeedback,
  Input,
  Modal,
  ModalBody,
  Row,
} from 'reactstrap'
import { useFormik } from 'formik'
import KontainerFlatpickr from '../../Components/KontainerFlatpickr/KontainerFlatpickr'
import * as Yup from 'yup'
import { useDispatch, useSelector } from 'react-redux'
import { createContext, useContext, useEffect, useState } from 'react'
import {
  batalCuti,
  getComboCuti,
  getLiburPegawai,
  upsertCuti,
} from '../../store/actions'
import { dateLocal } from '../../utils/format'
import DataTable from 'react-data-table-component'
import LoadingTable from '../../Components/Table/LoadingTable'
import ColLabelInput from '../../Components/ColLabelInput/ColLabelInput'
import CustomSelect from '../Select/Select'
import DeleteModal from '../../Components/Common/DeleteModal'
import DeleteModalCustom from '../../Components/Common/DeleteModalCustom'

const LiburPegawaiContext = createContext({
  cutiType: '',
  setCutiType: null,
})

const LiburPegawai = () => {
  const dispatch = useDispatch()
  const { liburPegawai, loading } = useSelector((state) => ({
    liburPegawai:
      state.sumberDayaManusia.getLiburPegawai.data?.liburPegawai || [],
    loading: state.sumberDayaManusia.getLiburPegawai.loading,
  }))
  const [cutiType, setCutiType] = useState(type.CLOSE)
  const vBatal = useFormik({
    initialValues: {
      norecbatal: '',
    },
    onSubmit: (values) => {
      dispatch(batalCuti(values, () => dispatch(getLiburPegawai())))
    },
  })

  const columns = [
    {
      name: <span className="font-weight-bold fs-13">No</span>,
      selector: (row) => row.no,
      sortable: true,
      width: '60px',
      wrap: true,
    },
    {
      name: <span className="font-weight-bold fs-13">Tgl Libur</span>,
      selector: (row) => dateLocal(row.tgllibur),
      sortable: true,
      width: '120px',
      wrap: true,
    },
    {
      name: <span className="font-weight-bold fs-13">Nama Pegawai</span>,
      selector: (row) => row.namapegawai,
      sortable: true,
      width: '250px',
    },
    {
      name: <span className="font-weight-bold fs-13">Nama Unit</span>,
      selector: (row) => row.namaunitlibur,
      sortable: true,
      width: '120px',
    },
    {
      name: <span className="font-weight-bold fs-13">Alasan</span>,
      selector: (row) => row.alasan,
      sortable: true,
      width: '250px',
    },
    {
      name: <span className="font-weight-bold fs-13">Pegawai Input</span>,
      selector: (row) => row.namapegawaiinput,
      sortable: true,
      width: '120px',
    },
    {
      name: <span className="font-weight-bold fs-13">Batal</span>,
      cell: (row) => (
        <Button
          color="danger"
          onClick={() => {
            vBatal.setFieldValue('norecbatal', row.norec)
          }}
        >
          Batal Cuti
        </Button>
      ),
      sortable: true,
      width: '170px',
    },
  ]

  return (
    <div className="page-content page-dasbor-eis-utama">
      <BreadCrumb
        title="Libur Dokter "
        pageTitle="Master Data"
        className="bc-dasbor-eis"
      />
      <DeleteModalCustom
        show={!!vBatal.values.norecbatal}
        onDeleteClick={vBatal.handleSubmit}
        onCloseClick={vBatal.resetForm}
      />
      <ToastContainer closeButton={false} />
      <Container fluid>
        <LiburPegawaiContext.Provider
          value={{ cutiType: cutiType, setCutiType: setCutiType }}
        >
          <ModalCuti />
          <Card className="p-4">
            <TombolSetting />
            <DataTable
              fixedHeader
              progressComponent={<LoadingTable />}
              columns={columns}
              pagination
              data={liburPegawai}
              progressPending={loading}
              customStyles={tableCustomStyles}
            />
          </Card>
        </LiburPegawaiContext.Provider>
      </Container>
    </div>
  )
}

const TombolSetting = () => {
  const dispatch = useDispatch()
  const { setCutiType } = useContext(LiburPegawaiContext)

  const vFilter = useFormik({
    initialValues: {
      namadokter: '',
      tanggal: '',
    },
    onSubmit: (values) => {
      dispatch(getLiburPegawai(values))
    },
  })
  useEffect(() => {
    dispatch(getLiburPegawai(vFilter.initialValues))
  }, [vFilter.initialValues, dispatch])
  return (
    <Row className="mb-4">
      <Col lg={6}>
        <Row>
          <Col lg={4}>
            <Button
              color="info"
              className="w-100"
              onClick={() => setCutiType(type.CUTI)}
            >
              Tambah Cuti Dokter
            </Button>
          </Col>
          <Col lg={4}>
            <Button
              color="info"
              className="w-100"
              onClick={() => setCutiType(type.UNIT)}
            >
              Libur poliklinik
            </Button>
          </Col>
          <Col lg={4}>
            <Button
              color="info"
              className="w-100"
              onClick={() => setCutiType(type.CUTI_BERSAMA)}
            >
              Setting Cuti Bersama
            </Button>
          </Col>
        </Row>
      </Col>
      <Col lg={6}>
        <Row className="d-flex flex-row-reverse">
          <Col
            lg={2}
            onClick={() => {
              vFilter.handleSubmit()
            }}
            className="d-flex flex-row-reverse"
          >
            <Button type="button" color="info">
              Cari
            </Button>
          </Col>
          <Col lg={4}>
            <Input
              id="namadokter"
              name="namadokter"
              type="text"
              placeholder="Nama Dokter"
              value={vFilter.values.namadokter}
              onChange={(e) => {
                vFilter.setFieldValue('namadokter', e.target.value)
              }}
              invalid={
                vFilter.touched?.namadokter && !!vFilter.errors?.namadokter
              }
            />
            {vFilter.touched?.namadokter && !!vFilter.errors.namadokter && (
              <FormFeedback type="invalid">
                <div>{vFilter.errors.namadokter}</div>
              </FormFeedback>
            )}
          </Col>
          <Col lg={4}>
            <KontainerFlatpickr
              isError={vFilter.touched?.tanggal && !!vFilter.errors?.tanggal}
              id="tanggal"
              placeholder="Filter tanggal"
              options={{
                dateFormat: 'Y-m-d',
                defaultDate: 'today',
              }}
              value={vFilter.values.tanggal}
              onChange={([newDate]) => {
                vFilter.setFieldValue('tanggal', newDate.toISOString())
              }}
            />
            {vFilter.touched?.tanggal && !!vFilter.errors.tanggal && (
              <FormFeedback type="invalid">
                <div>{vFilter.errors.tanggal}</div>
              </FormFeedback>
            )}
          </Col>
        </Row>
      </Col>
    </Row>
  )
}

const ModalCuti = ({ ...rest }) => {
  const dispatch = useDispatch()
  const { loadingCombo, pegawai, cuti, unit } = useSelector((state) => ({
    loadingCombo: state.sumberDayaManusia.getComboCuti.loading || false,
    pegawai: state.sumberDayaManusia.getComboCuti.data.pegawai || [],
    cuti: state.sumberDayaManusia.getComboCuti.data.cuti || [],
    unit: state.sumberDayaManusia.getComboCuti.data.unit || [],
  }))
  const { cutiType } = useContext(LiburPegawaiContext)
  const vCuti = useFormik({
    enableReinitialize: true,
    initialValues: {
      cutitype: '',
      namapegawai: '',
      nip: '',
      unit: '',
      tgllibur: '',
      tglliburend: '',
      jeniscuti: '',
      alasannamalibur: '',
    },
    validationSchema: Yup.object({
      namapegawai: Yup.string().when('cutitype', {
        is: (v) => v === type.CUTI,
        then: () => Yup.string().required('Nama Pegawai wajib diisi'),
      }),
      unit: Yup.string().when('cutitype', {
        is: (v) => v === type.UNIT,
        then: () => Yup.string().required('Unit Wajib diisi'),
      }),
      tgllibur: Yup.string().required('Tanggal libur wajib diisi'),
      jeniscuti: Yup.string().required('Jenis cuti wajib diisi'),
      alasannamalibur: Yup.string().required('Wajib diisi'),
    }),
    onSubmit: (values, { resetForm }) => {
      dispatch(
        upsertCuti(values, () => {
          resetForm()
          dispatch(getLiburPegawai())
        })
      )
    },
  })
  useEffect(() => {
    dispatch(getComboCuti())
  }, [dispatch])
  useEffect(() => {
    const setFF = vCuti.setFieldValue
    setFF('cutitype', cutiType)
  }, [cutiType, vCuti.setFieldValue])
  const isOpen = !!vCuti.values.cutitype
  return (
    <Modal
      isOpen={isOpen}
      toggle={vCuti.resetForm}
      centered={true}
      size="lg"
      {...rest}
    >
      <ModalBody className="py-12 px-12">
        {vCuti.values.cutitype === type.CUTI ? (
          <>
            <Row className="mb-2">
              <ColLabelInput label="Nama Pegawai" inputId="namapegawai" lg={6}>
                <CustomSelect
                  id="namapegawai"
                  name="namapegawai"
                  options={pegawai}
                  onChange={(e) => {
                    vCuti.setFieldValue('namapegawai', e?.value || '')
                    vCuti.setFieldValue('nip', e?.nip || '')
                    vCuti.setFieldValue('unit', e?.unit || '')
                  }}
                  value={vCuti.values.namapegawai}
                  className={`input row-header ${
                    !!vCuti?.errors.namapegawai ? 'is-invalid' : ''
                  }`}
                />
                {vCuti.touched.namapegawai && !!vCuti.errors.namapegawai && (
                  <FormFeedback type="invalid">
                    <div>{vCuti.errors.namapegawai}</div>
                  </FormFeedback>
                )}
              </ColLabelInput>
              <ColLabelInput label="NIP" inputId="nip" lg={6}>
                <Input
                  id="nip"
                  name="nip"
                  type="text"
                  disabled
                  value={vCuti.values.nip}
                  onChange={(e) => {
                    vCuti.setFieldValue('nip', e.target.value)
                  }}
                  invalid={vCuti.touched?.nip && !!vCuti.errors?.nip}
                />
                {vCuti.touched?.nip && !!vCuti.errors.nip && (
                  <FormFeedback type="invalid">
                    <div>{vCuti.errors.nip}</div>
                  </FormFeedback>
                )}
              </ColLabelInput>
            </Row>
            <Row className="mb-2">
              <ColLabelInput label="Tgl. Libur" inputId="tgllibur" lg={6}>
                <KontainerFlatpickr
                  isError={vCuti.touched?.tgllibur && !!vCuti.errors?.tgllibur}
                  id="tgllibur"
                  options={{
                    dateFormat: 'Y-m-d',
                    defaultDate: 'today',
                    mode: 'range',
                  }}
                  value={[vCuti.values.tgllibur, vCuti.values.tglliburend]}
                  onChange={([newDate, newDate2]) => {
                    vCuti.setFieldValue(
                      'tgllibur',
                      newDate?.toISOString() || ''
                    )
                    vCuti.setFieldValue(
                      'tglliburend',
                      newDate2?.toISOString() || ''
                    )
                  }}
                />
                {vCuti.touched?.tgllibur && !!vCuti.errors.tgllibur && (
                  <FormFeedback type="invalid">
                    <div>{vCuti.errors.tgllibur}</div>
                  </FormFeedback>
                )}
              </ColLabelInput>
              <ColLabelInput label={'Jenis Cuti'} inputId="jeniscuti" lg={6}>
                <CustomSelect
                  id="jeniscuti"
                  name="jeniscuti"
                  options={cuti}
                  onChange={(e) => {
                    vCuti.setFieldValue('jeniscuti', e?.value || '')
                  }}
                  value={vCuti.values.jeniscuti}
                  className={`input row-header ${
                    !!vCuti?.errors.jeniscuti ? 'is-invalid' : ''
                  }`}
                />
                {vCuti.touched.jeniscuti && !!vCuti.errors.jeniscuti && (
                  <FormFeedback type="invalid">
                    <div>{vCuti.errors.jeniscuti}</div>
                  </FormFeedback>
                )}
              </ColLabelInput>
            </Row>
            <Row>
              <ColLabelInput label={'Alasan'} inputId="alasannamalibur" lg={12}>
                <Input
                  id="alasannamalibur"
                  name="alasannamalibur"
                  type="text"
                  value={vCuti.values.alasannamalibur}
                  onChange={(e) => {
                    vCuti.setFieldValue('alasannamalibur', e.target.value)
                  }}
                  invalid={
                    vCuti.touched?.alasannamalibur &&
                    !!vCuti.errors?.alasannamalibur
                  }
                />
                {vCuti.touched?.alasannamalibur &&
                  !!vCuti.errors.alasannamalibur && (
                    <FormFeedback type="invalid">
                      <div>{vCuti.errors.alasannamalibur}</div>
                    </FormFeedback>
                  )}
              </ColLabelInput>
            </Row>
          </>
        ) : type.UNIT === vCuti.values.cutitype ? (
          <>
            <Row className="mb-2">
              <ColLabelInput label="Unit" inputId="unit" lg={6}>
                <CustomSelect
                  id="unit"
                  name="unit"
                  options={unit}
                  onChange={(e) => {
                    vCuti.setFieldValue('unit', e?.value || '')
                  }}
                  value={vCuti.values.unit}
                  className={`input row-header ${
                    !!vCuti?.errors.unit ? 'is-invalid' : ''
                  }`}
                />
                {vCuti.touched.unit && !!vCuti.errors.unit && (
                  <FormFeedback type="invalid">
                    <div>{vCuti.errors.unit}</div>
                  </FormFeedback>
                )}
              </ColLabelInput>
              <ColLabelInput label="Tgl. Libur" inputId="tgllibur" lg={6}>
                <KontainerFlatpickr
                  isError={vCuti.touched?.tgllibur && !!vCuti.errors?.tgllibur}
                  id="tgllibur"
                  options={{
                    dateFormat: 'Y-m-d',
                    defaultDate: 'today',
                    mode: 'range',
                  }}
                  value={[vCuti.values.tgllibur, vCuti.values.tglliburend]}
                  onChange={([newDate, newDate2]) => {
                    vCuti.setFieldValue(
                      'tgllibur',
                      newDate?.toISOString() || ''
                    )
                    vCuti.setFieldValue(
                      'tglliburend',
                      newDate2?.toISOString() || ''
                    )
                  }}
                />
                {vCuti.touched?.tgllibur && !!vCuti.errors.tgllibur && (
                  <FormFeedback type="invalid">
                    <div>{vCuti.errors.tgllibur}</div>
                  </FormFeedback>
                )}
              </ColLabelInput>
            </Row>
            <Row className="mb-2">
              <ColLabelInput label={'Jenis Cuti'} inputId="jeniscuti" lg={6}>
                <CustomSelect
                  id="jeniscuti"
                  name="jeniscuti"
                  options={cuti}
                  onChange={(e) => {
                    vCuti.setFieldValue('jeniscuti', e?.value || '')
                  }}
                  value={vCuti.values.jeniscuti}
                  className={`input row-header ${
                    !!vCuti?.errors.jeniscuti ? 'is-invalid' : ''
                  }`}
                />
                {vCuti.touched.jeniscuti && !!vCuti.errors.jeniscuti && (
                  <FormFeedback type="invalid">
                    <div>{vCuti.errors.jeniscuti}</div>
                  </FormFeedback>
                )}
              </ColLabelInput>
              <ColLabelInput label={'Alasan'} inputId="alasannamalibur" lg={6}>
                <Input
                  id="alasannamalibur"
                  name="alasannamalibur"
                  type="text"
                  value={vCuti.values.alasannamalibur}
                  onChange={(e) => {
                    vCuti.setFieldValue('alasannamalibur', e.target.value)
                  }}
                  invalid={
                    vCuti.touched?.alasannamalibur &&
                    !!vCuti.errors?.alasannamalibur
                  }
                />
                {vCuti.touched?.alasannamalibur &&
                  !!vCuti.errors.alasannamalibur && (
                    <FormFeedback type="invalid">
                      <div>{vCuti.errors.alasannamalibur}</div>
                    </FormFeedback>
                  )}
              </ColLabelInput>
            </Row>
          </>
        ) : (
          <>
            <Row className="mb-2">
              <ColLabelInput label="tgllibur" inputId="tgllibur" lg={6}>
                <KontainerFlatpickr
                  isError={vCuti.touched?.tgllibur && !!vCuti.errors?.tgllibur}
                  id="tgllibur"
                  options={{
                    dateFormat: 'Y-m-d',
                    defaultDate: 'today',
                    mode: 'range',
                  }}
                  value={[vCuti.values.tgllibur, vCuti.values.tglliburend]}
                  onChange={([newDate, newDate2]) => {
                    vCuti.setFieldValue(
                      'tgllibur',
                      newDate?.toISOString() || ''
                    )
                    vCuti.setFieldValue(
                      'tglliburend',
                      newDate2?.toISOString() || ''
                    )
                  }}
                />
                {vCuti.touched?.tgllibur && !!vCuti.errors.tgllibur && (
                  <FormFeedback type="invalid">
                    <div>{vCuti.errors.tgllibur}</div>
                  </FormFeedback>
                )}
              </ColLabelInput>
              <ColLabelInput label={'Jenis Cuti'} inputId="jeniscuti" lg={6}>
                <CustomSelect
                  id="jeniscuti"
                  name="jeniscuti"
                  options={cuti}
                  onChange={(e) => {
                    vCuti.setFieldValue('jeniscuti', e?.value || '')
                  }}
                  value={vCuti.values.jeniscuti}
                  className={`input row-header ${
                    !!vCuti?.errors.jeniscuti ? 'is-invalid' : ''
                  }`}
                />
                {vCuti.touched.jeniscuti && !!vCuti.errors.jeniscuti && (
                  <FormFeedback type="invalid">
                    <div>{vCuti.errors.jeniscuti}</div>
                  </FormFeedback>
                )}
              </ColLabelInput>
            </Row>
            <Row className="mb-2">
              <ColLabelInput
                label={'Nama Libur'}
                inputId="alasannamalibur"
                lg={12}
              >
                <Input
                  id="alasannamalibur"
                  name="alasannamalibur"
                  type="text"
                  value={vCuti.values.alasannamalibur}
                  onChange={(e) => {
                    vCuti.setFieldValue('alasannamalibur', e.target.value)
                  }}
                  invalid={
                    vCuti.touched?.alasannamalibur &&
                    !!vCuti.errors?.alasannamalibur
                  }
                />
                {vCuti.touched?.alasannamalibur &&
                  !!vCuti.errors.alasannamalibur && (
                    <FormFeedback type="invalid">
                      <div>{vCuti.errors.alasannamalibur}</div>
                    </FormFeedback>
                  )}
              </ColLabelInput>
            </Row>
          </>
        )}
        <Row className="d-flex justify-content-center mt-3">
          <Col lg="auto">
            <Button
              color="success"
              type="button"
              onClick={() => vCuti.handleSubmit()}
            >
              Simpan
            </Button>
          </Col>
          <Col lg="auto">
            <Button
              color="danger"
              type="button"
              onClick={() => vCuti.resetForm()}
            >
              Batal
            </Button>
          </Col>
        </Row>
      </ModalBody>
    </Modal>
  )
}

const type = {
  CLOSE: '',
  CUTI: 'CUTI',
  UNIT: 'UNIT',
  CUTI_BERSAMA: 'CUTI_BERSAMA',
}

const tableCustomStyles = {
  headRow: {
    style: {
      color: '#ffffff',
      backgroundColor: '#FFCB46',
    },
  },
  rows: {
    style: {
      color: 'black',
      backgroundColor: '#f1f2f6',
    },
  },
}

export default LiburPegawai
