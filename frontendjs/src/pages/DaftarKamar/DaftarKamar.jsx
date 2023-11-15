import { ToastContainer } from 'react-toastify'
import {
  Button,
  Card,
  Col,
  Container,
  FormFeedback,
  Input,
  Modal,
  Row,
} from 'reactstrap'
import BreadCrumb from '../../Components/Common/BreadCrumb'
import ColLabelInput from '../../Components/ColLabelInput/ColLabelInput'
import { useFormik } from 'formik'
import CustomSelect from '../Select/Select'
import { useEffect } from 'react'
import {
  getAllKamar,
  getComboDaftarKamar,
  upsertKamar,
} from '../../store/sysadmin/action'
import { useDispatch, useSelector } from 'react-redux'
import LoadingTable from '../../Components/Table/LoadingTable'
import NoDataTable from '../../Components/Table/NoDataTable'
import DataTable from 'react-data-table-component'
import * as Yup from 'yup'
import { onChangeStrNbr } from '../../utils/format'

const DaftarKamar = () => {
  const { dataKamar, comboDaftarKamar } = useSelector((state) => ({
    dataKamar: state.Sysadmin.getAllKamar.data?.kamar || [],
    comboDaftarKamar: state.Sysadmin.getComboDaftarKamar?.data || null,
  }))
  const dispatch = useDispatch()
  const vFilter = useFormik({
    initialValues: {
      kelas: '',
      unit: '',
      kamar: '',
    },
    onSubmit: (values) => {
      dispatch(getAllKamar(values))
    },
  })
  const vTambah = useFormik({
    initialValues: {
      isOpen: false,
      idkamar: '',
      namakamar: '',
      instalasi: 2,
      unit: '',
      kelas: '',
      statusenabled: true,
      jenisPelayanan: ''
    },
    validationSchema: Yup.object({
      namakamar: Yup.string().required('Nama Kamar harus diisi'),
      instalasi: Yup.string().required('Instalasi harus diisi'),
      unit: Yup.string().required('Unit harus diisi'),
      kelas: Yup.string().required('Kelas harus diisi'),
      jenisPelayanan: Yup.string().required('Jenis Pelayanan harus diisi'),
    }),
    onSubmit: (values) => {
      dispatch(
        upsertKamar(values, () => {
          dispatch(getAllKamar(vFilter.values))
        })
      )
    },
  })
  useEffect(() => {
    dispatch(getAllKamar(vFilter.initialValues))
    dispatch(getComboDaftarKamar())
  }, [dispatch, vFilter.initialValues])

  const handleOpen = (row) => {
    vTambah.setFieldValue('idkamar', row.idkamar)
    vTambah.setFieldValue('isOpen', true)
    vTambah.setFieldValue('namakamar', row.namakamar)
    vTambah.setFieldValue('instalasi', row.objectinstalasifk)
    vTambah.setFieldValue('unit', row.objectunitfk)
    vTambah.setFieldValue('kelas', row.objectkelasfk)
    vTambah.setFieldValue('statusenabled', row.statusenabled)
    vTambah.setFieldValue('jenisPelayanan', row.objectspesialisfk)
  }
  const columns = [
    {
      name: <span className="font-weight-bold fs-13">Id Kamar</span>,
      selector: (row) => row.idkamar,
      sortable: true,
      width: '100px',
    },
    {
      name: <span className="font-weight-bold fs-13">Unit</span>,
      selector: (row) => row.namaunit,
      sortable: true,
      width: '200px',
    },
    {
      name: <span className="font-weight-bold fs-13">Kelas</span>,
      selector: (row) => row.namakelas,
      sortable: true,
      width: '200px',
    },
    {
      name: <span className="font-weight-bold fs-13">Nama Kamar</span>,
      selector: (row) => row.namakamar,
      sortable: true,
      width: '150px',
    },
    {
      name: <span className="font-weight-bold fs-13">Status Enabled</span>,
      selector: (row) => (row.statusenabled ? 'Aktif' : 'Tidak Aktif'),
      sortable: true,
      width: '150px',
    },
    {
      name: <span className="font-weight-bold fs-13">Spesialis</span>,
      selector: (row) => row.spesialis,
      sortable: true,
      width: '150px',
    },
    {
      name: <span className="font-weight-bold fs-13">Aksi</span>,
      cell: (row) => (
        <Button
          color="info"
          onClick={() => {
            handleOpen(row)
          }}
        >
          Edit
        </Button>
      ),
      sortable: false,
      width: '150px',
    },
  ]
  console.log(vTambah.values)
  return (
    <div className="page-content page-daftar-kamar">
      <Modal
        isOpen={vTambah.values.isOpen}
        toggle={() => vTambah.resetForm()}
        centered
      >
        <Card className="p-3">
          <Row>
            {vTambah.values.idkamar && (
              <ColLabelInput
                className="mb-2"
                lg={6}
                label={'instalasi'}
                inputId={'instalasi'}
              >
                <Input
                  id="idkamar"
                  name="idkamar"
                  type="text"
                  value={vTambah.values.idkamar}
                  disabled
                  onChange={(e) => {
                    const newVal = onChangeStrNbr(
                      e.target.value,
                      vTambah.values.idkamar
                    )
                    vTambah.setFieldValue('idkamar', newVal)
                  }}
                  invalid={
                    vTambah.touched?.idkamar && !!vTambah.errors?.idkamar
                  }
                />
                {vTambah.touched?.idkamar && !!vTambah.errors.idkamar && (
                  <FormFeedback type="invalid">
                    <div>{vTambah.errors.idkamar}</div>
                  </FormFeedback>
                )}
              </ColLabelInput>
            )}
            <ColLabelInput
              className="mb-2"
              lg={6}
              label={'instalasi'}
              inputId={'instalasi'}
            >
              <CustomSelect
                id="instalasi"
                name="instalasi"
                options={comboDaftarKamar?.instalasi || []}
                onChange={(e) => {
                  vTambah.setFieldValue('instalasi', e?.value || '')
                }}
                isDisabled
                value={vTambah.values.instalasi}
                className={`input row-header ${!!vTambah?.errors.instalasi ? 'is-invalid' : ''
                  }`}
              />
              {vTambah.touched.instalasi && !!vTambah.errors.instalasi && (
                <FormFeedback type="invalid">
                  <div>{vTambah.errors.instalasi}</div>
                </FormFeedback>
              )}
            </ColLabelInput>
            <ColLabelInput
              className="mb-2"
              lg={6}
              label={'unit'}
              inputId={'unit'}
            >
              <CustomSelect
                id="unit"
                name="unit"
                options={comboDaftarKamar?.unit || []}
                onChange={(e) => {
                  vTambah.setFieldValue('unit', e?.value || '')
                }}
                value={vTambah.values.unit}
                className={`input row-header ${!!vTambah?.errors.unit ? 'is-invalid' : ''
                  }`}
              />
              {vTambah.touched.unit && !!vTambah.errors.unit && (
                <FormFeedback type="invalid">
                  <div>{vTambah.errors.unit}</div>
                </FormFeedback>
              )}
            </ColLabelInput>
            <ColLabelInput
              className="mb-2"
              lg={6}
              label={'kelas'}
              inputId={'kelas'}
            >
              <CustomSelect
                id="kelas"
                name="kelas"
                options={comboDaftarKamar?.kelas || []}
                onChange={(e) => {
                  vTambah.setFieldValue('kelas', e?.value || '')
                }}
                value={vTambah.values.kelas}
                className={`input row-header ${!!vTambah?.errors.kelas ? 'is-invalid' : ''
                  }`}
              />
              {vTambah.touched.kelas && !!vTambah.errors.kelas && (
                <FormFeedback type="invalid">
                  <div>{vTambah.errors.kelas}</div>
                </FormFeedback>
              )}
            </ColLabelInput>
            <ColLabelInput
              className="mb-2"
              lg={6}
              label={'Nama Kamar'}
              inputId={'Nama Kamar'}
            >
              <Input
                id="namakamar"
                name="namakamar"
                type="text"
                value={vTambah.values.namakamar}
                onChange={(e) => {
                  vTambah.setFieldValue('namakamar', e.target.value)
                }}
                invalid={
                  vTambah.touched?.namakamar && !!vTambah.errors?.namakamar
                }
              />
              {vTambah.touched?.namakamar && !!vTambah.errors.namakamar && (
                <FormFeedback type="invalid">
                  <div>{vTambah.errors.namakamar}</div>
                </FormFeedback>
              )}
            </ColLabelInput>
            <ColLabelInput
              className="mb-2"
              lg={6}
              label={'Jenis Pelayanan'}
              inputId={'Jenis Pelayanan'}
            >
              <CustomSelect
                id="jenisPelayanan"
                name="jenisPelayanan"
                options={comboDaftarKamar?.spesialisasi || []}
                onChange={(e) => {
                  vTambah.setFieldValue('jenisPelayanan', e?.value || '')
                }}
                value={vTambah.values.jenisPelayanan}
                className={`input row-header ${!!vTambah?.errors.jenisPelayanan ? 'is-invalid' : ''
                  }`}
              />
              {vTambah.touched.jenisPelayanan && !!vTambah.errors.jenisPelayanan && (
                <FormFeedback type="invalid">
                  <div>{vTambah.errors.jenisPelayanan}</div>
                </FormFeedback>
              )}
            </ColLabelInput>
            {vTambah.values.idkamar && (
              <ColLabelInput
                className="mb-2"
                lg={6}
                label={'Status Enabled'}
                inputId={'status'}
              >
                <CustomSelect
                  id="statusenabled"
                  name="statusenabled"
                  options={[
                    { value: true, label: 'Aktif' },
                    { value: false, label: 'Tidak Aktif' },
                  ]}
                  onChange={(e) => {
                    vTambah.setFieldValue('statusenabled', e?.value || '')
                  }}
                  value={vTambah.values.statusenabled}
                  className={`input row-header ${!!vTambah?.errors.statusenabled ? 'is-invalid' : ''
                    }`}
                />
                {vTambah.touched.statusenabled &&
                  !!vTambah.errors.statusenabled && (
                    <FormFeedback type="invalid">
                      <div>{vTambah.errors.statusenabled}</div>
                    </FormFeedback>
                  )}
              </ColLabelInput>
            )}
          </Row>
          <Row className="justify-content-center">
            <ColLabelInput lg="auto">
              <Button
                color="success"
                onClick={() => {
                  vTambah.handleSubmit()
                }}
              >
                {vTambah.values.idkamar ? 'Edit' : 'Simpat'}
              </Button>
            </ColLabelInput>
            <ColLabelInput lg="auto">
              <Button
                color="danger"
                onClick={() => {
                  vTambah.resetForm()
                }}
              >
                Batal
              </Button>
            </ColLabelInput>
          </Row>
        </Card>
      </Modal>
      <ToastContainer closeButton={false} />
      <Container fluid>
        <BreadCrumb title="Daftar Kamar" pageTitle="Kamar" />
        <Card className="p-5">
          <Row>
            <ColLabelInput lg={3} label={'Kelas'} inputId={'kelas'}>
              <CustomSelect
                id="kelas"
                name="kelas"
                options={comboDaftarKamar?.kelas || []}
                onChange={(e) => {
                  vFilter.setFieldValue('kelas', e?.value || '')
                }}
                value={vFilter.values.kelas}
                className={`input row-header ${!!vFilter?.errors.kelas ? 'is-invalid' : ''
                  }`}
              />
              {vFilter.touched.kelas && !!vFilter.errors.kelas && (
                <FormFeedback type="invalid">
                  <div>{vFilter.errors.kelas}</div>
                </FormFeedback>
              )}
            </ColLabelInput>
            <ColLabelInput lg={3} label={'Unit'} inputId={'unit'}>
              <CustomSelect
                id="unit"
                name="unit"
                options={comboDaftarKamar?.unit || []}
                onChange={(e) => {
                  vFilter.setFieldValue('unit', e?.value || '')
                }}
                value={vFilter.values.unit}
                className={`input row-header ${!!vFilter?.errors.unit ? 'is-invalid' : ''
                  }`}
              />
              {vFilter.touched.unit && !!vFilter.errors.unit && (
                <FormFeedback type="invalid">
                  <div>{vFilter.errors.unit}</div>
                </FormFeedback>
              )}
            </ColLabelInput>
            <ColLabelInput lg={3} label={'kamar'} inputId={'kamar'}>
              <div className="search-box ms-2">
                <Input
                  className="search"
                  id="kamar"
                  name="kamar"
                  type="text"
                  value={vFilter.values.kamar}
                  placeholder="Search..."
                  onChange={(e) => {
                    vFilter.setFieldValue('kamar', e.target.value)
                  }}
                  invalid={vFilter.touched?.kamar && !!vFilter.errors?.kamar}
                />
                {vFilter.touched?.kamar && !!vFilter.errors.kamar && (
                  <FormFeedback type="invalid">
                    <div>{vFilter.errors.kamar}</div>
                  </FormFeedback>
                )}
                <i className="ri-search-line search-icon"></i>
              </div>
            </ColLabelInput>
            <ColLabelInput lg="auto">
              <Button
                color="info"
                onClick={() => {
                  vFilter.handleSubmit()
                }}
              >
                Cari
              </Button>
            </ColLabelInput>
            <ColLabelInput lg="auto">
              <Button
                color="info"
                onClick={() => {
                  vTambah.setFieldValue('isOpen', true)
                }}
              >
                Tambah
              </Button>
            </ColLabelInput>
          </Row>
          <Row>
            <DataTable
              className="mt-4"
              columns={columns}
              pagination
              data={dataKamar}
              progressPending={false}
              customStyles={tableCustomStyles}
              progressComponent={<LoadingTable />}
              noDataComponent={<NoDataTable dataName={'unit'} />}
            />
          </Row>
        </Card>
      </Container>
    </div>
  )
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

export default DaftarKamar
