import {
  Container,
  Card,
  Row,
  Button,
  FormFeedback,
  Modal,
  Input,
} from 'reactstrap'
import BreadCrumb from '../../Components/Common/BreadCrumb'
import { ToastContainer } from 'react-toastify'
import ColLabelInput from '../../Components/ColLabelInput/ColLabelInput'
import { useFormik } from 'formik'
import LoadingTable from '../../Components/Table/LoadingTable'
import NoDataTable from '../../Components/Table/NoDataTable'
import DataTable from 'react-data-table-component'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  getAllUnit,
  getComboDaftarUnit,
  upsertUnit,
} from '../../store/sysadmin/action'
import CustomSelect from '../Select/Select'
import * as Yup from 'yup'
import { tableCustomStyles } from '../../Components/Table/tableCustomStyles'

const DaftarUnit = () => {
  const dispatch = useDispatch()
  const { allUnit, instalasi } = useSelector((state) => ({
    allUnit: state.Sysadmin.getAllUnit.data?.unit || [],
    instalasi: state.Sysadmin.getComboDaftarUnit.data?.instalasi || [],
  }))
  const vCari = useFormik({
    initialValues: {
      instalasi: '',
    },
    onSubmit: (values) => {
      dispatch(getAllUnit(values))
    },
  })
  const vEditUnit = useFormik({
    initialValues: {
      isOpen: false,
      idunit: '',
      namaunit: '',
      instalasi: '',
      statusenabled: true,
    },
    validationSchema: Yup.object({
      namaunit: Yup.string().required('Nama unit harus diisi'),
      instalasi: Yup.string().required('Instalasi harus diisi'),
    }),
    onSubmit: (values) => {
      dispatch(
        upsertUnit(values, () => {
          vEditUnit.resetForm()
          dispatch(getAllUnit(vCari.initialValues))
        })
      )
    },
  })

  useEffect(() => {
    dispatch(getAllUnit(vCari.initialValues))
    dispatch(getComboDaftarUnit())
  }, [dispatch, vCari.initialValues])
  const columns = [
    {
      name: <span className="font-weight-bold fs-13">Id Unit</span>,
      selector: (row) => row.idunit,
      sortable: true,
      width: '100px',
    },
    {
      name: <span className="font-weight-bold fs-13">Nama Unit</span>,
      selector: (row) => row.namaunit,
      sortable: true,
      width: '200px',
    },
    {
      name: <span className="font-weight-bold fs-13">Instalasi</span>,
      selector: (row) => row.namainstalasi,
      sortable: true,
      width: '200px',
    },
    {
      name: <span className="font-weight-bold fs-13">Status Enabled</span>,
      selector: (row) => (row.statusenabled ? 'Aktif' : 'Tidak Aktif'),
      sortable: true,
      width: '150px',
    },
    {
      name: <span className="font-weight-bold fs-13">Aksi</span>,
      cell: (row) => (
        <Button
          color="info"
          onClick={() => {
            vEditUnit.setFieldValue('isOpen', true)
            vEditUnit.setFieldValue('idunit', row.idunit)
            vEditUnit.setFieldValue('namaunit', row.namaunit)
            vEditUnit.setFieldValue('instalasi', row.objectinstalasifk)
            vEditUnit.setFieldValue('statusenabled', row.statusenabled)
          }}
        >
          Edit
        </Button>
      ),
      sortable: false,
      width: '150px',
    },
  ]
  return (
    <div className="page-content page-daftar-kamar">
      <ToastContainer closeButton={false} />
      <Modal
        isOpen={vEditUnit.values.isOpen}
        toggle={() => vEditUnit.resetForm()}
        centered
      >
        <Row className="p-4 pb-0">
          {vEditUnit.values.idunit && (
            <ColLabelInput lg={6} label={'Id Unit'} inputId={'idunit'}>
              <Input
                id="idunit"
                name="idunit"
                type="text"
                value={vEditUnit.values.idunit}
                disabled
                invalid={
                  vEditUnit.touched?.idunit && !!vEditUnit.errors?.idunit
                }
              />
              {vEditUnit.touched?.idunit && !!vEditUnit.errors.idunit && (
                <FormFeedback type="invalid">
                  <div>{vEditUnit.errors.idunit}</div>
                </FormFeedback>
              )}
            </ColLabelInput>
          )}
          <ColLabelInput lg={6} label={'Nama unit'} inputId={'namaunit'}>
            <Input
              id="namaunit"
              name="namaunit"
              type="text"
              value={vEditUnit.values.namaunit}
              onChange={(e) => {
                vEditUnit.setFieldValue('namaunit', e.target.value)
              }}
              invalid={
                vEditUnit.touched?.namaunit && !!vEditUnit.errors?.namaunit
              }
            />
            {vEditUnit.touched?.namaunit && !!vEditUnit.errors.namaunit && (
              <FormFeedback type="invalid">
                <div>{vEditUnit.errors.namaunit}</div>
              </FormFeedback>
            )}
          </ColLabelInput>
          <ColLabelInput lg={6} label={'Instalasi'} inputId={'instalasi'}>
            <CustomSelect
              id="instalasi"
              name="instalasi"
              options={instalasi}
              onChange={(e) => {
                vEditUnit.setFieldValue('instalasi', e?.value || '')
              }}
              value={vEditUnit.values.instalasi}
              className={`input row-header ${
                !!vEditUnit?.errors.instalasi ? 'is-invalid' : ''
              }`}
            />
            {vEditUnit.touched.instalasi && !!vEditUnit.errors.instalasi && (
              <FormFeedback type="invalid">
                <div>{vEditUnit.errors.instalasi}</div>
              </FormFeedback>
            )}
          </ColLabelInput>
          {vEditUnit.values.idunit && (
            <ColLabelInput lg={6} label={'Status Enabled'} inputId={'status'}>
              <CustomSelect
                id="statusenabled"
                name="statusenabled"
                options={[
                  { value: true, label: 'Aktif' },
                  { value: false, label: 'Tidak Aktif' },
                ]}
                onChange={(e) => {
                  vEditUnit.setFieldValue('statusenabled', e.value)
                }}
                value={vEditUnit.values.statusenabled}
                className={`input row-header ${
                  !!vEditUnit?.errors.statusenabled ? 'is-invalid' : ''
                }`}
              />
              {vEditUnit.touched.statusenabled &&
                !!vEditUnit.errors.statusenabled && (
                  <FormFeedback type="invalid">
                    <div>{vEditUnit.errors.statusenabled}</div>
                  </FormFeedback>
                )}
            </ColLabelInput>
          )}
        </Row>
        <Row className="justify-content-center pb-3">
          <ColLabelInput lg="auto">
            <Button
              color="success"
              onClick={() => {
                vEditUnit.handleSubmit()
              }}
            >
              {vEditUnit.values.idunit ? 'Edit' : 'Simpan'}
            </Button>
          </ColLabelInput>
          <ColLabelInput lg="auto">
            <Button color="danger" onClick={() => vEditUnit.resetForm()}>
              Batal
            </Button>
          </ColLabelInput>
        </Row>
      </Modal>
      <Container fluid>
        <BreadCrumb title="Daftar Unit" pageTitle="unit" />
        <Card className="p-5">
          <Row>
            <ColLabelInput lg={3} label={'Instalasi'} inputId={'kelas-input'}>
              <CustomSelect
                id="instalasi"
                name="instalasi"
                options={instalasi}
                onChange={(e) => {
                  vCari.setFieldValue('instalasi', e?.value || '')
                }}
                value={vCari.values.instalasi}
                className={`input row-header ${
                  !!vCari?.errors.instalasi ? 'is-invalid' : ''
                }`}
              />
              {vCari.touched.instalasi && !!vCari.errors.instalasi && (
                <FormFeedback type="invalid">
                  <div>{vCari.errors.instalasi}</div>
                </FormFeedback>
              )}
            </ColLabelInput>
            <ColLabelInput lg="auto">
              <Button
                color="info"
                onClick={() => {
                  vCari.handleSubmit()
                }}
              >
                Cari
              </Button>
            </ColLabelInput>
            <ColLabelInput lg="auto">
              <Button
                color="info"
                onClick={() => {
                  vEditUnit.setFieldValue('isOpen', true)
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
              data={allUnit}
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

export default DaftarUnit
